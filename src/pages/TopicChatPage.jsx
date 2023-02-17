/*
MyRoomListで選択したルームのチャット画面に遷移する
→ タイムライン + チャット画面にしたい
*/

import React from "react";
import Sidebar from "../components/sidebar/Sidebar";
import "../App.css";
import RoomTimeLine from "../components/chatRoomPage/timeline/RoomTimeLine";
import TopicChat from "../components/chatRoomPage/topic/TopicChat";
function ChatRoomPage() {
  return (
    <div className="app">
      <Sidebar />
      {/* 新しいcompornent作成する → RoomTimeLine */}
      <RoomTimeLine />
      <TopicChat />
    </div>
  );
}

export default ChatRoomPage;
