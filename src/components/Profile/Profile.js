import React from "react";
import { signOut } from "firebase/auth";
import { auth } from "../../api/firebaseconfig";
import ExamplesNavbar from "components/Navbars/ExamplesNavbar";
import "./Profile.scss";
import { Button, Card, Form, Input, Container, Row, Col, Label} from "reactstrap";


const Profile = () => {
  const logout = async () => {
    await signOut(auth);
  };

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
            <Button
                    block
                    className="signinBtn"
                    href="/signin"
                    // color="primary"
                    onClick={logout}
                  ></Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
