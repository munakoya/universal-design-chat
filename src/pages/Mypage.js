import React from "react";
import Sidebar from "../components/sidebar/Sidebar";
import Profile from "../components/profile/Profile";
export function Mypage() {
  return (
    <div className="app">
      <Sidebar />
      <Profile />
    </div>
  );
}

export default Mypage;
