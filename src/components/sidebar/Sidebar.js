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
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import udc_icon from "../../img/UDC_icon.png";
import "./Sidebar.css";
function Sidebar() {
  return (
    <div className="sidebar">
      <img src={udc_icon} className="sidebar_udc_icon" alt="udc_icon" />

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
        投稿する
      </Button>
    </div>
  );
}

export default Sidebar;
