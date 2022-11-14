import React from "react";
import "./SidebarOption.css";
// {でpropsを受け取る}
function SidebarOption({ text, Icon, active }) {
  return (
    // && 左が存在するならば右 → cssの指定
    <div className={`sidebarOption ${active && "sidebarOption--active"}`}>
      <Icon />
      <h2>{text}</h2>
    </div>
  );
}

export default SidebarOption;
