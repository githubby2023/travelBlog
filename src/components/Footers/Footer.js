import React from "react";

function Footer() {
  return (
    <footer className="footer-container">
      <div className="container">
        <div className="row">
          <h6 className="">Travel Blog</h6>
          <div className="credits ml-auto">
            <span className="copyright">
              © {new Date().getFullYear()}, made with{" "}
              <i className="fa fa-heart heart" />
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
