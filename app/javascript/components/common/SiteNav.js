import React, { Fragment } from "react";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../../hooks/use-auth";

const SiteNav = () => {
  let history = useHistory();
  const auth = useAuth();

  let navRight;
  if (auth.userLoggedIn) {
    navRight = (
      <Fragment>
        <Link to="/dashboard" className="navbar-item">
          Dashboard
        </Link>
        <button
          className="button is-danger signout-button"
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
    <nav className="navbar site-nav is-dark" role="navigation" aria-label="main navigation">
      {/*<div className="navbar-brand">
      <Link to="/">
        weThrow brand/logo
      </Link>
    </div>*/}

      <div className="navbar-menu">
        <div className="navbar-start">
          {/*<Link to="/sign_up" className="navbar-item">
            Sign Up
          </Link>*/}
        </div>
        <div className="navbar-end">{navRight}</div>
      </div>
    </nav>
  );
};

export default SiteNav;
