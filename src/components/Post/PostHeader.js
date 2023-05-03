import React from "react";
import "./PostHeader.js";
import { AiTwotoneEdit } from "react-icons/ai";
import { AiFillDelete } from "react-icons/ai";

const PostHeader = ({ toggleModal }) => {
  return (
    <div className="post-header">
      <div className="title-container">
        <h1 className="post-title">Topic</h1>
        <div>
          <a href="/create">
            <AiTwotoneEdit className="icon" />
          </a>

          <AiFillDelete className="icon red" onClick={toggleModal} />
        </div>
      </div>
      <div className="subtitle-row">
        <p className="location">Malaysia</p>
        <p className="time">10:00am</p>
      </div>
    </div>
  );
};

export default PostHeader;
