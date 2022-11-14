import React from "react";
import Sidebar from "../components/sidebar/Sidebar";
// import RoomList from "../components/room/RoomList";
import RMCP from "../components/room/RMCP";
export function Room() {
  return (
    <div className="app">
      <Sidebar />
      <RMCP />
    </div>
  );
}

export default Room;
