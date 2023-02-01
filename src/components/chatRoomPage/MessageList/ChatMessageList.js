/**
取得したルームのメッセージを表示するコンポーネント
全体チャット
TODO
ルームの取得方法はそのままでセキュリティルール → chat-roomsのルーム名がuserのmyRoomListに登録されているもののみにしたい
*/

import React from "react";
import { useParams } from "react-router-dom";
import { useMessages } from "../../../hooks/useMessages";
import { Avatar } from "@mui/material";
import "./chatMessageList.css";

function ChatMessageList() {
  const params = useParams();

  const containerRef = React.useRef(null);
  // セッション管理してリロード時のstateリセットによるログインページに遷移しないように
  const auth_user = JSON.parse(sessionStorage.getItem("AUTH_USER"));

  // ？？？？？？？？？？
  React.useLayoutEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  });
  // roomId(params.id)のメッセージデータの取得
  const messages = useMessages(params.id);

  function Message({ message, isOwnMessage }) {
    // messagesの要素を入れてる？ → iconも一緒に送ればいい
    const { displayName, text, avatar } = message;

    return (
      <li className={["message", isOwnMessage && "own_message"].join(" ")}>
        <div
          className={[
            "message_avatar",
            isOwnMessage && "own_message_avatar",
          ].join(" ")}
        >
          <Avatar src={avatar} />
        </div>
        <h4 className="sender">{isOwnMessage ? displayName : displayName}</h4>
        <div>{text}</div>
      </li>
    );
  }

  return (
    <div className="message_list_container" ref={containerRef}>
      <ul className="message_list"></ul>
      {messages.map((x) => (
        <Message
          key={x.id}
          message={x}
          isOwnMessage={x.uid === auth_user.uid}
        />
      ))}
    </div>
  );
}
export default ChatMessageList;
