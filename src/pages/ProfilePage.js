/**
 * ユーザー情報を表示する
 */
import React from "react";
import Sidebar from "../components/sidebar/Sidebar";
import Profile from "../components/profilePage/Profile";
import "../App.css";
import Settings from "../components/profilePage/Settings";
export function ProfilePage() {
  return (
    <div className="app">
      <Sidebar />
      <Profile />
      <Settings />
    </div>
  );
}

export default ProfilePage;
