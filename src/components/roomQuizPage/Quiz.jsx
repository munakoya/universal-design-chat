/*
Quizコンポーネント
RoomList.js → 検索タブで選択されたルームのクイズ情報を出力する

TODO
クイズの形式を4択に変える
クイズの出力の仕方
ルーム選択 → 詳細画面 → 問題 と 解答(4 : 4)

ルームの取得とユーザー情報の取得の仕方変えられそう → ドキュメント指定のexists()使えば数行になる
*/
import React, { useEffect } from "react";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Button, TextField } from "@mui/material";
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
import "./quiz.css";
import { Box } from "@mui/system";
import { useNavigate } from "react-router-dom";

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

  const navigation = useNavigate();

  let score = 0;

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
  async function checkMyRoomScore() {
    let checkCount = 0;
    // myRoomScoreをmapで一つ一つ調べる → そもそも出力させない → 検索で出てきたときの処理とかめんどいからこっちで制御
    // スパゲティで申し訳ないです。
    for (let myScore of selectUser?.myRoomScore) {
      // 以前不合格で再受験 → 合格
      if (myScore.title === params.id) {
        // 不合格の点数 かつ 今回合格
        if (myScore.score <= 3 && score >= 4) {
          // 更新(削除)

          await updateDoc(userInfo, {
            myRoomScore: arrayRemove({
              title: myScore.title,
              score: myScore.score,
            }),
          });
          // 更新(追加)
          await updateDoc(userInfo, {
            myRoomScore: arrayUnion({ title: selectRoom.title, score: score }),
          });
        }
        if (myScore.score >= 4) {
          console.log("すでに合格済です。");
          break;
        }
        break;
        // 未受験
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

  // 完全一致の採点処理
  async function quizScore() {
    if (window.confirm("入力した内容で採点します！")) {
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
    return navigation(`/search-rooms/${params.id}/quiz`);
  }

  // 上で特定したroomのデータをselectRoomに入れる
  const selectRoom = getRoom();
  const selectUser = getUser();

  return (
    <div className="quiz">
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
      >
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

        <div className="quizList_ansInput">
          <h3>解答</h3>
          <TextField
            value={ans1}
            id="filled-multiline-flexible"
            label="Q1"
            multiline
            maxRows={4}
            variant="filled"
            style={{ width: "100%" }}
            placeholder="答えを入力してね！"
            type="text"
            onChange={(e) => setAns1(e.target.value)}
          />
          <TextField
            value={ans2}
            id="filled-multiline-flexible"
            label="Q2"
            multiline
            maxRows={4}
            variant="filled"
            style={{ width: "100%" }}
            placeholder="答えを入力してね！"
            type="text"
            onChange={(e) => setAns2(e.target.value)}
          />
          <TextField
            value={ans3}
            id="filled-multiline-flexible"
            label="Q3"
            multiline
            maxRows={4}
            variant="filled"
            style={{ width: "100%" }}
            placeholder="答えを入力してね！"
            type="text"
            onChange={(e) => setAns3(e.target.value)}
          />
          <TextField
            value={ans4}
            id="filled-multiline-flexible"
            label="Q4"
            multiline
            maxRows={4}
            variant="filled"
            style={{ width: "100%" }}
            placeholder="答えを入力してね！"
            type="text"
            onChange={(e) => setAns4(e.target.value)}
          />
          <TextField
            value={ans5}
            id="filled-multiline-flexible"
            label="Q5"
            multiline
            maxRows={4}
            variant="filled"
            style={{ width: "100%" }}
            placeholder="答えを入力してね！"
            type="text"
            onChange={(e) => setAns5(e.target.value)}
          ></TextField>
        </div>
      </Box>
      <div>
        <Button
          className="quiz_score_Button"
          type="submit"
          onClick={quizScore}
          style={{
            margin: "5%",
            padding: "2%",
            backgroundColor: "#50b7f5",
            borderRadius: "30px",
            width: "40%",
          }}
        >
          <Link
            to={`/search-rooms/${selectRoom?.title}/quiz/score`}
            style={{ color: "#fff", fontWeight: "bold", width: "100%" }}
          >
            採点
          </Link>
        </Button>
      </div>
    </div>
  );
}

export default Quiz;
