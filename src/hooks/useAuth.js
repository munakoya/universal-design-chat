import React from "react";
import { AuthContext } from "../context/auth";

// カスタムフックのuseAuth → 認証情報をグローバルで使える

function useAuth() {
  const value = React.useContext(AuthContext);
  if (!value) {
    throw new Error("AuthContext's value is undefined.");
  }

  return value;
}

export { useAuth };
