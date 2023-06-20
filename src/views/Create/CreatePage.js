import ExamplesNavbar from "components/Navbars/ExamplesNavbar";
import React from "react";
import { GrFormAdd } from "react-icons/gr";
import {
  Carousel,
  CarouselIndicators,
  CarouselItem,
  Alert,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
} from "reactstrap";
import "components/Create/Create.scss";
import { updateBlog, writeBlog } from "../../api/queryBlog";
import { Timestamp } from "firebase/firestore";
import { useHistory } from "react-router-dom";

const CreatePage = (props) => {
  const { blog } = props.location.state ?? { blog: null };
  const [currentUser, setCurrentUser] = React.useState({});
  const [currentBlog, setCurrentBlog] = React.useState({});
  const [imageFiles, setImageFiles] = React.useState([]);
  const [blogContent, setBlogContent] = React.useState([]);
  const [topic, setTopic] = React.useState("");
  const [location, setLocation] = React.useState("");
  const [tag, setTag] = React.useState([]);
  const [isAlertOpened, setAlert] = React.useState(false);
  const [alertContent, setAlertContent] = React.useState("");
  const [isEdit, setIsEdit] = React.useState(false);

  const tagText = [
    "Food",
    "Attraction",
    "Accommodation",
    "Transport",
    "Others",
  ];

  React.useEffect(() => {
    const userTemp = JSON.parse(localStorage.getItem("currentUser"));
    if (userTemp) {
      setCurrentUser(userTemp);
    }
  }, []);

  const history = useHistory();

  React.useEffect(() => {
    if (blog) {
      setCurrentBlog(blog);
      setImageFiles(Object.values(blog.image));
      setBlogContent(Object.values(blog.caption));
      setTopic(blog.topic);
      setLocation(blog.location);
      setTag(blog.tag);
      setIsEdit(true);
    }
  }, [blog]);

  function handleChange(event) {
    setImageFiles([...imageFiles, ...event.target.files]);
  }

  function addTextBox(event) {
    setBlogContent([...blogContent, ""]);
  }

  function handleDataInput(event, index) {
    const newContent = [...blogContent];
    newContent[index] = event.target.value;
    setBlogContent(newContent);
  }

  const blogContentMap = blogContent.reduce((map, paragraph, index) => {
    const key = `paragraph ${index + 1}`;
    map[key] = paragraph;
    return map;
  }, {});

  function validateBlog() {
    if (topic === "") {
      setAlertContent("Please enter a topic");
      setAlert(true);
      return false;
    }
    if (blogContent.length === 0) {
      setAlertContent("Please enter some content");
      setAlert(true);
      return false;
    }
    if (location === "") {
      setAlertContent("Please enter a location");
      setAlert(true);
      return false;
    }
    if (tag.length === 0) {
      setAlertContent("Please enter a tag");
      setAlert(true);
      return false;
    }
    if (imageFiles.length === 0) {
      setAlertContent("Please upload an image");
      setAlert(true);
      return false;
    }
    return true;
  }

  function createBlog() {
    if (!validateBlog()) {
      return;
    }
    const newBlog = {
      author_id: currentUser.uid,
      topic: topic,
      caption: blogContentMap,
      location: location,
      tag: tag,
    };
    if (currentBlog.postId) {
      console.log(newBlog);
      updateBlog(currentBlog.postId, newBlog, imageFiles)
        .then(() => {
          console.log("Update blog success");
          history.push("/index");
        })
        .catch((error) => {
          console.error(error);
          alert("Error creating blog");
        });
    } else {
      const newNewBlog = {
        ...newBlog,
        postId: currentUser.uid + "_" + Date.now(),
        timestamp: Timestamp.fromDate(new Date()),
        rating: [],
      };

      writeBlog(newNewBlog, imageFiles)
        .then(() => {
          console.log("Write blog success");
          history.push("/index");
        })
        .catch((error) => {
          console.error(error);
          alert("Error creating blog");
        });
    }
  }

  function toggleAlert() {
    setAlert(false);
  }

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
      activeIndex === imageFiles.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  };
  const previous = () => {
    if (animating) return;
    const nextIndex =
      activeIndex === 0 ? imageFiles.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  };
  const goToIndex = (newIndex) => {
    if (animating) return;
    setActiveIndex(newIndex);
  };

  return (
    <>
      <ExamplesNavbar isTransparent={false} />
      <div className="filler" />
      <div className="section">
        <div className="container" lg="12">
          <div className="row">
            <div className="create-post-container col-md-9 mx-auto">
              {isEdit ? <h1>Edit Post</h1> : <h1>Create Post</h1>}
              <label className="label-text">
                <h4>Write a catchy topic 😎</h4>
                <input
                  className="small-input-text"
                  placeholder="Topic"
                  type="text"
                  key="topic"
                  defaultValue={topic}
                  onChange={(e) => {
                    setTopic(e.target.value);
                  }}
                />
              </label>
              <div className="upload-image-container">
                <h4>Why not add some images to your blog? 🖼️</h4>
                <div className="add-image">
                  <label htmlFor="file-input">
                    <GrFormAdd className="add-icon" />
                  </label>
                  <input
                    id="file-input"
                    className="bruh"
                    type="file"
                    onChange={handleChange}
                    accept="image/*"
                    multiple
                  />
                </div>
              </div>
              {/* displayimage file if any */}

              {imageFiles.length === 0 ? (
                <p>No image yet!</p>
              ) : (
                <Carousel
                  activeIndex={activeIndex}
                  next={next}
                  previous={previous}
                >
                  <CarouselIndicators
                    items={Array.from(imageFiles)}
                    activeIndex={activeIndex}
                    onClickHandler={goToIndex}
                  />
                  {Array.from(imageFiles).map((item, index) => {
                    return (
                      <CarouselItem
                        onExiting={onExiting}
                        onExited={onExited}
                        key={` ${index + 1}`}
                      >
                        {typeof item === "string" ? (
                          <img
                            className="carousel-img"
                            src={item}
                            alt={
                              index === 0 ? "cover image" : `picture ${index}`
                            }
                            key={
                              index === 0 ? "cover image" : `picture ${index}`
                            }
                          />
                        ) : (
                          <img
                            className="carousel-img"
                            src={URL.createObjectURL(item)}
                            alt={
                              index === 0 ? "cover image" : `picture ${index}`
                            }
                            key={
                              index === 0 ? "cover image" : `picture ${index}`
                            }
                          />
                        )}
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
              )}
              <label className="label-text">
                <div className="content-heading">
                  <h4>Write your content with some emoji! 🤗</h4>
                  <div className="add-image">
                    <GrFormAdd className="add-icon" onClick={addTextBox} />
                  </div>
                </div>

                {blogContent === null ? (
                  <textarea
                    className="input-text"
                    placeholder="Content"
                    type="textarea"
                    key="paragraph 1"
                    onChange={(e) => {
                      handleDataInput(e, "0");
                    }}
                  />
                ) : (
                  Object.values(blogContent).map((blog, index) => (
                    <>
                      <h5 style={{ marginTop: 10 }}>Paragraph {index + 1}</h5>
                      <textarea
                        className="input-text"
                        placeholder="Content"
                        type="textarea"
                        key={`paragraph ${index + 1}`}
                        defaultValue={blog}
                        onChange={(e) => {
                          handleDataInput(e, index);
                        }}
                      />
                    </>
                  ))
                )}
              </label>
            </div>
            {/* Right Location */}
            <div className="tag-container col-md-3">
              <label className="label-text">
                <h6>Location 📍</h6>
                <input
                  className="input-text"
                  placeholder="Location"
                  type="text"
                  key="location"
                  defaultValue={location}
                  onChange={(e) => {
                    setLocation(e.target.value);
                  }}
                />
              </label>
              <label className="label-text">
                <h6>Add tag</h6>
                <UncontrolledDropdown>
                  <DropdownToggle
                    style={{ width: "100%" }}
                    aria-expanded={false}
                    aria-haspopup={true}
                    caret
                    color="warning"
                    data-toggle="dropdown"
                    id="dropdownMenuButton"
                    onClick={(e) => e.preventDefault()}
                    role="button"
                  >
                    {tag[0] ?? "Select Tag"}
                  </DropdownToggle>
                  <DropdownMenu
                    aria-labelledby="dropdownMenuButton"
                    className="dropdown-info"
                  >
                    <DropdownItem header tag="span">
                      Nationality
                    </DropdownItem>
                    {tagText.map((singleTag) => {
                      return (
                        <DropdownItem
                          href="#pablo"
                          onClick={(e) => {
                            e.preventDefault();
                            setTag([singleTag]);
                          }}
                          value={singleTag}
                          key={singleTag}
                        >
                          {singleTag}
                        </DropdownItem>
                      );
                    })}
                  </DropdownMenu>
                </UncontrolledDropdown>
                {/* <input
                  className="tag-input input-text"
                  placeholder="Tag"
                  type="text"
                  key="tag"
                  onKeyDown={(e) => {
                    handleEnterTag(e);
                  }}
                /> */}
              </label>
              {/* <div className="selected-container">
                {tag.map((tag, index) => (
                  <label key={`${tag}_${index}`} className="tag">
                    {tag}
                  </label>
                ))}
              </div> */}
              <button
                className="submit-button"
                type="submit"
                onClick={() => createBlog()}
              >
                {isEdit ? <h6>Update</h6> : <h6>Post</h6>}
              </button>
              <Alert
                style={{ marginTop: 10 }}
                className="toast"
                color="danger"
                isOpen={isAlertOpened}
                toggle={() => toggleAlert()}
              >
                {alertContent}
              </Alert>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreatePage;
