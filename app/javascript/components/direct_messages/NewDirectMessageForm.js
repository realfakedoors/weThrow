import React, { useState } from "react";
import axios from "axios";

import TextField from "../form_elements/TextField";
import SubmitButton from "../form_elements/SubmitButton";
import ErrorWindow from "../form_elements/ErrorWindow";

import { useAuth } from "../../hooks/use-auth";

const NewDirectMessageForm = ({
  subject,
  recipientId,
  setActive,
  setRecipientId,
  getDirectMessages,
}) => {
  const auth = useAuth();

  const [errorMsg, setErrorMsg] = useState("");

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
          if (setActive) {
            setActive("");
          }
          if (setRecipientId) {
            setRecipientId(null);
            getDirectMessages();
          }
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }

  return (
    <form className={"new-direct-message-form"}>
      <div className="dropdown-item">
        <TextField
          label={"subject"}
          inputId={`subject ${recipientId}`}
          inputType={"text"}
          testId={`dm-subject ${recipientId}`}
          initialValue={subject}
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
  );
};

export default NewDirectMessageForm;
