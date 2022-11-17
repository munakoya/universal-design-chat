import React, { useEffect } from "react";
import { chatRooms } from "../../data/chatRooms";
import { Link, useParams } from "react-router-dom";
import {
  collection,
  doc,
  orderBy,
  query,
  onSnapshot,
  getDoc,
} from "firebase/firestore";
import db from "../../firebase";
import { useState } from "react";
import "./quiz.css";
function Quiz() {
  // ルームの選択 → room/room.idが指定でidごとのルームにルーティング
  // useParamsでurl内のidを取得
  const params = useParams();
  const [rooms, setRooms] = useState([]);
  const [docId, setDocId] = useState([]);
  const [room, setRoom] = useState([]);
  //  all-room-listのタグ？いや
  // const room = chatRooms.find((x) => x.id === params.id);
  // if (!room) {
  //   // TODO: 404
  // }
  useEffect(() => {
    // ここで直接ドキュメントidを指定 → urlはテキストに戻してわかりやすk
    const roomList = collection(db, "room-list");
    const q = query(roomList, orderBy("createdAt", "desc"));
    onSnapshot(q, (querySnapshots) => {
      setRooms(querySnapshots.docs.map((doc) => doc.data()));
      setDocId(querySnapshots.docs.map((doc) => doc.id));
      setRoom(rooms.find((x) => x.title === params.id));
    });
  }, []);
  // const room = doc(db, "room-list", "4D8Ab5Jd0sUSlrZ3IeUc");
  // const roomSnap = getDoc(room);

  // rooms.titleが違うかな
  // 本当はここでidと同じroomのデータを取得したい ドキュメントIDを変えるかparams.idを変えるか
  // 最初から指定したidのドキュメントにアクセスすればいい
  return (
    <div>
      {/* roomのタイトル → data/chatRooms指定*/}
      <div className="quizList">
        <h2 className="quiz_header">{rooms.title}</h2>
        {/* {room.map((r) =>
          // 似たような感じで出力したファイルあるはず
          console.log(r.quiz)
        )} */}
        {console.log("docId : ", docId)}
        {console.log("rooms : ", rooms)}
        {/* とれてますね */}
        {/* 一旦roomがとれたら、room.~~アクセスできる */}
        {/* マップが使えない */}
        {console.log("room : ", room)}

        <Link to="/search-rooms">⬅️ Back to all rooms</Link>
      </div>
    </div>
  );
}

export default Quiz;
