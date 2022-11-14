import React from "react";
import Sidebar from "../components/sidebar/Sidebar";
import Appguidance from "../components/tag/Appguidance";
// import TagList from "../components/tag/TagList";

export function Tag() {
  return (
    <div className="app">
      <Sidebar />
      {/* <TagList /> */}
      <Appguidance />
    </div>
  );
}

export default Tag;
