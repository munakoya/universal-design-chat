import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import {
  collection,
  orderBy,
  query,
  onSnapshot,
  getDocs,
  doc,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
import db from "../../firebase";
import { useState } from "react";
import "./quiz.css";
import { Button } from "@mui/material";
import { useAuth } from "../../hooks/useAuth";
function Quiz() {
  // ルームの選択 → room/room.idが指定でidごとのルームにルーティング
  // useParamsでurl内のidを取得
  const params = useParams();
  const [rooms, setRooms] = useState([]);
  // const [docId, setDocId] = useState([]);
  const [room, setRoom] = useState([]);

  const [ans1, setAns1] = useState("");
  const [ans2, setAns2] = useState("");
  const [ans3, setAns3] = useState("");
  const [ans4, setAns4] = useState("");
  const [ans5, setAns5] = useState("");

  const { user } = useAuth();
  const userInfo = doc(db, "user", `${user.uid}`);

  useEffect(() => {
    // ここで直接ドキュメントidを指定 → urlはテキストに戻してわかりやすk
    const roomList = collection(db, "room-list");
    const q = query(roomList, orderBy("createdAt", "desc"));
    onSnapshot(q, (querySnapshots) => {
      setRooms(querySnapshots.docs.map((doc) => doc.data())); // roomsにはすべてのルームのデータ
      // setDocId(querySnapshots.docs.map((doc) => doc.id)); // すべてのルームのドキュメントID
    });
  }, []);

  function getRoom() {
    const roomList = collection(db, "room-list");
    const q = query(roomList, orderBy("createdAt", "desc"));

    getDocs(q).then((querySnapshot) => {
      // ここでurl内のid(ルーム名)とroom-listにあるルーム一覧データのtitleが同じものを取り出す → roomにセット
      setRoom(rooms.find((x) => x.title === params.id));
    });
    // onSnapshot(q, (querySnapshots) => {
    //   setRoom(rooms.find((x) => x.title === params.id));
    // });
    return room;
  }
  async function quizScore() {
    let score = 0;
    if (ans1 === selectRoom.quiz[0].answer) {
      score++;
    }
    if (ans2 === selectRoom.quiz[1].answer) {
      score++;
    }
    if (ans3 === selectRoom.quiz[2].answer) {
      score++;
    }
    if (ans4 === selectRoom.quiz[3].answer) {
      score++;
    }
    if (ans5 === selectRoom.quiz[4].answer) {
      score++;
    }

    // scoreを登録したい
    if (score >= 4) {
      await updateDoc(userInfo, {
        myRoomList: arrayUnion(selectRoom.title),
      });
      console.log("合格");
    } else {
      console.log("不合格");
    }
    return console.log("得点 : ", score);
  }

  // 上で特定したroomのデータをselectRoomに入れる
  const selectRoom = getRoom();
  return (
    <div>
      <Link to="/search-rooms">⬅️ Back to all rooms</Link>

      <div className="quizList">
        {/* selectRoom? ~~~でエラー吐かずにアクセス可 */}
        {<h2 className="quiz_header">{selectRoom?.title}</h2>}
        {/* はてなをつけると出力できます */}
        {selectRoom?.quiz?.map((value, index) => {
          // 構造的な問題でした
          return (
            <div>
              <p key={value.question}>
                {`Q.${index + 1} : `}
                {value.question}
              </p>
            </div>
          );
        })}
      </div>
      {/* 本当はcreateでmap型配列にクイズを追加していってプロパティを名揃えたい */}
      <div className="ansInput">
        <input
          value={ans1}
          placeholder="Q1"
          type="text"
          onChange={(e) => setAns1(e.target.value)}
        ></input>
        <input
          value={ans2}
          placeholder="Q2"
          type="text"
          onChange={(e) => setAns2(e.target.value)}
        ></input>
        <input
          value={ans3}
          placeholder="Q3"
          type="text"
          onChange={(e) => setAns3(e.target.value)}
        ></input>
        <input
          value={ans4}
          placeholder="Q4"
          type="text"
          onChange={(e) => setAns4(e.target.value)}
        ></input>
        <input
          value={ans5}
          placeholder="Q5"
          type="text"
          onChange={(e) => setAns5(e.target.value)}
        ></input>
      </div>
      <Button className="quiz_score_Button" type="submit" onClick={quizScore}>
        <Link to={`/search-rooms/${selectRoom?.title}/quiz/score`}>採点</Link>
      </Button>
    </div>
  );
}

export default Quiz;
