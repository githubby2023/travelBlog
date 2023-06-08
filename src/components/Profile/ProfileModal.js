import React from "react";

import {
  Button,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Modal,
  UncontrolledDropdown,
} from "reactstrap";

const ProfileModal = ({ isModalOpened, toggleModal }) => {
  const continent = [
    "Asia",
    "North America",
    "South America",
    "Africa",
    "Europe",
    "Australia",
    "Antartica",
  ];

  return (
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
                    placeholder="Default"
                    type="text"
                  />
                </label>
                <label className="label-text">
                  Name:
                  <input
                    className="input-text"
                    placeholder="Default"
                    type="text"
                  />
                </label>
                <label className="label-text">
                  Address:
                  <input
                    className="input-text"
                    placeholder="Default"
                    type="text"
                  />
                </label>
                {/* Gender */}
                <label className="label-text">
                  Gender:
                  <div className="form-check-radio">
                    <label check>
                      <input
                        className="radio-label"
                        defaultValue="male"
                        id="male"
                        name="gender"
                        type="radio"
                      />
                      <span className="form-check-sign" />
                      Male
                    </label>
                  </div>
                  <div className="form-check-radio">
                    <label check>
                      <input
                        className="radio-label"
                        defaultChecked
                        defaultValue="female"
                        id="female"
                        name="gender"
                        type="radio"
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
                      Select
                    </DropdownToggle>
                    <DropdownMenu
                      aria-labelledby="dropdownMenuButton"
                      className="dropdown-info"
                    >
                      <DropdownItem header tag="span">
                        Nationality
                      </DropdownItem>
                      {continent.map((country) => {
                        return (
                          <DropdownItem
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
                          >
                            {country}
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
                    placeholder="Default"
                    type="text"
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
          <Button className="btn-link" color="danger" type="button">
            Update
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ProfileModal;
