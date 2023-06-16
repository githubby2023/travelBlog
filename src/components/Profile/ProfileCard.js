import React from "react";
import { AiTwotoneEdit } from "react-icons/ai";
import "./Profile.scss";

const ProfileCard = ({ name, nationality, issender, toggleModal }) => {
  React.useEffect(() => {}, [name]);
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
            <h4 className="title">{name}</h4>
            {issender ? (
              <div className="icon">
                <AiTwotoneEdit width={40} onClick={toggleModal} />
              </div>
            ) : (
              <></>
            )}
          </div>
          <h6 className="description">{nationality}</h6>
        </div>
      </div>
    </>
  );
};

export default ProfileCard;
