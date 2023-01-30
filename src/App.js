import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useState, useEffect } from "react";
import "./App.css";
import { AuthenticatedApp } from "./components/authenticatedApp/AuthenticatedApp";
import ProfileWidgets from "./components/profilePage/ProfileWidget";
import { UnauthenticatedApp } from "./components/unauthenticatedApp/UnauthenticatedApp";
import db from "./firebase";
import { useAuth } from "./hooks/useAuth";

function App() {
  // ログイン状態のチェックのため？
  // useAuth(カスタムフック)で認証情報をuserに入れる
  const { user } = useAuth();

  // TODO
  // 最終ログイン日時から1ヶ月以内ならAuthenticatedAppに遷移させる
  // 今のとこfirebaseにつなげて最終ログインが一ヶ月以内なら → AuthenticatedAppに遷移

  // 今のところdbにカラーコード保存している意味はありません
  const [selectUser, setSelectUser] = useState([]);
  let [selectColor, setSelectColor] = useState("");
  useEffect(() => {
    // 最初の一回だけ
    getUser();
    // setSelectColor(selectUser.selectedColor);
  }, []);
  // firestoreから色を持ってくる 変数名はselectColor
  // ログイン中のユーザーデータを取得する
  async function getUser() {
    const selectUser = doc(db, "user", `${user.uid}`);
    const selectUserSnap = await getDoc(selectUser);
    if (selectUserSnap.exists()) {
      setSelectUser(selectUserSnap.data());
      // return selectUserSnap.data();
    } else {
      console.log("(泣)");
    }
  }

  async function changeColor(color) {
    setSelectColor(color);
    try {
      console.log("追加します");
      await updateDoc(doc(db, "user", `${user.uid}`), {
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
        backgroundColor: selectColor,
      }}
    >
      {/* ここにカラーリストを出す */}
      {user ? (
        <div className="selectColor">
          <button
            className="back_default"
            value="#50b7f5"
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
        console.log("ログイン状態ではありません")
      )}

      <div className="container">
        {/* ログインできてuserあればauthenticatedApp ログインしてない → Unauthだからgoogleログインボタン */}
        {user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
      </div>
    </div>
  );
}

export default App;
