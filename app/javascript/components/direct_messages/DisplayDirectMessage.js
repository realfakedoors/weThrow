import React from "react";

import Discussion from "../common/Discussion";

const DisplayDirectMessage = ({ directMessage, partner, messages }) => {
  return (
    <div className={"show-direct-message"}>
      <p className={"direct-message-partner"}>{partner}</p>
      <h1 className={"subject"}>{directMessage.subject}</h1>
      <div className={"discussion"}>
        <Discussion content={messages} partner={partner} />
      </div>
    </div>
  );
};

export default DisplayDirectMessage;
