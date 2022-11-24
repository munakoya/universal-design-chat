import React, { useEffect } from "react";
import Sidebar from "../components/sidebar/Sidebar";
import Timeline from "../components/homePage/timeline/Timeline";
import Widgets from "../components/homePage/widget/Widgets";
import "../App.css";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import db from "../firebase";
import { useAuth } from "../hooks/useAuth";
// ルーティングで表示されるページはexportする
export function HomePage() {
  const { user } = useAuth();
  // userドキュメント追加
  // ログインと同時に初期化される → if分岐させるか、
  useEffect(() => {
    // setDoc(collection(db, "user", `${user.uid}`))みたいにドキュメントIDを指定
    user
      ? console.log("登録済み")
      : setDoc(doc(db, "user", `${user.uid}`), {
          name: user.displayName,
          uid: user.uid,
          icon: user.photoURL,
          email: user.email,
          myRoomList: [],
        });
    // console.log("登録しました");
  }, []);
  return (
    // pagesフォルダにあるpageファイルはなるべくPageをファイル名につけたい
    // ex) HomePage.jsにしたい → 人目でpageファイルだとわかるように
    <div className="app">
      {/* sidebar */}
      <Sidebar />
      {/* timeline */}
      <Timeline />
      {/* widget */}
      <Widgets />
    </div>
  );
}

export default HomePage;
