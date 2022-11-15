import React from "react";
import Sidebar from "../components/sidebar/Sidebar";
import Create from "../components/createRoom/Create";
function CreateRoom() {
  return (
    <div className="app">
      <Sidebar />
      <Create />
    </div>
  );
}

export default CreateRoom;
