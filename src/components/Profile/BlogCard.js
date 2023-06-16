import React from "react";
import "./Profile.scss";

const PostedBlogCard = (props) => {
  const { blogProps } = props;
  return (
    <>
      {blogProps.image && (
        <a href="/post/" issender={true} className="blog-card-container">
          <h4 className="blog-title">{blogProps.topic}</h4>
          <img
            className="image-container"
            src={blogProps.image["cover picture"]}
            alt={blogProps.topic}
          />
          <h6 className="blog-desc">{blogProps.caption["paragraph 1"]}</h6>
        </a>
      )}
    </>
  );
};

export default PostedBlogCard;
