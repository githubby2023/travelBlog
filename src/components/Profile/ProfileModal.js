import React from "react";

import {
  Button,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Modal,
  UncontrolledDropdown,
} from "reactstrap";
import { writeUserData, queryUser } from "../../api/authentication";

const ProfileModal = ({ isModalOpened, toggleModal, currentUser }) => {
  const continent = [
    "Asia",
    "North America",
    "South America",
    "Africa",
    "Europe",
    "Australia",
    "Antartica",
  ];
  const [user, setUser] = React.useState(currentUser);

  React.useEffect(() => {
    setUser(currentUser);
  }, [currentUser]);

  const onHandleSubmit = () => {
    writeUserData(
      user.uid,
      user.username,
      user.nationality,
      user.email,
      user.gender,
      user.address,
      user.profilepic,
      user.bio
    ).then(() => {
      localStorage.setItem("currentUser", JSON.stringify(user));
      toggleModal();
    });
  };

  return (
    // console.log("Modal" + JSON.stringify(user)),
    (
      <Modal
        className="modal-container"
        isOpen={isModalOpened}
        toggle={toggleModal}
      >
        <div className="modal-header">
          <button
            aria-label="Close"
            className="close"
            type="button"
            onClick={toggleModal}
          >
            <span aria-hidden={true}>×</span>
          </button>
          <h4 className="modal-title text-center" id="editProfileModal">
            Edit Profile
          </h4>
        </div>
        <div className="modal-body">
          <div className="container">
            <div className="row">
              <div className="col">
                <form>
                  <label className="label-text">
                    Email:
                    <input
                      className="input-text"
                      placeholder="abc@email.com"
                      value={user.email}
                      type="text"
                      onChange={(event) => {
                        setUser({ ...user, email: event.target.value });
                      }}
                    />
                  </label>
                  <label className="label-text">
                    Name:
                    <input
                      className="input-text"
                      placeholder="Travel Blog Admin"
                      type="text"
                      value={user.username}
                      onChange={(event) => {
                        setUser({ ...user, username: event.target.value });
                      }}
                    />
                  </label>
                  <label className="label-text">
                    Address:
                    <input
                      className="input-text"
                      placeholder="Address"
                      type="text"
                      value={user.address}
                      onChange={(event) => {
                        setUser({ ...user, address: event.target.value });
                      }}
                    />
                  </label>
                  {/* Gender */}
                  <label className="label-text">
                    Gender:
                    <div className="form-check-radio">
                      <label check>
                        <input
                          className="radio-label"
                          defaultChecked={user.gender === "male"}
                          defaultValue="male"
                          id="male"
                          name="gender"
                          type="radio"
                          onChange={() => {
                            setUser({ ...user, gender: "male" });
                          }}
                        />
                        <span className="form-check-sign" />
                        Male
                      </label>
                    </div>
                    <div className="form-check-radio">
                      <label check>
                        <input
                          className="radio-label"
                          defaultChecked={user.gender === "female"}
                          defaultValue="female"
                          id="female"
                          name="gender"
                          type="radio"
                          onChange={() => {
                            setUser({ ...user, gender: "female" });
                          }}
                        />
                        <span className="form-check-sign" />
                        Female
                      </label>
                    </div>
                  </label>
                  <label className="label-text">
                    Nationality:
                    {/* Nationality */}
                    <UncontrolledDropdown>
                      <DropdownToggle
                        aria-expanded={false}
                        aria-haspopup={true}
                        caret
                        color="default"
                        data-toggle="dropdown"
                        id="dropdownMenuButton"
                        onClick={(e) => e.preventDefault()}
                        role="button"
                      >
                        {user.nationality ?? "Select"}
                      </DropdownToggle>
                      <DropdownMenu
                        aria-labelledby="dropdownMenuButton"
                        className="dropdown-info"
                      >
                        <DropdownItem header tag="span">
                          Nationality
                        </DropdownItem>
                        {continent.map((nationality) => {
                          return (
                            <DropdownItem
                              href="#pablo"
                              onClick={(e) => {
                                e.preventDefault();
                                setUser({ ...user, nationality: nationality });
                              }}
                              value={user.nationality}
                              key={nationality}
                            >
                              {nationality}
                            </DropdownItem>
                          );
                        })}
                      </DropdownMenu>
                    </UncontrolledDropdown>
                  </label>
                  <label className="label-text">
                    Bio:
                    <input
                      className="input-text"
                      placeholder="Biography"
                      type="text"
                      value={user.bio}
                      onChange={(event) => {
                        setUser({ ...user, bio: event.target.value });
                      }}
                    />
                  </label>
                </form>
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
              onClick={toggleModal}
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
              onClick={onHandleSubmit}
            >
              Update
            </Button>
          </div>
        </div>
      </Modal>
    )
  );
};

export default ProfileModal;
