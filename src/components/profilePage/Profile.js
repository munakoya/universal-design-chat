/**
 * マイページのコンポーネント
 * ユーザー情報を出力する。
 *
 * 設定メニュー作成
 */

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { Avatar, Button } from "@mui/material";
import { useAuth } from "../../hooks/useAuth";
import db, { auth } from "../../firebase";
import "./profile.css";
import { signOut } from "@firebase/auth";
import Widgets from "../homePage/widget/Widgets";
import Settings from "./Settings";

function Profile() {
  function SignOut() {
    signOut(auth);
    sessionStorage.removeItem("AUTH_USER");
    navigation("/");
    window.location.reload();
  }
  // ログインユーザー情報
  // const { user } = useAuth();
  const [selectUser, setSelectUser] = useState([]);
  const auth_user = JSON.parse(sessionStorage.getItem("AUTH_USER"));

  const navigation = useNavigate();

  useEffect(() => {
    getUser();
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

  return (
    <div className="profile">
      <h1 className="profile_header">マイページ</h1>
      <div className="profile_container">
        <Avatar src={selectUser.icon} />
        <h3 className="user_name">ユーザー名 : {selectUser.name}</h3>

        {/* <p>Email : {user.email}</p> */}
        {/* firestoreからdb/userを持ってくる → ルーム一覧と点数 */}
        <div className="profile_myRoomList">
          <div className="List_2">
            {/* <h2>所属ルーム一覧</h2> */}
            <h3>所属ルーム数 : {selectUser?.myRoomList?.length}</h3>
            <h3>作成ルーム数 : {selectUser?.createRooms?.length}</h3>
          </div>

          <p>----------------------------------------------------</p>

          <h3 className="New_List">作成ルーム一覧</h3>
          {selectUser?.createRooms?.map((createRoom) => (
            <p>・{createRoom}</p>
          ))}

          <p>----------------------------------------------------</p>

          <h3 className="My_List">所属ルーム一覧</h3>
          {selectUser?.myRoomScore?.map((myRoom) =>
            // 4点以上の入室中ルームのみを表示
            myRoom.score >= 4 ? (
              <div key={myRoom.title}>
                <p className="profile_myRoomList_title">
                  {/* Linkにしてルーム詳細画面に遷移できるようにしたい */}
                  ・ルーム名 : {myRoom.title}
                </p>

                <p className="profile_myRoomList_score">
                  ・スコア : {myRoom.score}
                </p>
              </div>
            ) : (
              console.log(`不合格ルーム : ${myRoom.title} | ${myRoom.score}`)
            )
          )}
        </div>
        <p></p>
      </div>
      <Button onClick={SignOut}>ログアウト</Button>
    </div>
  );
}

export default Profile;
