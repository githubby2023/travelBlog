import React from "react";
import "./Profile.scss";
import { Link } from "react-router-dom";

const PostedBlogCard = ({ blog, user }) => {
  const [comments, setComments] = React.useState([]);

  return (
    <>
      {blog.image && (
        <Link
          to={{
            pathname: `/post/${blog.postId}`,
            state: { blog, user, comments },
          }}
        >
          <div className="blog-card-container">
            <h4 className="blog-title">{blog.topic}</h4>
            <img
              className="image-container"
              src={blog.image["cover picture"]}
              alt={blog.topic}
            />
            <h6 className="blog-desc">{blog.caption["paragraph 1"]}</h6>
          </div>
        </Link>
      )}
    </>
  );
};

export default PostedBlogCard;
