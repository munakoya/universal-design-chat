import React from "react";
import Sidebar from "../components/sidebar/Sidebar";
import RoomList from "../components/serchRooms/RoomList";
function SerchRooms() {
  return (
    <div className="app">
      <Sidebar />
      <RoomList />
    </div>
  );
}

export default SerchRooms;
