/*
タイムラインのコンポーネント
PostとTweetBoxコンポーネントを組み合わせてタイムライン画面を作成
*/

import React, { useEffect, useState } from "react";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import FlipMove from "react-flip-move"; // なめらかに動くライブラリ
import db from "../../../firebase";
import TweetBox from "./TweetBox";
import Post from "./Post.js";
import "./Timeline.css";

function Timeline() {
  const [posts, setPosts] = useState([]);

  // マウント時に一回だけ読み込み
  useEffect(() => {
    // firebaseのコレクションを指定
    const postData = collection(db, "posts");
    // 時系列に並び替える → データの並べ替え ドキュメントで検索
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
        <h2>ホーム</h2>
      </div>
      <TweetBox />
      {/* FlipMoveで囲む + 関数コンポーネントで使うなら → fowardRefで囲んで,,,ドキュメントみて → post.jsにある */}
      <FlipMove>
        {/* マウント時にpostsにdb/posts内のデータがセットされる */}
        {posts.map((post) => (
          <Post
            // 固有のID(uid)を本当は入れたい → 動くけどwarning
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
  );
}

export default Timeline;
