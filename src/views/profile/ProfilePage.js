import React from "react";
import ExamplesNavbar from "components/Navbars/ExamplesNavbar";
import "components/Profile/Profile.scss";
import PostedBlogCard from "components/Profile/BlogCard";
import ProfileCard from "components/Profile/ProfileCard";
import LatestBlogCard from "components/Profile/LatestBlogCard";
import { Encryption } from "components/Utils/Encryption.js";
import { userContext } from "providers/user";
import Footer from "components/Footers/Footer";
import ScrollContainer from "react-indiana-drag-scroll";
import ProfileModal from "components/Profile/ProfileModal";

const UserProfilePage = () => {
  // let pageHeader = React.createRef();

  const blogs = [
    {
      id: "saydgasad2d",
      title: "Ice Mountain",
      url: "https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      desc: "Standing in awe of the frozen majesty before me, I can't help but feel small in comparison. The ice mountain towers above me, its jagged peaks piercing the clouds, a testament to the power and beauty of nature.",
    },
    {
      id: "saydgasad2d",
      title: "Beauty In Bloom",
      url: "https://images.pexels.com/photos/381739/pexels-photo-381739.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      desc: "Beauty In Bloom",
    },
    {
      id: "saydgasad2d",
      title: "Mighty Oak",
      url: "https://japan.stripes.com/sites/default/files/styles/community_site_carousel_750x500/public/article-images/main_13.jpg?itok=_GELFbpY",
      desc: "Mighty Oak",
    },
    {
      id: "saydgasad2d",
      title: "Blue Beauty",
      url: "https://images.pexels.com/photos/326055/pexels-photo-326055.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      desc: "Blue Beauty",
    },
    {
      id: "saydgasad2d",
      title: "Nighttime Magic",
      url: "https://images.pexels.com/photos/268533/pexels-photo-268533.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      desc: "Nighttime Magic",
    },
  ];
  // const user = {
  //   uid: "1234",
  //   username: "ayo_ogunseinde",
  //   nationality: "USA",
  //   email: "john.doe@example.com",
  //   gender: "male",
  //   address: "123 Main St, Anytown USA",
  //   bio: "Today, I choose to embrace all that I am - the good, the bad, and everything in between. I am imperfect, but that's what makes me human.",
  //   viewarray: [],
  // };

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
      <userContext.Consumer>
        {({ value }) => {
          console.log("breuhbrurhrhuh " + value);
          <>
            <ProfileModal
              isModalOpened={isModalOpened}
              toggleModal={toggleModal}
            />
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
                  userProps={value.user}
                  isSender={true}
                  toggleModal={toggleModal}
                />
                <div className="row">
                  <div className="bio mx-auto col-md-4 text-center">
                    <p>{value.user.bio}</p>
                    {/* <p>encrypt {Encryption.encryptAES("lol")}</p> */}
                    <p>
                      bruh {Encryption.decryptAES("sPqsda9NhISgRa8Zn4ktig==")}
                    </p>
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
                    <ScrollContainer className="card-container">
                      {newBlogs.map((blog) => (
                        <PostedBlogCard key={blog.id} blogProps={blog} />
                      ))}
                    </ScrollContainer>
                  </div>
                </div>
              </div>
              <Footer />
            </div>
          </>;
        }}
      </userContext.Consumer>
    </>
  );
};

export default UserProfilePage;
