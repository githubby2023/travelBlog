import React from "react";
import { AiTwotoneEdit, AiOutlinePlus } from "react-icons/ai";
import "./Profile.scss";
import ProfilePictureModal from "./ProfilePictureModal";

const ProfileCard = ({
  photoUrl,
  uid,
  name,
  nationality,
  issender,
  toggleModal,
}) => {
  const [isModalPictureOpened, setModalPicture] = React.useState(false);

  function togglePictureModal() {
    setModalPicture((bool) => !bool);
  }

  return (
    console.log("Photo is " + photoUrl),
    (
      <>
        <ProfilePictureModal
          isModalPictureOpened={isModalPictureOpened}
          togglePictureModal={togglePictureModal}
          uid={uid}
        />

        <div className="profile-container">
          <div className="profilepic">
            <img
              alt="..."
              className="imgg img-circle img-no-padding img-responsive"
              src={
                photoUrl === "undefined"
                  ? require("assets/img/faces/joe-gardner-2.jpg")
                  : photoUrl
              }
            />
            <AiOutlinePlus className="plus" onClick={togglePictureModal} />
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
    )
  );
};

export default ProfileCard;
