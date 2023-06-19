import ExamplesNavbar from "components/Navbars/ExamplesNavbar";
import React from "react";
import "components/Post/Post.scss";
import PostHeader from "components/Post/PostHeader";
import { BiCommentDetail } from "react-icons/bi";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import {
  Button,
  Carousel,
  CarouselIndicators,
  CarouselItem,
  Modal,
} from "reactstrap";
import Footer from "components/Footers/Footer";
import { useParams } from "react-router-dom";
import Comment from "components/Landing/Comment";
import { Link } from "react-router-dom";
import {
  queryUserBlog,
  queryBlogComments,
  deleteBlog,
  setBlogRating,
} from "../../api/queryBlog";

//TODO: rating and timestamp
const PostPage = (props) => {
  const { id } = useParams();
  const { user } = props.location.state;
  const { blog } = props.location.state;
  const { comments } = props.location.state ?? [];
  const [isSender, setIsSender] = React.useState(false);
  const [suggestions, setSuggestions] = React.useState([]);
  const [carousellItems, setCarousellItems] = React.useState([{}]);
  const [postComments, setPostComments] = React.useState([{}]);

  //Check if the current user is the sender of the post
  //If yes, show the edit and delete button
  //Also Query the other post from the same author
  //Remove the current post from the list
  React.useEffect(() => {
    const userTemp = JSON.parse(localStorage.getItem("currentUser"));
    if (userTemp.uid === blog.author_id) {
      setIsSender(true);
    }
    queryUserBlog(blog.author_id).then((blogs) => {
      const temp = [];
      blogs.forEach((queriedBlog) => {
        console.log("Queried Blogs are " + JSON.stringify(queriedBlog.postId));
        console.log("Blogs are " + JSON.stringify(blog.postId));
        if (queriedBlog.postId !== blog.postId) {
          temp.push(queriedBlog);
        }
      });
      console.log(temp.length);
      setSuggestions(temp);
    });
  }, [blog.author_id, blog.postId]);

  //Get comments in 2 case,
  //If it is route from the landing, the comments are passed in as props
  //if it is route from the suggestion, the comments are queried from the database
  React.useEffect(() => {
    if (comments.length === 0) {
      queryBlogComments(blog.postId).then((queryComments) => {
        if (queryComments) {
          setPostComments(queryComments);
        }
      });
    } else {
      setPostComments(comments);
    }
  }, [blog.postId, comments]);

  //Set up the carousell Images
  React.useEffect(() => {
    const temp = [];
    for (const [key, value] of Object.entries(blog.image)) {
      temp.push({ src: value, altText: key });
    }
    setCarousellItems(temp);
  }, [blog.image]);

  //Carousell
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
    const nextIndex =
      activeIndex === carousellItems.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  };
  const previous = () => {
    if (animating) return;
    const nextIndex =
      activeIndex === 0 ? carousellItems.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  };
  const goToIndex = (newIndex) => {
    if (animating) return;
    setActiveIndex(newIndex);
  };

  //Delete post modal
  const [isModalOpened, setModal] = React.useState(false);
  function toggleModal() {
    setModal((bool) => !bool);
  }

  return (
    <>
      <ExamplesNavbar isTransparent={false} />
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
            Delete Post
          </h4>
        </div>
        <div className="modal-body">
          <div className="container">
            <div className="row">
              <div className="col text-center">
                <h4>Are you sure want to delete?</h4>
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
            <Button
              className="btn-link"
              color="danger"
              type="button"
              onClick={() => {
                deleteBlog(blog.postId).then(() => {
                  alert("Post deleted");
                  window.location.href = "/index";
                });
              }}
            >
              Delete
            </Button>
          </div>
        </div>
      </Modal>
      <div className="section">
        <div className="filler" />
        <div className="container" lg="12">
          <div className="row">
            <div className="col-md-9">
              <PostHeader
                toggleModal={toggleModal}
                issender={isSender}
                blog={blog}
              />
              <div className="post-content">
                <Carousel
                  activeIndex={activeIndex}
                  next={next}
                  previous={previous}
                >
                  <CarouselIndicators
                    items={carousellItems}
                    activeIndex={activeIndex}
                    onClickHandler={goToIndex}
                  />
                  {carousellItems.map((item) => {
                    return (
                      <CarouselItem
                        onExiting={onExiting}
                        onExited={onExited}
                        key={item.altText}
                      >
                        <img src={item.src} alt={item.altText} />
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
                <p className="post-text">{blog.caption["paragraph 1"]}</p>
              </div>
              <div className="post-footer">
                <div className="post-status">
                  <div className="rating-number number my-auto">
                    <Rating user={user} blog={blog} />
                  </div>
                  <div className="comment-number number my-auto">
                    <BiCommentDetail /> {postComments.length ?? 0}
                  </div>
                </div>
                <div className="tag-container">
                  {blog.tag.map((individualTag) => (
                    <label className="tag">{individualTag}</label>
                  ))}
                </div>
              </div>
              <div className="divider" />
              {postComments &&
                postComments.map((comment) => <Comment comment={comment} />)}
            </div>

            {/* right section */}
            <div className="profile-section col-md-3">
              <div className="author-profile">
                <h5 className="bold">Posted by</h5>
                <div className="post-profile">
                  <div className="post-profile-pic">
                    <img
                      alt="..."
                      className="img-circle img-no-padding img-responsive"
                      src={
                        user.profilepic === ""
                          ? require("assets/img/faces/noImage.png")
                          : user.profilepic
                      }
                    />
                  </div>
                  <div className="post-header-text my-auto">
                    <h6>{user.username}</h6>
                    <p>{user.nationality}</p>
                  </div>
                </div>
                <p className="author-bio">{user.bio}</p>
                <Button
                  className="btn-round mr-1"
                  color="primary"
                  type="button"
                  onClick={() => {}}
                >
                  <Link
                    className="white-text"
                    to={{
                      pathname: `/profile/${user.uid}`,
                    }}
                  >
                    See profile
                  </Link>
                </Button>
              </div>
              {suggestions.length > 0 ? (
                <>
                  <h5 className="bold suggestion-title">
                    Other posts from author
                  </h5>
                  {suggestions.map((blog) => (
                    <SuggestionBlogs blog={blog} user={user} />
                  ))}
                </>
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

const Rating = ({ blog, user }) => {
  const maxRating = 5;
  const [selectedStar, setSelectedStar] = React.useState(-1);

  React.useEffect(() => {
    const userRating = blog.rating[user.uid];
    if (userRating) {
      setSelectedStar(userRating - 1);
    }
  }, [blog.rating, user.uid]);

  const handleStarClick = (index) => {
    setSelectedStar(index);
    console.log("Selected Star Index:", index);
    setBlogRating(blog.postId, user.uid, index + 1)
      .then(() => {
        console.log("Rating updated");
      })
      .catch((error) => {
        console.log("Error updating rating", error);
      });
  };

  const renderStars = () => {
    const stars = [];

    for (let i = 0; i < maxRating; i++) {
      const StarIcon = i <= selectedStar ? AiFillStar : AiOutlineStar;
      const starColor = i <= selectedStar ? "#f96800" : "inherit"; // Set the color to yellow for filled stars

      stars.push(
        <StarIcon
          key={i}
          onClick={() => handleStarClick(i)}
          style={{ color: starColor }}
          className="star-icon"
        />
      );
    }

    return stars;
  };

  return <div className="rating-number number my-auto">{renderStars()}</div>;
};

const SuggestionBlogs = ({ blog, user }) => {
  const comments = [];
  return (
    <Link
      className="black-text"
      to={{
        pathname: `/post/${blog.postId}`,
        state: { blog, user, comments },
      }}
    >
      <div className="suggestion-post-container">
        <div className="suggestion-post">
          <div className="suggestion-pic">
            <img
              alt="..."
              className="img-rounded img-no-padding img-responsive my-auto"
              src={
                blog.image["cover picture"] ??
                require("assets/img/faces/joe-gardner-2.jpg")
              }
            />
          </div>
          <div>
            <h6 className="suggestion-title">{blog.topic}</h6>
            <p className="suggestion-content">{blog.caption["paragraph 1"]}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PostPage;
