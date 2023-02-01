/**
 * 話題ごとのチャットルーム
 * → 話題ごとのdbはuseTopicMessagesで取得
 * todo
 * パス指定でバグ出ると思われます
 * 取得するルームとか、送信するルームとかのdb調整必要です。
 */
import React from "react";
import { useTopicMessages } from "../../../../hooks/useMessages";
import { useParams } from "react-router-dom";
import { Avatar } from "@mui/material";
import "./topicChatMessageList.css";

function TopicChatMessageList() {
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

  // room名とtopic(話題内容) をもとにチャットデータ取得
  const messages = useTopicMessages(params.id, params.id2);
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

export default TopicChatMessageList;
