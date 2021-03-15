import React from "react";
import littleTime from "little-time";

import SelectDirectMessage from "./SelectDirectMessage";

const DirectMessageList = ({
  directMessages,
  setSelectedDirectMessage,
  setSelectedPartner,
  partners,
}) => {
  function getPartner(dm) {
    return partners[0][dm.id];
  }

  let displayDirectMessages = [];
  directMessages.forEach((directMessage) => {
    const lastMessage = directMessage.messages[0];

    const lastMessageContent = () => {
      const msg = lastMessage.content;
      return msg.length > 32 ? `${msg.substring(0, 32)}...` : msg;
    };

    const lastMessageTime = () => {
      return littleTime(lastMessage.created_at).fromNow();
    };

    displayDirectMessages.push(
      <SelectDirectMessage
        key={directMessage.id}
        lastMessageContent={lastMessageContent()}
        lastMessageTime={lastMessageTime()}
        directMessage={directMessage}
        partner={getPartner(directMessage)}
        setSelectedDirectMessage={setSelectedDirectMessage}
        setSelectedPartner={setSelectedPartner}
      />
    );
  });
  return displayDirectMessages;
};

export default DirectMessageList;
