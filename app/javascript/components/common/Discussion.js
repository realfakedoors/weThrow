import React from "react";
import littleTime from "little-time";

import CurrentUserMessage from "../common/CurrentUserMessage";
import UserMessage from "../common/UserMessage";

import { useAuth } from "../../hooks/use-auth.js";

const Discussion = ({ content, partner }) => {
  const auth = useAuth();
  
  let discussion = [];
  content.forEach((message) => {
    const timeDisplay = littleTime(message.created_at).fromNow();
    if (message.author_id.toString() === auth.userId) {
      discussion.push(
        <CurrentUserMessage
          key={message.id}
          content={message.content}
          timeDisplay={timeDisplay}
        />
      );
    } else {
      discussion.push(
        <UserMessage
          key={message.id}
          content={message.content}
          author={partner}
          timeDisplay={timeDisplay}
        />
      );
    }
  });
  return discussion;
};

export default Discussion;
