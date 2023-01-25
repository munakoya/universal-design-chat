import { Html, Search } from "@mui/icons-material";
import React, { useEffect, useState } from "react";

// twitterのライブラリ
// import {
//   TwitterTimelineEmbed,
//   TwitterShareButton,
//   TwitterTweetEmbed,
// } from "react-twitter-embed";
import "./profileWidget.css";

function ProfileWidgets() {
  return (
    <div className="widgets_widgetContainer">
      <div className="widgets_widgetContainer_header">
        <h2>設定</h2>
        <p>背景色変更ボタン</p>
        <br />
      </div>

      <button className="back__color1">黒色</button>

      <button className="back__color2">オレンジ色</button>

      <button className="back__color3">黄緑</button>

      <button className="back__color4">青色</button>

      <button className="back__color5">ピンク色</button>

      <button className="back__color6">灰色</button>

      <button className="back__color7">紫色</button>

      <button className="back__color8">白色</button>
    </div>
  );
}

export default ProfileWidgets;
