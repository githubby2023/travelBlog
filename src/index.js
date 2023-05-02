import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";

// styles
import "bootstrap/scss/bootstrap.scss";
import "assets/scss/paper-kit.scss?v=1.3.0";
import "assets/demo/demo.css?v=1.3.0";

// pages
import Index from "views/Index.js";
import OldIndex from "views/examples/OldIndex";
import Register from "components/Register/Register";
import Signin from "components/Signin/Signin";
import Profile from "views/profile/ProfilePage.js";
import PostPage from "views/post/PostPage";
import DashBoard from "./views/dashboard/DashBoard";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <Switch>
      <Route path="/index" render={(props) => <Index {...props} />} />
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
        render={(props) => <Profile {...props} />}
      />
      <Route
        path="/dashboard"
        render={(props) => <DashBoard {...props} />}
      />
      {/* <Route
        path="/postpage"
        render={(props) => <PostPages {...props} />}
      /> */}
      <Redirect to="/index" />
    </Switch>
  </BrowserRouter>
);
