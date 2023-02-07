/*
Sidebarコンポーネント
ずっと左側に固定されている、navBar的な役割
すべてのページに使用

TODO
ルームタブのmaterial UI iconを変更
*/
import React from "react";
import SidebarOption from "./SidebarOption";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/Notifications";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import ChatIcon from "@mui/icons-material/Chat";
import { Avatar, Button } from "@mui/material";
import { Link } from "react-router-dom";
import udc_icon from "../../img/UDC_icon.png";
import "./Sidebar.css";
import { useAuth } from "../../hooks/useAuth";
function Sidebar() {
  const { user } = useAuth();
  return (
    <div className="sidebar">
      {/* <img src={udc_icon} className="sidebar_udc_icon" alt="udc_icon" /> */}
      <div className="sidebar_profile">
        <Link to="/mypage">
          {/* 三項演算子使うのが一番アクセスいい → セッションのみの記述だとアクセス時にアイコンが反映されない */}
          <Avatar
            src={
              user
                ? user.photoURL
                : sessionStorage.getItem("AUTH_USER_PHOTOURL")
            }
          />
          <h3 className="pro_user_name">
            ：{sessionStorage.getItem("AUTH_USER_NAME")}
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
