import React, { useEffect, useState } from "react";
import { chatRooms } from "../../data/chatRooms";
import { Link } from "react-router-dom";
import { collection, query, onSnapshot } from "firebase/firestore";
import db from "../../firebase";
import "./roomList.css";

function RoomList() {
  const [rooms, setRooms] = useState([]);
  const [docId, setDocId] = useState("");

  // マウント時に一回だけ読み込み → room-listの中身全部持ってこれる
  useEffect(() => {
    const allroomsData = collection(db, "all-room-list");
    const q = query(allroomsData);
    onSnapshot(q, (querySnapshots) => {
      setRooms(querySnapshots.docs.map((doc) => doc.data()));
    });
    // ドキュメントidを取得するため
    const roomsData = collection(db, "room-list");
    const qq = query(roomsData);
    onSnapshot(qq, (querySnapshots) => {
      setDocId(querySnapshots.docs.map((doc) => doc.data()));
    });
  }, []);
  return (
    <div className="roomList">
      <div className="allRooms">
        <h2>Room List</h2>
        <ul>
          {/* chatRoomsからroomをすべて取り出してリスト表示 */}
          {/* {chatRooms.map((room) => (
            <li key={room.id}> */}
          {/* room.title表示でクリック → Link room/room.idでそれぞれのルームに飛べる */}
          {/* <Link to={`/search-rooms/${room.id}/quiz`}>{room.title}</Link>
            </li>
          ))} */}
          {/* room-listからroomをすべて取り出して表示したい */}
          {rooms.map((room) => (
            <li key={room.roomId}>
              {/* ここをドキュメントidに変えられれば */}
              <Link to={`/search-rooms/${room.title}/quiz`}>{room.title}</Link>
            </li>
          ))}
        </ul>
        <p>
          <Link to={"/create-room"}>新規ルーム作成</Link>
        </p>
      </div>
    </div>
  );
}

export default RoomList;
