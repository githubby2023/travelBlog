import React from "react";
import DemoFooter from "components/Footers/DemoFooter.js";
import ExamplesNavbar from "components/Navbars/ExamplesNavbar";
import LandingPost from "components/Landing/LandingPost";

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
          <LandingPost />
          <LandingPost />
          <DemoFooter />
        </div>
      </div>
    </>
  );
}

export default Index;
