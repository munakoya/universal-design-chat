import React from "react";
import Sidebar from "../components/sidebar/Sidebar";
import RoomList from "../components/serchRoomsPage/RoomList";
import "../App.css";
function SerchRoomsPage() {
  return (
    <div className="app">
      <Sidebar />
      <RoomList />
    </div>
  );
}

export default SerchRoomsPage;
