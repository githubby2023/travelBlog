import React from "react";
import noImg from "../../assets/img/faces/noImage.png";

const Comment = ({ comment }) => {
  return (
    <div className="comment-container">
      <div className="comment">
        <div className="comment-profile-pic">
          <img
            alt={`${comment.commentor_name}`}
            className="img-circle img-no-padding img-responsive my-auto"
            src={comment.commentor_pic ?? noImg}
          />
        </div>
        <div className="comment-text my-auto">
          <h6>{comment.commentor_name}</h6>
          <p>{comment.comment}</p>
          <p className="comment-time">
            {/* {new Intl.DateTimeFormat("en-US", {
              month: "long",
              day: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
            }).format(comment.comment_timestamp)} */}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Comment;
