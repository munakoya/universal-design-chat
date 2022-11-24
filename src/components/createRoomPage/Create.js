import React, { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import {
  collection,
  serverTimestamp,
  doc,
  setDoc,
  addDoc,
} from "firebase/firestore";
import db from "../../firebase";
import { uuidv4 } from "@firebase/util";
import { Button } from "@mui/material";
import "./create.css";
function Create() {
  const { user } = useAuth();
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

  // const [question6, setQuestion6] = useState("");
  // const [answer6, setAnswer6] = useState("");

  // const [question7, setQuestion7] = useState("");
  // const [answer7, setAnswer7] = useState("");

  // const [question8, setQuestion8] = useState("");
  // const [answer8, setAnswer8] = useState("");

  // const [question9, setQuestion9] = useState("");
  // const [answer9, setAnswer9] = useState("");

  // const [question10, setQuestion10] = useState("");
  // const [answer10, setAnswer10] = useState("");

  async function createRoom(e) {
    e.preventDefault();
    let id = uuidv4();
    // onAuthStateChanged(user, (user) => {
    //   if (user) {
    // firebaseに追加する → addDoc関数 引数にdbとその中のコレクション名
    // コレクションさえ作れば、以下のプロパティのデータがドキュメントとして追加される
    // setDoc(doc(db, "room-list", roomtitle))にするとidがroomTitleになるが重複した場合 → 上書きされる
    await addDoc(collection(db, "room-list"), {
      // addCollection
      // addするデータ のプロパティを決める → ここをログイン中のuserごとにしたい
      roomId: id,
      title: roomTitle,
      description: description,
      icon: icon,
      createUser: user.displayName,
      //   quiz: quiz, // quizはコレクションかなあ
      createdAt: serverTimestamp(),
      members: [user.displayName],
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
          ></input>
          <input
            value={description}
            placeholder="ルーム説明"
            type="text" // inputに書き込まれるe(イベント)が発生 → tweetMessageに文字列を追加(e.target.value)
            onChange={(e) => setDescription(e.target.value)}
          ></input>
          <input
            value={icon}
            placeholder="imageURL"
            type="text" // inputに書き込まれるe(イベント)が発生 → tweetMessageに文字列を追加(e.target.value)
            onChange={(e) => setIcon(e.target.value)}
          ></input>
          <div className="createQuiz-input">
            <div className="createQuizSet">
              <input
                value={question1}
                placeholder="Question1"
                type="text" // inputに書き込まれるe(イベント)が発生 → tweetMessageに文字列を追加(e.target.value)
                onChange={(e) => setQuestion1(e.target.value)}
              ></input>
              <input
                value={answer1}
                placeholder="Answer1"
                type="text" // inputに書き込まれるe(イベント)が発生 → tweetMessageに文字列を追加(e.target.value)
                onChange={(e) => setAnswer1(e.target.value)}
              ></input>
            </div>
            <div className="createQuizSet">
              <input
                value={question2}
                placeholder="Question 2"
                type="text" // inputに書き込まれるe(イベント)が発生 → tweetMessageに文字列を追加(e.target.value)
                onChange={(e) => setQuestion2(e.target.value)}
              ></input>
              <input
                value={answer2}
                placeholder="Answer 2"
                type="text" // inputに書き込まれるe(イベント)が発生 → tweetMessageに文字列を追加(e.target.value)
                onChange={(e) => setAnswer2(e.target.value)}
              ></input>
            </div>
            <div className="createQuizSet">
              <input
                value={question3}
                placeholder="Question 3"
                type="text" // inputに書き込まれるe(イベント)が発生 → tweetMessageに文字列を追加(e.target.value)
                onChange={(e) => setQuestion3(e.target.value)}
              ></input>
              <input
                value={answer3}
                placeholder="Answer 3"
                type="text" // inputに書き込まれるe(イベント)が発生 → tweetMessageに文字列を追加(e.target.value)
                onChange={(e) => setAnswer3(e.target.value)}
              ></input>
            </div>
            <div className="createQuizSet">
              <input
                value={question4}
                placeholder="Question 4"
                type="text" // inputに書き込まれるe(イベント)が発生 → tweetMessageに文字列を追加(e.target.value)
                onChange={(e) => setQuestion4(e.target.value)}
              ></input>
              <input
                value={answer4}
                placeholder="Answer 4"
                type="text" // inputに書き込まれるe(イベント)が発生 → tweetMessageに文字列を追加(e.target.value)
                onChange={(e) => setAnswer4(e.target.value)}
              ></input>
            </div>
            <div className="createQuizSet">
              <input
                value={question5}
                placeholder="Question 5"
                type="text" // inputに書き込まれるe(イベント)が発生 → tweetMessageに文字列を追加(e.target.value)
                onChange={(e) => setQuestion5(e.target.value)}
              ></input>
              <input
                value={answer5}
                placeholder="Answer 5"
                type="text" // inputに書き込まれるe(イベント)が発生 → tweetMessageに文字列を追加(e.target.value)
                onChange={(e) => setAnswer5(e.target.value)}
              ></input>
            </div>
            {/* <Button className="pushQuiz" onClick={addNewQuiz()}>
              +
            </Button> */}
          </div>
          <Button
            className="createRoom-createButton"
            type="submit"
            onClick={createRoom}
          >
            ルーム作成
          </Button>
        </div>
      </form>
    </div>
  );
}

export default Create;
