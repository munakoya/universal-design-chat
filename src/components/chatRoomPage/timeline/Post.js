/*
投稿されたツイートのコンポーネント

TODO
話題の投稿
*/
import React, { forwardRef } from "react";
import {
  ChatBubbleOutline,
  FavoriteBorder,
  PublishOutlined,
  Repeat,
  VerifiedUser,
} from "@mui/icons-material";
import { Avatar, Button } from "@mui/material";
import "./post.css";
import { Link } from "react-router-dom";

// なめらかに動かす(udemy 47)
const Post = forwardRef(
  // propsで受け取る変数 → Timeline.jsでuseState使ってfirebaseから値を取得 ex) post.displayName
  // propsとref → fowardRefの()で最後閉じる
  ({ displayName, username, verified, text, image, avatar, roomId }, ref) => {
    return (
      // 大枠のdivにもrefをつけること
      <Link to={`/room/${roomId}/chat-room/topic/${text}`}>
        <div className="post" ref={ref}>
          <div className="post_avatar">
            <Avatar src={avatar} />
          </div>
          <div className="post_body">
            <div className="post_header">
              <div className="post_headerText">
                {/* ユーザーネーム */}
                <h3>
                  {displayName}
                  {/* <span className="post_headerSpecial"> */}
                  {/* バッジ */}
                  {/* <VerifiedUser className="post_badge" />@{username} */}
                  {/* </span> */}
                </h3>
              </div>
              {/* ツイートのテキスト内容 */}
              <div className="post_headerDescription">
                <p>{text}</p>
              </div>
            </div>
            {/* ランダムで画像を取ってくる */}
            <img src={image} alt="" />
            {/* footer → 実装しなくてもいいかなと */}
            {/* <div className="post_footer">
            <ChatBubbleOutline fontSize="small" />
            <Repeat fontSize="small" />
            <FavoriteBorder fontSize="small" />
            <PublishOutlined fontSize="small" />
          </div> */}
          </div>
        </div>
      </Link>
    );
  }
);

export default Post;
