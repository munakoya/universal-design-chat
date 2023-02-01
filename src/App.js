/*
App.js

stateのuserではなく、セッションストレージのauth_userを使っている理由
→ リロード時のログイン画面遷移を防ぐ
ログインの構造自体を変えた方がいい？

ログインフロー
・初ログイン時
1. Unauthに遷移 → ログインボタンをクリック
2. sessionStrageとauthProviderにユーザーデータ
useAuthで定義したuserデータはリロードで消える

・リロード
1. useAuthから取得していたuserデータにはアクセスできなくなる
→ googleログインを挟まないと行けないため

2. sessionStrageに保存してあるデータは消えないため、ログインページに遷移しない
→ ログインボタンをクリックしません

3. Auth~以降のuserデータは基本的にsessionStrage管理

memo
・最初から全部sessionStrage管理にすればいいのでは？
・auth_userより、直接JSON.parse(session~~~~)にしたほうが早い？
・sessionStrageでの管理の安全性 localStrageとどっちがいいか

*/

import { useState, useEffect } from "react";
import { useAuth } from "./hooks/useAuth";
import { AuthenticatedApp } from "./components/authenticatedApp/AuthenticatedApp";
import { UnauthenticatedApp } from "./components/unauthenticatedApp/UnauthenticatedApp";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import db from "./firebase";
import "./App.css";

function App() {
  // ログイン状態のチェックのため？
  const { user } = useAuth();
  // セッション管理してリロード時のstateリセットによるログインページに遷移しないように
  const auth_user = JSON.parse(sessionStorage.getItem("AUTH_USER"));

  // 今のところdbにカラーコード保存している意味はありません
  // state管理だとリロード時になくなる
  const [selectUser, setSelectUser] = useState([]);
  let [selectColor, setSelectColor] = useState("");

  useEffect(() => {
    getUser();
  }, []);

  // ログイン中のユーザーデータを取得する
  async function getUser() {
    const selectUserSnap = await getDoc(doc(db, "user", `${auth_user.uid}`));
    if (selectUserSnap.exists()) {
      setSelectUser(selectUserSnap.data());
    } else {
      console.log("(泣)");
    }
  }

  // firestoreから色を持ってくる 変数名はselectColor
  async function changeColor(color) {
    setSelectColor(color);
    // db / user / selectedColorをアップデート
    try {
      await updateDoc(doc(db, "user", `${auth_user.uid}`), {
        selectedColor: color,
      });
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div
      className="App"
      style={{
        // なるべくdbに登録されたdbを取ってきたいorセッション
        backgroundColor: selectColor,
      }}
    >
      {/* カラーリスト*/}
      {auth_user ? (
        <div className="selectColor">
          <button
            className="back_default"
            value="#50b7f5"
            // クリックするとselectColorの値が更新されるため、背景色が変わる
            // userデータのselectedColorがnullならばselectColorにするみたいな処理追加
            onClick={(e) => changeColor(e.target.value)}
          >
            水
          </button>
          <button
            className="back_black"
            value="#000"
            onClick={(e) => changeColor(e.target.value)}
          >
            黒
          </button>
          <button
            className="back_orange"
            value="#F4D21F"
            onClick={(e) => changeColor(e.target.value)}
          >
            橙
          </button>
          <button
            className="back_green"
            value="#E8FFD1"
            onClick={(e) => changeColor(e.target.value)}
          >
            黄緑
          </button>
          <button
            className="back_blue"
            value="#3754B1"
            onClick={(e) => changeColor(e.target.value)}
          >
            青
          </button>
          <button
            className="back_pink"
            value="#FDE1E9"
            onClick={(e) => changeColor(e.target.value)}
          >
            桃
          </button>
          <button
            className="back_gray"
            value="#646566"
            onClick={(e) => changeColor(e.target.value)}
          >
            灰
          </button>
          <button
            className="back_purple"
            value="#8731AD"
            onClick={(e) => changeColor(e.target.value)}
          >
            紫
          </button>
          <button
            className="back_white"
            value="#fff"
            onClick={(e) => changeColor(e.target.value)}
          >
            白
          </button>
        </div>
      ) : (
        console.log("auth_userがありません。")
      )}

      <div className="container">
        {/* auth_userでやると多分遅いのかな？ → エラー出る */}
        {/* AUTH_USER_UIDのみで行けそう？ */}
        {JSON.parse(sessionStorage.getItem("AUTH_USER")) || user ? (
          <AuthenticatedApp />
        ) : (
          <UnauthenticatedApp />
        )}
      </div>
    </div>
  );
}

export default App;
