/**
 * ルームの新規作成ページ
 */
import React from "react";
import Sidebar from "../components/sidebar/Sidebar";
import Create from "../components/createRoomPage/Create";
import "../App.css";
function CreateRoomPage() {
  return (
    <div className="app">
      <Sidebar />
      <Create />
    </div>
  );
}

export default CreateRoomPage;
