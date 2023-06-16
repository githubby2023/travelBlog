import React from "react";
import "./Profile.scss";

const LatestBlogCard = ({ blog }) => {
  // console.log("Blog caption is " + blog.caption);
  return (
    <>
      <a href="/post" issender={true} className="row lastest-container">
        {/* Wait finish fetching then baru render */}
        {blog.image && (
          <>
            <img
              className="image-container col-md-6"
              src={
                blog.image["cover picture"] ??
                require("assets/img/fabio-mangione.jpg")
              }
              alt={blog.topic ?? ""}
            />
            <div className="col-md-6 text">
              <h4 className="title">{blog.topic ?? ""}</h4>
              <h6 className="desc">{blog.caption["paragraph 1"] ?? ""}</h6>
            </div>
          </>
        )}
      </a>
    </>
  );
};

export default LatestBlogCard;
