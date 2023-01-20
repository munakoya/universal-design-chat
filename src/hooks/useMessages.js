/**
 * 指定されたroomId内のチャット一覧を取得するhooks?
 * 取得関数はgetMessages()
 */

import React from "react";
import { getMessages, getTopicMessages } from "../firebase";

function useMessages(roomId) {
  const [messages, setMessages] = React.useState([]);

  // roomIDがセットされると発火 → roomIDのroom内データを取得 → return
  React.useEffect(() => {
    const unsubscribe = getMessages(roomId, setMessages);

    return unsubscribe;
  }, [roomId]);

  return messages;
}

function useTopicMessages(roomId, topicId) {
  const [messages, setMessages] = React.useState([]);

  // roomIDがセットされると発火 → roomIDのroom内データを取得 → return
  React.useEffect(() => {
    const unsubscribe = getTopicMessages(roomId, topicId, setMessages);

    return unsubscribe;
  }, [roomId, topicId]);

  return messages;
}

export { useMessages, useTopicMessages };
