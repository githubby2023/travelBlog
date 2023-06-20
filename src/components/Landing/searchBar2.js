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
    console.log(data);
    const lowerCaseSearchWord = searchWord.toLowerCase();

    const newFilter = data.filter((obj) =>
      obj.blog.topic.toLowerCase().includes(lowerCaseSearchWord) ||
      obj.user.username.toLowerCase().includes(lowerCaseSearchWord)
    );
    
  
    // const newFilter = data.map(data => data)
    console.log(newFilter);
    // const newFilter = data.forEach((element) => {
    //   element.filter((value) => {
    //     console.log(value + " topic here")
    //     return value.topic.toLowerCase().includes(searchWord.toLowerCase());
    // })});
    // const newFilter = data.filter((value) => {
    //     console.log(value + " topic here")
    //   return value.topic.toLowerCase().includes(searchWord.toLowerCase());
    // });

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
            console.log(user + " this is the user " + user.uid);
            const comments = value.comments;
            return (
              <Link
                to={{
                  pathname: `/post/${value.postId}`,
                  state: { blog, user, comments },
                }}
              >
                <div className="searchResult"> {value.blog.topic} {user.username} </div>
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
