import React from "react";
import { getMessages } from "../firebase";
// roomIdを引数に
function useMessages(roomId) {
  const [messages, setMessages] = React.useState([]);

  // roomIdがあるとき呼び出し？
  //
  React.useEffect(() => {
    const unsubscribe = getMessages(roomId, setMessages);

    return unsubscribe;
  }, [roomId]);

  return messages;
}

export { useMessages };
