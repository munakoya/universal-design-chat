/**
 * 4点以上で合格
 * → Passコンポーネント出力
 */

import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Button } from "@mui/material";
import { collection, onSnapshot, query } from "firebase/firestore";
import db from "../../firebase";

function Pass() {
  const [rooms, setRooms] = useState([]);
  const params = useParams();
  useEffect(() => {
    const roomData = collection(db, "room-list");
    const q = query(roomData);
    onSnapshot(q, (querySnapshots) => {
      // リアルタイムにデータ取得
      setRooms(querySnapshots.docs.map((doc) => doc.data()));
    });
  }, []);

  return (
    <div className="pass">
      {console.log("rooms : ", rooms)}
      <h2 className="pass_header">おめでとうございます！合格です🌸🌸</h2>
      <div className="roomInfo">
        {rooms.map((room) => {
          if (room.title === params.id) {
            return (
              <div>
                <div className="roomInfo_title">
                  <h2>{room.title}</h2>
                </div>
                <div
                  className="roomInfo_img"
                  style={{
                    backgroundImage: `url(${room.icon})`,
                  }}
                ></div>
                <div className="roomInfo_description">
                  <h2>ルーム説明</h2>
                  <p>{room.description}</p>
                  <h2>ルーム作成者</h2>
                  <p>{room.createUser}</p>
                </div>

                <div className="room_enteringButton">
                  <Button>
                    <Link to={`/room/${params.id}/chat-room`}>
                      ルームに入室
                    </Link>
                  </Button>
                </div>
              </div>
            );
          }
        })}
      </div>
    </div>
  );
}

export default Pass;
