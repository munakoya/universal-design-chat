import { Search } from "@mui/icons-material";
import React from "react";

// twitterのライブラリ
import {
  TwitterTimelineEmbed,
  TwitterShareButton,
  TwitterTweetEmbed,
} from "react-twitter-embed";
import "./Widgets.css";

function Widgets() {
  return (
    // 基本classNameはcssのときに使います。css当てるのが楽になるだけなのでそこまで気にしなくておk
    <div className="widgets">
      <div className="widgets_input">
        <Search className="widgets_searchicon" />
        <input placeholder="キーワード検索" type="text" />
      </div>
      <div className="widgets_widgetContainer">
        <h2>いまどうしてる？</h2>
        {/* タイムラインを取得 */}
        <TwitterTimelineEmbed
          sourceType="profile"
          // どの人のタイムラインか
          screenName="SoccerKingJP"
          options={{ height: 450 }}
        />
        <TwitterShareButton
          url={"https://twitter.com/SoccerKingJP"}
          options={{ text: "#W杯", via: "SoccerKingJP" }}
        />
        {/* ライブラリを追加 → 使い方はtwitter-tweetEmbed調べて*/}
        <TwitterTweetEmbed
          tweetId={"1588924861279539200"}
          options={{ height: 400 }}
        />
      </div>
    </div>
  );
}

export default Widgets;
