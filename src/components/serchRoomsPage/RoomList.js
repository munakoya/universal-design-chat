/**
ルーム検索画面
→ ユーザーが作成した、ルームを一覧で表示する

TODO
・検索機能の実装
*/
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { collection, query, onSnapshot } from "firebase/firestore";
import db from "../../firebase";
import "./roomList.css";

function RoomList() {
  const [rooms, setRooms] = useState([]);

  // マウント時に一回だけ読み込み → all-room-listの中身全部持ってこれる
  useEffect(() => {
    const allroomsData = collection(db, "all-room-list");
    const q = query(allroomsData);
    onSnapshot(q, (querySnapshots) => {
      setRooms(querySnapshots.docs.map((doc) => doc.data()));
    });
  }, []);
  return (
    <div className="roomList">
      <div className="allRooms">
        <h2 className="roomList_header">Room List</h2>
        <ul>
          {/* urlにtitleを埋め込んでルーム指定 → propsだとうまくいかない */}
          {rooms.map((room) => (
            <li key={room.roomId}>
              <Link to={`/search-rooms/${room.title}/quiz`}>{room.title}</Link>
            </li>
          ))}
        </ul>
        {/* ルーム作成機能を最下部に置くのはux的に良くない → サイドバーの最下部のボタンに新規ルーム作成ってしてもいいかも */}
        <p>
          <Link to={"/create-room"}>新規ルーム作成</Link>
        </p>
      </div>
    </div>
  );
}

export default RoomList;
