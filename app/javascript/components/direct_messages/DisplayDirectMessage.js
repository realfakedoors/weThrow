import React from "react";

import Discussion from "../common/Discussion";

const DisplayDirectMessage = ({ directMessage, partner, messages }) => {
  return (
    <div className={"show-direct-message"}>
      <img className={"image is-96x96"} src={partner.profile_pic} />
      <p className={"direct-message-partner"}>{partner.name}</p>
      <h1 className={"subject"}>{directMessage.subject}</h1>
      <div className={"discussion"}>
        <Discussion content={messages} partner={partner} />
      </div>
    </div>
  );
};

export default DisplayDirectMessage;
