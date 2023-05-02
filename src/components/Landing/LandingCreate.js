import React from "react";
import { GrFormAdd } from "react-icons/gr";

const LandingCreate = () => {
  return (
    <>
      <div className="container" lg="12">
        <div className="row">
          <div className="create-post-container mx-auto col-md-6">
            <div className="create-post-row">
              <div className="profile-pic my-auto">
                <img
                  alt="..."
                  className="img-circle img-no-padding img-responsive my-auto"
                  src={require("assets/img/faces/joe-gardner-2.jpg")}
                />
              </div>
              <a href="/create" className="add-row">
                <GrFormAdd className="add-icon my-auto" />
                <p className="my-auto">Create Post</p>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LandingCreate;
