import React from "react";

const UserMessage = ({ content, author, timeDisplay }) => {
  return (
    <div className={"message box media"}>
      <div className={"media-left"}>
        <p className={"image is-48x48"}>
          <img src={author.profile_pic} />
        </p>
        <small>{author.name}</small>
      </div>
      <div className={"media-content"}>
        <div className={"content"}>
          <strong className={"message-text"}>{content}</strong>
          <small className={"message-time"}>{timeDisplay}</small>
        </div>
      </div>
    </div>
  );
};

export default UserMessage;
