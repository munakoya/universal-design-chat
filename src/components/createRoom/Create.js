import React, { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { onAuthStateChanged } from "firebase/auth";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import db from "../../firebase";
import { uuidv4 } from "@firebase/util";
import { Button } from "@mui/material";
import "./create.css";
function Create() {
  const { user } = useAuth();
  const [roomTitle, setRoomTitle] = useState("");
  const [description, setDescription] = useState("");
  const [icon, setIcon] = useState("");

  const createRoom = (e) => {
    e.preventDefault();
    // onAuthStateChanged(user, (user) => {
    //   if (user) {
    // firebaseに追加する → addDoc関数 引数にdbとその中のコレクション名
    // コレクションさえ作れば、以下のプロパティのデータがドキュメントとして追加される
    addDoc(collection(db, "room-list"), {
      // addするデータ のプロパティを決める → ここをログイン中のuserごとにしたい
      roomId: uuidv4(),
      title: roomTitle,
      description: description,
      icon: icon,
      createUser: user.displayName,
      //   quiz: quiz, // quizはコレクションかなあ
      createdAt: serverTimestamp(),
    });
    //   }
    // });
    //   ルームにリダイレクト
    setRoomTitle("");
    setDescription("");
    setIcon("");
  };

  return (
    <div className="create">
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
