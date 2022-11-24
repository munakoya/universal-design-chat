import React from "react";
import SendMail from "../components/inquiryPage/SendMail";
import Sidebar from "../components/sidebar/Sidebar";

export function InquiryPage() {
  return (
    <div className="app">
      <Sidebar />
      <SendMail />
    </div>
  );
}

export default InquiryPage;
