import { Link, useParams } from "react-router-dom";
import { chatRooms } from "../../data/chatRooms";
import { MessageInput } from "../MessageInput";
import { MessageList } from "../MessageList";
import "./chat.css";
import React, { useEffect } from "react";
import {
  collection,
  orderBy,
  query,
  onSnapshot,
  getDocs,
  doc,
} from "firebase/firestore";
import db from "../../firebase";
import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import ChatMessageList from "../MessageList/ChatMessageList";
import ChatMessageInput from "../MessageInput/ChatMessageInput";

function Chat() {
  // ルームの選択 → room/room.idが指定でidごとのルームにルーティング
  // useParamsでurl内のidを取得
  const params = useParams();

  // 編集
  const [rooms, setRooms] = useState([]);
  // const [docId, setDocId] = useState([]);
  const [room, setRoom] = useState([]);
  const { user } = useAuth();
  const userInfo = doc(db, "user", `${user.uid}`);

  useEffect(() => {
    // ここで直接ドキュメントidを指定 → urlはテキストに戻してわかりやすk
    const roomList = collection(db, "room-list");
    const q = query(roomList, orderBy("createdAt", "desc"));
    onSnapshot(q, (querySnapshots) => {
      setRooms(querySnapshots.docs.map((doc) => doc.data())); // roomsにはすべてのルームのデータ
    });
  }, []);

  function getRoom() {
    const roomList = collection(db, "room-list");
    const q = query(roomList, orderBy("createdAt", "desc"));

    getDocs(q).then((querySnapshot) => {
      // ここでurl内のid(ルーム名)とroom-listにあるルーム一覧データのtitleが同じものを取り出す → roomにセット
      setRoom(rooms.find((x) => x.title === params.id));
    });
    return room;
  }
  // 上で特定したroomのデータをselectRoomに入れる
  const selectRoom = getRoom();

  return (
    <>
      {console.log("url内のid : ", params.id)}
      <div className="chat">
        <h2 className="chat-header">{selectRoom?.title}</h2>
        <Link to="/rooms">⬅️ Back to all rooms</Link>

        <div className="messages-container">
          {/* そもそもちゃんとpropsを渡せてない */}
          <ChatMessageList roomId={params.id} />
          <ChatMessageInput roomId={params.id} />
        </div>
      </div>
    </>
  );
}

export default Chat;
