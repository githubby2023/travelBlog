import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";

// styles
import "bootstrap/scss/bootstrap.scss";
import "assets/scss/paper-kit.scss?v=1.3.0";
import "assets/demo/demo.css?v=1.3.0";
// pages
import Index from "views/Index.js";
// import NucleoIcons from "views/NucleoIcons.js";
// import LandingPage from "views/examples/LandingPage.js";
import OldIndex from "views/examples/OldIndex";
// import UserProfilePage from "components/Profile/Profile";
import Register from "components/Register/Register";
import Signin from "components/Signin/Signin";
import ProfilePage from "views/profile/ProfilePage.js";
import PostPage from "views/post/PostPage";
import Profile from "components/Profile/Profile";
import DashBoard from "views/examples/DashBoard";
import PostPage from "views/examples/PostPage";
// others

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <Switch>
      <Route path="/index" render={(props) => <Index {...props} />} />
      {/* <Route
        path="/nucleo-icons"
        render={(props) => <NucleoIcons {...props} />}
      />
      <Route
        path="/landing-page"
        render={(props) => <LandingPage {...props} />}
      />
      <Route
        path="/profile-page"
        render={(props) => <ProfilePage {...props} />}
      />
      <Route
        path="/register-page"
        render={(props) => <RegisterPage {...props} />}
      /> */}
      <Route
        path="/oldindex"
        render={(props) => <OldIndex {...props} />}
      />
      <Route
        path="/post"
        render={(props) => <PostPage {...props} />}
      />
      <Route
        path="/register"
        render={(props) => <Register {...props} />}
      />
      <Route
        path="/signin"
        render={(props) => <Signin {...props} />}
      />
      <Route
        path="/profile"
        render={(props) => <ProfilePage {...props} />}
      />
      <Route
        path="/dashboard"
        render={(props) => <DashBoard {...props} />}
      />
      <Route
        path="/postpage"
        render={(props) => <PostPage {...props} />}
      />
      <Redirect to="/index" />
    </Switch>
  </BrowserRouter>
);
