import React, { useState, useEffect } from "react";

import axios from "axios";

import { useAuth } from "../../hooks/use-auth";

import NewDirectMessageForm from "./NewDirectMessageForm";

const NewDirectMessage = ({ getDirectMessages }) => {
  const auth = useAuth();

  const [recipientId, setRecipientId] = useState(null);
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    grabFriends();
    return () => {
      setRecipientId(null);
      setFriends([]);
    };
  }, []);

  async function grabFriends() {
    axios
      .get("/api/friendships", {
        headers: { Authorization: auth.userToken },
      })
      .then((res) => {
        setFriends(res.data.confirmed);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function changeRecipient(newRecipient) {
    if (newRecipient !== recipientId) {
      setRecipientId(newRecipient);
    }
  }

  return (
    <div className={"new-direct-message"}>
      <hr />
      <h3 className={"title is-4 has-text-centered"}>
        Start A New Conversation
      </h3>
      <div className={"select"}>
        <select
          id={"select-recipient"}
          onChange={(event) => changeRecipient(event.target.value)}
          defaultValue={"instructions"}
        >
          <option value={"instructions"} disabled>
            Select a Friend...
          </option>
          {friends.length > 0 &&
            friends.map((friendship, i) => {
              const friend = friendship.other_user;
              return (
                <option key={i} value={friend.id}>
                  {friend.username}
                </option>
              );
            })}
        </select>
      </div>
      {recipientId && (
        <NewDirectMessageForm
          recipientId={recipientId}
          buttonText={"new"}
          setRecipientId={() => setRecipientId()}
          getDirectMessages={getDirectMessages}
        />
      )}
    </div>
  );
};

export default NewDirectMessage;
