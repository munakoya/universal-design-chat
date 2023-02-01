/*
MyRoomListで選択されたルームのチャット画面を表示する
→ urlのルーム名で遷移
TODO
入室処理していないルームもidをurlに入力すれば入室できてしまう。urlから取得が良くないかも
→ propsはうまくいきません
セキュリティルールの設定でアクセス不可にすれば所属ルームしか取得できないかも (有力)
urlはそのままでセキュリティルールを編集して登録済みのルームのみアクセス可能にする

*/

import React from "react";
import { useParams } from "react-router-dom";
import ChatMessageList from "./MessageList/ChatMessageList";
import ChatMessageInput from "./MessageInput/ChatMessageInput";
import "./chat.css";

function Chat() {
  const params = useParams(); // url内のidを取得

  return (
    <div className="chat">
      {console.log("url内のid : ", params.id)}
      <h2 className="chat_header">全体チャット</h2>
      <div className="messages_container">
        {/* そもそもちゃんとpropsを渡せてない → urlで渡したくないならpropsだけど渡せない */}
        {/* セキュリティルールを追加 */}
        <ChatMessageList roomId={params.id} />
        <ChatMessageInput roomId={params.id} />
      </div>
    </div>
  );
}

export default Chat;
