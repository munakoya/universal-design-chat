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
  getDocs,
} from "firebase/firestore";
import db from "../../firebase";
import { useState } from "react";
import "./quiz.css";
import { async } from "@firebase/util";
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
    });
  }, []);

  function getRoom() {
    const roomList = collection(db, "room-list");
    const q = query(roomList, orderBy("createdAt", "desc"));

    getDocs(q).then((querySnapshot) => {
      setRoom(rooms.find((x) => x.title === params.id));
    });
    // onSnapshot(q, (querySnapshots) => {
    //   setRoom(rooms.find((x) => x.title === params.id));
    // });
    return room;
  }

  const selectRoom = getRoom();

  // const room = doc(db, "room-list", "4D8Ab5Jd0sUSlrZ3IeUc");
  // const roomSnap = getDoc(room);

  // rooms.titleが違うかな
  // 本当はここでidと同じroomのデータを取得したい ドキュメントIDを変えるかparams.idを変えるか
  // 最初から指定したidのドキュメントにアクセスすればいい
  return (
    <div>
      {/* roomのタイトル → data/chatRooms指定*/}
      <div className="quizList">
        {/* これ挟まないとエラー */}
        {selectRoom ? (
          <h2 className="quiz_header">{selectRoom.title}</h2>
        ) : (
          console.log("no select")
        )}
        {/* {room.map((r) =>
          // 似たような感じで出力したファイルあるはず
          console.log(r.quiz)
        )} */}
        {console.log("docId : ", docId)}
        {console.log("rooms : ", rooms)}
        {/* とれてますね */}
        {/* 一旦roomがとれたら、room.~~アクセスできる */}
        {/* マップが使えない */}
        {/* あとからアクセスで */}
        {console.log("指定したルーム", selectRoom)}
        {/* はてなをつけると出力できます */}
        {selectRoom?.quiz?.map((value) => {
          // 構造的な問題でした
          return <p>{value.question}</p>;
        })}

        <Link to="/search-rooms">⬅️ Back to all rooms</Link>
      </div>
    </div>
  );
}

export default Quiz;
