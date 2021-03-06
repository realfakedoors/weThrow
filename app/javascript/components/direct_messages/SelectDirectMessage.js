import React, { useState, useEffect } from "react";

import axios from "axios";

import { useAuth } from "../../hooks/use-auth";

const SelectDirectMessage = ({
  lastMessageContent,
  lastMessageTime,
  directMessage,
  partner,
  setSelectedDirectMessage,
  setSelectedPartner,
}) => {
  const auth = useAuth();

  const [highlighted, setHighlighted] = useState(false);

  useEffect(() => {
    let unreadMessages = false;
    directMessage.messages.forEach((message) => {
      if (checkForReadBy(message)) {
        unreadMessages = true;
      }
    });
    if (unreadMessages) {
      setHighlighted(true);
    }
  }, []);

  function checkForReadBy(message) {
    return message.read_by.includes(auth.userId.toString()) ? false : true;
  }

  function markMessagesAsRead() {
    directMessage.messages.forEach((msg) => {
      markAsRead(msg);
    });
    setHighlighted(false);
    setSelectedDirectMessage(directMessage);
    setSelectedPartner(partner);
  }

  function markAsRead(message) {
    if (auth.userLoggedIn && checkForReadBy(message)) {
      axios
        .patch(
          `/api/messages/${message.id}`,
          {},
          {
            headers: {
              Authorization: auth.userToken,
            },
          }
        )
        .catch((err) => console.error(err));
    }
  }

  return (
    <div
      className={`select-dm media ${highlighted && "highlight-unread"}`}
      onClick={() => markMessagesAsRead()}
    >
      <figure className={"media-left"}>
        <p className={"image is-64x64"}>
          <img src={partner.profile_pic} />
        </p>
      </figure>
      <div className={"media-content"}>
        <div className={"content"}>
          <small>{partner.name}</small>
          <strong>{directMessage.subject}</strong>
          {lastMessageContent}
          <small className={"has-text-right"}>{lastMessageTime}</small>
        </div>
      </div>
    </div>
  );
};

export default SelectDirectMessage;
