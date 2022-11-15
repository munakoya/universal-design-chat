import React, { useEffect, useState } from "react";
// cssの読み込み
import "./Timeline.css";
import TweetBox from "./TweetBox";
import "./Post.js";
import Post from "./Post.js";
// import dbでfirestoreを持ってくる
import db from "../../firebase";
// dbでのデータ取得に使うライブラリ、関数のimport
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
// なめらかに動くライブラリ
import FlipMove from "react-flip-move";

function Timeline() {
  // useState → データを保持 postsという変数に保持 setPosts()関数でset
  const [posts, setPosts] = useState([]);

  // マウント時に一回だけ読み込み
  useEffect(() => {
    // collectionで取得したコレクションを指定する
    const postData = collection(db, "posts");
    // 時系列に並び替える → データの並べ替え ドキュメントで検索
    // 最新の投稿順にしたデータq
    const q = query(postData, orderBy("timestamp", "desc"));
    // リアルタイムでデータを取得 → ドキュメント参照
    // onSnapshotの第一引数に qをいれる 、第2引数で取り出す(名前はなんでもおk)
    onSnapshot(q, (querySnapshots) => {
      // setPost関数でpostsにデータをセット
      // リアルタイムにデータ取得
      setPosts(querySnapshots.docs.map((doc) => doc.data()));
    });
  }, []); // 配列からにする → 発火するタイミング → 空だとマウント時一回

  return (
    <div className="timeline">
      {/* Header */}
      <div className="timeline_header">
        <h2>ホーム</h2>
      </div>

      {/* TweetBox */}
      <TweetBox />

      {/* postsに入ったデータを1つずつmap関数で取り出す */}
      {/* dbのコレクションから取ってきたデータ  → postsを一個ずつ中身を見る → propsでPost.jsに値を渡す */}
      {/* FlipMoveで囲む + 関数コンポーネントで使うなら → fowardRefで囲んで,,,ドキュメントみて → post.jsにある */}
      <FlipMove>
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
