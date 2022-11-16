import React from "react";
import { chatRooms } from "../../data/chatRooms";
import { Link, useParams } from "react-router-dom";
import {
  collection,
  doc,
  orderBy,
  query,
  onSnapshot,
} from "firebase/firestore";
import db from "../../firebase";
import { useState } from "react";
function Quiz() {
  // ルームの選択 → room/room.idが指定でidごとのルームにルーティング
  // useParamsでurl内のidを取得
  const params = useParams();
  const [rooms, setRooms] = useState([]);

  //  all-room-listのタグ？いや
  // const room = chatRooms.find((x) => x.id === params.id);
  // if (!room) {
  //   // TODO: 404
  // }
  const roomsData = collection(db, "room-list");
  const q = query(roomsData, orderBy("timestamp", "desc"));
  onSnapshot(q, (querySnapshots) => {
    setRooms(querySnapshots.docs.map((doc) => doc.data()));
  });
  const room = rooms.find((x) => x.title === params.id);
  return (
    <div>
      {/* roomのタイトル → data/chatRooms指定*/}
      <div className="quizList">
        <h2 className="quiz_header">{rooms.title}</h2>
        <Link to="/search-rooms">⬅️ Back to all rooms</Link>
      </div>
    </div>
  );
}

export default Quiz;
