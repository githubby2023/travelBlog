import React, { useState } from "react";
import "./searchbar.css";
import { Link } from "react-router-dom";
// import SearchIcon from "@material-ui/icons/Search";
// import CloseIcon from "@material-ui/icons/Close";

function SearchBar2({ placeholder, data }) {
  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");

  const handleFilter = (event) => {
    const searchWord = event.target.value;
    setWordEntered(searchWord);
    // console.log(data);
    const lowerCaseSearchWord = searchWord.toLowerCase();
    

    const newFilter = data.filter((obj) => {
      const lowerCaseSearchWord = searchWord.toLowerCase();
      const lowerCaseTags = obj.blog.tag.map((tag) => tag.toLowerCase());
    
      const ratings = Object.values(obj.blog.rating);
      const ratingSum = ratings.reduce((acc, rating) => acc + rating, 0);
      const ratingCount = Object.keys(obj.blog.rating).length;
      const averageRating = ratingCount ? ratingSum / ratingCount : 0;
    
      return (
        obj.blog.topic.toLowerCase().includes(lowerCaseSearchWord) ||
        obj.user.username.toLowerCase().includes(lowerCaseSearchWord) ||
        obj.blog.location.toLowerCase().includes(lowerCaseSearchWord) ||
        lowerCaseTags.some((tag) => tag.includes(lowerCaseSearchWord)) ||
        averageRating.toString().includes(lowerCaseSearchWord)
      );
    });

    if (searchWord === "") {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
  };

  const clearInput = () => {
    setFilteredData([]);
    setWordEntered("");
  };

  return (
    <div className="search">
      <div className="searchInputs">
        <input
          type="text"
          placeholder={placeholder}
          value={wordEntered}
          onChange={handleFilter}
        />

        <div className="searchIcon">
          {filteredData.length === 0 ? (
            <i className="nc-icon nc-zoom-split"></i>
          ) : (
            <i className="nc-icon nc-simple-remove" onClick={clearInput}></i>
          )}
        </div>
      </div>
      {filteredData.length != 0 && (
        <div className="dataResult">
          {filteredData.slice(0, filteredData.length).map((value, key) => {
            const user = value.user;
            const blog = value.blog;
            var sum = 0;
            const ratings = Object.values(blog.rating);
            const totalRatings = ratings.length;
            const sumRatings = ratings.reduce((acc, rating) => acc + rating, 0);
            const averageRating =
              totalRatings > 0 ? sumRatings / totalRatings : 0;

            const comments = value.comments;
            return (
              <Link
                to={{
                  pathname: `/post/${value.postId}`,
                  state: { blog, user, comments },
                }}
              >
                <div className="dataItem">
                  {" "}
                  {value.blog.topic} | Rating:{averageRating}{" "}
                </div>
              </Link>
              //   <button className="dataItem" target="_blank">
              //     <p>{value.topic} </p>
              //     onClick={
              //         () => {
              //             history
              //         }
              //     }
              //   </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default SearchBar2;
