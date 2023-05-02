import React from "react";
import { BsThreeDotsVertical } from "react-icons/bs";

import "./Landing.scss";
import {
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
} from "reactstrap";

const LandingPost = () => {
    

  return (
    <div className="container" lg="12" href="/post">
      <div className="row">
          <div className="post-card-container mx-auto col-md-6">
            <div className="post-card-header">
              <div className="post-profile">
                <div className="post-profile-pic">
                  <img
                    alt="..."
                    className="img-circle img-no-padding img-responsive my-auto"
                    src={require("assets/img/faces/joe-gardner-2.jpg")}
                  />
                </div>
                <div className="post-header-text my-auto">
                  <h6>Xuan</h6>
                  <p>location</p>
                </div>
              </div>
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
                  <DropdownItem
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                  >
                    Report
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </div>
            <div className="post-card-content">
              <img
                alt="..."
                className="post-image img-rounded img-no-padding img-responsive"
                src={require("assets/img/faces/joe-gardner-2.jpg")}
                // src={userProps.}
              />
              {/* <p className="post-time">time</p> */}
              <p className="post-caption">
                Lorem Ipsum blabla Lorem Ipsum blabla Lorem Ipsum blabla Lorem
                Ipsum blabla Lorem Ipsum blabla Lorem Ipsum blabla Lorem Ipsum
                blabla{" "}
              </p>
              <a href="/post">View full post</a>
            </div>
            <div className="divider" />
            <div className="comment-container">
              <div className="comment">
                <div className="comment-profile-pic">
                  <img
                    alt="..."
                    className="img-circle img-no-padding img-responsive my-auto"
                    src={require("assets/img/faces/joe-gardner-2.jpg")}
                  />
                </div>
                <div className="comment-text my-auto">
                  <h6>userName</h6>
                  <p>
                    Lorem Ipsum blabla Lorem Ipsum blabla Lorem Ipsum blabla
                    Lorem Ipsum blablaLorem Ipsum blabla Lorem Ipsum blabla
                    Lorem Ipsum blabla Lorem Ipsum blabla Lorem Ipsum
                    blablaLorem Ipsum blabla
                  </p>
                  <p className="comment-time">time</p>
                </div>
              </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPost;
