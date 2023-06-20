import React from "react";
import noImg from "../../assets/img/faces/noImage.png";
import { formatTime } from "../Utils/formatDate";

const Comment = ({ comment }) => {
  const [currentComment, setCurrentComment] = React.useState({});

  React.useEffect(() => {
    setCurrentComment(comment);
  }, [comment]);

  return (
    // console.log("Time is " + (currentComment.comment_timestamp.toDate())),
    (
      <>
        {currentComment.comment !== "" && (
          <div className="comment-container">
            <div className="comment">
              <div className="comment-profile-pic">
                <img
                  alt={`${currentComment.commentor_name}`}
                  className="img-circle img-no-padding img-responsive my-auto"
                  src={currentComment.commentor_pic ?? noImg}
                />
              </div>
              <div className="comment-text my-auto">
                <h6>{currentComment.commentor_name}</h6>
                <p>{currentComment.comment}</p>
                {/* <p className="comment-time"> */}
                  {/* {new Intl.DateTimeFormat("en-US", {
                  month: "long",
                  day: "2-digit",
                  hour: "2-digit",
                  minute: "2-digit",
                }).format(currentComment.comment_timestamp.toDate())} */}
                {/* </p> */}
              </div>
            </div>
          </div>
        )}
      </>
    )
  );
};

export default Comment;
