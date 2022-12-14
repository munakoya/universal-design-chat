/*
ツイートボックスのコンポーネント
文字列と画像urlを入力 → 投稿ボタンをクリックすると、sendTweet関数が実行されてdbに登録される

TODO
tweetを複数行入力できるようにする
*/

import React, { useState } from "react";
import { useAuth } from "../../../hooks/useAuth";
import { Avatar, Button } from "@mui/material";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import db from "../../../firebase";
import "./tweetBox.css";
import { useParams } from "react-router-dom";

function TweetBox() {
  const { user } = useAuth();

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
    // リロードされないように
    e.preventDefault();
    // 空送信できないように変更
    if (tweetMessage === "" && tweetImage === "") return;
    sendRoomTweet(tweetMessage, tweetImage, user); // firebase.jsで定義している関数
    // 送信後入力フォームをクリア
    setTweetMessage("");
    setTweetImage("");
  };

  async function sendRoomTweet(tweetMessage, tweetImage, user) {
    try {
      await addDoc(collection(db, "roomPosts", params.id, "posts"), {
        // addするデータ のプロパティを決める → ここをログイン中のuserごとにしたい
        displayName: user.displayName,
        username: user.email,
        verified: true,
        text: tweetMessage,
        avatar: user.photoURL,
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
          <Avatar src={user.photoURL} />
          <input
            value={tweetMessage}
            placeholder="いまどうしてる？"
            type="text"
            onChange={handleChangeMessage}
          ></input>
        </div>
        <input
          value={tweetImage}
          className="tweetBox_imageInput"
          placeholder="画像のURLを入力してください"
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
