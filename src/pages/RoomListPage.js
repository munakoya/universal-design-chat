import React from "react";
import Sidebar from "../components/sidebar/Sidebar";
import { MyRoomList } from "../components/roomListPage/MyRoomList";
import "../App.css";
export function RoomListPage() {
  return (
    <div className="app">
      <Sidebar />
      <MyRoomList />
    </div>
  );
}

export default RoomListPage;
