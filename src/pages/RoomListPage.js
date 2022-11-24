import React from "react";
import Sidebar from "../components/sidebar/Sidebar";
import { MyRoomList } from "../components/roomListPage/MyRoomList";
export function RoomListPage() {
  return (
    <div className="app">
      <Sidebar />
      <MyRoomList />
    </div>
  );
}

export default RoomListPage;
