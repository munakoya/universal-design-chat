/*
ツイートボックスのコンポーネント
文字列と画像urlを入力 → 投稿ボタンをクリックすると、sendTweet関数が実行されてdbに登録される

TODO
tweetを複数行入力できるようにする
*/

import React, { useState } from "react";
import { sendTweet } from "../../../firebase";
import { useAuth } from "../../../hooks/useAuth";
import { Avatar, Button } from "@mui/material";
import "./TweetBox.css";

function TweetBox() {
  // const { user } = useAuth();
  // セッション管理してリロード時のstateリセットによるログインページに遷移しないように
  const auth_user = JSON.parse(sessionStorage.getItem("AUTH_USER"));

  const [tweetMessage, setTweetMessage] = useState("");
  const [tweetImage, setTweetImage] = useState("");

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
    sendTweet(tweetMessage, tweetImage, auth_user); // firebase.jsで定義している関数
    // 送信後入力フォームをクリア
    setTweetMessage("");
    setTweetImage("");
  };
  return (
    <div className="tweetBox">
      <form onSubmit={handleSubmit}>
        <div className="tweetBox_input">
          <Avatar src={sessionStorage.getItem("AUTH_USER_PHOTOURL")} />
          <input
            value={tweetMessage}
            placeholder="お知らせを投稿してください"
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
