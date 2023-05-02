import ExamplesNavbar from "components/Navbars/ExamplesNavbar";
import React from "react";
import "components/Post/Post.scss";
import PostHeader from "components/Post/PostHeader";
import { BiCommentDetail } from "react-icons/bi";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { Button, Carousel, CarouselIndicators, CarouselItem } from "reactstrap";

const PostPage = () => {
  const items = [
    {
      src: require("assets/img/soroush-karimi.jpg"),
      altText: "Somewhere",
      caption: "Somewhere",
    },
    {
      src: require("assets/img/federico-beccari.jpg"),
      altText: "Somewhere else",
      caption: "Somewhere else",
    },
    {
      src: require("assets/img/joshua-stannard.jpg"),
      altText: "Here it is",
      caption: "Here it is",
    },
  ];

  const [activeIndex, setActiveIndex] = React.useState(0);
  const [animating, setAnimating] = React.useState(false);
  const onExiting = () => {
    setAnimating(true);
  };
  const onExited = () => {
    setAnimating(false);
  };
  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  };
  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  };
  const goToIndex = (newIndex) => {
    if (animating) return;
    setActiveIndex(newIndex);
  };

  return (
    <>
      <ExamplesNavbar isTransparent={false} />
      <div className="section">
        <div className="filler" />
        <div className="container" lg="12">
          <div className="row">
            <div className="col-md-9">
              <PostHeader />
              <div className="post-content">
                <Carousel
                  activeIndex={activeIndex}
                  next={next}
                  previous={previous}
                >
                  <CarouselIndicators
                    items={items}
                    activeIndex={activeIndex}
                    onClickHandler={goToIndex}
                  />
                  {items.map((item) => {
                    return (
                      <CarouselItem
                        onExiting={onExiting}
                        onExited={onExited}
                        key={item.src}
                      >
                        <img src={item.src} alt={item.altText} />
                        {/* <CarouselCaption
                          captionText={item.caption}
                          captionHeader=""
                        /> */}
                      </CarouselItem>
                    );
                  })}
                  <a
                    className="left carousel-control carousel-control-prev"
                    data-slide="prev"
                    href="#pablo"
                    onClick={(e) => {
                      e.preventDefault();
                      previous();
                    }}
                    role="button"
                  >
                    <span className="fa fa-angle-left" />
                    <span className="sr-only">Previous</span>
                  </a>
                  <a
                    className="right carousel-control carousel-control-next"
                    data-slide="next"
                    href="#pablo"
                    onClick={(e) => {
                      e.preventDefault();
                      next();
                    }}
                    role="button"
                  >
                    <span className="fa fa-angle-right" />
                    <span className="sr-only">Next</span>
                  </a>
                </Carousel>
                <p className="post-text">
                  Lorem ipsum blabla lorem ipsum blabla lorem ipsum blabla lorem
                  ipsum blabla lorem ipsum blabla lorem ipsum blabla lorem ipsum
                  blabla lorem ipsum blabla lorem ipsum blabla{" "}
                </p>
              </div>
              <div className="post-footer">
                <div className="post-status">
                  <div className="rating-number number my-auto">
                    <AiFillStar />
                    <AiFillStar />
                    <AiFillStar />
                    <AiFillStar />
                    <AiOutlineStar /> 4
                  </div>
                  <div className="comment-number number my-auto">
                    <BiCommentDetail /> 68
                  </div>
                </div>
                <div className="tag-container">
                  <label className="tag">Primary</label>
                  <label className="tag">Primary</label>
                </div>
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

            {/* right section */}
            <div className="profile-section col-md-3">
              <div className="author-profile">
                <h5 className="bold">Posted by</h5>
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
                <p className="author-bio">Author bio lorem ipsum</p>
                <Button
                  className="btn-round mr-1"
                  color="primary"
                  type="button"
                >
                  See profile
                </Button>
              </div>
              <h5 className="bold suggestion-title">Other posts from author</h5>
              <div className="suggestion-post-container">
                <div className="suggestion-post">
                  <div className="suggestion-pic">
                    <img
                      alt="..."
                      className="img-rounded img-no-padding img-responsive my-auto"
                      src={require("assets/img/faces/joe-gardner-2.jpg")}
                    />
                  </div>
                  <div>
                    <h6 className="suggestion-title">bruh</h6>
                    <p className="suggestion-content">lorem ipsum lorem lorem ipsum lorem lorem ipsum lorem</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PostPage;