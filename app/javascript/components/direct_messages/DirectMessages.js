import React, { useState, useEffect } from "react";

import DirectMessageList from "./DirectMessageList";
import DisplayDirectMessage from "./DisplayDirectMessage";
import NewMessageForm from "./NewMessageForm";

const DirectMessages = ({ messages, partners, msgSectionTitle }) => {
  const [selectedDirectMessage, setSelectedDirectMessage] = useState(null);
  const [selectedMessages, setSelectedMessages] = useState([]);
  const [selectedPartner, setSelectedPartner] = useState("");

  useEffect(() => {
    if (selectedDirectMessage) {
      setSelectedMessages(
        selectedMessages.concat(selectedDirectMessage.messages)
      );
    }
  }, [selectedDirectMessage]);

  let displayDM;
  if (selectedDirectMessage) {
    displayDM = (
      <div className={"selected-direct-message"} id={"show-dm"}>
        <DisplayDirectMessage
          directMessage={selectedDirectMessage}
          partner={selectedPartner}
          messages={selectedMessages}
        />
        <NewMessageForm
          directMessageId={selectedDirectMessage.id}
          messages={selectedMessages}
          setSelectedMessages={setSelectedMessages}
        />
      </div>
    );
  } else {
    displayDM = (
      <div className={"no-dm-selected"}>
        <p>Select a conversation!</p>
        <img src={"/arrow.svg"} className={"select-arrow"} />
      </div>
    );
  }

  return (
    <div className={"inbox"}>
      <div className={"select-direct-messages"}>
        <h2 className={"title is-size-2 has-text-centered"}>
          {msgSectionTitle}
        </h2>
        <DirectMessageList
          directMessages={messages}
          setSelectedDirectMessage={setSelectedDirectMessage}
          setSelectedPartner={setSelectedPartner}
          partners={partners}
        />
      </div>
      {displayDM}
    </div>
  );
};

export default DirectMessages;
