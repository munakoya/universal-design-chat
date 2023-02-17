/*
投稿されたツイートのコンポーネント
*/
import React, { forwardRef } from "react";
import { Link } from "react-router-dom";
import { Avatar } from "@mui/material";
import "./post.css";

// なめらかに動かす(udemy 47)
const Post = forwardRef(
  // propsで受け取る変数 → Timeline.jsでuseState使ってfirebaseから値を取得 ex) post.displayName
  // propsとref → fowardRefの()で最後閉じる
  ({ displayName, text, image, avatar, roomId }, ref) => {
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
                <h3>{displayName}</h3>
              </div>
              {/* ツイートのテキスト内容 */}
              <div className="post_headerDescription">
                <p>{text}</p>
              </div>
            </div>
            {/* youtubeのurlの処理はfirebase.jsのsendTweetにあります */}
            {image.indexOf("embed") === -1 ? (
              <img src={image} alt="" />
            ) : (
              <div className="iframe_wrapper">
                <iframe
                  src={image}
                  alt=""
                  controls
                  playsInline
                  title="指定された画像or動画"
                  allowFullScreen // 全画面
                ></iframe>
              </div>
            )}
          </div>
        </div>
      </Link>
    );
  }
);

export default Post;
