import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";

// styles
import "bootstrap/scss/bootstrap.scss";
import "assets/scss/paper-kit.scss?v=1.3.0";
import "assets/demo/demo.css?v=1.3.0";

// pages
import Index from "views/Index.js";
import Register from "components/Register/Register";
import Signin from "components/Signin/Signin";
import Profile from "views/profile/ProfilePage.js";
import PostPage from "views/post/PostPage";
import DashBoard from "./views/dashboard/DashBoard";
import CreatePage from "views/Create/CreatePage";

const root = ReactDOM.createRoot(document.getElementById("root"));




function Application() {
  
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/index" render={(props) => <Index {...props} />} />
        <Route path="/post/:id" render={(props) => <PostPage {...props} />} />
        <Route path="/register" render={(props) => <Register {...props} />} />
        <Route path="/signin" render={(props) => <Signin {...props} />} />
        <Route path="/profile/:id" render={(props) => <Profile {...props} />} />
        <Route path="/dashboard" render={(props) => <DashBoard {...props} />} />
        <Route path="/create" render={(props) => <CreatePage {...props} />} />
        {/* <Route path="/nu" render={(props) => <NucleoIcons {...props} />} /> */}
        <Redirect to="/signin"/>
      </Switch>
    </BrowserRouter>
  );
}

root.render(
    <Application />
);
