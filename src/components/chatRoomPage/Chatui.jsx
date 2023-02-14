import React, { useState } from 'react'
import styles from "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
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
import { useMessages } from '../../hooks/useMessages';
import "./chatui.css"
import { sendMessage } from '../../firebase';
import { Box, Input, TextField } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
function Chatui({ roomId }) {
    const params = useParams();
    const auth_user = JSON.parse(sessionStorage.getItem("AUTH_USER"));
    const messages = useMessages(params.id)

    const [value, setValue] = useState("")

    const handleChange = (e) => {
        setValue(e.target.value);
        console.log("onchange : ", value)
  };
    // 送信処理
  const handleSubmit = (e) => {
    e.preventDefault();
    if (value === "") {
      return
    }
      console.log("実行")
    // firebaseのsendMessage関数を呼び出して、dbに値をセット
    sendMessage(roomId, auth_user, value);
    // 送信後は入力欄を空にする
    setValue("");
  };

    function DispMessage({ message, isOwnMessage }) {
        const { displayName, text, avatar } = message
        return (
            <Message className='messageBox'
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
    
    <div style={{ position: "relative", height: "84vh" }} WidthFull className="chatui_container">
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
                  <MessageList className='messageList' style={{
                      
                  }}>
        {messages.map((x) => (
            <DispMessage key={x.id} message={x} isOwnMessage={x.uid === auth_user.uid} />
        ))}
    </MessageList>
          <div as={MessageInput} className="input_container">
          <TextField
          id="filled-multiline-flexible"
          label="メッセージを入力してね！"
          multiline
          maxRows={4}
          variant="filled"
          className='messageInput'
          value={value}
          onChange={handleChange}
        />

            <Button className='sendButton' onClick={handleSubmit}><SendIcon style={{
              fontSize:"30"
            }} /></Button>
                  </div>
    </ChatContainer>
    </MainContainer>
</div>
  )
}

export default Chatui