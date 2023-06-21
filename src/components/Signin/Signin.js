import React, { useState, useEffect } from "react";
import "./Signin.scss";
import {
  Button,
  Card,
  Form,
  Input,
  Container,
  Row,
  Col,
  Modal,
} from "reactstrap";
import { auth } from "../../api/firebaseconfig";
import {
  signInWithGoogle,
  writeUserData,
  queryUser,
  loginWithEmail,
} from "../../api/authentication";
import { getAuth, onAuthStateChanged, sendPasswordResetEmail } from "firebase/auth";
import { useHistory } from "react-router-dom";

const Signin = () => {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
  const [liveDemo, setLiveDemo] = React.useState(false);
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [loginError, setLoginError] = useState("");

  const [signinInputfields, setSigninInputfields] = useState({
    loginEmail: "",
    loginPassword: "",
    emailErrorMessage: "",
    passwordErrorMessage: "",
    liveDemo: false,
    forgotPasswordEmail: "",
    loginError: "",
  });

  const history = useHistory();

  document.documentElement.classList.remove("nav-open");
  React.useEffect(() => {
    document.body.classList.add("register-page");
    return function cleanup() {
      document.body.classList.remove("register-page");
    };
  });


  useEffect(() => {
    setLoginEmail(signinInputfields.loginEmail);
    setLoginPassword(signinInputfields.loginPassword);
    setLiveDemo(signinInputfields.liveDemo);
    setForgotPasswordEmail(signinInputfields.forgotPasswordEmail);
    setLoginError(signinInputfields.loginError);
    setEmailErrorMessage(signinInputfields.emailErrorMessage);
    setPasswordErrorMessage(signinInputfields.passwordErrorMessage);
  }, [signinInputfields]);

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setEmailErrorMessage("");
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
      } else {
        localStorage.removeItem("currentUser");
      }
    });
  }, []);

  return (
    <>
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
                      event.target.value ===""
                          ? setSigninInputfields({
                              ...signinInputfields,
                              emailErrorMessage: "Email is required",
                              loginEmail: event.target.value,
                            })
                          : setSigninInputfields({
                              ...signinInputfields,
                              emailErrorMessage: "",
                              loginEmail: event.target.value,
                            })
                    }}
                  />
                  {emailErrorMessage && (<div className="error"> {emailErrorMessage} 
                  </div>
                  )}
                  <label>Password</label>
                  <Input
                    placeholder="Password"
                    type="password"
                    onChange={(event) => {
                      event.target.value ===""
                          ? setSigninInputfields({
                              ...signinInputfields,
                              passwordErrorMessage: "Password is required",
                              loginPassword: event.target.value,
                            })
                          : setSigninInputfields({
                              ...signinInputfields,
                              passwordErrorMessage: "",
                              loginPassword: event.target.value,
                            })
                    }}
                  />
                  {passwordErrorMessage && (<div className="error"> {passwordErrorMessage} 
                  </div>
                  )}
                  <div className="forgot d-flex justify-content-end">
                    <Button
                      className="btn-link pr-0 mt-1"
                      color="warning"
                      href="#pablo"
                      onClick={() =>
                        setSigninInputfields({
                          ...signinInputfields,
                          liveDemo: true,
                        })
                      }
                    >
                      Forgot password?
                    </Button>
                    <Modal
                      isOpen={liveDemo}
                      toggle={() =>
                        setSigninInputfields({
                          ...signinInputfields,
                          liveDemo: false,
                        })
                      }
                    >
                      <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLiveLabel">
                          Forgot Password
                        </h5>
                        <button
                          aria-label="Close"
                          className="close"
                          data-dismiss="modal"
                          type="button"
                          onClick={() =>
                            setSigninInputfields({
                              ...signinInputfields,
                              liveDemo: false,
                            })
                          }
                        >
                          <span aria-hidden={true}>×</span>
                        </button>
                      </div>
                      <div className="modal-body">
                        <Form className="register-form">
                          <label>Email</label>
                          <Input
                            placeholder="Email to receive password reset link"
                            type="text"
                            onChange={(event) => {
                              setSigninInputfields({
                                ...signinInputfields,
                                forgotPasswordEmail: event.target.value,
                              });
                            }}
                          />
                        </Form>
                      </div>
                      <div className="modal-footer">
                        <div className="left-side">
                          <Button
                            className="btn-link"
                            color="default"
                            data-dismiss="modal"
                            type="button"
                            onClick={() =>
                              sendPasswordResetEmail(
                                auth,
                                forgotPasswordEmail
                              ).then(() => setLiveDemo(false))
                            }
                          >
                            Renew Password
                          </Button>
                        </div>
                        <div className="divider" />
                        <div className="right-side">
                          <Button
                            className="btn-link"
                            color="danger"
                            type="button"
                            onClick={() => setLiveDemo(false)}
                          >
                            Close
                          </Button>
                        </div>
                      </div>
                    </Modal>
                  </div>
                  <Button
                    block
                    className="signinBtn"
                    onClick={() => {
                      loginWithEmail(loginEmail, loginPassword).then(() => {
                        if (getAuth().currentUser) {
                          setSigninInputfields({
                            ...signinInputfields,
                            loginError: "",
                          });
                        } else {
                          setSigninInputfields({
                            ...signinInputfields,
                            loginError: "Invalid email or password",
                          });
                        }
                      });
                    }}
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
                {loginError && <div className="error"> {loginError} </div>}
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
