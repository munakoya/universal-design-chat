/*
MyRoomListで選択されたルームのチャット画面を表示する
→ urlのルーム名で遷移
TODO
ルームのidをurlから取得って微妙かも
→ 入室処理していないルームもidをurlに入力すれば入室できてしまう。urlから取得が良くないかも
ワンちゃんセキュリティルールの設定でアクセス不可にすれば所属ルームしか取得できないかも

画面いっぱいに表示させたいけど、多分右側が切れてる
→ overflow-x : hiddenにするとx軸方向は固定されるけど、その分右側が見切れている

urlはそのままでセキュリティルールを編集して登録済みのルームのみアクセス可能にする

チャット → 話題からにしたい
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
import db from "../../firebase";
// import { useAuth } from "../../hooks/useAuth";
import { Link, useParams } from "react-router-dom";
import ChatMessageList from "./MessageList/ChatMessageList";
import ChatMessageInput from "./MessageInput/ChatMessageInput";
import "./chat.css";

function Chat() {
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

  // すべてのルームデータから選択されたルームデータを取得する → roomに入る
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
    <div className="chat">
      {console.log("url内のid : ", params.id)}
      <h2 className="chat_header">{selectRoom?.title}</h2>
      <Link to="/rooms">⬅️ Back to all rooms</Link>

      <div className="messages_container">
        {/* そもそもちゃんとpropsを渡せてない → urlで渡したくないならpropsだけど渡せない */}
        <ChatMessageList roomId={params.id} />
        <ChatMessageInput roomId={params.id} />
      </div>
    </div>
  );
}

export default Chat;
