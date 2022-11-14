import { Button } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { auth } from "../../firebase";
import SignIn from "../../pages/SignIn";
// import SignOutButton from "../../pages/SignIn";

function Profile() {
  function SignOut() {
    return auth.signOut();
  }
  return (
    <div>
      <h1>Profile</h1>
      <Button onClick={SignOut}>ログアウト</Button>
    </div>
  );
}

export default Profile;
