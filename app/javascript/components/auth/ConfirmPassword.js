import React, { useState, useEffect, Fragment } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/use-auth";

const ConfirmPassword = () => {
  const [passwordConfirmed, setPasswordConfirmed] = useState(false);

  const auth = useAuth();

  useEffect(() => {
    const token = location.search.split("=")[1];

    auth
      .confirmPassword(token)
      .then((response) => {
        if (response && response.status === 200) {
          setPasswordConfirmed(true);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  let display;
  if (!passwordConfirmed) {
    display = (
      <Fragment>
        <h1 className={"title is-1"}>Confirmation Failed.</h1>
        <h2 className={"subtitle is-4"}>
          We were unable to confirm your account!
        </h2>
      </Fragment>
    );
  } else {
    display = (
      <Fragment>
        <h1 className={"title is-1"}>Confirmation Successful!</h1>
        <h2 className={"subtitle is-4"}>
          your weThrow account has been activated!
        </h2>
        <Link to={"/sign_in"} className={"button is-link"}>
          Sign In
        </Link>
      </Fragment>
    );
  }
  return <div className={"box auth-prompt"}>{display}</div>;
};

export default ConfirmPassword;
