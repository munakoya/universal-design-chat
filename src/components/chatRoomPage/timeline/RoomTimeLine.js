/**
 * ルームごとのタイムライン
 * データベース構造はhomeとほぼ一緒で、保存場所をいじってるだけ
 * 話題が投稿 → チャットルームが生成されるイメージ
 */

import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import FlipMove from "react-flip-move"; // なめらかに動くライブラリ
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import db from "../../../firebase";
import TweetBox from "./TweetBox";
import Post from "./Post.js";
import "./roomTimeLine.css";

function RoomTimeLine() {
  const [posts, setPosts] = useState([]);
  const params = useParams();

  useEffect(() => {
    const postData = collection(db, "roomPosts", params.id, "posts");
    // 最新の投稿順にしたデータq
    const q = query(postData, orderBy("timestamp", "desc"));
    // リアルタイムでデータを取得 → ドキュメント参照
    // onSnapshotの第一引数に qをいれる 、第2引数で取り出す(名前はなんでもおk)
    onSnapshot(q, (querySnapshots) => {
      setPosts(querySnapshots.docs.map((doc) => doc.data()));
    });
  }, []);

  return (
    <div className="roomTimeLine">
      <div className="roomTimeLine">
        <h2>
          <Link to="/rooms" className="back">
            ◀
          </Link>
          {`${params.id}`}
        </h2>
      </div>
      <TweetBox />
      <FlipMove>
        {/* マウント時にpostsにdb/posts内のデータがセットされる */}
        {posts.map((post) => (
          <Post
            // 固有のID(uid)を本当は入れたい → 動くけどwarning
            key={post.id}
            displayName={post.displayName}
            text={post.text}
            avatar={post.avatar}
            image={post.image}
            roomId={params.id}
          />
        ))}
      </FlipMove>
    </div>
  );
}

export default RoomTimeLine;
