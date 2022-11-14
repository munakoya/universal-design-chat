import React from "react";
// 使用したいmaterial UIのアイコンをimport
import TwitterIcon from "@mui/icons-material/Twitter";
import SidebarOption from "./SidebarOption";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import NotificationsIcon from "@mui/icons-material/Notifications";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
// material UIのボタン → プロパティを設定してあげると
import { Button } from "@mui/material";
// cssのダウンロード
import "./Sidebar.css";
// ルーティング
import { Link } from "react-router-dom";
function Sidebar() {
  return (
    <div className="sidebar">
      {/* ツイッターアイコン */}
      <TwitterIcon className="sidebar_twitterIcon" />

      {/* サイドバーオプション */}
      {/* コンポーネントの引数、コンストラクタみたいなのがprops textとIconデータを渡す */}
      <nav>
        <Link to="/">
          {" "}
          {/* propsで送りたいデータ(共通の形)を決めて受け取る側で変数用意 */}
          <SidebarOption text="ホーム" Icon={HomeIcon} active />
        </Link>
        <Link to="/rooms">
          <SidebarOption text="ルーム" Icon={MailOutlineIcon} />
        </Link>
        <Link to="/tags">
          <SidebarOption text="タグ検索" Icon={SearchIcon} />
        </Link>
        <Link to="/inquiry">
          <SidebarOption text="お問い合わせ" Icon={NotificationsIcon} />
        </Link>
        {/* <SidebarOption text="ブックマーク" Icon={BookmarkBorderIcon} />
      <SidebarOption text="リスト" Icon={ListAltIcon} /> */}
        <Link to="/mypage">
          <SidebarOption text="マイページ" Icon={PermIdentityIcon} />
        </Link>
        {/* <SidebarOption text="もっとみる" Icon={MoreHorizIcon} /> */}
      </nav>

      {/* ツイートボタン */}
      {/* fullWidth → 画面いっぱい */}
      <Button variant="outlined" className="sidebar_tweet" fullWidth>
        ツイートする
      </Button>
    </div>
  );
}

export default Sidebar;
