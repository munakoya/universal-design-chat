import React from "react";
import Sidebar from "../components/sidebar/Sidebar";
import Quiz from "../components/serchRooms/Quiz";
import RoomList from "../components/serchRooms/RoomList";
function RoomQuiz() {
  return (
    <div className="app">
      <Sidebar />
      <Quiz />
    </div>
  );
}

export default RoomQuiz;
