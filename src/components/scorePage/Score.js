import React, { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { useParams } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import db from "../../firebase";
import Failure from "./Failure";
import Pass from "./Pass";

function Score() {
  // user/myRoomScoreから取り出す
  const params = useParams(); // params.id → roomIDが取れます
  // const { user } = useAuth();
  // セッション管理してリロード時のstateリセットによるログインページに遷移しないように
  const auth_user = JSON.parse(sessionStorage.getItem("AUTH_USER"));
  const [selectUser, setSelectUser] = useState([]);
  const [score, setScore] = useState();
  // roomIdのインデックス値をmyRoomListから取り出す
  useEffect(() => {
    getUser();
    getScore();
  }, []);

  // ログイン中のユーザーデータを取得する
  async function getUser() {
    const selectUser = doc(db, "user", `${auth_user.uid}`);
    const selectUserSnap = await getDoc(selectUser);
    if (selectUserSnap.exists()) {
      setSelectUser(selectUserSnap.data());
    } else {
      console.log("(泣)");
    }
  }

  // myRoomScoreからparams.id === selectUser.myRoomScore得点を取り出す
  // 書き方はquizの出力と同じ
  const getScore = () => {
    selectUser?.myRoomScore?.map((value) => {
      if (value.title === params.id) {
        setScore(value.score);
      }
    });
    return score;
  };

  return (
    <div className="score">
      <h2 className="score_header">採点結果</h2>
      {/* 合否それぞれの画面出力 */}
      {/* {score ? (
        score >= 4 ? (
          <Pass />
        ) : (
          <Failure />
        )
      ) : (
        console.log("scoreを取得できません。score : ", score)
      )}
      {console.log("score : ", score)} */}

      {selectUser?.myRoomScore?.map((value) => {
        if (value.title === params.id) {
          console.log(`score : ${value.score}`);
          return <div>{value.score >= 4 ? <Pass /> : <Failure />}</div>;
        }
      })}
    </div>
  );
}

export default Score;
