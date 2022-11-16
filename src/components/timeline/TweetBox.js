import { Avatar, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { sendTweet } from "../../firebase";
// css読み込み
import "./TweetBox.css";
// firebaseの関数
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import db from "../../firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { v4 as uuidv4 } from "uuid";
import { useAuth } from "../../hooks/useAuth";

function TweetBox() {
  // ログインユーザー情報
  const { user } = useAuth();

  // 入力された文字列を格納する変数を用意する → useState
  const [tweetMessage, setTweetMessage] = useState(""); // 初期値から
  const [tweetImage, setTweetImage] = useState("");

  // inputの文字列をdbに追加 引数にe(イベント)
  // firebaseのデータベースにデータを追加する
  const handleChangeImage = (e) => {
    setTweetImage(e.target.value);
  };

  const handleChangeMessage = (e) => {
    setTweetMessage(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendTweet(tweetMessage, tweetImage, user);
    setTweetMessage("");
    setTweetImage("");
  };
  return (
    <div className="tweetBox">
      {/* tweetBoxはform */}
      <form onSubmit={handleSubmit}>
        <div className="tweetBox_input">
          {/* material UI */}
          <Avatar src={user.photoURL} />
          <input
            // inputタグにvalueを指定すると、あとでアクセスできるようになって便利
            value={tweetMessage}
            placeholder="いまどうしてる？"
            type="text"
            // inputに書き込まれるe(イベント)が発生 → tweetMessageに文字列を追加(e.target.value)
            onChange={handleChangeMessage}
          ></input>
        </div>
        <input
          value={tweetImage}
          className="tweetBox_imageInput"
          placeholder="画像のURLを入力してください"
          type="text"
          // 入力された画像urlを格納する
          onChange={handleChangeImage}
        ></input>
        {/* ツイートボタン */}
        {/* Button タグ → onClickとセット → htmlの要素にclassNameをつけてcss当てられるように */}
        <Button className="tweetBox_tweetButton" type="submit">
          ツイートする
        </Button>
      </form>
    </div>
  );
}

export default TweetBox;

// test
