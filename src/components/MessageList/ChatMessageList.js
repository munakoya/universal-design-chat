import React from "react";
import { useAuth } from "../../hooks/useAuth";
// import { useMessages } from "../../hooks/useMessages";
import { useEffect, useState } from "react";
import db, { getMessages } from "../../firebase";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  getDocs,
} from "firebase/firestore";
import { useMessages } from "../../hooks/useMessages";
import { useParams } from "react-router-dom";

// roomIdが取得できない問題 propsをやめるかあ
function ChatMessageList({ roomId }) {
  const params = useParams();

  const containerRef = React.useRef(null);
  // ログインユーザー情報取得
  const { user } = useAuth();
  React.useLayoutEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  });
  //   const [selectRoomId, setSelectRoomId] = useState("");
  //   useEffect(() => {
  //     setSelectRoomId(roomId);
  //   }, [roomId]);
  //   roomIdを取得できたタイミングで発火 そもそもundefindで送られてる → if文使えばしゅつりょくはできるけどエラー
  const messages = useMessages(params.id);

  //   const [messages, setMessages] = useState([]);
  //   useEffect(() => {
  //     // ここにmessagesのコード → propsで渡されるroomIdの取得の問題
  //     if (roomId) {
  //       const chatList = collection(db, "chat-rooms", roomId, "messages");
  //       const q = query(chatList);
  //       onSnapshot(q, (querySnapshots) => {
  //         setMessages(querySnapshots.docs.map((doc) => doc.data()));
  //       });
  //       console.log(messages);
  //     }
  //   }, [roomId]);

  //   const messages = useMessages(roomId);
  // メッセージは送れる indexOfのエラー
  // useEffectのところをコメントアウトして、出力できてから外すと何故か出力できる
  // propsで引き渡すのを辞める

  return (
    <div className="message-list-container" ref={containerRef}>
      <ul className="message-list"></ul>
      {/* <div>{roomId}</div>
      {messages.map((message) => (
        <li key={message.messageId}>{message.text}</li>
      ))} */}
      {messages.map((x) => (
        <Message key={x.id} message={x} isOwnMessage={x.uid === user.uid} />
      ))}
    </div>
  );
}
// あんまし何やってるかわからん
function Message({ message, isOwnMessage }) {
  const { displayName, text } = message;

  return (
    <li className={["message", isOwnMessage && "own-message"].join(" ")}>
      <h4 className="sender">{isOwnMessage ? "You" : displayName}</h4>
      <div>{text}</div>
    </li>
  );
}

export default ChatMessageList;
