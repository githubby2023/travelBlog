import React, { useState, useEffect } from "react";
import "./Signin.scss";
import { Button, Card, Form, Input, Container, Row, Col } from "reactstrap";
import { auth } from "../../api/firebaseconfig";
import {
  signInWithGoogle,
  writeUserData,
  queryUser,
  loginWithEmail,
} from "../../api/authentication";
import { onAuthStateChanged } from "firebase/auth";
import { useHistory } from "react-router-dom";

const Signin = () => {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const history = useHistory();

  document.documentElement.classList.remove("nav-open");
  React.useEffect(() => {
    document.body.classList.add("register-page");
    return function cleanup() {
      document.body.classList.remove("register-page");
    };
  });

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setErrorMessage("");
        // dispatch(updateUser(currentUser.displayName));
        currentUser.getIdToken().then((token) => {
          if (token) {
            queryUser(currentUser.uid).then((user) => {
              if (user) {
                //User ady in the database
                localStorage.setItem("currentUser", JSON.stringify(user));
                history.push("/index");
              } else {
                // No user is found in database, create a new user in firestore
                writeUserData(
                  currentUser.uid,
                  currentUser.displayName,
                  "",
                  currentUser.email,
                  "",
                  "",
                  currentUser.photoURL,
                  "",
                  ""
                )
                  .then(() => {
                    // console.log("Document written successfully");
                    queryUser(currentUser.uid).then((user) => {
                      localStorage.setItem("currentUser", JSON.stringify(user));
                      history.push("/index");
                    });
                  })
                  .catch((e) => {
                    console.log(e);
                  });
              }
            });
          }
        });
      }
    });
  }, []);

  return (
    <>
      {/* <ExamplesNavbar /> */}

      <div
        className="page-header"
        style={{
          backgroundImage: "url(" + require("assets/img/sea.jpg") + ")",
        }}
      >
        <h1 className="presentation-title-2">Travel Blog</h1>
        <Container>
          <Row>
            <Col className="mx-auto" lg="6">
              <Card className="card-register mx-auto">
                <h3 className="title mx-auto">Sign In</h3>
                <Form className="register-form">
                  <label>Email</label>
                  <Input
                    placeholder="Email"
                    type="text"
                    onChange={(event) => {
                      setLoginEmail(event.target.value);
                    }}
                  />
                  <label>Password</label>
                  <Input
                    placeholder="Password"
                    type="password"
                    onChange={(event) => {
                      setLoginPassword(event.target.value);
                    }}
                  />
                  <div className="forgot d-flex justify-content-end">
                    <Button
                      className="btn-link pr-0 mt-1"
                      color="warning"
                      href="#pablo"
                      onClick={(e) => console.log("Forgot password?")}
                    >
                      Forgot password?
                    </Button>
                  </div>
                  <Button
                    block
                    className="signinBtn"
                    // color="primary"
                    onClick={()=>{loginWithEmail(loginEmail, loginPassword)? setErrorMessage("Invalid email or password") : setErrorMessage("")}} 
                  >
                    Sign in
                  </Button>
                  <Button
                    block
                    className="googleBtn mt-2"
                    color="info"
                    onClick={signInWithGoogle}
                  >
                    <i className="fa fa-google" />
                    Sign in with Google
                  </Button>
                  {errorMessage && <div className="error"> {errorMessage} </div>}
                </Form>
                <div className="mx-auto">
                  <Button
                    className="signup btn-link mt-2"
                    color="warning"
                    href="/register"
                  >
                    Don't have account yet? Register
                  </Button>
                </div>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default Signin;
