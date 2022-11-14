import React from "react";
import Sidebar from "../components/sidebar/Sidebar";
// import RoomList from "../components/room/RoomList";
import { Landing } from "../components/Landing";
// import { ChatRoom } from "../components/ChatRoom";
export function Room() {
  return (
    <div className="app">
      <Sidebar />
      <Landing />
      {/* <ChatRoom /> */}
    </div>
  );
}

export default Room;
