import React, { useState, Fragment } from "react";
import { useAuth } from "../../hooks/use-auth";
import { authValidations } from "./auth-validations";

import CheckYourEmail from "./CheckYourEmail";

import TextField from "../form_elements/TextField";
import SubmitButton from "../form_elements/SubmitButton";
import ErrorWindow from "../form_elements/ErrorWindow";

const SignUp = () => {
  const auth = useAuth();

  const [emailSent, setEmailSent] = useState(false);

  const [errorMsg, setErrorMsg] = useState("");
  const validations = authValidations();

  function validateSignUp(username, name, email, password, confirmation) {
    if (!validations.emailIsPresent(email)) {
      setErrorMsg("Enter your email.");
    } else if (!validations.usernameIsPresent(username)) {
      setErrorMsg("Enter a unique username!");
    } else if (!validations.usernameIsCorrectLength(username)) {
      setErrorMsg("Username should be between 6 and 20 characters!");
    } else if (!validations.nameIsCorrectLength(name)) {
      setErrorMsg("Real life names can't be more than 50 characters!");
    } else if (!validations.emailFormatIsCorrect(email)) {
      setErrorMsg("That's not a valid email.");
    } else if (!validations.passwordIsPresent(password)) {
      setErrorMsg("Enter your password.");
    } else if (
      !validations.passwordSameAsConfirmation(password, confirmation)
    ) {
      setErrorMsg(
        "Your password isn't the same as your confirmation. Try again!"
      );
    } else if (!validations.passwordIsCorrectLength(password)) {
      setErrorMsg("Your password must be between 6 and 128 characters.");
    } else {
      return true;
    }
    return false;
  }

  async function submitSignUp(event) {
    event.preventDefault();
    const username = document.getElementById("username").value;
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmation = document.getElementById("confirmation").value;

    if (validateSignUp(username, name, email, password, confirmation)) {
      auth
        .signup(username, name, email, password)
        .then((response) => {
          if (response && response.status === 201) {
            setEmailSent(true);
          }
        })
        .catch((err) => {
          setErrorMsg("Unable to sign up. Try again!");
          console.log(err);
        });
    }
  }

  let display;
  if (!emailSent) {
    display = (
      <div className={"box signup-form-container"}>
        <h1 className={"title is-1"}>Join Us</h1>
        <h2 className={"subtitle is-4"}>
          Enter your name, email and password to create an account!
        </h2>
        <form className={"signup-form"}>
          <TextField
            label={"unique username"}
            inputId={"username"}
            inputType={"text"}
            testId={"signup-username"}
            autoFocus={true}
          />
          <TextField
            label={"real life name (optional)"}
            inputId={"name"}
            inputType={"text"}
            testId={"signup-name"}
          />

          <TextField
            label={"email"}
            inputId={"email"}
            inputType={"text"}
            testId={"signup-email"}
          />
          <TextField
            label={"password"}
            inputId={"password"}
            inputType={"password"}
            testId={"signup-password"}
          />
          <TextField
            label={"password confirmation"}
            inputId={"confirmation"}
            inputType={"password"}
            testId={"signup-confirmation"}
          />
          <SubmitButton
            clickFunction={submitSignUp}
            color={"is-link"}
            displayText={"Sign me up!"}
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

  return <Fragment>{display}</Fragment>;
};

export default SignUp;
