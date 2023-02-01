/**
 * Createコンポーネント
 *
 * TODO
 * 一回目なぜかルーム作成できない
 * → ルーム作成しませんってでる
 *
 * ルーム作成時にall-room-arrayに登録する
 *
 * 注意点
 * → ルーム作成時、画像のurlを指定
 * 画像データをそのまま指定する方法に変えるのがベスト
 * 現状、画像のリンクをコピーってして指定する画像urlは反映される → 画像があるurl ex)公式ホームページのurlなどは画像表示されないので注意
 */
import React, { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import {
  collection,
  serverTimestamp,
  doc,
  setDoc,
  addDoc,
  query,
  onSnapshot,
  updateDoc,
  arrayUnion,
  getDoc,
} from "firebase/firestore";
import db from "../../firebase";
import { uuidv4 } from "@firebase/util";
import { Button } from "@mui/material";
import "./create.css";
function Create() {
  // セッション管理してリロード時のstateリセットによるログインページに遷移しないように
  const auth_user = JSON.parse(sessionStorage.getItem("AUTH_USER"));

  const userInfo = doc(db, "user", `${auth_user.uid}`);
  const allRoomArray = doc(db, "all-room-array", "all-rooms");
  const [roomTitle, setRoomTitle] = useState("");
  const [description, setDescription] = useState("");
  const [icon, setIcon] = useState("");

  // マップ型配列だから、add? pushとかでも追加できると思われる
  const [question1, setQuestion1] = useState("");
  const [answer1, setAnswer1] = useState("");
  const [question2, setQuestion2] = useState("");
  const [answer2, setAnswer2] = useState("");

  const [question3, setQuestion3] = useState("");
  const [answer3, setAnswer3] = useState("");

  const [question4, setQuestion4] = useState("");
  const [answer4, setAnswer4] = useState("");

  const [question5, setQuestion5] = useState("");
  const [answer5, setAnswer5] = useState("");

  const [rooms, setRooms] = useState([]);
  // 入力項目をdbに登録
  async function createRoom() {
    if (roomTitle === "") return;
    // console.log(`checkCount : ${checkCount} | 新規ルーム作成を行います`);
    // e.preventDefault();
    let id = uuidv4();

    // userのmyRoomListにも追加する
    await setDoc(doc(db, "room-list", id), {
      roomId: id,
      title: roomTitle,
      description: description,
      icon: icon,
      createUser: auth_user.displayName,
      //   quiz: quiz, // quizはコレクションかなあ
      createdAt: serverTimestamp(),
      members: [auth_user.displayName],
      // クイズはクイズで分けたほうがいいかもしれん
      // マップ型の配列に変更
      quiz: [
        {
          question: question1,
          answer: answer1,
        },
        {
          question: question2,
          answer: answer2,
        },
        {
          question: question3,
          answer: answer3,
        },

        {
          question: question4,
          answer: answer4,
        },
        {
          question: question5,
          answer: answer5,
        },
      ],
    });
    // all-room-list作成してidをタイトルにする
    // これにすると同じ名前のルームは最後に作成されたルームに更新される → 実際はルーム自体存在するけどアクセスできない
    setDoc(doc(db, "all-room-list", roomTitle), {
      roomId: id,
      title: roomTitle,
    });
    // userdbに追加
    updateDoc(userInfo, {
      createRooms: arrayUnion(roomTitle),
    });

    // all-room-arrayに追加
    await updateDoc(allRoomArray, {
      rooms: arrayUnion(roomTitle),
    });
    //   ルームにリダイレクトしたい
    setRoomTitle("");
    setDescription("");
    setIcon("");
    setQuestion1("");
    setAnswer1("");
    setQuestion2("");
    setAnswer2("");
    setQuestion3("");
    setAnswer3("");
    setQuestion4("");
    setAnswer4("");
    setQuestion5("");
    setAnswer5("");
  }

  // let checkCount = 0;
  async function registerRoomCheck(e) {
    e.preventDefault();

    const allRoomData = doc(db, "all-room-list", `${roomTitle}`);
    const allRoomDataSnap = await getDoc(allRoomData);

    if (allRoomDataSnap.exists()) {
      console.log("同じルーム名が存在されます");
      // ここにエラー出力
    } else {
      // 同じルーム名が無い
      createRoom();
    }

    // 初期化
    // checkCount = 0;
    // e.preventDefault();
    // const allroomsData = collection(db, "all-room-list");
    // const q = query(allroomsData);
    // onSnapshot(q, (querySnapshots) => {
    //   setRooms(querySnapshots.docs.map((doc) => doc.data()));
    // });
    // // existsで実装できそう → userと一緒 auth.jsに書いてある
    // for (let room of rooms) {
    //   if (room.title === roomTitle) {
    //     checkCount = 0;
    //     console.log(`checkCount : ${checkCount} | 同じルーム名が存在します。`);
    //     break;
    //   } else {
    //     checkCount = 1;
    //     console.log(`check : ${checkCount}`);
    //   }
    // }
    // checkCount === 1
    //   ? createRoom()
    //   : console.log(`checkCount : ${checkCount} | ルームを作成しません。`);
  }

  return (
    <div className="create">
      <h2 className="create-header">ルーム作成</h2>
      <form>
        <div className="createRoom-input">
          <input
            value={roomTitle}
            placeholder="ルーム名"
            type="text" // inputに書き込まれるe(イベント)が発生 → tweetMessageに文字列を追加(e.target.value)
            onChange={(e) => setRoomTitle(e.target.value)}
            required="true"
          ></input>
          <input
            value={description}
            placeholder="ルーム説明"
            type="text" // inputに書き込まれるe(イベント)が発生 → tweetMessageに文字列を追加(e.target.value)
            onChange={(e) => setDescription(e.target.value)}
            required="true"
          ></input>
          <input
            value={icon}
            placeholder="imageURL"
            type="text" // inputに書き込まれるe(イベント)が発生 → tweetMessageに文字列を追加(e.target.value)
            onChange={(e) => setIcon(e.target.value)}
            required="true"
          ></input>
          <div className="createQuiz-input">
            <div className="createQuizSet">
              <input
                value={question1}
                placeholder="Question1"
                type="text" // inputに書き込まれるe(イベント)が発生 → tweetMessageに文字列を追加(e.target.value)
                onChange={(e) => setQuestion1(e.target.value)}
                required="true"
              ></input>
              <input
                value={answer1}
                placeholder="Answer1"
                type="text" // inputに書き込まれるe(イベント)が発生 → tweetMessageに文字列を追加(e.target.value)
                onChange={(e) => setAnswer1(e.target.value)}
                required="true"
              ></input>
            </div>
            <div className="createQuizSet">
              <input
                value={question2}
                placeholder="Question 2"
                type="text" // inputに書き込まれるe(イベント)が発生 → tweetMessageに文字列を追加(e.target.value)
                onChange={(e) => setQuestion2(e.target.value)}
                required="true"
              ></input>
              <input
                value={answer2}
                placeholder="Answer 2"
                type="text" // inputに書き込まれるe(イベント)が発生 → tweetMessageに文字列を追加(e.target.value)
                onChange={(e) => setAnswer2(e.target.value)}
                required="true"
              ></input>
            </div>
            <div className="createQuizSet">
              <input
                value={question3}
                placeholder="Question 3"
                type="text" // inputに書き込まれるe(イベント)が発生 → tweetMessageに文字列を追加(e.target.value)
                onChange={(e) => setQuestion3(e.target.value)}
                required="true"
              ></input>
              <input
                value={answer3}
                placeholder="Answer 3"
                type="text" // inputに書き込まれるe(イベント)が発生 → tweetMessageに文字列を追加(e.target.value)
                onChange={(e) => setAnswer3(e.target.value)}
                required="true"
              ></input>
            </div>
            <div className="createQuizSet">
              <input
                value={question4}
                placeholder="Question 4"
                type="text" // inputに書き込まれるe(イベント)が発生 → tweetMessageに文字列を追加(e.target.value)
                onChange={(e) => setQuestion4(e.target.value)}
                required="true"
              ></input>
              <input
                value={answer4}
                placeholder="Answer 4"
                type="text" // inputに書き込まれるe(イベント)が発生 → tweetMessageに文字列を追加(e.target.value)
                onChange={(e) => setAnswer4(e.target.value)}
                required="true"
              ></input>
            </div>
            <div className="createQuizSet">
              <input
                value={question5}
                placeholder="Question 5"
                type="text" // inputに書き込まれるe(イベント)が発生 → tweetMessageに文字列を追加(e.target.value)
                onChange={(e) => setQuestion5(e.target.value)}
                required="true"
              ></input>
              <input
                value={answer5}
                placeholder="Answer 5"
                type="text" // inputに書き込まれるe(イベント)が発生 → tweetMessageに文字列を追加(e.target.value)
                onChange={(e) => setAnswer5(e.target.value)}
                required="true"
              ></input>
            </div>
            {/* <Button className="pushQuiz" onClick={addNewQuiz()}>
              +
            </Button> */}
          </div>
          <Button
            className="createRoom-createButton"
            type="button" // type="submit"にするとenterキーで送信される buttonならenterキー誤送信防げます
            onClick={registerRoomCheck}
          >
            ルーム作成
          </Button>
        </div>
      </form>
    </div>
  );
}

export default Create;
