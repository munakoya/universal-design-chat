/*
タイムラインのコンポーネント
PostとTweetBoxコンポーネントを組み合わせてタイムライン画面を作成
公式アカウントのみお知らせの投稿が可能

*/

import React, { useEffect, useState } from "react";
import FlipMove from "react-flip-move"; // なめらかに動くライブラリ
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import db from "../../../firebase";
import TweetBox from "./TweetBox";
import Post from "./Post.jsx";
import "./Timeline.css";

function Timeline() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const postData = collection(db, "posts");
    // 最新の投稿順にしたデータq
    const q = query(postData, orderBy("timestamp", "desc"));
    // リアルタイムでデータを取得 → ドキュメント参照
    // onSnapshotの第一引数に qをいれる 、第2引数で取り出す(名前はなんでもおk)
    onSnapshot(q, (querySnapshots) => {
      // リアルタイムにデータ取得
      setPosts(querySnapshots.docs.map((doc) => doc.data()));
    });
  }, []);

  return (
    <div className="timeline">
      <div className="timeline_header">
        <h2>お知らせ</h2>
      </div>
      {/* FlipMoveで囲む + 関数コンポーネントで使うなら → fowardRefで囲んで,,,ドキュメントみて → post.jsにある */}
      <div>
        {console.log("AUTH_USER : ", sessionStorage.getItem("AUTH_USER_UID"))}
        {/* auth_user.idにすると初ログイン時にエラー  || user.uid つけてもよき*/}
        {sessionStorage.getItem("AUTH_USER_UID") ===
        process.env.REACT_APP_ADMIN ? (
          <div>
            <TweetBox />
          </div>
        ) : (
          console.log("管理者ではありません。")
        )}
        {/* FlipMove → いい感じに動く */}
        <FlipMove>
          {posts.map((post) => (
            <Post
              key={post.id}
              displayName={post.displayName}
              username={post.username}
              verified={post.verified}
              text={post.text}
              avatar={post.avatar}
              image={post.image}
            />
          ))}
        </FlipMove>
      </div>
    </div>
  );
}

export default Timeline;
