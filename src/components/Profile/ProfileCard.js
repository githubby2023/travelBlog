import React from "react";
import { AiTwotoneEdit } from "react-icons/ai";
import "./Profile.scss";

const ProfileCard = ({ userProps, isSender, toggleModal }) => {
  return (
    <>
      <div className="profile-container">
        <div className="profilepic">
          <img
            alt="..."
            className="img-circle img-no-padding img-responsive"
            src={require("assets/img/faces/joe-gardner-2.jpg")}
            // src={userProps.}
          />
        </div>
        <div className="name">
          <div className="name-container">
            <h4 className="title">{userProps.username}</h4>
            {isSender ? (
              <div className="icon">
                <AiTwotoneEdit width={40}  onClick={toggleModal}/>
              </div>
            ) : (
              <></>
            )}
          </div>
          <h6 className="description">{userProps.nationality}</h6>
        </div>
      </div>
    </>
  );
};

export default ProfileCard;
