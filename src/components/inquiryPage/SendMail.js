import { Button } from "@mui/material";
import React from "react";
import { doc, setDoc } from "firebase/firestore";
import db from "../../firebase";
import "./SendMail.css";
import { useAuth } from "../../hooks/useAuth";
function SendMail() {
  const { user } = useAuth();
  function testMail() {
    console.log("testMail");
    // set
    setDoc(doc(db, "mail", user.uid), {
      to: "muna.sakasakuta@gmail.com",
      from: user.email,
      message: {
        subject: "Hello from Firebase!",
        html: "This is an <code>HTML</code> email body.",
      },
    });
  }
  return (
    <div>
      {/* <p class="send">認証メールを送信しました。</p>
      <p class="link">
        メール本文に記載されたリンクから、​<br></br>登録を完了してください。​​
      </p>
      <p class="limit">リンクの期限は一時間です。​</p>
      <a href="">
        <p class="case"> メールが届かない場合</p>
      </a> */}
      <h2>お問い合わせページ</h2>
      <button onClick={testMail}></button>
      <Button onClick={testMail}>送信</Button>
    </div>
  );
}

export default SendMail;
