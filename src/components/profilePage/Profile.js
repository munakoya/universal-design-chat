import { Button } from "@mui/material";
import React from "react";
import { useAuth } from "../../hooks/useAuth";

function Profile() {
  function SignOut() {}
  // ログインユーザー情報
  const { user } = useAuth();
  return (
    <div>
      <h1>Profile</h1>
      {console.log(user)}
      <Button onClick={SignOut}>ログアウト</Button>
    </div>
  );
}

export default Profile;
