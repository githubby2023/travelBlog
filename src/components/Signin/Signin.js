import ExamplesNavbar from "components/Navbars/ExamplesNavbar.js";

import React from "react";
import "./Signin.scss";
import { Button, Card, Form, Input, Container, Row, Col } from "reactstrap";

const Signin = () => {
  document.documentElement.classList.remove("nav-open");
  React.useEffect(() => {
    document.body.classList.add("register-page");
    return function cleanup() {
      document.body.classList.remove("register-page");
    };
  });

  return (
    <>
      <ExamplesNavbar />
      <div className="page-header" style={{
          backgroundImage:
            "url(" + require("assets/img/sea.jpg") + ")"
        }}>
        <Container>
          <Row>
            <Col className="mx-auto" lg="6">
              <Card className="card-register mx-auto">
                <h3 className="title mx-auto">Sign In</h3>
                <Form className="register-form">
                  <label>Email</label>
                  <Input placeholder="Email" type="text" />
                  <label>Password</label>
                  <Input placeholder="Password" type="password" />
                  <div className="forgot d-flex justify-content-end">
                    <Button
                      className="btn-link pr-0 mt-1"
                      color="danger"
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
                    onClick={(e) => e.preventDefault()}
                  >
                    Sign in
                  </Button>
                  <Button
                    block
                    className="googleBtn mt-2"
                    color="info"
                    onClick={(e) => e.preventDefault()}
                  >
                    <i className="fa fa-google" />
                    Sign in with Google
                  </Button>
                </Form>
                <div className="mx-auto">
                  <Button
                    className="signup btn-link mt-2"
                    color="danger"
                    href="/register"
                  >
                    Already have an account? Register
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
