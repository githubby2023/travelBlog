import ExamplesNavbar from "components/Navbars/ExamplesNavbar";
import React from "react";
import "components/Post/Post.scss";
import PostHeader from "components/Post/PostHeader";
import { BiCommentDetail } from "react-icons/bi";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { IoMdSend } from "react-icons/io";
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
  writeComment,
} from "../../api/queryBlog";
import { writePostView } from "api/post_view_wr";
import { Timestamp } from "firebase/firestore";

//TODO: rating and timestamp
const PostPage = (props) => {
  const { id } = useParams();
  const { user } = props.location.state;
  const { blog } = props.location.state;
  const { comments } = props.location.state ?? [];
  const [currentBlog, setCurrentBlog] = React.useState(blog);
  const [isSender, setIsSender] = React.useState(false);
  const [suggestions, setSuggestions] = React.useState([]);
  const [carousellItems, setCarousellItems] = React.useState([{}]);
  const [postComments, setPostComments] = React.useState([{}]);
  const [currentUser, setCurrentUser] = React.useState({ uid: "" });
  const [currentComment, setCurrentComment] = React.useState("");

  React.useEffect(() => {
    setCurrentBlog(blog);
    writePostView(
      blog.author_id,
      Timestamp.now(),
      blog.postId,
      blog.location,
      currentUser.uid,
      currentUser.gender,
      currentUser.age,
      currentUser.nationality
    );
  }, [blog]);

  //Check if the current user is the sender of the post
  //If yes, show the edit and delete button
  //Also Query the other post from the same author
  //Remove the current post from the list
  React.useEffect(() => {
    const userTemp = JSON.parse(localStorage.getItem("currentUser"));
    if (userTemp) {
      setCurrentUser(userTemp);
      if (userTemp.uid === currentBlog.author_id) {
        setIsSender(true);
      }
    } else {
      setIsSender(false);
    }
    queryUserBlog(currentBlog.author_id).then((blogs) => {
      const temp = [];
      blogs.forEach((queriedBlog) => {
        if (queriedBlog.postId !== currentBlog.postId) {
          temp.push(queriedBlog);
        }
      });
      setSuggestions(temp);
    });
  }, [currentBlog.author_id, currentBlog.postId]);

  //Get comments in 2 case,
  //If it is route from the landing, the comments are passed in as props
  //if it is route from the suggestion, the comments are queried from the database
  React.useEffect(() => {
    // console.log("Comments are " + JSON.stringify(comments));
    if (comments.length === 0) {
      // console.log("Run here");
      queryBlogComments(currentBlog.postId).then((queryComments) => {
        if (queryComments) {
          setPostComments(queryComments);
        }
      });
    } else {
      setPostComments(comments);
    }
  }, [currentBlog.postId, comments]);

  //Set up the carousell Images
  React.useEffect(() => {
    const temp = [];
    for (const [key, value] of Object.entries(currentBlog.image)) {
      temp.push({ src: value, altText: key });
    }
    setCarousellItems(temp);
  }, [currentBlog.image]);

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

  //Destruct Blog Content Map into array
  const blogArray = Object.entries(currentBlog.caption)
    .sort(([keyA], [keyB]) => {
      const indexA = extractIndexFromKey(keyA);
      const indexB = extractIndexFromKey(keyB);
      return indexA - indexB;
    })
    .map(([key, value]) => value);

  // Helper function to extract index from key
  function extractIndexFromKey(key) {
    const match = key.match(/\d+/); // Extract numeric digits from the key
    return match ? parseInt(match[0]) : 0; // Convert the extracted digits to an integer
  }

  const sendCommment = (comment) => {
    if (comment !== "") {
      if (currentUser.uid !== "") {
        // console.log("Comment is " + comment);
        const newComment = {
          user_id: currentUser.uid,
          commentor_name: currentUser.username,
          commentor_pic: currentUser.profilepic,
          comment: comment,
          comment_timestamp: Timestamp.now(),
        };
        writeComment(currentBlog.postId, newComment).then(() => {
          // console.log("Comment added");
          // window.location.reload(true);
          setCurrentComment("");
          const commentTextField = document.getElementById("commentTxt");
          commentTextField.value = "";
          queryBlogComments(currentBlog.postId).then((queryComments) => {
            if (queryComments) {
              setPostComments(queryComments);
            }
          });
        });
      } else {
        window.location.href = "/signin";
      }
    }
  };

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
                deleteBlog(currentBlog.postId).then(() => {
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
                blog={currentBlog}
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
                        <img
                          className="carousel-img"
                          src={item.src}
                          alt={item.altText}
                        />
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
                {blogArray.map((paragraph) => (
                  <p className="post-text">{paragraph}</p>
                ))}
              </div>
              <div className="post-footer">
                <div className="post-status">
                  <div className="rating-number number my-auto">
                    <Rating
                      currentUser={currentUser}
                      blog={currentBlog}
                      setCurrentBlog={setCurrentBlog}
                    />
                  </div>
                  <div className="comment-number number my-auto">
                    <BiCommentDetail /> {postComments.length - 1 ?? 0}
                  </div>
                </div>
                <div className="tag-container">
                  {currentBlog.tag.map((individualTag) => (
                    <label className="tag">{individualTag}</label>
                  ))}
                </div>
              </div>
              <div className="divider" />
              <div className="comment-section">
                <h5 className="bold">Comments</h5>
                <div className="comment-input">
                  <div className="comment-profile-pic">
                    <img
                      alt="Profile"
                      className="img-circle img-no-padding img-responsive my-auto"
                      src={
                        currentUser.profilepic === ""
                          ? require("assets/img/faces/noImage.png")
                          : currentUser.profilepic
                      }
                    />
                  </div>
                  <input
                    className="input-text"
                    placeholder="Type Your Comment Here"
                    type="text"
                    id="commentTxt"
                    onChange={(event) => {
                      setCurrentComment(event.target.value);
                    }}
                  />
                  <IoMdSend
                    className="send-icon"
                    onClick={() => sendCommment(currentComment)}
                  />
                </div>
              </div>
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

const Rating = ({ blog, currentUser, setCurrentBlog }) => {
  const maxRating = 5;
  const [selectedStar, setSelectedStar] = React.useState(-1);

  React.useEffect(() => {
    if (currentUser) {
      const userRating = blog.rating[currentUser.uid];
      if (userRating) {
        setSelectedStar(userRating - 1);
      }
    }
  }, [blog, currentUser]);

  const handleStarClick = (index) => {
    if (currentUser) {
      setSelectedStar(index);
      // console.log("Selected Star Index:", index);
      setBlogRating(blog.postId, currentUser.uid, index + 1)
        .then(() => {
          // console.log("Rating updated");
        })
        .catch((error) => {
          // console.log("Error updating rating", error);
        });
        setCurrentBlog({
          ...blog,
          rating: { ...blog.rating, [currentUser.uid]: index + 1 },
        });
    } else {
      window.location.href = "/signin";
    }
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
