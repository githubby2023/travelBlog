import React from "react";
import "./Profile.scss";

const PostedBlogCard = (props) => {
  const { blogProps } = props;
  return (
    <>
      <a href="/post" isSender={true} className="blog-card-container">
        <h4 className="blog-title">{blogProps.title}</h4>
        <img
          className="image-container"
          src={blogProps.url}
          alt={blogProps.title}
        />
        <h6 className="blog-desc">{blogProps.desc}</h6>
      </a>
    </>
  );
};

export default PostedBlogCard;
