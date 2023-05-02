import React from "react";
import Footer from "components/Footers/Footer.js";
import ExamplesNavbar from "components/Navbars/ExamplesNavbar";
import LandingPost from "components/Landing/LandingPost";
import LandingCreate from "components/Landing/LandingCreate";

import SearchBar from "components/Landing/searchBar";

function Index() {
  document.documentElement.classList.remove("nav-open");
  React.useEffect(() => {
    document.body.classList.add("index");
    return function cleanup() {
      document.body.classList.remove("index");
    };
  });
  return (
    <>
      <ExamplesNavbar />
      <div className="section">
        <div
          className="page-header section-dark"
          style={{
            backgroundImage:
              "url(" + require("assets/img/antoine-barres.jpg") + ")",
          }}
        >
          <div className="filter" />
          <div className="content-center">
            <div className="container">
              <div className="title-brand">
                <h1 className="presentation-title">Travel Blog</h1>
              </div>
              <h2 className="presentation-subtitle text-center">
                Explore the world
              </h2>
            </div>
          </div>
        </div>
        <div className="main">
          <SearchBar />
          <LandingCreate />
          <LandingPost />
          <LandingPost />
          <Footer />
        </div>
      </div>
    </>
  );
}

export default Index;
