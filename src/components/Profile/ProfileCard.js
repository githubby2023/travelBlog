import React from "react";
import { AiTwotoneEdit, AiOutlinePlus, AiFillDelete } from "react-icons/ai";
import "./Profile.scss";
import ProfilePictureModal from "./ProfilePictureModal";
import { deleteUser } from "../../api/authentication";
import { signOut, getAuth } from "firebase/auth";

const ProfileCard = ({
  photoUrl,
  uid,
  name,
  nationality,
  isOwnProfile,
  toggleModal,
}) => {
  const [isModalPictureOpened, setModalPicture] = React.useState(false);
  const [imageError, setImageError] = React.useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  function togglePictureModal() {
    setModalPicture((bool) => !bool);
  }

  function deleteProfile() {
    if (window.confirm("Are you sure you want to delete your profile?")) {
      deleteUser(uid);
      localStorage.removeItem("currentUser");
      signOut(getAuth());
      window.location.href = "/signin";
    }
  }

  return (
    <>
      <ProfilePictureModal
        isModalPictureOpened={isModalPictureOpened}
        togglePictureModal={togglePictureModal}
        uid={uid}
      />

      <div className="profile-container">
        <div className="profilepic">
          {imageError ? (
            <img
              alt="Fallback"
              className="imgg img-circle img-no-padding img-responsive"
              src={require("assets/img/faces/noImage.png").default}
            />
          ) : (
            <img
              alt="..."
              className="imgg img-circle img-no-padding img-responsive"
              src={photoUrl}
              onError={handleImageError}
            />
          )}
          {isOwnProfile &&
          <AiOutlinePlus className="plus" onClick={togglePictureModal} />}
        </div>
        <div className="name">
          <div className="name-container">
            <h4 className="title">{name}</h4>
            {isOwnProfile ? (
              <div className="icon">
                <AiTwotoneEdit width={40} onClick={toggleModal} />
                <AiFillDelete
                  width={40}
                  color="red"
                  style={{ marginLeft: 2 }}
                  onClick={deleteProfile}
                />
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
