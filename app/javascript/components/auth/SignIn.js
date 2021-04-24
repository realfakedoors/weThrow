import React, { useState } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/use-auth";
import { authValidations } from "./auth-validations";

import TextField from "../form_elements/TextField";
import SubmitButton from "../form_elements/SubmitButton";
import ErrorWindow from "../form_elements/ErrorWindow";

const SignIn = () => {
  const auth = useAuth();
  let history = useHistory();
  let location = useLocation();

  const [errorMsg, setErrorMsg] = useState("");
  const validations = authValidations();

  let { from } = location.state || { from: { pathname: "/dashboard" } };

  function validateSignIn(email, password) {
    if (!validations.emailIsPresent(email)) {
      setErrorMsg("Enter your email.");
    } else if (!validations.emailFormatIsCorrect(email)) {
      setErrorMsg("That's not a valid email.");
    } else if (!validations.passwordIsPresent(password)) {
      setErrorMsg("Enter your password.");
    } else if (!validations.passwordIsCorrectLength(password)) {
      setErrorMsg(
        "That's not a valid password! Passwords should be betweeen 6 and 128 characters."
      );
    } else {
      return true;
    }
    return false;
  }

  async function submitSignIn(event) {
    event.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if (validateSignIn(email, password)) {
      auth
        .signin(email, password)
        .then(() => {
          history.push(from.pathname);
        })
        .catch((err) => {
          setErrorMsg("Invalid credentials, try again!");
          console.error(err);
        });
    }
  }

  return (
    <div className={"box signup-form-container"}>
      <h1 className={"title is-1"}>Log In</h1>
      <h2 className={"subtitle is-4"}>sign in to your account to continue!</h2>
      <form className={"signup-form"}>
        <TextField
          label={"email"}
          inputId={"email"}
          inputType={"text"}
          testId={"login-email"}
          autoFocus={true}
        />
        <TextField
          label={"password"}
          inputId={"password"}
          inputType={"password"}
          testId={"login-password"}
        />
        <SubmitButton
          clickFunction={submitSignIn}
          color={"is-link"}
          displayText={"Sign In"}
        />
      </form>
      <div className={"content"}>
        <ErrorWindow errorMsg={errorMsg} />
        <p>
          <Link to="/reset_password">{"Forgot your password?"}</Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
