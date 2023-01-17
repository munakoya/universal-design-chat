import { Search } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
// twitterのライブラリ
// import {
//   TwitterTimelineEmbed,
//   TwitterShareButton,
//   TwitterTweetEmbed,
// } from "react-twitter-embed";
import "./Widgets.css";
import {
  collection,
  doc,
  getDoc,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import db from "../../../firebase";

function Widgets() {
  let roomMembers = [];

  // ルーム取得
  const [rooms, setRooms] = useState([]);
  async function getRoomList() {
    // すべてのルームデータをroomsに → roomsから選択されたルームと一致するものをroomに
    const roomList = collection(db, "room-list");
    const q = query(roomList, orderBy("createdAt", "desc"));
    onSnapshot(q, (querySnapshots) => {
      setRooms(querySnapshots.docs.map((doc) => doc.data()));
    });
  }

  // 人気ルーム取得
  // async function getPopularRoom() {
  //   rooms.map((room) => {
  //     len(room.members)
  //   })
  // }

  useEffect(() => {
    getRoomList();
  }, []);

  function compareFunc(a, b) {
    return b.members - a.members;
  }

  return (
    // 基本classNameはcssのときに使います。css当てるのが楽になるだけなのでそこまで気にしなくておk
    <div className="widgets">
      <div className="widgets_input">
        <Search className="widgets_searchicon" />
        <input placeholder="キーワード検索" type="text" />
      </div>
      <div className="widgets_widgetContainer">
        <h2>人気ルーム</h2>
        {/* タイムラインを取得 */}
        {/* <TwitterTimelineEmbed
          sourceType="profile"
          // どの人のタイムラインか
          screenName="SoccerKingJP"
          options={{ height: 450 }}
        /> */}
        {/* <TwitterShareButton
          url={"https://twitter.com/SoccerKingJP"}
          options={{ text: "#W杯", via: "SoccerKingJP" }}
        /> */}
        {/* ライブラリを追加 → 使い方はtwitter-tweetEmbed調べて*/}
        {/* <TwitterTweetEmbed
          tweetId={"1588924861279539200"}
          options={{ height: 400 }}
        /> */}

        {/* 人気ルームなど表示 */}
        {/* 配列に追加していって大きければ、roomのidメモっておく */}
        {rooms.map((room) => {
          roomMembers.push({
            roomTitle: room.title,
            members: room.members.length,
          });
          // 降順にソート
          roomMembers.sort(compareFunc);
        })}
        {roomMembers.map((room, index) => {
          // 上位10ルーム出力
          if (index < 10) {
            return (
              <div className="roomRank">
                <p className="no">
                  {index + 1}. {room.roomTitle}
                </p>
              </div>
            );
          }
        })}
      </div>
      <div className="widgets_widgetContainer">
        <h2>なんかしらの項目足す予定 ↑ 上位10ルーム出力されます</h2>
      </div>
    </div>
  );
}

export default Widgets;
