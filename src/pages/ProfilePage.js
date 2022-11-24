import React from "react";
import Sidebar from "../components/sidebar/Sidebar";
import Profile from "../components/profilePage/Profile";
export function ProfilePage() {
  return (
    <div className="app">
      <Sidebar />
      <Profile />
    </div>
  );
}

export default ProfilePage;
