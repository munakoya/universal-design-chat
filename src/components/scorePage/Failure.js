/**
 * 3点以下の場合に出力
 * Failureコンポーネント
 */
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Button } from "@mui/material";
import { collection, onSnapshot, query } from "firebase/firestore";
import db from "../../firebase";

function Failure() {
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
    <div className="failure">
      <div className="failure_header">
        <h2>残念！！！不合格です(T_T)</h2>
      </div>
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

                <div className="room_retry">
                  <Button>
                    <Link to={`/search-rooms/${params.id}/quiz`}>
                      もう一度解く！
                    </Link>
                  </Button>
                </div>
                <div className="room_list">
                  <Button>
                    <Link to={"/search-rooms"}>ルーム一覧に戻る</Link>
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

export default Failure;
