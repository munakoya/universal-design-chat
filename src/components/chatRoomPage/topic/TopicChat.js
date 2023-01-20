/**
 * TopicChat
 * → 投稿内容のルーム
 */

import React, { useEffect, useState } from "react";
import {
  collection,
  orderBy,
  query,
  onSnapshot,
  getDocs,
  // doc,
} from "firebase/firestore";
import db from "../../../firebase";
// import { useAuth } from "../../hooks/useAuth";
import { Link, useParams } from "react-router-dom";
import ChatMessageList from "../MessageList/ChatMessageList";
import ChatMessageInput from "../MessageInput/ChatMessageInput";
import "../chat.css";
import TopicChatMessageList from "./TopicChatMessageList/TopicChatMessageList";
import TopicChatMessageInput from "./TopicChatMessageInput/TopicChatMessageInput";

function TopicChat() {
  // ルームの選択 → room/room.idが指定でidごとのルームにルーティング
  // useParamsでurl内のidを取得
  const params = useParams();

  // 編集
  const [rooms, setRooms] = useState([]);
  const [room, setRoom] = useState([]);

  useEffect(() => {
    // ここで直接ドキュメントidを指定 → urlはテキストに戻してわかりやすk
    const roomList = collection(db, "room-list");
    const q = query(roomList, orderBy("createdAt", "desc"));
    onSnapshot(q, (querySnapshots) => {
      setRooms(querySnapshots.docs.map((doc) => doc.data())); // roomsにはすべてのルームのデータ
    });
  }, []);

  return (
    <div className="chat">
      {console.log("params.id : ", params.id)}
      {console.log("params.id2 : ", params.id2)}
      <h2 className="chat_header">{params.id2}</h2>
      <Link className="back" to={`/room/${params.id}/chat-room`}>
        ◀
      </Link>

      <div className="messages_container">
        {/* そもそもちゃんとpropsを渡せてない → urlで渡したくないならpropsだけど渡せない */}
        <TopicChatMessageList roomId={params.id} />
        <TopicChatMessageInput roomId={params.id} />
      </div>
    </div>
  );
}

export default TopicChat;
