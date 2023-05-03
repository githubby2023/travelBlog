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
    <div className="container" lg="12">
      <div className="row">
          <div className="post-card-container mx-auto col-md-6">
            <div className="post-card-header">
              <div className="post-profile">
                <div className="post-profile-pic">
                  <img
                    alt="..."
                    className="img-circle img-no-padding img-responsive my-auto"
                    src={require("assets/img/faces/ayo-ogunseinde-2.jpg")}
                  />
                </div>
                <div className="post-header-text my-auto">
                  <h6>Ayo Ogunseinde</h6>
                  <p>Las Vegas</p>
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
                src={require("assets/img/faces/ayo-ogunseinde-2.jpg")}
                // src={userProps.}
              />
              {/* <p className="post-time">time</p> */}
              <p className="post-caption">
              Born to rhyme and born to shine - I live and breathe the rhythm of the streets, 
              turning words into art that speaks to the soul. With every beat, I tell a story of 
              struggle and triumph, of pain and joy, of love and hate. My voice is my weapon, 
              my pen is my shield, and my music is my legacy. I represent the voice of the voiceless, 
              the hope of the hopeless, the dream of the dreamers. Through my music, I bring people together, 
              break down barriers, and create a world where everyone has a chance to shine. This is hip-hop, 
              this is my life, and I wouldn't have it any other way. #HipHopNation #RapLife #Blessed{" "}
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
                    src={require("assets/img/faces/clem-onojeghuo-2.jpg")}
                  />
                </div>
                <div className="comment-text my-auto">
                  <h6>Clem Onojeghuo</h6>
                  <p>
                    Wow this is amazing caption. Hope to see more nice picture from you in the future
                  </p>
                  <p className="comment-time">17/4/23 12.00pm</p>
                </div>
              </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPost;
