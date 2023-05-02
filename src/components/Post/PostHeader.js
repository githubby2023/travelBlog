import React from "react";
import "./PostHeader.js"

const PostHeader = () => {
  return (
    <div className="post-header">
      <div className="title-container">
        <h1 className="post-title">Topic</h1>
      </div>
      <div className="subtitle-row">
      <p className="location">Malaysia</p>
      <p className="time">10:00am</p>

      </div>
      
    </div>
  );
};

export default PostHeader;
