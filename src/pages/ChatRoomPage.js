import React from "react";
import { MyRoomList } from "../components/roomListPage/MyRoomList";
import Sidebar from "../components/sidebar/Sidebar";
import Chat from "../components/chatRoomPage/Chat";
import "../App.css";
function ChatRoomPage() {
  return (
    <div className="app">
      <Sidebar />
      <MyRoomList />
      <Chat />
    </div>
  );
}

export default ChatRoomPage;
