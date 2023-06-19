import {
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../../api/firebaseconfig";
import { signInWithGoogle, registerWithEmail,queryUser,writeUserData } from "../../api/authentication";
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
import { useDispatch,useSelector } from "react-redux";
import { setRegisterErrorMessage } from "actions/setRegisterErrorMessage";


const Register = () => {
  const dispatch = useDispatch();
  const registerErrorMessage = useSelector(state => state.registerErrorMessage);
  const [errorMessage, setErrorMessage] = useState("");
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
  const [passwordFormClassName, setPasswordFormClassName] =
    useState("password-form");
  const [addressFormClassName, setAddressFormClassName] =
    useState("register-form");
  const [genderFormClassName, setGenderFormClassName] =
    useState("register-form");
  const [nameFormClassName, setNameFormClassName] = useState("register-form");
  const [nationalityFormClassName, setNationalityFormClassName] =
    useState("register-form");

  const [registerInput, setRegisterInput] = useState({email:"", password: "", confirmpassword: "", name: "", address:"",nationality:"",gender:""});

  useEffect(() => {
    setRegisterEmail(registerInput.email);
    setRegisterPassword(registerInput.password);
    setRegisterConfirmPassword(registerInput.confirmpassword);
    setRegisterName(registerInput.name);
    setRegisterAddress(registerInput.address);
    setRegisterNationality(registerInput.nationality);
    setRegisterGender(registerInput.gender);

    if(registerConfirmPassword !== registerPassword){
      setConfirmPasswordError("Not match password");
    }
  } , [registerInput]);

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setErrorMessage("");
      if (currentUser) {
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
                  registerName,
                  registerNationality,
                  currentUser.email,
                  registerGender,
                  registerAddress,
                  currentUser.photoURL,
                  "",
                  "",
                  "",
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
      // setUser(currentUser);
      // if (currentUser != null) {
      //   history.push("/index");
      // }
    });
  }, []);

  document.documentElement.classList.remove("nav-open");
  React.useEffect(() => {
    document.body.classList.add("register-page");
    return function cleanup() {
      document.body.classList.remove("register-page");
    };
  });

  return (
    <>
      {/* <ExamplesNavbar /> */}
      <div
        className="page-header"
        style={{
          backgroundImage: "url(" + require("assets/img/darksea.jpg") + ")",
        }}
      >
        <h1 className="presentation-title-2">Travel Blog</h1>
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
                      setRegisterInput({...registerInput, email: event.target.value});
                      console.log("email :" +registerInput.email)
                      // setRegisterEmail(event.target.value);
                      // //condition to check if email is valid********************
                      // const emptyStringTrue = event.target.value === "" || event.target.value === null
                      // const withoutAllias = event.target.value.includes("@") === false
                      // const withoutDot = event.target.value.includes(".") === false || event.target.value.endsWith(".") === true
                      // const withoutTopLevelDomain = (event.target.value.endsWith('com') === false && event.target.value.endsWith('net') === false && event.target.value.endsWith('org') === false && event.target.value.endsWith('info') === false && event.target.value.endsWith('us') === false && event.target.value.endsWith('my') === false)
                      // //********************************************************* */
                      // if (emptyStringTrue || withoutAllias || withoutDot || withoutTopLevelDomain)  {
                      //   setEmailFormClassName("has-danger");
                      //   setEmailError("Email is required");
                      // } else {
                      //   setEmailFormClassName("has-success");
                      //   setEmailError("");
                      // }
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
                      setRegisterInput({...registerInput, password: event.target.value});
                      console.log("password :" + registerInput.password)
                      console.log("email :" + registerInput.email)
                      // setRegisterPassword(event.target.value);
                      // if (registerPassword === null || registerPassword.length < 3) {
                      //   setPasswordError("Password must be at least 3 characters long");
                      // } else {
                      //   setPasswordError("");
                      // }
                    }}
                  />
                </Form>
                {passwordError && <div className="error"> {passwordError} </div>}
                <Form className={passwordFormClassName}>
                  <label>Confirm Password</label>
                  <Input
                    placeholder="Password"
                    type="password"
                    helperText={confirmPasswordError}
                    onChange={(event) => {
                      // console.log(
                      //   "registerConfirmPassword: " + registerConfirmPassword
                      // );
                      // console.log("registerPassword: " + registerPassword);
                      // setRegisterConfirmPassword(event.target.value);
                      // if (event.target.value === registerPassword) {
                      //   setPasswordFormClassName("has-success");
                      // } else {
                      //   setPasswordFormClassName("has-danger");
                      // }
                      // if (
                      //   event.target.value !== registerPassword ||
                      //   registerName === "" ||
                      //   registerAddress === "" ||
                      //   registerEmail === ""
                      // ) {
                      //   setDisabled(true);
                      //   setConfirmPasswordError("Not match password");
                      // } else {
                      //   setDisabled(false);
                      //   setConfirmPasswordError("");
                      // }
                    }}
                  />
                </Form>
                {confirmPasswordError && <div className="error"> {confirmPasswordError} </div>}
                <Form className={nameFormClassName}>
                  <label>Name</label>
                  <Input
                    placeholder="Name"
                    type="text"
                    onChange={(event) => {
                      // setRegisterName(event.target.value);
                      // if (event.target.value !== "") {
                      //   setNameFormClassName("has-success");
                      // } else {
                      //   setNameFormClassName("has-danger");
                      // }
                      // if (
                      //   registerConfirmPassword !== registerPassword ||
                      //   registerName === "" ||
                      //   registerAddress === "" ||
                      //   registerEmail === ""
                      // ) {
                      //   setDisabled(true);
                      // } else {
                      //   setDisabled(false);
                      // }
                    }}
                  />
                </Form>
                <Form className={addressFormClassName}>
                  <label>Address</label>
                  <Input
                    placeholder="Address"
                    type="text"
                    onChange={(event) => {
                      // setRegisterAddress(event.target.value);
                      // console.log(
                      //   "registerNationality: " + registerNationality
                      // );
                      // console.log("registerGender: " + registerGender);
                      // console.log("registerAddress: " + registerAddress);
                      // console.log("registerName: " + registerName);
                      // console.log(
                      //   "registerConfirmPassword: " + registerConfirmPassword
                      // );
                      // console.log("registerPassword: " + registerPassword);
                      // console.log("registerEmail: " + registerEmail);
                      // if (event.target.value !== "") {
                      //   setAddressFormClassName("has-success");
                      // } else {
                      //   setAddressFormClassName("has-danger");
                      // }
                      // if (
                      //   registerConfirmPassword !== registerPassword ||
                      //   registerName === "" ||
                      //   registerAddress === "" ||
                      //   registerEmail === ""
                      // ) {
                      //   setDisabled(true);
                      // } else {
                      //   setDisabled(false);
                      // }
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
                    onChange=
                    {(event) => {
                      // setRegisterNationality(event.target.value);
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
                      // setRegisterGender(event.target.value);
                    }}
                  </Input>
                </Form>
                <Button
                  block
                  className="registerBtn"
                  onClick={() => {
                      // dispatch(setRegisterErrorMessage());
                      registerWithEmail(registerEmail, registerPassword)? setErrorMessage({registerErrorMessage}): setErrorMessage("Email is already in use")
                    }
                  }
                  // onClick={() => {console.log("nihao")}}
                  disabled={disabled}
                  // color="primary"
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
                {registerErrorMessage && <div className="error"> {registerErrorMessage} </div>}
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
