/*
ツイートボックスのコンポーネント
文字列と画像urlを入力 → 投稿ボタンをクリックすると、sendTweet関数が実行されてdbに登録される
話題を投稿してもらいます。

TODO
tweetを複数行入力できるようにする
→ textareaにすればよき → reactのform集めたライブラリ使いやすかった気がする
*/

import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Avatar, Button } from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import db from "../../../firebase";
import "./tweetBox.css";

function TweetBox() {
  // セッション管理してリロード時のstateリセットによるログインページに遷移しないように
  const auth_user = JSON.parse(sessionStorage.getItem("AUTH_USER"));

  const [tweetMessage, setTweetMessage] = useState("");
  const [tweetImage, setTweetImage] = useState("");
  const params = useParams();

  // input内に文字列が入力されると、↑で定義した変数にセットされる
  const handleChangeImage = (e) => {
    setTweetImage(e.target.value);
  };

  const handleChangeMessage = (e) => {
    setTweetMessage(e.target.value);
  };

  // 送信処理
  const handleSubmit = (e) => {
    e.preventDefault();
    // 空送信できないように変更
    if (tweetMessage === "") return;
    sendRoomTweet(tweetMessage, tweetImage, auth_user); // firebase.jsで定義している関数
    // 送信後入力フォームをクリア
    setTweetMessage("");
    setTweetImage("");
  };

  async function sendRoomTweet(tweetMessage, tweetImage, auth_user) {
    // youtubeの動画url (未再生)
    if (tweetImage.indexOf("watch?v=") !== -1) {
      tweetImage = tweetImage.replace("watch?v=", "embed/");
      // 動画が再生済み
      if (tweetImage.indexOf("&") !== -1) {
        tweetImage = tweetImage.substring(0, tweetImage.indexOf("&"));
      }
    }
    try {
      await addDoc(collection(db, "roomPosts", params.id, "posts"), {
        // addするデータ のプロパティを決める
        // いらないデータ消す
        displayName: auth_user.displayName,
        text: tweetMessage,
        avatar: auth_user.photoURL,
        image: tweetImage,
        // 固有のuuidをset → map関数で回すため → docidとかでもいいかも
        id: uuidv4(),
        // 時系列順に並べるため
        timestamp: serverTimestamp(),
      });
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <div className="tweetBox">
      <form onSubmit={handleSubmit}>
        <div className="tweetBox_input">
          <Avatar src={auth_user.photoURL} />
          <input
            value={tweetMessage}
            placeholder="話題を投稿しよう！"
            type="text"
            onChange={handleChangeMessage}
            required
          ></input>
        </div>
        <input
          value={tweetImage}
          className="tweetBox_imageInput"
          placeholder="画像もしくは動画(Youtube)URLを入力してください"
          type="text"
          onChange={handleChangeImage}
        ></input>
        <Button className="tweetBox_tweetButton" type="submit">
          投稿する
        </Button>
      </form>
    </div>
  );
}

export default TweetBox;
