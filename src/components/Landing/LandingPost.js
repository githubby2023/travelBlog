import React from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import "./Landing.scss";
import {
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
} from "reactstrap";
import Comment from "./Comment";
import { queryBlogComments } from "../../api/queryBlog";
import { Link } from "react-router-dom";

const LandingPost = ({ user, blog }) => {
  const [comments, setComments] = React.useState([]);

  React.useEffect(() => {
    queryBlogComments(blog.postId).then((queryComments) => {
      if (queryComments) {
        setComments(queryComments);
      }
    });
  }, []);

  return (
    <div className="container" lg="12">
      <div className="row">
        <div className="post-card-container mx-auto col-md-6">
          <div className="post-card-header">
            <div className="post-profile">
              <div className="post-profile-pic">
                <img
                  alt="..."
                  className="img-circle img-no-padding img-responsive my-auto"
                  src={
                    user.profilepic ?? require("assets/img/faces/noImage.png")
                  }
                />
              </div>
              <div className="post-header-text my-auto">
                <h6>{user.username}</h6>
                <p>{user.nationality}</p>
              </div>
            </div>
            {/* Right 3 dots menu */}
            <UncontrolledDropdown className="dropdown my-auto">
              <DropdownToggle
                className="toggle"
                color="#ffffff"
                id="postDropdown"
                size="md"
                nav
              >
                <BsThreeDotsVertical
                  id="postDropdown"
                  className="three-dot-icon my-auto"
                />
              </DropdownToggle>
              <DropdownMenu
                aria-labelledby="postDropdown"
                className="dropdown-info"
              >
                {/* <DropdownItem header tag="span">
                    Nationality
                  </DropdownItem> */}
                <DropdownItem href="#pablo" onClick={(e) => e.preventDefault()}>
                  Report
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </div>
          <div className="post-card-content">
            <img
              alt="..."
              className="post-image img-rounded img-no-padding img-responsive"
              src={
                blog.image["cover picture"] ??
                require("assets/img/faces/ayo-ogunseinde-2.jpg")
              }
            />
            {/* <p className="post-time">time</p> */}
            <p className="post-caption">{blog.caption["paragraph 1"]}</p>
            {/* <a href={`/post/${blog.postId}`} >View full post</a> */}
            <Link
              to={{
                pathname: `/post/${blog.postId}`,
                state: { blog, user, comments },
              }}
            >
              View full post
            </Link>
          </div>
          <div className="divider" />
          {comments && comments.map((comment) => <Comment comment={comment} />)}
        </div>
      </div>
    </div>
  );
};

export default LandingPost;
