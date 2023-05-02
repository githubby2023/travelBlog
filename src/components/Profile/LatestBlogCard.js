import React from "react";
import "./Profile.scss";


const LatestBlogCard = ({blog}) => {
  return (
    <>
      <div className="row lastest-container">
        <img
          className="image-container col-md-6"
          src={blog.url}
          alt={blog.title}
        />
        <div className="col-md-6 text">
          <h4 className="title">{blog.title}</h4>
          <h6 className="desc">{blog.desc}</h6>
        </div>
      </div>
    </>
  );
};

export default LatestBlogCard;
