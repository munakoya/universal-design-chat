import React, { useState } from 'react'
import styles from "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import { v4 as uuidv4 } from "uuid";
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  Avatar,
  Button,
} from "@chatscope/chat-ui-kit-react";
import { useParams } from 'react-router-dom';
import "./topicChatui.css"
import { Box, Input, TextField } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { useTopicMessages } from '../../../hooks/useMessages';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import db from '../../../firebase';
function TopicChatui({ roomId }) {
    const params = useParams();
    const auth_user = JSON.parse(sessionStorage.getItem("AUTH_USER"));
    const messages = useTopicMessages(params.id, params.id2
    )

    const [value, setValue] = useState()

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


    const handleChange = (e) => {
        setValue(e.target.value);
        console.log("onchange : ", value)
  };
    // 送信処理
  const handleSubmit = (e) => {
      e.preventDefault();
      console.log("実行")
    // firebaseのsendMessage関数を呼び出して、dbに値をセット
    sendTopicMessage(roomId, params.id2,auth_user, value);
    // 送信後は入力欄を空にする
    setValue("");
  };

    function DispMessage({ message, isOwnMessage }) {
        const { displayName, text, avatar } = message
        return (
            <Message className='topic_messageBox'
            model={{
            message: text,
            sentTime: "just now",
            sender: displayName,
            direction: isOwnMessage ?("outgoing"):("incoming"), // 方向 識別
            }} avatarSpacer={true} avatarPosition={isOwnMessage ? ("top-right") : ("top-left")}>
            {
            isOwnMessage ?(null):( <Avatar src={avatar}  />)
            }
            </Message>
        )
    }
  return (
    
    <div style={{ position: "relative", height: "84vh" }} WidthFull className="topic_chatui_container">
      <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    ></Box>
    <MainContainer>
    <ChatContainer>
                  <MessageList className='topic_messageList' style={{
                      
                  }}>
        {messages.map((x) => (
            <DispMessage key={x.id} message={x} isOwnMessage={x.uid === auth_user.uid} />
        ))}
    </MessageList>
          <div as={MessageInput} className="topic_input_container">
          <TextField
          id="filled-multiline-flexible"
          label="メッセージを入力してね！"
          multiline
          maxRows={4}
          variant="filled"
          className='topic_messageInput'
          value={value}
          onChange={handleChange}
        />

            <Button className='topic_sendButton' onClick={handleSubmit}><SendIcon style={{
              fontSize:"30"
            }} /></Button>
                  </div>
    </ChatContainer>
    </MainContainer>
</div>
  )
}

export default TopicChatui