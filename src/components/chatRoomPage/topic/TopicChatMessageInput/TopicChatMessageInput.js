import React from "react";
import { useAuth } from "../../../../hooks/useAuth";
import db, { sendMessage, sendTopicMessage } from "../../../../firebase";
import "./topicChatMessageInput.css";
import { useParams } from "react-router-dom";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";

function TopicChatMessageInput({ roomId }) {
  const { user } = useAuth();
  const [value, setValue] = React.useState("");
  const params = useParams();

  const handleChange = (e) => {
    setValue(e.target.value);
  };
  const handleSubmit = (e) => {
    // リロードされないように
    e.preventDefault();
    // firebaseのsendMessage関数を呼び出して、dbに値をセット
    sendTopicMessage(roomId, params.id2, user, value);
    // 送信後は入力欄を空にする
    setValue("");
  };

  async function sendTopicMessage(roomId, topicId, user, text) {
    // topic
    try {
      //   addDocとcollectionの関数を使用してドキュメントを追加
      // addDocを使用するために参照を取得するcollectionを使用
      //   collectionの引数 → パスを形成するfirebaseインスタンス chat-roomコレクション roomID(textでdogsとかfoodとか)コレクションのmessages(こいつもコレクション)
      //   多分firebaseのパス指定は、カンマ
      //   firestoreは存在しないコレクションとドキュメントを作成するため、目的のパスを指定するだけで済む
      //   個人的に後でroomごとのmembersっていうのとquiz追加して、自分の保持しているroomを表示
      await addDoc(
        collection(db, "chat-rooms", roomId, "topics", topicId, "messages"),
        {
          // db, "chat-rooms", roomId, "topic"
          // messagesの中に以下のプロパティが追加される(メッセージを送信するたびに)
          // userはuseAuthで取得したログインユーザー情報を使用していると思われ
          uid: user.uid,
          displayName: user.displayName,
          avatar: user.photoURL,
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

export default TopicChatMessageInput;
