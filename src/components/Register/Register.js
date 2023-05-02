import ExamplesNavbar from "components/Navbars/ExamplesNavbar.js";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { auth, signInWithGoogle } from "../../api/firebaseconfig";
import React, { useState, useEffect } from "react";
import "./Register.scss";
import {
  Button,
  Card,
  Form,
  Input,
  Container,
  Row,
  Col,
  Label,
} from "reactstrap";
import { useHistory } from "react-router-dom";

const Register = () => {
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerConfirmPassword, setRegisterConfirmPassword] = useState("");
  const [registerAddress, setRegisterAddress] = useState("");
  const [registerGender, setRegisterGender] = useState("");
  const [registerName, setRegisterName] = useState("");
  const [registerNationality, setRegisterNationality] = useState("");
  const [user, setUser] = useState({});
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [disabled, setDisabled] = useState(true);
  const history = useHistory();

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser != null) {
        history.push("/profile");
      }
    });
  }, []);

  document.documentElement.classList.remove("nav-open");
  React.useEffect(() => {
    document.body.classList.add("register-page");
    return function cleanup() {
      document.body.classList.remove("register-page");
    };
  });

  const registerWithEmail = async () => {
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        registerEmail,
        registerPassword
      );
      console.log(user);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <ExamplesNavbar />
      <div
        className="page-header"
        style={{
          backgroundImage: "url(" + require("assets/img/darksea.jpg") + ")",
        }}
      >
        <Container>
          <Row>
            <Col className="mx-auto" lg="6">
              <Card className="card-register mx-auto">
                <h3 className="title mx-auto">Register</h3>
                <Form className="register-form">
                  <Label for="error" className="control-label">
                    Email
                  </Label>
                  {/* <Input type="text" name="error" id="error" defaultValue="Error input"></Input> */}
                  <Input
                    placeholder="Email"
                    type="text"
                    onChange={(event) => {
                      setRegisterEmail(event.target.value);
                      if (event.target.value === "") {
                        setEmailError("Email is required");
                      } else {
                        setEmailError("");
                      }
                    }}
                  />
                  <label>Password</label>
                  <Input
                    placeholder="Password"
                    type="password"
                    helperText={passwordError}
                    onChange={(event) => {
                      setRegisterPassword(event.target.value);
                      if (registerPassword === "") {
                        setPasswordError("Password is required");
                      } else {
                        setPasswordError("");
                      }
                    }}
                  />
                  <label>Confirm Password</label>
                  <Input
                    placeholder="Password"
                    type="password"
                    helperText={confirmPasswordError}
                    onChange={(event) => {
                      setRegisterConfirmPassword(event.target.value);
                      if (
                        event.target.value !== registerPassword || registerName === "" || registerAddress === "" || registerEmail === ""
                      ) {
                        setDisabled(true);
                        setConfirmPasswordError("Not match password");
                      } else {
                        setDisabled(false);
                        setConfirmPasswordError("");
                      }
                    }}
                  />
                  <label>Name</label>
                  <Input
                    placeholder="Name"
                    type="text"
                    onChange={(event) => {setRegisterName(event.target.value)
                      if (
                        registerConfirmPassword !== registerPassword || registerName === "" || registerAddress === "" || registerEmail === ""
                      ) {
                        setDisabled(true);
                        setConfirmPasswordError("Not match password");
                      }else{
                        setDisabled(false);
                        setConfirmPasswordError("");
                      }
                    }}
                  />
                  <label>Address</label>
                  <Input
                    placeholder="Address"
                    type="text"
                    onChange={(event) => {setRegisterAddress(event.target.value)
                      console.log("registerNationality: "+ registerNationality)
                      console.log("registerGender: "+ registerGender)
                      console.log("registerAddress: "+ registerAddress)
                      console.log("registerName: "+ registerName)
                      console.log("registerConfirmPassword: "+ registerConfirmPassword)
                      console.log("registerPassword: "+ registerPassword)
                      console.log("registerEmail: "+ registerEmail)
                      
                      if (
                        registerConfirmPassword !== registerPassword || registerName === "" || registerAddress === "" || registerEmail === ""
                      ) {
                        setDisabled(true);
                        setConfirmPasswordError("Not match password");
                      }else{
                        setDisabled(false);
                        setConfirmPasswordError("");
                      }}}
                  />
                  <label>Nationality</label>
                  <Input type="select" name="select" id="inputState">
                    <option>Malaysia</option>
                    <option>United State of America</option>
                    <option>Japan</option>
                    <option>United Kingdom</option>
                    <option>China</option>
                    <option>India</option>
                    <option>Indonesia</option>
                    <option>Thailand</option>
                    <option>Philippines</option>
                    <option>Vietnam</option>
                    <option>Singapore</option>
                    <option>Myanmar</option>
                    <option>South Korea</option>
                    <option>Brunei</option>

                    onChange={(event) => {setRegisterNationality(event.target.value)
                    }}
                  </Input>
                  <label>Gender</label>
                  <Input type="select" name="select" id="inputState">
                    <option>Male</option>
                    <option>Female</option>
                    <option>Prefer not to say</option>

                    onChange={(event) => {setRegisterGender(event.target.value)}}
                  </Input>
                  <Button
                    block
                    className="registerBtn"
                    disabled={disabled}
                    // color="primary"
                    onClick={registerWithEmail}
                  >
                    Register
                  </Button>
                  <Button
                    block
                    className="googleBtn mt-2"
                    color="info"
                    onClick={signInWithGoogle}
                  >
                    <i className="fa fa-google" />
                    Register with Google
                  </Button>
                </Form>
                <div className="mx-auto">
                  <Button
                    className="signin btn-link mt-2"
                    color="danger"
                    href="/signin"
                  >
                    Already have an account? Sign in
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

export default Register;
