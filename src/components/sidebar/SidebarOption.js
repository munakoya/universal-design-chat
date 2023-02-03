/**
Sidebarの個々の要素のコンポーネント
→ SidebarOption

TODO
・propsで渡されるactive → 自分が今いるページのときにactiveを渡したい
現状 : ホームをクリック → propsでactiveが引き渡される → sidebarOption--activeになる

・人目でログイン中のアカウントがわかるようにudcアイコン部分をアカウント情報に変更したい
 */
import React from "react";
import "./SidebarOption.css";

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
