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
                    src={require("assets/img/faces/erik-lucatero-2.jpg")}
                  />
                </div>
                <div className="post-header-text my-auto">
                  <h6>Erik Lucatero</h6>
                  <p>Paris</p>
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
                src={require("assets/img/faces/erik-lucatero-2.jpg")}
                // src={userProps.}
              />
              {/* <p className="post-time">time</p> */}
              <p className="post-caption">
              Life is full of surprises, some good and some bad. But it's what we make of those surprises that define who we are.
               When we face challenges, we have a choice - to let them defeat us or to rise above them. It's not always easy, but it's always worth it. 
               The struggles we face are opportunities for growth, for learning, for becoming stronger and more resilient. And the victories we achieve 
               are the sweetest rewards, the moments we'll treasure forever. So don't be afraid to take risks, to step out of your comfort zone, to chase 
               your dreams. The road may be long and winding, but the destination is worth it. And along the way, remember to savor the small moments, 
               to appreciate the people who love you, to find joy in the simple things. Because in the end, it's not the destination that matters, 
               it's the journey. So embrace it, live it, love it. #LifeLessons #JourneyOfALifetime #NeverGiveUp{" "}
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
                  I couldn't agree more! The journey is what shapes us into the people we're meant to be.
                   It's not always easy, but the challenges we face along the way are what make us stronger, 
                   wiser, and more resilient. Here's to embracing the journey and all that it has to offer!
                  </p>
                  <p className="comment-time">18/4/23 12.30pm</p>
                </div>
              </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPost;
