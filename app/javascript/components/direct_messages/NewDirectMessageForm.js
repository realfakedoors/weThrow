import React, { useState } from "react";
import axios from "axios";

import TextField from "../form_elements/TextField";
import SubmitButton from "../form_elements/SubmitButton";
import ErrorWindow from "../form_elements/ErrorWindow";

import { useAuth } from "../../hooks/use-auth";

const NewDirectMessageForm = ({ subject, recipientId, buttonText }) => {
  const auth = useAuth();

  const [active, setActive] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  function toggleActive() {
    active === "" ? setActive("is-active") : setActive("");
  }

  function validateDM(subject, message) {
    if (subject === "") {
      setErrorMsg("Enter a subject.");
    } else if (message === "") {
      setErrorMsg("Enter a message.");
    } else {
      setErrorMsg("");
      return true;
    }
  }

  function submitNewDirectMessage(event) {
    event.preventDefault();
    const subject = document.getElementById(`subject ${recipientId}`).value;
    const message = document.getElementById(`message ${recipientId}`).value;
    if (auth.userLoggedIn && validateDM(subject, message)) {
      axios
        .post(
          "/api/direct_messages",
          {
            direct_message: {
              sender_id: parseInt(auth.userId),
              recipient_id: recipientId,
              subject: subject,
              category: "private",
              messages_attributes: [
                { author_id: parseInt(auth.userId), content: message },
              ],
            },
          },
          {
            headers: {
              Authorization: auth.userToken,
            },
          }
        )
        .then(() => {
          setActive("");
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }

  return (
    <div className={`new-direct-message dropdown is-up ${active}`}>
      <div className="dropdown-trigger" onClick={() => toggleActive()}>
        <button
          className="button is-success"
          aria-haspopup="true"
          aria-controls={`dropdown-menu ${recipientId}`}
        >
          <img src="/mail.svg" className="mail-icon" />
          <span>{buttonText}</span>
        </button>
      </div>
      <div
        className="dropdown-menu"
        id={`dropdown-menu ${recipientId}`}
        role="menu"
      >
        <div className="dropdown-content">
          <form className={"new-direct-message-form"}>
            <div className="dropdown-item">
              <TextField
                label={"subject"}
                inputId={`subject ${recipientId}`}
                inputType={"text"}
                testId={`dm-subject ${recipientId}`}
                initialValue={`${subject} - feedback`}
              />
            </div>
            <div className="dropdown-item">
              <TextField
                label={"message"}
                inputId={`message ${recipientId}`}
                inputType={"text"}
                testId={`dm-message ${recipientId}`}
              />
            </div>
            <div className="dropdown-item">
              <SubmitButton
                clickFunction={submitNewDirectMessage}
                color={"is-success"}
                displayText={"Send"}
              />
            </div>
            <div className="dropdown-item">
              <ErrorWindow errorMsg={errorMsg} />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewDirectMessageForm;
