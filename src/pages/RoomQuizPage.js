import React from "react";
import Sidebar from "../components/sidebar/Sidebar";
import Quiz from "../components/roomQuizPage/Quiz";
function RoomQuizPage() {
  return (
    <div className="app">
      <Sidebar />
      <Quiz />
    </div>
  );
}

export default RoomQuizPage;
