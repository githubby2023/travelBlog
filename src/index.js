import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore } from "redux";
import allReducers from "./reducers/allReducers";
import {
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "api/firebaseconfig";
import {queryUser,writeUserData } from "api/authentication";
import { useHistory } from "react-router-dom";


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
import CreatePage from "views/Create/CreatePage";

const root = ReactDOM.createRoot(document.getElementById("root"));
const store = createStore(
  allReducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);



function Application() {
  // const history = useHistory();

  // useEffect(() => {
  //   onAuthStateChanged(auth, (currentUser) => {
  //     if (currentUser) {
  //       // dispatch(updateUser(currentUser.displayName));
  //       currentUser.getIdToken().then((token) => {
  //         if (token) {
  //           queryUser(currentUser.uid).then((user) => {
  //             if (user) {
  //               //User ady in the database
  //               localStorage.setItem("currentUser", JSON.stringify(user));
  //               history.push("/index");
  //             } else {
  //                     history.push("/login");
  //             }
  //           });
  //         }
  //       });
  //     }
  //     else{
  //       localStorage.removeItem("currentUser");
  //       history.push("/login");
  //     }
      // setUser(currentUser);
      // if (currentUser != null) {
      //   history.push("/index");
      // }
  //   });
  // }, []);
  
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/index" render={(props) => <Index {...props} />} />
        <Route path="/oldindex" render={(props) => <OldIndex {...props} />} />
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
  <Provider store={store}>
    <Application />
   </Provider> 
);
