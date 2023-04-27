import ExamplesNavbar from "components/Navbars/ExamplesNavbar.js";

import React from "react";
import "./Register.scss";
import { Button, Card, Form, Input, Container, Row, Col } from "reactstrap";

const Register = () => {
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
                  <label>Email</label>
                  <Input placeholder="Email" type="text" />
                  <label>Password</label>
                  <Input placeholder="Password" type="password" />
                  <label>Confirm Password</label>
                  <Input placeholder="Password" type="password" />
                  <Button
                    block
                    className="registerBtn"
                    // color="primary"
                    onClick={(e) => e.preventDefault()}
                  >
                    Register
                  </Button>
                  <Button
                    block
                    className="googleBtn mt-2"
                    color="info"
                    onClick={(e) => e.preventDefault()}
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
