/**
ルーム検索画面
→ ユーザーが作成した、ルームを一覧で表示する

TODO
myRoomListにあるものは表示しない or クイズ画面に遷移しない

TODO
・検索機能の実装
・ルーム作成時にタグを作成して条件で絞り込めるように
*/
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useModal } from "react-hooks-use-modal"; // モーダルコンポーネント → ルーム選択後に使用
import { Button } from "@mui/material";
import { collection, query, onSnapshot } from "firebase/firestore";
import db from "../../firebase";
import "./roomList.css";
import "./roomDetail.css";

function RoomList() {
  const [rooms, setRooms] = useState([]);
  const [roomDetails, setRoomDetails] = useState([]);
  let [selectedRoom, setSelectedRoom] = useState([]);
  // ルーム詳細モーダル
  const [Modal, open, close] = useModal("root", {
    components: {
      Modal: ({ title }) => {
        return (
          <div>
            {roomDetails.map((room) =>
              room.title === title ? (
                <div className="modal_roomDetailPage">
                  <div className="modal_roomDetailPage_header">
                    <h1>{title}</h1>
                  </div>
                  <div
                    className="modal_roomDetailPage_headerImage"
                    style={{
                      backgroundImage: `url(${room.icon})`,
                    }}
                  ></div>
                  <div className="modal_roomDetailPage_Detail">
                    <h2>ルーム説明</h2>
                    <p>{room.description}</p>
                    <h2>所属メンバー</h2>
                    <ul>
                      <li key={room.members}>{room.members}</li>
                    </ul>
                    <h2>ルーム作成者</h2>
                    <p>{room.createUser}</p>
                  </div>
                  <div className="select_button">
                    <Button onClick={close}>戻る</Button>
                    <Button>
                      <Link to={`/search-rooms/${room.title}/quiz`}>
                        テストに進む
                      </Link>
                    </Button>
                  </div>
                </div>
              ) : (
                console.log()
              )
            )}
          </div>
        );
      },
    },
    preventScroll: true, // スクロールの有無
  });

  // マウント時に一回だけ読み込み → all-room-listの中身全部持ってこれる
  useEffect(() => {
    const allroomsData = collection(db, "all-room-list");
    const q = query(allroomsData);
    onSnapshot(q, (querySnapshots) => {
      setRooms(querySnapshots.docs.map((doc) => doc.data()));
    });
    getRoomDetail();
  }, []);

  const getRoomDetail = () => {
    const roomDetailData = collection(db, "room-list");
    const q = query(roomDetailData);
    onSnapshot(q, (querySnapshots) => {
      setRoomDetails(querySnapshots.docs.map((doc) => doc.data()));
    });
  };
  const getSelectedRoom = (roomTitle) => {
    setSelectedRoom(roomTitle);
  };
  return (
    <div className="roomList">
      <h2 className="roomList_header">ルームリスト</h2>
      <div className="modal">
        <ul>
          {rooms.map((room) =>
            room.title !== "test" ? ( // 初ログインで作成されるルームはスルーします
              <li
                key={room.roomId}
                onClick={() => {
                  getSelectedRoom(room.title);
                  console.log(selectedRoom);
                  open();
                }}
              >
                {room.title}
              </li>
            ) : // console.log("testはスルー")
            null
          )}
        </ul>
        <Modal title={selectedRoom}></Modal>
      </div>
    </div>
  );
}

export default RoomList;
