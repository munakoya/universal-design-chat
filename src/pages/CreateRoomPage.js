import React from "react";
import Sidebar from "../components/sidebar/Sidebar";
import Create from "../components/createRoomPage/Create";
function CreateRoomPage() {
  return (
    <div className="app">
      <Sidebar />
      <Create />
    </div>
  );
}

export default CreateRoomPage;
