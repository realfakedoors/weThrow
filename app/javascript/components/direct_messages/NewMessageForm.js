import React, { useState } from "react";
import axios from "axios";

import TextField from "../form_elements/TextField";
import SubmitButton from "../form_elements/SubmitButton";
import ErrorWindow from "../form_elements/ErrorWindow";

import { useAuth } from "../../hooks/use-auth";

const NewMessageForm = ({ directMessageId, messages, setSelectedMessages }) => {
  const auth = useAuth();

  const [errorMsg, setErrorMsg] = useState("");

  function validateMessage(content) {
    if (content === "") {
      setErrorMsg("Enter a message!");
    } else if (content.length >= 1000) {
      setErrorMsg("Messages must be 1000 characters or less.");
    } else {
      setErrorMsg("");
      return true;
    }
  }

  function submitNewMessage(event) {
    event.preventDefault();
    const content = document.getElementById("new-message").value;
    document.getElementById("new-message-form").reset();
    if (auth.userLoggedIn && validateMessage(content)) {
      axios
        .post(
          "/api/messages",
          {
            message: {
              author_id: parseInt(auth.userId),
              content: content,
              messageable_type: "DirectMessage",
              messageable_id: directMessageId,
            },
          },
          {
            headers: {
              Authorization: auth.userToken,
            },
          }
        )
        .then((response) => {
          setSelectedMessages([response.data].concat(messages));
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }

  return (
    <form className={"new-message-form"} id={"new-message-form"}>
      <ErrorWindow errorMsg={errorMsg} />
      <TextField
        inputId={"new-message"}
        testId={"new-message"}
        type={"text"}
        autoFocus={true}
      />
      <SubmitButton
        clickFunction={submitNewMessage}
        color={"is-success"}
        displayText={"Send"}
      />
    </form>
  );
};

export default NewMessageForm;
