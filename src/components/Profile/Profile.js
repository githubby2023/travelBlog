import React from "react";
import ExamplesNavbar from "components/Navbars/ExamplesNavbar";
import "./Profile.scss";

const Profile = () => {
  return (
    <>
      <ExamplesNavbar />
      <div className="section">
        <div className="main-container" lg="12">
          <div className="row justify-content-center">
            <div className="image-container" />
            <div className="text-container" style={{ background: "aqua" }}>
              <h1>Name of the profile</h1>
              <p>Nationality</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
