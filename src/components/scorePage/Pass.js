/**
 * 4点以上で合格
 * → Passコンポーネント出力
 *
 * TODO
 * 入室ボタン
 */

import { async } from "@firebase/util";
import { Button } from "@mui/material";
import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import db from "../../firebase";

function Pass() {
  const [rooms, setRooms] = useState([]);
  const params = useParams();
  // マウント時に一回だけ読み込み
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
