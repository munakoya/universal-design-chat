/*
MyRoomListで選択したルームのチャット画面に遷移する
→ タイムライン + チャット画面にしたい
*/

import React from "react";
import Sidebar from "../components/sidebar/Sidebar";
import Chat from "../components/chatRoomPage/Chat";
import "../App.css";
import RoomTimeLine from "../components/chatRoomPage/timeline/RoomTimeLine";
function ChatRoomPage() {
  return (
    <div className="app">
      <Sidebar />
      {/* 新しいcompornent作成する → RoomTimeLine */}
      <RoomTimeLine />
      <Chat />
    </div>
  );
}

export default ChatRoomPage;
