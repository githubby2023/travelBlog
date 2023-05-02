import React from "react";
import {PostMansonry} from '../components/Home'
import trending from '../assets/mocks/trending'


import {
    Button,
    Card,
    CardBody,
    CardFooter,
    CardTitle,
    Form,
    Input,
    InputGroupAddon,
    InputGroupText,
    InputGroup,
    Container,
    Row,
    Col
  } from "reactstrap";

  // core components
import ExamplesNavbar from "components/Navbars/ExamplesNavbar.js";
import LandingPageHeader from "components/Headers/LandingPageHeader.js";
import DemoFooter from "components/Footers/DemoFooter.js";

function HomePage() {
    document.documentElement.classList.remove("nav-open");
    React.useEffect(() => {
      document.body.classList.add("profile-page");
      return function cleanup() {
        document.body.classList.remove("profile-page");
      };
    });
    return (
        <>
        <ExamplesNavbar/>
        <LandingPageHeader/>
        <div className="main">
            <div className="section text-center">
                <Container>
                    <Row>
                        <h2>Trending Posts</h2>
                        <PostMasonry posts={trending} columns = {3}/>
                    </Row>
                </Container>
            </div>
        </div>
        
        </>
     );
}

export default LandingPage;