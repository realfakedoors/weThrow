import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { ProvideAuth, useAuth } from "../hooks/use-auth";

import SiteNav from "./common/SiteNav";
import SiteFooter from "./common/SiteFooter";

import SignUp from "./auth/SignUp";
import SignIn from "./auth/SignIn";
import ResetPassword from "./auth/ResetPassword";
import EnterNewPassword from "./auth/EnterNewPassword";
import ConfirmPassword from "./auth/ConfirmPassword";

import About from "./company_pages/About";
import Contact from "./company_pages/Contact";
import Jobs from "./company_pages/Jobs";
import Help from "./company_pages/Help";

import HomePage from "./HomePage";
import Dashboard from "./Dashboard";

const App = () => {
  function PrivateRoute({ children, ...rest }) {
    let auth = useAuth();
    return (
      <Route
        {...rest}
        render={({ location }) =>
          auth.userLoggedIn || localStorage.getItem("weThrowAuthToken") ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: "/sign_in",
                state: { from: location },
              }}
            />
          )
        }
      />
    );
  }

  return (
    <ProvideAuth>
      <BrowserRouter>
        <div id={"app-container"}>
          <SiteNav />
          <div id={"app-body"}>
            <Switch>
              <Route exact path={"/"}>
                <HomePage />
              </Route>
              <Route path={"/sign_up"}>
                <SignUp />
              </Route>
              <Route path={"/sign_in"}>
                <SignIn />
              </Route>
              <Route path={"/reset_password"}>
                <ResetPassword />
              </Route>
              <Route path={"/change_password"}>
                <EnterNewPassword />
              </Route>
              <Route path={"/confirm"}>
                <ConfirmPassword />
              </Route>
              <Route path={"/about"}>
                <About />
              </Route>
              <Route path={"/contact"}>
                <Contact />
              </Route>
              <Route path={"/jobs"}>
                <Jobs />
              </Route>
              <Route path={"/help"}>
                <Help />
              </Route>
              <PrivateRoute path={"/dashboard"}>
                <Dashboard />
              </PrivateRoute>
            </Switch>
          </div>
          <SiteFooter />
        </div>
      </BrowserRouter>
    </ProvideAuth>
  );
};

export default App;
