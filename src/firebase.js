/*
firebaseのconfigファイル
firebase関連の関数が定義されている
*/

import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";

// google認証系のimport
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";

import { v4 as uuidv4 } from "uuid";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_APIKEY,
  authDomain: process.env.REACT_APP_AUTHDOMAIN,
  projectId: process.env.REACT_APP_PROJECTID,
  storageBucket: process.env.REACT_APP_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
  appId: process.env.REACT_APP_APPID,
  measurementId: process.env.REACT_APP_MESUREMENTID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const db = getFirestore(app);

// googleログインの関数
async function loginWithGoogle() {
  try {
    //   googleのクレデンシャル？を生成
    const provider = new GoogleAuthProvider();
    //   ポップアップでサインフロー処理
    const { user } = await signInWithPopup(auth, provider);

    // ここの関数内で初期化を行う
    // 変数より、filter関数とかでやりたい
    // そもそものログイン認証系の処理の構造の変更などなど → 自分が一番理解しやすいor解説が詳しくて実装したい内容が同じようなもののパクリで行きましょう
    // ここにuser情報をセットすると、データベースに登録される
    return {
      uid: user.uid,
      displayName: user.displayName,
      photoURL: user.photoURL,
      email: user.email,
    };
  } catch (error) {
    if (error.code !== "auth/cancelled-popup-request") {
      console.error(error);
    }
    return null;
  }
}

// sendMessage関数 → roomのサブコレクションsendMessageにドキュメントを追加する関数？
// propsにroomIDとuserデータとtextを受け取る
async function sendMessage(roomId, user, text) {
  // topic
  try {
    await addDoc(collection(db, "chat-rooms", roomId, "messages"), {
      uid: user.uid,
      displayName: user.displayName,
      avatar: user.photoURL,
      text: text.trim(),
      timestamp: serverTimestamp(),
      messageId: uuidv4(),
    });
  } catch (error) {
    console.error(error);
  }
}

// チャットルーム内のすべてのメッセージを取得
function getMessages(roomId, callback) {
  // onSnapshot でfirestoreをリアルタイム更新できる → 変更が加えられると更新を受けとる
  return onSnapshot(
    query(
      collection(db, "chat-rooms", roomId, "messages"),
      // 最新版が下に来るように並び替えてる？
      orderBy("timestamp", "asc")
    ),
    (querySnapshot) => {
      // messagesにルーム内のデータ(db/chat-rooms/roomId/messagesのデータ)をすべて取得
      const messages = querySnapshot.docs.map((x) => ({
        id: x.id,
        ...x.data(),
      }));

      callback(messages);
    }
  );
}

// チャットルーム内のすべてのメッセージを取得
function getTopicMessages(roomId, topicId, callback) {
  // onSnapshot でfirestoreをリアルタイム更新できる → 変更が加えられると更新を受けとる
  return onSnapshot(
    query(
      collection(db, "chat-rooms", roomId, "topics", topicId, "messages"),
      // 最新版が下に来るように並び替えてる？
      orderBy("timestamp", "asc")
    ),
    (querySnapshot) => {
      // messagesにルーム内のデータ(db/chat-rooms/roomId/messagesのデータ)をすべて取得
      const messages = querySnapshot.docs.map((x) => ({
        id: x.id,
        ...x.data(),
      }));

      callback(messages);
    }
  );
}

// ツイートする
async function sendTweet(tweetMessage, tweetImage, user) {
  // youtubeの動画url (未再生)
  if (tweetImage.indexOf("watch?v=") !== -1) {
    tweetImage = tweetImage.replace("watch?v=", "embed/");
    // 動画が再生済み
    if (tweetImage.indexOf("&") !== -1) {
      tweetImage = tweetImage.substring(0, tweetImage.indexOf("&"));
    }
  }
  try {
    await addDoc(collection(db, "posts"), {
      // addするデータ のプロパティを決める → ここをログイン中のuserごとにしたい
      displayName: user.displayName,
      username: user.email,
      verified: true,
      text: tweetMessage,
      avatar: user.photoURL,
      image: tweetImage,
      // 固有のuuidをset → map関数で回すため → docidとかでもいいかも
      id: uuidv4(),
      // 時系列順に並べるため
      timestamp: serverTimestamp(),
    });
  } catch (error) {
    console.error(error);
  }
}
const auth = getAuth();

// export{}で定義した関数を外部でimport 可能に
export {
  loginWithGoogle,
  sendMessage,
  getMessages,
  sendTweet,
  getTopicMessages,
  // checkAdminiStrator,
  auth,
};
export default db;
