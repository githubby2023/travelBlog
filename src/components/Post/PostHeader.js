import React from "react";
import "./PostHeader.js";
import { AiTwotoneEdit, AiFillStar, AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";

const PostHeader = ({ toggleModal, issender, blog }) => {
  const [rating, setRating] = React.useState(0);

  React.useEffect(() => {
    const ratingValues = Object.values(blog.rating);
    if (ratingValues.length === 0) {
      setRating(0);
    } else {
      const sum = ratingValues.reduce((acc, value) => acc + value);
      setRating(Math.floor(sum/ratingValues.length));
    }
  }, [blog.rating]);

  return (
    <div className="post-header">
      <div className="title-container">
        <h2 className="post-title">{blog.topic}</h2>
        {issender ? (
          <div>
            <Link
              className="white-text"
              to={{
                pathname: `/create/${blog.postId}`,
                state: { blog },
              }}
            >
              <AiTwotoneEdit className="icon" />
            </Link>
            <AiFillDelete className="icon red" onClick={toggleModal} />
          </div>
        ) : (
          <div></div>
        )}
      </div>
      <div className="subtitle-row">
        <p className="location">
          {blog.location === "" ? "No location" : blog.location}
        </p>
        <p className="time">
          {/* {new Intl.DateTimeFormat("en-US", {
            month: "long",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
          }).format(blog.timestamp)} */}
        </p>
        <p>
          <AiFillStar />
          {`   ${rating}`}
        </p>
      </div>
    </div>
  );
};

export default PostHeader;
