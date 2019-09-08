import React from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import { Route } from "react-router";

import LandingPage from "./pages/landing";
import SignupPage1 from "./pages/signup1";
import SignupPage2 from "./pages/signup2";
import SigninPage from "./pages/signin";
import HomePage from "./pages/Home";
import Charts from './pages/Charts.jsx';

ReactDOM.render(
  <Router>
    <Switch>
      <Route exact path="/" component={LandingPage} />
      <Route path="/signup1" component={SignupPage1} />
      <Route path="/signup2" component={SignupPage2} />
      <Route path="/signin" component={SigninPage} />
      <Route path="/home" component={HomePage} />
      <Route path="/charts" component={Charts} />
    </Switch>
  </Router>,
  document.getElementById("root")
);

serviceWorker.unregister();
