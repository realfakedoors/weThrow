import React, { useState } from "react";
import { useAuth } from "../../hooks/use-auth";
import { authValidations } from "./auth-validations";

import CheckYourEmail from "./CheckYourEmail";

import TextField from "../form_elements/TextField";
import SubmitButton from "../form_elements/SubmitButton";
import ErrorWindow from "../form_elements/ErrorWindow";

const ResetPassword = () => {
  const [emailSent, setEmailSent] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const auth = useAuth();
  const validations = authValidations();

  function validateResetPassword(email) {
    if (!validations.emailIsPresent(email)) {
      setErrorMsg("Enter your email.");
    } else if (!validations.emailFormatIsCorrect(email)) {
      setErrorMsg("That's not a valid email.");
    } else {
      return true;
    }
    return false;
  }

  async function submitResetPassword(event) {
    event.preventDefault();
    const email = document.getElementById("email").value;

    if (validateResetPassword(email)) {
      auth
        .sendPasswordReset(email)
        .then((response) => {
          if (response && response.status === 201) {
            setEmailSent(true);
          }
        })
        .catch((err) => {
          setErrorMsg("Invalid email. Try again!");
          console.log(err);
        });
    }
  }

  let display;
  if (!emailSent) {
    display = (
      <div className={"box signup-form-container"}>
        <h1 className={"title is-1"}>Forgot your Password?</h1>
        <h2 className={"subtitle is-4"}>
          {"Enter your email and we'll send you a link to reset it!"}
        </h2>
        <form className={"signup-form"}>
          <TextField
            label={"email"}
            inputId={"email"}
            inputType={"text"}
            autoFocus={true}
          />
          <SubmitButton
            clickFunction={submitResetPassword}
            color={"is-link"}
            displayText={"Send me the link!"}
          />
        </form>
        <div className={"content"}>
          <ErrorWindow errorMsg={errorMsg} />
        </div>
      </div>
    );
  } else {
    display = <CheckYourEmail />;
  }

  return <div className={"reset-password"}>{display}</div>;
};

export default ResetPassword;
