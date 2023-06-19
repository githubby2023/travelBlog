import React from "react";
import { Link } from "react-router-dom";
// nodejs library that concatenates strings
import classnames from "classnames";
import { signOut, getAuth } from "firebase/auth";
// reactstrap components
import {
  Collapse,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  Button,
} from "reactstrap";
import SearchBar from "components/Landing/searchBar";

function ExamplesNavbar({ isTransparent = true }) {
  const [navbarColor, setNavbarColor] = React.useState("");
  const [navbarCollapse, setNavbarCollapse] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({uid: ""});
  const [profileRoute, setProfileRoute] = React.useState("/signin");
  const [createRoute, setCreateRoute] = React.useState("/signin");
  const [dashboardRoute, setDashboardRoute] = React.useState("/signin");

  const toggleNavbarCollapse = () => {
    setNavbarCollapse(!navbarCollapse);
    document.documentElement.classList.toggle("nav-open");
  };

  React.useEffect(() => {
    const userTemp = JSON.parse(localStorage.getItem("currentUser"));
    if (userTemp) {
      setCurrentUser(userTemp);
      setProfileRoute(`/profile/${userTemp.uid}`);
      setCreateRoute("/create");
      setDashboardRoute(`/dashboard`);
    }
  }, []);

  React.useEffect(() => {
    const updateNavbarColor = () => {
      if (isTransparent) {
        if (
          document.documentElement.scrollTop > 299 ||
          document.body.scrollTop > 299
        ) {
          setNavbarColor("");
        } else if (
          document.documentElement.scrollTop < 300 ||
          document.body.scrollTop < 300
        ) {
          setNavbarColor("navbar-transparent");
        }
      } else {
        setNavbarColor("");
      }
    };

    window.addEventListener("scroll", updateNavbarColor);

    return function cleanup() {
      window.removeEventListener("scroll", updateNavbarColor);
    };
  }, [isTransparent]);
  return (
    <Navbar
      className={classnames("fixed-top", navbarColor)}
      color-on-scroll="300"
      expand="lg"
    >
      <Container>
        <div className="navbar-translate">
          <NavbarBrand
            data-placement="bottom"
            to="/landing-page"
            title="Coded by GitHubby"
            tag={Link}
          >
            Travel Blog
          </NavbarBrand>
          <button
            aria-expanded={navbarCollapse}
            className={classnames("navbar-toggler navbar-toggler", {
              toggled: navbarCollapse,
            })}
            onClick={toggleNavbarCollapse}
          >
            <span className="navbar-toggler-bar bar1" />
            <span className="navbar-toggler-bar bar2" />
            <span className="navbar-toggler-bar bar3" />
            <span className="navbar-toggler-bar bar4" />
          </button>
        </div>
        <Collapse
          className="justify-content-end"
          navbar
          isOpen={navbarCollapse}
        >
          <Nav navbar>
            <NavItem>
              <SearchBar />
            </NavItem>

            <NavItem>
              <NavLink href={createRoute}>
                <i className="nc-icon nc-simple-add" /> Create Post
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href={dashboardRoute}>
                <i className="nc-icon nc-layout-11" /> Dashboard
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href={profileRoute}>
                <i className="nc-icon nc-single-02" /> Profile
              </NavLink>
            </NavItem>

            <NavItem>
              <NavLink
                onClick={signOut(getAuth())}
                href="/signin"
                // target="_blank"
              >
                {currentUser.uid === "" ? (
                  <>
                    <i className="nc-icon nc-circle-10" /> Login
                  </>
                ) : (
                  <>
                    <i className="nc-icon nc-user-run" /> Logout
                  </>
                )}
              </NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Container>
    </Navbar>
  );
}

export default ExamplesNavbar;
