/*
投稿されたツイートを表示するコンポーネント

*/
import React, { forwardRef } from "react";
import {
  ChatBubbleOutline,
  FavoriteBorder,
  PublishOutlined,
  Repeat,
  VerifiedUser,
} from "@mui/icons-material";
import { Avatar } from "@mui/material";
import "./Post.css";

// なめらかに動かす(udemy 47)
const Post = forwardRef(
  // propsで受け取る変数 → Timeline.jsでuseState使ってfirebaseから値を取得 ex) post.displayName
  // propsとref → fowardRefの()で最後閉じる
  ({ displayName, username, verified, text, image, avatar }, ref) => {
    return (
      // Timeline.jsからのpropsを使って(dbから取得したデータ) post内容を表示
      //   タイムラインの投稿部分
      // 大枠のdivにもrefをつけること
      <div className="post" ref={ref}>
        <div className="post_avatar">
          {/* アバターの作成 srcに画像を入れてあげる */}
          <Avatar src={avatar} />
        </div>
        <div className="post_body">
          <div className="post_header">
            <div className="post_headerText">
              {/* のちのちpropsでやります */}
              <h3>
                {/* jsx記法で受け取った引数を表示 */}
                {displayName}
                <span className="post_headerSpecial">
                  {/* マテリアルUIっすね バッジマーク 、、、いらん */}
                  <VerifiedUser className="post_badge" />@{username}
                </span>
              </h3>
            </div>
            {/* ツイートのテキスト内容 */}
            <div className="post_headerDescription">
              <p>{text}</p>
            </div>
          </div>
          {/* ランダムで画像を取ってくる */}
          <img src={image} />
          {/* footer → 実装しなくてもいいかなと */}
          <div className="post_footer">
            <ChatBubbleOutline fontSize="small" />
            <Repeat fontSize="small" />
            <FavoriteBorder fontSize="small" />
            <PublishOutlined fontSize="small" />
          </div>
        </div>
      </div>
    );
  }
);

export default Post;
