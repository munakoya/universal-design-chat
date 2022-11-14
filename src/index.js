import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { AuthProvider } from "./context/auth";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // AuthProviderコンポーネントでApp囲んで使えるように
  // コンテキスト値をコンポーネント全体で使用できるように
  // これでuseAuth(多分カスタム)すると、ユーザーにログインしてアプリ全体で認証された情報を受け取れる

  <AuthProvider>
    <App />
  </AuthProvider>
);
