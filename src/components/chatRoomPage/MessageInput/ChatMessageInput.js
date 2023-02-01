/*
メッセージフォームのコンポーネント

*/
import React from "react";
import { sendMessage } from "../../../firebase";
import "./chatMessageInput.css";

function ChatMessageInput({ roomId }) {
  // セッション管理してリロード時のstateリセットによるログインページに遷移しないように
  const auth_user = JSON.parse(sessionStorage.getItem("AUTH_USER"));
  const [value, setValue] = React.useState("");

  const handleChange = (e) => {
    setValue(e.target.value);
  };
  // 送信処理
  const handleSubmit = (e) => {
    e.preventDefault();
    // firebaseのsendMessage関数を呼び出して、dbに値をセット
    sendMessage(roomId, auth_user, value);
    // 送信後は入力欄を空にする
    setValue("");
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="message_input_container">
        {/* できたらtextareaで改行可能に */}
        <input
          type="text"
          placeholder="メッセージを入力しよう！"
          value={value}
          onChange={handleChange}
          className="message_input"
          // 空送信できないように
          required="true" // valueが1文字以上でないとenter押せない
          minLength={1}
        />
        <button type="submit" disabled={value < 1} className="send_message">
          送信
        </button>
      </form>
    </div>
  );
}

export default ChatMessageInput;
