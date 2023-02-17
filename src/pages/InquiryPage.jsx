/**
 * お問い合わせページ
 * 後回しにします
 */
import React from "react";
import SendMail from "../components/inquiryPage/SendMail";
import Sidebar from "../components/sidebar/Sidebar";
import "../App.css";
export function InquiryPage() {
  return (
    <div className="app">
      <Sidebar />
      <SendMail />
    </div>
  );
}

export default InquiryPage;
