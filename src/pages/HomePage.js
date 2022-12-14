/*
ホームページ
固定のサイドバーとタイムラインとtwitterのウィジェット系が表示される

TODO
・ここのページの立ち位置をどうするか考える必要あり → 多分ルーム内にタイムライン
画面遷移的には、ルームリスト → ルーム情報 → チャット or タイムライン みたいな感じにする

・現状、ログイン後はこの画面が表示されるが自分保持するルーム一覧が出力されるイメージ
→ 最初に出力されるもののインパクト的に、全体のタイムラインでもいいのかなと

・useAuthについて理解する

 */
import React, { useEffect, useState } from "react";
import {
  collection,
  doc,
  getDocs,
  onSnapshot,
  query,
  setDoc,
} from "firebase/firestore";
import { useAuth } from "../hooks/useAuth";
import db from "../firebase";
import Sidebar from "../components/sidebar/Sidebar";
import Timeline from "../components/homePage/timeline/Timeline";
import Widgets from "../components/homePage/widget/Widgets";
import "../App.css";

export function HomePage() {
  // useAuth()つかうと変数にログイン中のユーザー情報が取得できる
  const { user } = useAuth();
  const [usersData, setUsersData] = useState([]);
  let check = 0;

  const getAllUser = () => {
    const userData = collection(db, "user");
    const q = query(userData);
    onSnapshot(q, (querySnapshots) => {
      setUsersData(querySnapshots.docs.map((doc) => doc.data()));
    });
  };

  // ここチェックしてるように見えて最後のuserデータが一致するかどうかの判定になっている
  // userが見つかればloop抜ける処理 → mapだとできないのでfor文で書いて → creaateで同じ処理しているはずです
  // function checkUser() {
  //   usersData.map((userData) =>
  //     userData.uid === user.uid ? (check = 0) : (check = 1)
  //   );
  // }
  const checkUser = () => {
    for (let userInfo of usersData) {
      if (userInfo.uid === user.uid) {
        check = 0;
        console.log("check : ", check);
        break;
      } else {
        check = 1;
        console.log("check : ", check);
      }
    }
  };

  useEffect(() => {
    getAllUser();
    checkUser();
    check === 0
      ? console.log("登録済み")
      : // ここにセットするものがuserに入る
        setDoc(doc(db, "user", `${user.uid}`), {
          name: user.displayName,
          uid: user.uid,
          icon: user.photoURL,
          email: user.email,
          myRoomList: ["test"],
          myRoomScore: [
            {
              title: "test",
              score: 5,
            },
          ],
          createRooms: [],
        });
  }, []);
  return (
    // Pageって付いてるのは基本className="app"でApp.cssを適用
    <div className="app">
      <Sidebar />
      <Timeline />
      <Widgets />
    </div>
  );
}

export default HomePage;
