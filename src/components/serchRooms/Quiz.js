import React from "react";
import { chatRooms } from "../../data/chatRooms";
import { Link, useParams } from "react-router-dom";

function Quiz() {
  // ルームの選択 → room/room.idが指定でidごとのルームにルーティング
  // useParamsでurl内のidを取得
  const params = useParams();
  // chatRoomsのデータを取得
  const room = chatRooms.find((x) => x.id === params.id);
  if (!room) {
    // TODO: 404
  }
  return (
    <div>
      {/* roomのタイトル → data/chatRooms指定*/}
      <div className="quizList">
        <h2 className="quiz_header">{room.title}</h2>
        <Link to="/search-rooms">⬅️ Back to all rooms</Link>
      </div>
    </div>
  );
}

export default Quiz;
