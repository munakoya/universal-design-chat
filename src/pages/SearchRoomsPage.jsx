/**
ルーム検索画面
TODO 
・検索機能作成
・UIの修正 → 画面遷移
→ ルーム選択 → ルーム詳細画面に遷移 → クイズを解く → クイズ回答画面
*/
import React from "react";
import Sidebar from "../components/sidebar/Sidebar";
import RoomList from "../components/serchRoomsPage/RoomList";
import "../App.css";
import Widgets from "../components/homePage/widget/Widgets";
function SerchRoomsPage() {
  return (
    <div className="app">
      <Sidebar />
      <RoomList />
      <Widgets />
    </div>
  );
}

export default SerchRoomsPage;
