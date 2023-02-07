/*
Quizコンポーネント
RoomList.js → 検索タブで選択されたルームのクイズ情報を出力する

TODO
クイズの形式を4択に変える
クイズの出力の仕方
ルーム選択 → 詳細画面 → 問題 と 解答(4 : 4)
*/
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
  arrayRemove,
} from "firebase/firestore";
import db from "../../firebase";
import { useState } from "react";
import "./quiz.css";
import { Button } from "@mui/material";
import { useAuth } from "../../hooks/useAuth";

function Quiz() {
  // urlからroomIDを取得して、クイズ情報を読み込む → 本当は関数にしたい
  const params = useParams();
  const [rooms, setRooms] = useState([]);
  const [room, setRoom] = useState([]);
  const [usersData, setUsersData] = useState([]);
  const [userData, setUserData] = useState([]);

  const [ans1, setAns1] = useState("");
  const [ans2, setAns2] = useState("");
  const [ans3, setAns3] = useState("");
  const [ans4, setAns4] = useState("");
  const [ans5, setAns5] = useState("");

  let score = 0;

  // const { user } = useAuth();
  // セッション管理してリロード時のstateリセットによるログインページに遷移しないように
  const auth_user = JSON.parse(sessionStorage.getItem("AUTH_USER"));
  const userInfo = doc(db, "user", `${auth_user.uid}`);
  useEffect(() => {
    // すべてのルームデータをroomsに → roomsから選択されたルームと一致するものをroomに
    const roomList = collection(db, "room-list");
    const q = query(roomList, orderBy("createdAt", "desc"));
    onSnapshot(q, (querySnapshots) => {
      setRooms(querySnapshots.docs.map((doc) => doc.data()));
    });
    // すべてのuserデータをusersに → usersから選択されたユーザーデータと一致するものをuserDataに
    const userList = collection(db, "user");
    const qq = query(userList);
    onSnapshot(qq, (querySnapshots) => {
      setUsersData(querySnapshots.docs.map((doc) => doc.data()));
    });
  }, []);

  // roomsからurl内のroomId(params.id)と同じroomを取り出す
  function getRoom() {
    const roomList = collection(db, "room-list");
    const q = query(roomList, orderBy("createdAt", "desc"));

    getDocs(q).then((querySnapshot) => {
      // ここでurl内のid(ルーム名)とroom-listにあるルーム一覧データのtitleが同じものを取り出す → roomにセット
      setRoom(rooms.find((x) => x.title === params.id));
    });
    return room;
  }

  // ログイン中のuserデータを取得
  function getUser() {
    const userList = collection(db, "user");
    const qq = query(userList);
    getDocs(qq).then((querySnapshot) => {
      setUserData(usersData.find((x) => x.uid === auth_user.uid));
    });
    return userData;
  }

  // クイズ初回答時にmyRoomScoreを登録
  function registerScore() {
    updateDoc(userInfo, {
      myRoomScore: arrayUnion({ title: selectRoom.title, score: score }),
    });
  }

  //
  function checkMyRoomScore() {
    let checkCount = 0;
    let index = 0;
    // myRoomScoreをmapで一つ一つ調べる
    for (let myScore of selectUser?.myRoomScore) {
      // 以前不合格で再受験 → 合格
      if (myScore.title === params.id) {
        // 不合格の点数 かつ 今回合格
        if (myScore.score <= 3 && score >= 4) {
          // 更新(削除)
          updateDoc(userInfo, {
            myRoomScore: arrayRemove({
              title: myScore.title,
              score: myScore.score,
            }),
          });
          // 更新(追加)
          updateDoc(userInfo, {
            myRoomScore: arrayUnion({ title: selectRoom.title, score: score }),
          });
        }
        checkCount = 0;
        break;
      } else {
        checkCount = 1;
      }
    }

    // 初受験
    checkCount === 1
      ? registerScore()
      : console.log(`check : ${checkCount} | 受験済み`);
  }

  // 合否判定、登録
  async function judgeScorePass() {
    const roomInfo = doc(db, "room-list", `${selectRoom?.roomId}`);

    await updateDoc(userInfo, {
      myRoomList: arrayUnion(selectRoom.title),
    });
    // ここ変更 roomIdと作成時のidを統一 → roomIdを取得して
    await updateDoc(roomInfo, {
      members: arrayUnion(auth_user.displayName),
    });
    console.log("合格");
  }
  // 採点処理

  async function quizScore() {
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

    // 合否処理 → 画面遷移
    // 合格の場合 → 得点出力 → room入室ボタンを出力
    // 不合格 → 得点と再入試ボタン

    // 初受験かどうか調べて、初 → score登録, 2回目以降 → 更新
    checkMyRoomScore();
    // 合否を判断 → 4点以上でmyRoomListに追加
    if (score >= 4) {
      judgeScorePass();
    } else {
      console.log("不合格");
    }
    return console.log("得点 : ", score);
  }

  // 上で特定したroomのデータをselectRoomに入れる
  const selectRoom = getRoom();
  const selectUser = getUser();

  return (
    <div className="quiz">
      <div className="quizList">
        <h2 className="quizList_header">{selectRoom?.title}</h2>
        <h3>問題</h3>
        {selectRoom?.quiz?.map((value, index) => {
          return (
            <div key={value.question} className="quizList_question">
              <p>
                {`Q.${index + 1} : `}
                {value.question}
              </p>
            </div>
          );
        })}
      </div>

      {/* 本当はcreateでmap型配列にクイズを追加していってプロパティを名揃えたい */}
      <div className="quizList_ansInput">
        <h3>解答</h3>
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
