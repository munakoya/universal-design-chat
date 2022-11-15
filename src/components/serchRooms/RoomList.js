import React from "react";
import { chatRooms } from "../../data/chatRooms";
import { Link } from "react-router-dom";
function RoomList() {
  return (
    <div className="roomList">
      <div className="allRooms">
        <h2 className="header-roomList">Room List</h2>
        <ul className="chat-room-list">
          {/* chatRoomsからroomをすべて取り出してリスト表示 */}
          {chatRooms.map((room) => (
            <li key={room.id}>
              {/* room.title表示でクリック → Link room/room.idでそれぞれのルームに飛べる */}
              <Link to={`/search-rooms/${room.id}/quiz`}>{room.title}</Link>
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
