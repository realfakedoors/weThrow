import React, { useState, useEffect, Fragment } from "react";
import { Link, NavLink, useHistory } from "react-router-dom";
import { useAuth } from "../../hooks/use-auth";

import axios from "axios";

const SiteNav = () => {
  let history = useHistory();
  const auth = useAuth();

  const [isLoading, setLoading] = useState(true);
  const [adminUnreadCount, setAdminUnreadCount] = useState(0);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    if (auth.userLoggedIn) {
      getUnreadMessageCount();
    }
    if (auth.adminStatus) {
      getUnreadAdminMessageCount();
    }
    setLoading(false);
  }, [auth.userLoggedIn]);

  function getUnreadMessageCount() {
    axios
      .get("/api/direct_messages", {
        headers: {
          Authorization: auth.userToken,
        },
      })
      .then((res) => {
        if (res.data) {
          setUnreadCount(res.data.unread_count);
        }
      })
      .catch((err) => console.error(err));
  }

  function getUnreadAdminMessageCount() {
    axios
      .get("/api/direct_messages", {
        params: {
          inbox: "admin",
        },
        headers: {
          Authorization: auth.userToken,
        },
      })
      .then((res) => {
        if (res.data) {
          setAdminUnreadCount(res.data.unread_count);
        }
      })
      .catch((err) => console.error(err));
  }

  let navSiteLinks = (
    <Fragment>
      <NavLink to="/courses" className="navbar-item">
        All Courses
      </NavLink>
    </Fragment>
  );

  let navRight;
  if (auth.userLoggedIn && !isLoading) {
    navRight = (
      <Fragment>
        <Link to="/messages" className="button is-link">
          Inbox
          <img src="/mail.svg" className="nav-mail-icon" />
          <strong>{`(${unreadCount})`}</strong>
        </Link>
        <Link to="/dashboard" className="button is-warning">
          <img src={auth.userProfilePicture} className="nav-user-icon" />
          {auth.userName}
        </Link>
        <Link
          to="/add_a_friend"
          className="add-a-friend-button button is-danger is-light"
        >
          Add a Friend
        </Link>
        <Link to="/shoot" className="new-scorecard-button button is-success">
          Start a new round
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
  if (auth.adminStatus && !isLoading) {
    adminButton = (
      <Fragment>
        <Link to="/admin" className="button is-info">
          Admin
          <img src="/mail.svg" className="nav-mail-icon" />
          <strong>{`(${adminUnreadCount})`}</strong>
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
            src="/weThrowLogo.png"
            alt="An app for disc golfers."
          />
          <p className="navbar-company-name" data-testid={"company-name"}>
            weThrow
          </p>
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
