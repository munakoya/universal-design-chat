import { Search } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
// twitterのライブラリ
// import {
//   TwitterTimelineEmbed,
//   TwitterShareButton,
//   TwitterTweetEmbed,
// } from "react-twitter-embed";
import "./profileWidget.css";
import {
  collection,
  doc,
  getDoc,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import db from "../../firebase";

function ProfileWidgets() {
  let roomMembers = [];
  let [searchKeyword, setSearchKeyword] = useState("");

  // ルーム取得
  const [rooms, setRooms] = useState([]);
  let [searchRooms, setSearchRooms] = useState([]);
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

  // キーワード検索時にウィジェット追加
  function searchRoom() {
    // 文字列を調べる
    const SearchRoomList = collection(db, "all-room-array");
    const q = query(
      SearchRoomList,
      // キーワードが含まれる配列を返しているだけなのですべて出力される → あんまし使ってる意味は無いかも
      where("rooms", "array-contains", `${searchKeyword}`)
    );
    onSnapshot(q, (querySnapshots) => {
      setSearchRooms(querySnapshots.docs.map((doc) => doc.data()));
    });

    // 検索欄に文字が入ったら
    return (
      <div className="widgets_widgetContainer">
        <h2>検索結果</h2>
        {searchRooms.map((roomArray) => {
          // firestore db, all-room-array, all-room,rooms
          return roomArray.rooms.map((room) => {
            if (room.indexOf(`${searchKeyword}`)) {
            } else {
              return <li>{room}</li>;
            }
          });
        })}
      </div>
    );
  }

  return (
    // 基本classNameはcssのときに使います。css当てるのが楽になるだけなのでそこまで気にしなくておk
    <div className="widgets">
      <div className="widgets_input">
        <Search className="widgets_searchicon" />
        <input
          placeholder="キーワード検索"
          type="text"
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
        />
      </div>
      {searchKeyword ? searchRoom() : console.log("keyword入ってません")}
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

        {/* 検索欄に文字が入ったら当てはまるものを表示 */}

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
        <h2>aaa↑ 上位10ルーム出力されます</h2>
      </div>
    </div>
  );
}

export default ProfileWidgets;
