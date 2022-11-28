/*
メッセージフォームのコンポーネント
*/
import React from "react";
import { useAuth } from "../../../hooks/useAuth";
import { sendMessage } from "../../../firebase";
import "./chatMessageInput.css";

function ChatMessageInput({ roomId }) {
  const { user } = useAuth();
  const [value, setValue] = React.useState("");

  const handleChange = (e) => {
    setValue(e.target.value);
  };
  const handleSubmit = (e) => {
    // リロードされないように
    e.preventDefault();
    // firebaseのsendMessage関数を呼び出して、dbに値をセット
    sendMessage(roomId, user, value);
    // 送信後は入力欄を空にする
    setValue("");
  };

  return (
    //   {/* // buttonで実行 → handlSubmit */}
    <div>
      <form onSubmit={handleSubmit} className="message_input_container">
        <input
          type="text"
          placeholder="Enter a message"
          value={value}
          onChange={handleChange}
          className="message_input"
          // 空送信できないように
          required
          minLength={1}
        />
        <button type="submit" disabled={value < 1} className="send_message">
          Send
        </button>
      </form>
    </div>
  );
}

export default ChatMessageInput;
