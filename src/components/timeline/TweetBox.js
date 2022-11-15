import { Avatar, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
// css読み込み
import "./TweetBox.css";
// firebaseの関数
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import db from "../../firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { v4 as uuidv4 } from "uuid";
import { useAuth } from "../../hooks/useAuth";

// export const yourfunc = () => {
//   const auth = getAuth();
//   auth.onAuthStateChanged((user) => {
//     console.log(user.email);
//   });
// };

function TweetBox() {
  // ログインユーザー情報
  const { user } = useAuth();

  // 入力された文字列を格納する変数を用意する → useState
  const [tweetMessage, setTweetMessage] = useState(""); // 初期値から
  const [tweetImage, setTweetImage] = useState("");

  // inputの文字列をdbに追加 引数にe(イベント)
  // firebaseのデータベースにデータを追加する
  const sendTweet = (e) => {
    // tweetボタンを押しても画面がリロードされない
    e.preventDefault();
    // 空の場合は送信できない
    if (tweetMessage === "") return;
    // この関数内でログイン中のユーザデータにアクセスできる → グローバルにしたい
    // ここの関数の意味とわんち関数使わずにdb登録でエラー解消説
    onAuthStateChanged(user, (user) => {
      if (user) {
        // firebaseに追加する → addDoc関数 引数にdbとその中のコレクション名
        // コレクションさえ作れば、以下のプロパティのデータがドキュメントとして追加される
        addDoc(collection(db, "posts"), {
          // addするデータ のプロパティを決める → ここをログイン中のuserごとにしたい
          displayName: user.displayName,
          username: user.email,
          verified: true,
          text: tweetMessage,
          avatar: user.photoURL,
          image: tweetImage,
          // 固有のuuidをset
          id: uuidv4(),
          // 時系列順に並べるため
          timestamp: serverTimestamp(),
        });
      }
    });

    // 空にする
    setTweetMessage("");
    setTweetImage("");
  };

  return (
    <div className="tweetBox">
      {/* tweetBoxはform */}
      <form>
        <div className="tweetBox_input">
          {/* material UI */}
          <Avatar src={user.photoURL} />
          <input
            // inputタグにvalueを指定すると、あとでアクセスできるようになって便利
            value={tweetMessage}
            placeholder="いまどうしてる？"
            type="text"
            // inputに書き込まれるe(イベント)が発生 → tweetMessageに文字列を追加(e.target.value)
            onChange={(e) => setTweetMessage(e.target.value)}
          ></input>
        </div>
        <input
          value={tweetImage}
          className="tweetBox_imageInput"
          placeholder="画像のURLを入力してください"
          type="text"
          // 入力された画像urlを格納する
          onChange={(e) => setTweetImage(e.target.value)}
        ></input>
        {/* ツイートボタン */}
        {/* Button タグ → onClickとセット → htmlの要素にclassNameをつけてcss当てられるように */}
        <Button
          className="tweetBox_tweetButton"
          type="submit"
          // クリックすると送信
          onClick={sendTweet}
        >
          ツイートする
        </Button>
      </form>
    </div>
  );
}

export default TweetBox;

// test
