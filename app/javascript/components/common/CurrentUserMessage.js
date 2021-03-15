import React from "react";

import { useAuth } from "../../hooks/use-auth";

const CurrentUserMessage = ({ content, timeDisplay }) => {
  const auth = useAuth();

  return (
    <div className={"current-user message box media"}>
      <div className={"media-content has-text-right"}>
        <div className={"content"}>
          <strong className={"message-text"}>{content}</strong>
          <small className={"message-time"}>{timeDisplay}</small>
        </div>
      </div>
      <div className={"media-right"}>
        <p className={"image is-48x48"}>
          <img src={auth.userProfilePicture} />
        </p>
      </div>
    </div>
  );
};

export default CurrentUserMessage;
