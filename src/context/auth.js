// 認証コンテキストとプロバイダーの作成
import React from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import db from "../firebase";

import { loginWithGoogle } from "../firebase";

// AuthContextオブジェクト作成 → contextの作成とは
const AuthContext = React.createContext(); // AuthContextでグローバルで使える変数の定義 → useAuthのカスタムフックに使う
// AuthProviderコンポーネントを作成
const AuthProvider = (props) => {
  // useStateで多分userデータをセット
  const [user, setUser] = React.useState(null);

  // ログインの関数
  const login = async () => {
    const user = await loginWithGoogle();
    if (!user) {
      // TODO: Handle failed login
    }
    // googleアカウントのユーザー情報をuserにセット
    setUser(user);
    // 初期化処理はここで行うべき？
    const userData = doc(db, "user", `${user.uid}`);
    const userDataSnap = await getDoc(userData);

    // db/user/user.uidが登録されている場合
    if (userDataSnap.exists()) {
      console.log("登録済みユーザー");
    } else {
      await setDoc(doc(db, "user", `${user.uid}`), {
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
    }
  };

  const value = { user, login };

  // authContextのproviderを返す
  return <AuthContext.Provider value={value} {...props} />;
};

export { AuthContext, AuthProvider };
