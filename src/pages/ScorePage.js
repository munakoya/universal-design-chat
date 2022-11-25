import React from "react";
import Sidebar from "../components/sidebar/Sidebar";
import Score from "../components/scorePage/Score";
import "../App.css";
function ScorePage() {
  return (
    <div className="app">
      <Sidebar />
      <Score />
    </div>
  );
}

export default ScorePage;
