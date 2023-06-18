import React from "react";
import "./PostHeader.js";
import { AiTwotoneEdit, AiFillStar, AiFillDelete } from "react-icons/ai";

const PostHeader = ({ toggleModal, issender, blog }) => {
  const [rating, setRating] = React.useState(0);

  React.useEffect(() => {
    console.log(blog.rating);
    const ratingValues = Object.values(blog.rating);
    console.log(ratingValues);
    const sum = ratingValues.reduce((acc, value) => acc + value);
    setRating(sum);
  }, [blog.rating]);

  return (
    <div className="post-header">
      <div className="title-container">
        <h2 className="post-title">{blog.topic}</h2>
        {issender ? (
          <div>
            <a href="/create">
              <AiTwotoneEdit className="icon" />
            </a>
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
