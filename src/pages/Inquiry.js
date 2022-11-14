import React from "react";
import SendMail from "../components/mail/SendMail";
import Sidebar from "../components/sidebar/Sidebar";

export function Inquiry() {
  return (
    <div className="app">
      <Sidebar />
      <SendMail />
    </div>
  );
}

export default Inquiry;
