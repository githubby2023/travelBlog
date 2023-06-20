import React from "react";
import { storage } from "../../api/firebaseconfig";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { Button, Modal } from "reactstrap";
import { uploadCoverPhoto } from "api/authentication";

const ProfileCoverModal = ({ isModalCoverOpened, toggleCoverModal, uid }) => {
  const [file, setFile] = React.useState("");
  const [percent, setPercent] = React.useState(0);
  const [user, setUser] = React.useState({});
  const [isProgressShown, setProgress] = React.useState(false);

  React.useEffect(() => {
    const userTemp = JSON.parse(localStorage.getItem("currentUser"));
    if (userTemp) {
      setUser(userTemp);
    }
  }, []);

  function handleChange(event) {
    setFile(event.target.files[0]);
  }

  function handleUpload() {
    if (!file) {
      alert("Please choose a file first!");
    }

    setProgress(true);

    const storageRef = ref(storage, `/users/${uid}_cover`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const percent = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        // update progress
        setPercent(percent);
      },
      (err) => console.log(err),
      () => {
        // download url
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          // console.log("URL is " + url);
          setUser({ ...user, cover: url });
          // console.log("Current User is " + JSON.stringify(user));

          uploadCoverPhoto(user.uid, url).then(() => {
            // console.log("Upload cover success");
            localStorage.setItem("currentUser", JSON.stringify(user));
            toggleCoverModal();
            window.location.reload(true);
          });
        });
      }
    );
  }

  return (
    // console.log("Modal" + JSON.stringify(user)),
    <Modal
      className="modal-container"
      isOpen={isModalCoverOpened}
      toggle={toggleCoverModal}
    >
      <div className="modal-header">
        <button
          aria-label="Close"
          className="close"
          type="button"
          onClick={toggleCoverModal}
        >
          <span aria-hidden={true}>×</span>
        </button>
        <h4 className="modal-title text-center" id="editProfileModal">
          Edit Cover Photo
        </h4>
      </div>
      <div className="modal-body">
        <div className="container">
          <div className="row">
            <div className="col">
              {/* Body */}
              {!isProgressShown && (
                <input type="file" onChange={handleChange} accept="/image/*" />
              )}
              {isProgressShown && <progress value={percent} max="100" />}
            </div>
          </div>
        </div>
      </div>
      <div className="modal-footer">
        <div className="left-side">
          <Button
            className="btn-link"
            color="default"
            type="button"
            onClick={toggleCoverModal}
          >
            Cancel
          </Button>
        </div>
        <div className="divider" />
        <div className="right-side">
          <Button
            className="btn-link"
            color="danger"
            type="button"
            onClick={handleUpload}
          >
            Upload
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ProfileCoverModal;
