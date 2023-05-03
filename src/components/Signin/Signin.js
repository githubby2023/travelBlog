import ExamplesNavbar from "components/Navbars/ExamplesNavbar.js";

import React, { useState, useEffect } from "react";
import "./Signin.scss";
import { Button, Card, Form, Input, Container, Row, Col } from "reactstrap";
import { auth, signInWithGoogle } from "../../api/firebaseconfig";
import { signInWithEmailAndPassword, onAuthStateChanged} from "firebase/auth";
import { useHistory } from "react-router-dom";

const Signin = () => {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [user, setUser] = useState({});

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
      setUser(currentUser);
      if (currentUser.getIdToken != null) {
        history.push("/index");
      }
    });
  }, []);

  const login = async () => {
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword
      );
      console.log(user);
    } catch (error) {
      console.log(error);
    }
  };

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
                      onClick={(e) => e.preventDefault()}
                    >
                      Forgot password?
                    </Button>
                  </div>
                  <Button
                    block
                    className="signinBtn"
                    // color="primary"
                    onClick={login}
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
