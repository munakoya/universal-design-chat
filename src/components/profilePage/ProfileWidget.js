import { Html, Search } from "@mui/icons-material";
import { addDoc, collection, doc, setDoc, updateDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import App from "../../App";
import db from "../../firebase";
import { useAuth } from "../../hooks/useAuth";

// twitterのライブラリ
// import {
//   TwitterTimelineEmbed,
//   TwitterShareButton,
//   TwitterTweetEmbed,
// } from "react-twitter-embed";
import "./profileWidget.css";

function ProfileWidgets() {
  const { user } = useAuth();
  let [selectColor2, setSelectColor2] = useState("#e6ecf0");
  async function changeColor(color) {
    setSelectColor2(color);
    try {
      console.log("追加します");
      await updateDoc(doc(db, "user", `${user.uid}`), {
        selectedColor2: color,
      });
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div
      className="widgets_widgetContainer"
      // style={{ backgroundColor: selectColor }}
    >
      <div className="widgets_widgetContainer_header">
        <h2>設定</h2>
        <p>背景色変更ボタン</p>
        <br />
      </div>

      <button
        className="back__color1"
        value="#000"
        onClick={(e) => changeColor(e.target.value)}
      >
        黒色
      </button>

      <button
        className="back__color2"
        value="#F4D21F"
        onClick={(e) => changeColor(e.target.value)}
      >
        オレンジ色
      </button>

      <button
        className="back__color3"
        value="#E8FFD1"
        onClick={(e) => changeColor(e.target.value)}
      >
        黄緑
      </button>

      <button
        className="back__color4"
        value="#3754B1"
        onClick={(e) => changeColor(e.target.value)}
      >
        青色
      </button>

      <button
        className="back__color5"
        value="#FDE1E9"
        onClick={(e) => changeColor(e.target.value)}
      >
        ピンク色
      </button>

      <button
        className="back__color6"
        value="#646566"
        onClick={(e) => changeColor(e.target.value)}
      >
        灰色
      </button>

      <button
        className="back__color7"
        value="#8731AD"
        onClick={(e) => changeColor(e.target.value)}
      >
        紫色
      </button>

      <button
        className="back__color8"
        value="#fff"
        onClick={(e) => changeColor(e.target.value)}
      >
        白色
      </button>
    </div>
  );
}

export default ProfileWidgets;
