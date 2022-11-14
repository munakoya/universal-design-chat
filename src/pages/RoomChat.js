import React from "react";
import { ChatRoom } from "../components/ChatRoom";
import { Landing } from "../components/Landing";
import Sidebar from "../components/sidebar/Sidebar";

function RoomChat() {
  return (
    <div className="app">
      <Sidebar />
      <Landing />
      <ChatRoom />
    </div>
  );
}

export default RoomChat;
