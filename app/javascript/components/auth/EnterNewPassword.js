import React, { useState, Fragment } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/use-auth";
import { authValidations } from "./auth-validations";

import TextField from "../form_elements/TextField";
import SubmitButton from "../form_elements/SubmitButton";
import ErrorWindow from "../form_elements/ErrorWindow";

const EnterNewPassword = () => {
  const [token] = useState(location.search.split("=")[1]);
  const [newPasswordConfirmed, setNewPasswordConfirmed] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const auth = useAuth();
  const validations = authValidations();

  function validateNewPassword(password, confirmation) {
    if (!validations.passwordSameAsConfirmation(password, confirmation)) {
      setErrorMsg(
        "Your password isn't the same as your confirmation. Try again!"
      );
    } else if (!validations.passwordIsPresent(password)) {
      setErrorMsg("Enter a password.");
    } else if (!validations.passwordIsCorrectLength(password)) {
      setErrorMsg("Enter a password between 6 and 128 characters.");
    } else {
      return true;
    }
    return false;
  }

  async function submitNewPassword(event) {
    event.preventDefault();
    const password = document.getElementById("password").value;
    const confirmation = document.getElementById("confirmation").value;

    if (validateNewPassword(password, confirmation)) {
      auth
        .changePassword(password, confirmation, token)
        .then((response) => {
          if (response && response.status === 204) {
            setNewPasswordConfirmed(true);
          }
        })
        .catch((err) => {
          setErrorMsg("Unable to change password.");
          console.error(err);
        });
    }
  }

  let display;
  if (!newPasswordConfirmed) {
    display = (
      <Fragment>
        <h1 className={"title is-1"}>Reset Password</h1>
        <h2 className={"subtitle is-4"}>Punch in a new password!</h2>
        <form className={"signup-form"}>
          <TextField
            label={"password"}
            inputId={"password"}
            inputType={"password"}
            autoFocus={true}
          />
          <TextField
            label={"password confirmation"}
            inputId={"confirmation"}
            inputType={"password"}
          />
          <SubmitButton
            clickFunction={submitNewPassword}
            color={"is-link"}
            displayText={"Sign me up!"}
          />
        </form>
        <div className={"content"}>
          <ErrorWindow errorMsg={errorMsg} />
        </div>
      </Fragment>
    );
  } else {
    display = (
      <Fragment>
        <h2 className={"subtitle is-4"}>Password change successful!</h2>
        <Link to="/sign_in" className="button is-link">
          Log In
        </Link>
      </Fragment>
    );
  }
  return <div className={"box signup-form-container"}>{display}</div>;
};

export default EnterNewPassword;
