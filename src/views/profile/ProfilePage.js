import React from "react";
import ExamplesNavbar from "components/Navbars/ExamplesNavbar";
import "components/Profile/Profile.scss";
import PostedBlogCard from "components/Profile/BlogCard";
import ProfileCard from "components/Profile/ProfileCard";
import LatestBlogCard from "components/Profile/LatestBlogCard";
// import countries from "assets/countries.json";

import {
  Button,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Modal,
  UncontrolledDropdown,
} from "reactstrap";

const UserProfilePage = () => {
  // let pageHeader = React.createRef();

  const blogs = [
    {
      id: "saydgasad2d",
      title: "bruh22",
      url: "https://japan.stripes.com/sites/default/files/styles/community_site_carousel_750x500/public/article-images/main_13.jpg?itok=_GELFbpY",
      desc: "asdasdasd2",
    },
    {
      id: "saydgasad2d",
      title: "bruh22",
      url: "https://japan.stripes.com/sites/default/files/styles/community_site_carousel_750x500/public/article-images/main_13.jpg?itok=_GELFbpY",
      desc: "asdasdasd2",
    },
    {
      id: "saydgasad2d",
      title: "bruh22",
      url: "https://japan.stripes.com/sites/default/files/styles/community_site_carousel_750x500/public/article-images/main_13.jpg?itok=_GELFbpY",
      desc: "asdasdasd2",
    },
    {
      id: "saydgasad2d",
      title: "bruh22",
      url: "https://japan.stripes.com/sites/default/files/styles/community_site_carousel_750x500/public/article-images/main_13.jpg?itok=_GELFbpY",
      desc: "asdasdasd2",
    },
    {
      id: "saydgasad2d",
      title: "bruh22",
      url: "https://japan.stripes.com/sites/default/files/styles/community_site_carousel_750x500/public/article-images/main_13.jpg?itok=_GELFbpY",
      desc: "asdasdasd2",
    },
  ];
  const user = {
    uid: "1234",
    username: "john_doe",
    nationality: "USA",
    email: "john.doe@example.com",
    gender: "male",
    address: "123 Main St, Anytown USA",
    bio: "bruhrburhb ruhbruhrbu rhbruhbruhrburhbruhbruhr burhbruhbruhrburhbruhbruh rburhbruhbruhrburhb r u h bruhrbu rhbruh bruhrburhbruhbruhrburhb ruhbruhrb u rhbruhbruhrburhbruhbruhrb ur hb  ruhb  ruhrburhbruhbruhrburhbruhbruhrburhbruh",
    viewarray: [],
  };

  const continent = [
    "Asia",
    "North America",
    "South America",
    "Africa",
    "Europe",
    "Australia",
    "Antartica",
  ];

  const newBlogs = blogs.slice(1);

  // React.useEffect(() => {
  //   if (window.innerWidth < 991) {
  //     const updateScroll = () => {
  //       let windowScrollTop = window.pageYOffset / 3;
  //       pageHeader.current.style.transform =
  //         "translate3d(0," + windowScrollTop + "px,0)";
  //     };
  //     window.addEventListener("scroll", updateScroll);
  //     return function cleanup() {
  //       window.removeEventListener("scroll", updateScroll);
  //     };
  //   }
  // });

  const [isModalOpened, setModal] = React.useState(false);

  function toggleModal() {
    setModal((bool) => !bool);
  }

  return (
    <>
      <ExamplesNavbar />
      <Modal
        className="modal-container"
        isOpen={isModalOpened}
        toggle={toggleModal}
      >
        <div className="modal-header">
          <button
            aria-label="Close"
            className="close"
            type="button"
            onClick={toggleModal}
          >
            <span aria-hidden={true}>×</span>
          </button>
          <h4 className="modal-title text-center" id="editProfileModal">
            Edit Profile
          </h4>
        </div>
        <div className="modal-body">
          <div className="container">
            <div className="row">
              <div className="col">
                <form>
                  <label className="label-text">
                    Email:
                    <input
                      className="input-text"
                      placeholder="Default"
                      type="text"
                    />
                  </label>
                  <label className="label-text">
                    Name:
                    <input
                      className="input-text"
                      placeholder="Default"
                      type="text"
                    />
                  </label>
                  <label className="label-text">
                    Address:
                    <input
                      className="input-text"
                      placeholder="Default"
                      type="text"
                    />
                  </label>
                  {/* Gender */}
                  <label className="label-text">
                    Gender:
                    <div className="form-check-radio">
                      <label check>
                        <input
                          className="radio-label"
                          defaultValue="male"
                          id="male"
                          name="gender"
                          type="radio"
                        />
                        <span className="form-check-sign" />
                        Male
                      </label>
                    </div>
                    <div className="form-check-radio">
                      <label check>
                        <input
                          className="radio-label"
                          defaultChecked
                          defaultValue="female"
                          id="female"
                          name="gender"
                          type="radio"
                        />
                        <span className="form-check-sign" />
                        Female
                      </label>
                    </div>
                  </label>
                  <label className="label-text">
                    Nationality:
                    {/* Nationality */}
                    <UncontrolledDropdown>
                      <DropdownToggle
                        aria-expanded={false}
                        aria-haspopup={true}
                        caret
                        color="default"
                        data-toggle="dropdown"
                        id="dropdownMenuButton"
                        onClick={(e) => e.preventDefault()}
                        role="button"
                      >
                        Select
                      </DropdownToggle>
                      <DropdownMenu
                        aria-labelledby="dropdownMenuButton"
                        className="dropdown-info"
                      >
                        <DropdownItem header tag="span">
                          Nationality
                        </DropdownItem>
                        {continent.map((country) => {
                          return (
                            <DropdownItem
                              href="#pablo"
                              onClick={(e) => e.preventDefault()}
                            >
                              {country}
                            </DropdownItem>
                          );
                        })}
                      </DropdownMenu>
                    </UncontrolledDropdown>
                  </label>
                  <label className="label-text">
                    Bio:
                    <input
                      className="input-text"
                      placeholder="Default"
                      type="text"
                    />
                  </label>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="modal-footer">
          <div className="left-side">
            <Button
              className="btn-link"
              color="default"
              type="button"
              onClick={toggleModal}
            >
              Cancel
            </Button>
          </div>
          <div className="divider" />
          <div className="right-side">
            <Button className="btn-link" color="danger" type="button">
              Update
            </Button>
          </div>
        </div>
      </Modal>
      <div className="section">
        <div
          style={{
            backgroundImage:
              "url(" + require("assets/img/fabio-mangione.jpg") + ")",
          }}
          className="page-header"
          data-parallax={true}
          // ref={pageHeader}
        >
          <div className="filter" />
        </div>
        <div className="container" lg="12">
          <ProfileCard
            userProps={user}
            isSender={true}
            toggleModal={toggleModal}
          />
          <div className="row">
            <div className="bio mx-auto col-md-4 text-center">
              <p>{user.bio}</p>
            </div>
          </div>
          <div className="row">
            <div className="mx-auto col-md-12">
              <h4 className="bold text-center">Lastest Post</h4>
            </div>
          </div>
          <LatestBlogCard blog={blogs[0]} />
          <div className="row">
            <div className="mx-auto col-md-12">
              <h4 className="bold text-center">User Blog</h4>
              <div className="card-container">
                {newBlogs.map((blog) => (
                  <PostedBlogCard key={blog.id} blogProps={blog} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfilePage;
