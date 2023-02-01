/**
 * ルーム内の話題ごとのチャットルーム → 送信のとこ
 */
import React from "react";
import { useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import db from "../../../../firebase";
import "./topicChatMessageInput.css";

function TopicChatMessageInput({ roomId }) {
  // セッション管理してリロード時のstateリセットによるログインページに遷移しないように
  const auth_user = JSON.parse(sessionStorage.getItem("AUTH_USER"));

  const [value, setValue] = React.useState("");
  const params = useParams();

  const handleChange = (e) => {
    setValue(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // firebaseのsendTopicMessage関数を呼び出して、dbに値をセット → roomIDはuseParams使って取得してもおk
    sendTopicMessage(roomId, params.id2, auth_user, value);
    // 送信後は入力欄を空にする
    setValue("");
  };

  async function sendTopicMessage(roomId, topicId, auth_user, text) {
    try {
      await addDoc(
        collection(db, "chat-rooms", roomId, "topics", topicId, "messages"),
        {
          uid: auth_user.uid,
          displayName: auth_user.displayName,
          avatar: auth_user.photoURL,
          text: text.trim(),
          timestamp: serverTimestamp(),
          messageId: uuidv4(),
        }
      );
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="message_input_container">
        <input
          type="text"
          placeholder="メッセージを入力しよう！"
          value={value}
          onChange={handleChange}
          className="message_input"
          // 空送信できないように
          required="true" // 指定しなくても送信ボタンが押せないためなくても良い
          minLength={1}
        />
        <button type="submit" disabled={value < 1} className="send_message">
          送信
        </button>
      </form>
    </div>
  );
}

export default TopicChatMessageInput;
