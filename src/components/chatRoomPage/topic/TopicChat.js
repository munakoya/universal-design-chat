/**
 * TopicChat
 * → 投稿内容のルーム
 */

import React from "react";
import { Link, useParams } from "react-router-dom";
// import TopicChatMessageList from "./TopicChatMessageList/TopicChatMessageList";
// import TopicChatMessageInput from "./TopicChatMessageInput/TopicChatMessageInput";
import "./topicChat.css";
import TopicChatui from "./TopicChatui";

function TopicChat() {
  // useParamsでurl内のidを取得 → 投稿のid(タイトル)
  const params = useParams();

  return (
    <div className="topic_chat">
      <h2 className="topic_chat_header">
        <Link className="topic_back" to={`/room/${params.id}/chat-room`}>
          ◀
        </Link>
        {params.id2}
      </h2>

      <div className="topic_messages_container">
        {/* そもそもちゃんとpropsを渡せてない → urlで渡したくないならpropsだけど渡せない */}
        {/* <TopicChatMessageList roomId={params.id} />
        <TopicChatMessageInput roomId={params.id} /> */}
        <TopicChatui roomId={params.id} />
      </div>
    </div>
  );
}

export default TopicChat;
