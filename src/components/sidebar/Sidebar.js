/*
Sidebarコンポーネント
ずっと左側に固定されている、navBar的な役割
すべてのページに使用
*/
import React from "react";
import { Avatar, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/Notifications";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import ChatIcon from "@mui/icons-material/Chat";
import SidebarOption from "./SidebarOption";
import "./Sidebar.css";

function Sidebar() {
  const { user } = useAuth();
  return (
    <div className="sidebar">
      <div className="sidebar_profile">
        <Link to="/mypage">
          <Avatar
            src={
              // この書き方するとよき
              user
                ? user.photoURL
                : sessionStorage.getItem("AUTH_USER_PHOTOURL")
            }
          />
          <h3 className="pro_user_name">
            ：
            {user ? user.displayName : sessionStorage.getItem("AUTH_USER_NAME")}
          </h3>
        </Link>
      </div>

      {/* サイドバーオプション */}
      <nav>
        <Link to="/">
          <SidebarOption text="ホーム" Icon={HomeIcon} />
        </Link>
        <Link to="/rooms">
          {/* TODO icon変更 */}
          <SidebarOption text="ルーム" Icon={ChatIcon} />
        </Link>
        <Link to="/search-rooms">
          <SidebarOption text="ルーム検索" Icon={SearchIcon} />
        </Link>
        <Link to="/inquiry">
          <SidebarOption text="お問い合わせ" Icon={NotificationsIcon} />
        </Link>
        <Link to="/mypage">
          <SidebarOption text="マイページ" Icon={PermIdentityIcon} />
        </Link>
      </nav>

      {/* fullWidth → 画面いっぱい */}
      <Button variant="outlined" className="sidebar_tweet" fullWidth>
        <Link to={"/create-room"}>新規ルーム作成</Link>
      </Button>
    </div>
  );
}

export default Sidebar;
