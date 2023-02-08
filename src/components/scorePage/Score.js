/**
 * 採点後のスコアページ
 * → 合否でPass or Failureを出力
 */
import React, { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { useParams } from "react-router-dom";
import db from "../../firebase";
import Failure from "./Failure";
import Pass from "./Pass";

function Score() {
  const params = useParams(); // params.id → roomIDが取れます
  // セッション管理してリロード時のstateリセットによるログインページに遷移しないように
  const auth_user = JSON.parse(sessionStorage.getItem("AUTH_USER"));
  const [selectUser, setSelectUser] = useState([]);
  const [score, setScore] = useState();
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
      console.log("ユーザー情報の取得に失敗しました");
    }
  }

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
