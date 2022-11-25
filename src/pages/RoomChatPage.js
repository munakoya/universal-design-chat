import React from "react";
import { ChatRoom } from "../components/chatRoomPage";
import { MyRoomList } from "../components/roomListPage/MyRoomList";
import Sidebar from "../components/sidebar/Sidebar";
import "../App.css";

// これは使わないかもです
function RoomChatPage() {
  return (
    <div className="app">
      <Sidebar />
      <MyRoomList />
      <ChatRoom />
    </div>
  );
}

export default RoomChatPage;
