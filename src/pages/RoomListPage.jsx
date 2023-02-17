/*
RoomListPage.js
→ 自分の保持しているルーム 
*/

import React from "react";
import Sidebar from "../components/sidebar/Sidebar";
import { MyRoomList } from "../components/roomListPage/MyRoomList";
import Widgets from "../components/homePage/widget/Widgets";

import "../App.css";
export function RoomListPage() {
  return (
    <div className="app">
      <Sidebar />
      <MyRoomList />
      <Widgets />
    </div>
  );
}

export default RoomListPage;
