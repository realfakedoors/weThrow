import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { ProvideAuth } from "../hooks/use-auth";

import SiteNav from "./common/SiteNav";
import SiteFooter from "./common/SiteFooter";

import PrivateRoute from "./auth/PrivateRoute";
import AdminRoute from "./auth/AdminRoute";
import SignUp from "./auth/SignUp";
import SignIn from "./auth/SignIn";
import ResetPassword from "./auth/ResetPassword";
import EnterNewPassword from "./auth/EnterNewPassword";
import ConfirmPassword from "./auth/ConfirmPassword";

import About from "./company_pages/About";
import Contact from "./company_pages/Contact";
import Jobs from "./company_pages/Jobs";
import Help from "./company_pages/Help";

import AdminMessages from "./direct_messages/AdminMessages";

import HomePage from "./HomePage";
import Dashboard from "./Dashboard";

const App = () => {
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
              <AdminRoute path={"/admin"}>
                <AdminMessages />
              </AdminRoute>
            </Switch>
          </div>
          <SiteFooter />
        </div>
      </BrowserRouter>
    </ProvideAuth>
  );
};

export default App;
