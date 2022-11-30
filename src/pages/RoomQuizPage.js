/**
 * 選択したルームのクイズを出力する
 */
import React from "react";
import Sidebar from "../components/sidebar/Sidebar";
import Quiz from "../components/roomQuizPage/Quiz";
import "../App.css";
function RoomQuizPage() {
  return (
    <div className="app">
      <Sidebar />
      <Quiz />
    </div>
  );
}

export default RoomQuizPage;
