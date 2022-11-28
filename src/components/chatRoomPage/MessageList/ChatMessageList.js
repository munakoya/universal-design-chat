/**
取得したルームのメッセージを表示するコンポーネント
TODO
ルームの取得方法はそのままでセキュリティルール → chat-roomsのルーム名がuserのmyRoomListに登録されているもののみにしたい
最初からルームはドキュメントIDの自動生成じゃなくてもいいのでは？
→ 同じルームが複数あるのってあんまし意味ない → ドキュメントIDをルームタイトルに設定

*/

import React from "react";
import { useAuth } from "../../../hooks/useAuth";
import { useMessages } from "../../../hooks/useMessages";
import { useParams } from "react-router-dom";
import { Avatar } from "@mui/material";

import "./chatMessageList.css";

// roomIdが取得できない問題 propsをやめるかあ
function ChatMessageList({ roomId }) {
  const params = useParams();

  const containerRef = React.useRef(null);
  // ログインユーザー情報取得
  const { user } = useAuth();

  // ？？？？？？？？？？
  React.useLayoutEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  });
  // roomId(params.id)のメッセージデータの取得
  const messages = useMessages(params.id);

  return (
    <div className="message_list_container" ref={containerRef}>
      <ul className="message_list"></ul>
      {messages.map((x) => (
        <Message key={x.id} message={x} isOwnMessage={x.uid === user.uid} />
      ))}
    </div>
  );
}
// あんまし何やってるかわからん
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

export default ChatMessageList;
