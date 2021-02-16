import React, { Fragment } from "react";
import { Link, NavLink, useHistory } from "react-router-dom";
import { useAuth } from "../../hooks/use-auth";

const SiteNav = () => {
  let history = useHistory();
  const auth = useAuth();

  let navSiteLinks = (
    <Fragment>
      <NavLink to="#" className="navbar-item">
        Courses
      </NavLink>
      <NavLink to="#" className="navbar-item">
        Tournaments
      </NavLink>
      <NavLink to="#" className="navbar-item">
        Leagues
      </NavLink>
      <NavLink to="#" className="navbar-item">
        Discs
      </NavLink>
      <Link to="#" className="new-scorecard-button button is-primary">
        Start a new round
      </Link>
    </Fragment>
  );

  let navRight;
  if (auth.userLoggedIn) {
    navRight = (
      <Fragment>
        <Link to="/dashboard" className="button is-warning">
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

  let adminButton;
  if (auth.adminStatus) {
    adminButton = (
      <Fragment>
        <Link to="/admin" className="button is-success">
          Admin
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
          {adminButton}
          {navRight}
        </div>
      </div>
    </nav>
  );
};

export default SiteNav;
