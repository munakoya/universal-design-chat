/*
投稿されたツイートのコンポーネント

TODO
投稿時の改行と出力時の改行の実装
投稿時はtexaareaに変更するだけ
*/
import React, { forwardRef } from "react";
import { Avatar } from "@mui/material";
import "./Post.css";

// なめらかに動かす(udemy 47)
const Post = forwardRef(
  // propsとref → fowardRefの()で最後閉じる
  ({ displayName, text, image, avatar }, ref) => {
    return (
      // 大枠のdivにもrefをつけること
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
            {/* ツイートのテキスト内容 ここpタグ一つにまとめてるから改行されない？*/}
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
              ></iframe>
            </div>
          )}

          {/* footer → 実装しなくてもいいかなと */}
          <div className="post_footer"></div>
        </div>
      </div>
    );
  }
);

export default Post;
