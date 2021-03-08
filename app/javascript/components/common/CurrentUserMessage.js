import React from "react";

const CurrentUserMessage = ({ content, timeDisplay }) => {
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
          <img src={"default_user.svg"} />
        </p>
      </div>
    </div>
  );
};

export default CurrentUserMessage;
