/**
 * 指定されたroomId内のチャット一覧を取得するhooks?
 * 取得関数はgetMessages()
 */

import React from "react";
import { getMessages } from "../firebase";

function useMessages(roomId) {
  const [messages, setMessages] = React.useState([]);

  // roomIDがセットされると発火 → roomIDのroom内データを取得 → return
  React.useEffect(() => {
    const unsubscribe = getMessages(roomId, setMessages);

    return unsubscribe;
  }, [roomId]);

  return messages;
}

export { useMessages };
