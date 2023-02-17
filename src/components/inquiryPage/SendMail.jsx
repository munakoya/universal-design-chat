/**
 * お問い合わせページ
 *
 * TODO
 * cloudFunctionsなどを使用して、問い合わせの際に通知、自動返信などできたら
 */

import React, { useState } from "react";
import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import db from "../../firebase";
import "./SendMail.css";

function SendMail() {
  const auth_user = JSON.parse(sessionStorage.getItem("AUTH_USER"));
  const [inquiryTitle, setInquiryTitle] = useState("");
  const [inquiryContent, setInquiryContent] = useState("");

  async function sendInquiryForm(e) {
    e.preventDefault();
    if (inquiryTitle === "" || inquiryContent === "") {
      alert("タイトルとお問い合わせ内容を入力してね！");
      return;
    }
    try {
      if (window.confirm("入力した内容を送信します！")) {
        await addDoc(collection(db, "inquiry"), {
          title: inquiryTitle,
          text: inquiryContent,
          from: auth_user.uid,
          user: auth_user.displayName,
          email: auth_user.email,
          timestamp: serverTimestamp(),
        });
        setInquiryTitle("");
        setInquiryContent("");
      }
    } catch (error) {
      alert(error);
    }
  }

  return (
    <div className="sendMail">
      <div className="sendMail-header">
        <h2>お問い合わせ</h2>
      </div>
      <div className="sendMail_container">
        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 1, width: "25ch" },
          }}
          noValidate
          autoComplete="off"
        >
          <div className="sendMail-form">
            <TextField
              className="sendMail-title"
              id="filled-textarea"
              label="タイトル"
              placeholder="ex)〇〇の機能を追加してほしい！！"
              multiline
              variant="filled"
              type="text"
              value={inquiryTitle}
              onChange={(e) => setInquiryTitle(e.target.value)}
              required={true}
            />
            <TextField
              className="sendMail-content"
              id="filled-multiline-static"
              label="お問い合わせ内容"
              multiline
              rows={8}
              variant="filled"
              type="text"
              value={inquiryContent}
              onChange={(e) => setInquiryContent(e.target.value)}
              required={true}
            />
          </div>
        </Box>
        <div className="Send">
          <Button
            type="submit"
            onClick={sendInquiryForm}
            variant="contained"
            style={{
              width: "80%",
              backgroundColor: "#50b7f5",
              margin: "5%",
              borderRadius: "30px",
            }}
          >
            送信
          </Button>
        </div>
      </div>
    </div>
  );
}

export default SendMail;
