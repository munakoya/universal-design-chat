import React from "react";
import Sidebar from "../components/sidebar/Sidebar";
import Timeline from "../components/timeline/Timeline";
import Widgets from "../components/widget/Widgets";
import "../App.css";
// ルーティングで表示されるページはexportする
export function Home() {
  return (
    // pagesフォルダにあるpageファイルはなるべくPageをファイル名につけたい
    // ex) HomePage.jsにしたい → 人目でpageファイルだとわかるように
    <div className="app">
      {/* sidebar */}
      <Sidebar />
      {/* timeline */}
      <Timeline />
      {/* widget */}
      <Widgets />
    </div>
  );
}

export default Home;
