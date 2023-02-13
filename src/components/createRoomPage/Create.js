/**
 * Createコンポーネント
 *
 * TODO
 * バリデーション → 空欄時の処理、returnして作成させないのか、alertを出すか
 * 問題数、正解数、問題形式の選択をユーザーが選択、編集できるように
 * formの装飾
 *
 * 注意点
 * → ルーム作成時、画像のurlを指定
 * 画像データをそのまま指定する方法に変えるのがベスト
 * 現状、画像のリンクをコピーってして指定する画像urlは反映される → 画像があるurl ex)公式ホームページのurlなどは画像表示されないので注意
 */
import React, { useState } from "react";
import {
  serverTimestamp,
  doc,
  setDoc,
  updateDoc,
  arrayUnion,
  getDoc,
} from "firebase/firestore";
import db from "../../firebase";
import { uuidv4 } from "@firebase/util";
import { Button, TextField } from "@mui/material";
import "./create.css";
import { Box } from "@mui/system";
function Create() {
  // セッション管理してリロード時のstateリセットによるログインページに遷移しないように
  const auth_user = JSON.parse(sessionStorage.getItem("AUTH_USER"));

  const userInfo = doc(db, "user", `${auth_user.uid}`);
  const allRoomArray = doc(db, "all-room-array", "all-rooms"); // 検索用

  // 入力ルーム情報を入れるstate
  const [roomTitle, setRoomTitle] = useState("");
  const [description, setDescription] = useState("");
  const [icon, setIcon] = useState("");
  // 問題と解答は後々ユーザー側で問題数、問題形式を選択できるようにしたい
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

  // 入力項目をdbに登録
  // room-list, all-room-list, userのcreateRooms, all-room-array
  async function createRoom() {
    if (roomTitle === "") return; // ルームタイトルが空欄はだめ
    let id = uuidv4();

    // userのmyRoomListにも追加する
    await setDoc(doc(db, "room-list", id), {
      roomId: id,
      title: roomTitle,
      description: description,
      icon: icon,
      createUser: auth_user.displayName,
      createdAt: serverTimestamp(),
      members: [auth_user.displayName],
      // クイズはmap型配列
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
    setDoc(doc(db, "all-room-list", roomTitle), {
      roomId: id,
      title: roomTitle,
    });
    updateDoc(userInfo, {
      createRooms: arrayUnion(roomTitle),
    });

    // all-room-arrayに追加
    await updateDoc(allRoomArray, {
      rooms: arrayUnion(roomTitle),
    });
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

  // 同名ルームをチェックしてなければ登録
  async function registerRoomCheck(e) {
    e.preventDefault();
    if (roomTitle === "") {
      alert("ルーム名は必ず入力してね！");
      return;
    }
    const allRoomData = doc(db, "all-room-list", `${roomTitle}`);
    const allRoomDataSnap = await getDoc(allRoomData);

    if (allRoomDataSnap.exists()) {
      alert("同じルーム名が存在します。 (T_T) \n別のルーム名を入力してね！");
      // ここにエラー出力
    } else {
      // 同じルーム名が無い
      if (window.confirm(`「${roomTitle}」ルームを作成します。`)) {
        createRoom();
      }
    }
  }

  return (
    <div className="create">
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <h2 className="create-header">ルーム作成</h2>
        <div className="create_explain">
          <p>
            注意：問題が空欄だと自動で正解扱いになります。
            <br /> 　　　　解答は一文字でも異なると不正解となります。
          </p>
        </div>
        <form>
          <div className="createRoom-input">
            <TextField
              value={roomTitle}
              id="filled-multiline-flexible"
              label="ルーム名"
              multiline
              maxRows={4}
              variant="filled"
              style={{ width: "100%" }}
              onChange={(e) => setRoomTitle(e.target.value)}
              required={true}
            />
            <TextField
              value={description}
              label="ルーム説明"
              multiline
              maxRows={4}
              variant="filled"
              id="filled-multiline-flexible"
              type="text"
              onChange={(e) => setDescription(e.target.value)}
              required={true}
              style={{ width: "100%" }}
            />
            <TextField
              value={icon}
              label="画像URL"
              multiline
              maxRows={4}
              variant="filled"
              id="filled-multiline-flexible"
              type="text"
              onChange={(e) => setIcon(e.target.value)}
              required={true}
              style={{ width: "100%" }}
            ></TextField>
            <div className="createQuiz-input">
              <div className="createQuizSet">
                <TextField
                  value={question1}
                  label="問題①"
                  multiline
                  maxRows={4}
                  variant="filled"
                  id="filled-multiline-flexible"
                  type="text"
                  onChange={(e) => setQuestion1(e.target.value)}
                  required={true}
                  style={{ width: "45%" }}
                />
                <TextField
                  value={answer1}
                  label="答え①"
                  multiline
                  maxRows={4}
                  variant="filled"
                  id="filled-multiline-flexible"
                  type="text"
                  onChange={(e) => setAnswer1(e.target.value)}
                  required={true}
                  style={{ width: "45%" }}
                />
              </div>
              <div className="createQuizSet">
                <TextField
                  value={question2}
                  label="問題②"
                  multiline
                  maxRows={4}
                  variant="filled"
                  id="filled-multiline-flexible"
                  type="text"
                  onChange={(e) => setQuestion2(e.target.value)}
                  required={true}
                  style={{ width: "45%" }}
                />
                <TextField
                  value={answer2}
                  label="答え②"
                  multiline
                  maxRows={4}
                  variant="filled"
                  id="filled-multiline-flexible"
                  type="text"
                  onChange={(e) => setAnswer2(e.target.value)}
                  required={true}
                  style={{ width: "45%" }}
                />
              </div>
              <div className="createQuizSet">
                <TextField
                  value={question3}
                  label="問題③"
                  multiline
                  maxRows={4}
                  variant="filled"
                  id="filled-multiline-flexible"
                  type="text"
                  onChange={(e) => setQuestion3(e.target.value)}
                  required={true}
                  style={{ width: "45%" }}
                />
                <TextField
                  value={answer3}
                  label="答え③"
                  multiline
                  maxRows={4}
                  variant="filled"
                  id="filled-multiline-flexible"
                  type="text"
                  onChange={(e) => setAnswer3(e.target.value)}
                  required={true}
                  style={{ width: "45%" }}
                />
              </div>
              <div className="createQuizSet">
                <TextField
                  value={question4}
                  label="問題④"
                  multiline
                  maxRows={4}
                  variant="filled"
                  id="filled-multiline-flexible"
                  type="text"
                  onChange={(e) => setQuestion4(e.target.value)}
                  required={true}
                  style={{ width: "45%" }}
                />
                <TextField
                  value={answer4}
                  label="答え④"
                  multiline
                  maxRows={4}
                  variant="filled"
                  id="filled-multiline-flexible"
                  type="text"
                  onChange={(e) => setAnswer4(e.target.value)}
                  required={true}
                  style={{ width: "45%" }}
                />
              </div>
              <div className="createQuizSet">
                <TextField
                  value={question5}
                  label="問題⑤"
                  multiline
                  maxRows={4}
                  variant="filled"
                  id="filled-multiline-flexible"
                  type="text"
                  onChange={(e) => setQuestion5(e.target.value)}
                  required={true}
                  style={{ width: "45%" }}
                />
                <TextField
                  value={answer5}
                  label="答え⑤"
                  multiline
                  maxRows={4}
                  variant="filled"
                  id="filled-multiline-flexible"
                  type="text"
                  onChange={(e) => setAnswer5(e.target.value)}
                  required={true}
                  style={{ width: "45%" }}
                />
              </div>
            </div>
            <Button
              className="createRoom-createButton"
              type="button" // type="submit"にするとenterキーで送信される buttonならenterキー誤送信防げます
              onClick={registerRoomCheck}
              variant="contained"
              style={{
                margin: "10%",
                padding: "2%",
                backgroundColor: "#50b7f5",
                borderRadius: "30px",
              }}
            >
              ルーム作成
            </Button>
          </div>
        </form>
      </Box>
    </div>
  );
}

export default Create;
