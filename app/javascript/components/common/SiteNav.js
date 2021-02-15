import React, { Fragment } from "react";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../../hooks/use-auth";

const SiteNav = () => {
  let history = useHistory();
  const auth = useAuth();

  let navSiteLinks = (
    <Fragment>
      <Link to="#" className="navbar-item">
        Courses
      </Link>
      <Link to="#" className="navbar-item">
        Tournaments
      </Link>
      <Link to="#" className="navbar-item">
        Leagues
      </Link>
      <Link to="#" className="navbar-item">
        Discs
      </Link>
      <Link to="#" className="new-round-button button is-primary navbar-item">
        Start a new round
      </Link>
    </Fragment>
  );

  let navRight;
  if (auth.userLoggedIn) {
    navRight = (
      <Fragment>
        <Link to="/dashboard" className="navbar-item">
          Dashboard
        </Link>
        <button
          className="signout-button button is-danger"
          onClick={() => {
            auth.signout(() => history.push("/sign_in"));
          }}
        >
          Sign Out
        </button>
      </Fragment>
    );
  } else {
    navRight = (
      <Fragment>
        <Link to="/sign_up" className="button is-link is-light">
          Sign Up
        </Link>
        <Link to="/sign_in" className="button is-link">
          Log In
        </Link>
      </Fragment>
    );
  }

  return (
    <nav
      className="navbar site-nav is-dark"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="navbar-brand">
        <Link to="/">
          <img
            className="navbar-logo"
            src="weThrowLogo.png"
            alt="An app for disc golfers."
          />
          <p className="navbar-company-name">weThrow</p>
        </Link>
      </div>
      <div className="navbar-menu">
        <div className="navbar-end">
          {navSiteLinks}
          {navRight}
        </div>
      </div>
    </nav>
  );
};

export default SiteNav;
