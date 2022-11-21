import React from "react";
import { Landing } from "../components/Landing";
import Sidebar from "../components/sidebar/Sidebar";
import Chat from "../components/ChatRoom/Chat";
function ChatRoomPage() {
  return (
    <div className="app">
      <Sidebar />
      <Landing />
      <Chat />
    </div>
  );
}

export default ChatRoomPage;
