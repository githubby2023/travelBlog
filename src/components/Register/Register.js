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
  const [emailFormClassName, setEmailFormClassName] = useState("register-form");
  const [passwordFormClassName, setPasswordFormClassName] = useState("password-form");
  const [addressFormClassName, setAddressFormClassName] = useState("register-form");
  const [genderFormClassName, setGenderFormClassName] = useState("register-form");
  const [nameFormClassName, setNameFormClassName] = useState("register-form");
  const [nationalityFormClassName, setNationalityFormClassName] = useState("register-form");

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser != null) {
        history.push("/index");
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
      {/* <ExamplesNavbar /> */}
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

                <Form className={emailFormClassName}>
                  <label> Email </label>
                  <Input
                    placeholder="Email"
                    type="text"
                    error={emailError ? true : false}
                    onChange={(event) => {
                      setRegisterEmail(event.target.value);
                      if (event.target.value === "") {
                        setEmailFormClassName("has-danger");
                        setEmailError("Email is required");
                      } else {
                        setEmailFormClassName("has-success");
                        setEmailError("");
                      }
                    }}
                  />
                </Form>
                <Form className={passwordFormClassName}>
                <label>Password</label>
                
                  <Input
                    placeholder="Password"
                    type="password"
                    helperText={passwordError}
                    error={true}
                    onChange={(event) => {
                      setRegisterPassword(event.target.value);
                      if (registerPassword === "") {
                        setPasswordError("Password is required");
                      } else {
                        setPasswordError("");
                      }
                    }}
                  />
                </Form>
                <Form className={passwordFormClassName}>
                <label>Confirm Password</label>
                <Input
                  placeholder="Password"
                  type="password"
                  helperText={confirmPasswordError}
                  onChange={(event) => {
                    setRegisterConfirmPassword(event.target.value);
                    if(event.target.value === registerPassword){
                      setPasswordFormClassName("has-success");
                    }else{
                      setPasswordFormClassName("has-danger");
                    }
                    if (
                      event.target.value !== registerPassword ||
                      registerName === "" ||
                      registerAddress === "" ||
                      registerEmail === ""
                    ) {
                      setDisabled(true);
                      setConfirmPasswordError("Not match password");
                    } else {
                      setDisabled(false);
                      setConfirmPasswordError("");
                    }
                  }}
                />
                </Form>
                <Form className={nameFormClassName}>
                <label>Name</label>
                <Input
                  placeholder="Name"
                  type="text"
                  onChange={(event) => {
                    setRegisterName(event.target.value);
                    if(event.target.value !== ""){
                      setNameFormClassName("has-success");
                    }else{
                      setNameFormClassName("has-danger");
                    }
                    if (
                      registerConfirmPassword !== registerPassword ||
                      registerName === "" ||
                      registerAddress === "" ||
                      registerEmail === ""
                    ) {
                      setDisabled(true);
                    } else {
                      setDisabled(false);
                    }
                  }}
                />
                </Form>
                <Form className={addressFormClassName}>
                <label>Address</label>
                <Input
                  placeholder="Address"
                  type="text"
                  onChange={(event) => {
                    setRegisterAddress(event.target.value);
                    console.log("registerNationality: " + registerNationality);
                    console.log("registerGender: " + registerGender);
                    console.log("registerAddress: " + registerAddress);
                    console.log("registerName: " + registerName);
                    console.log(
                      "registerConfirmPassword: " + registerConfirmPassword
                    );
                    console.log("registerPassword: " + registerPassword);
                    console.log("registerEmail: " + registerEmail);
                    if(event.target.value !== ""){
                      setAddressFormClassName("has-success");
                    }else{
                      setAddressFormClassName("has-danger");
                    }
                    if (
                      registerConfirmPassword !== registerPassword ||
                      registerName === "" ||
                      registerAddress === "" ||
                      registerEmail === ""
                    ) {
                      setDisabled(true);
                    } else {
                      setDisabled(false);
                    }
                  }}
                />
                </Form>
                <Form className={nationalityFormClassName}>
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
                  onChange={(event) => {
                    setRegisterNationality(event.target.value);
                  }}
                </Input>
                </Form>
                <Form className={genderFormClassName}>
                <label>Gender</label>
                <Input type="select" name="select" id="inputState">
                  <option>Male</option>
                  <option>Female</option>
                  <option>Prefer not to say</option>
                  onChange=
                  {(event) => {
                    setRegisterGender(event.target.value);
                  }}
                </Input>
                </Form>
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

                <div className="mx-auto">
                  <Button
                    className="signin btn-link mt-2"
                    color="warning"
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
