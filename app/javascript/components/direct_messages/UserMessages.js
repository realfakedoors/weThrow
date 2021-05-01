import React, { useState, useEffect } from "react";
import { useAuth } from "../../hooks/use-auth";

import LoadingScreen from "../common/LoadingScreen";
import DirectMessages from "./DirectMessages";

import axios from "axios";

const UserMessages = () => {
  const auth = useAuth();

  const [isLoading, setLoading] = useState(true);
  const [directMessages, setDirectMessages] = useState([]);
  const [partners, setPartners] = useState([]);

  useEffect(() => {
    if (auth.userLoggedIn) {
      getDirectMessages();
    }
    return () => {
      setPartners([]);
      setDirectMessages([]);
    };
  }, [auth.userLoggedIn]);

  function getDirectMessages() {
    axios
      .get("/api/direct_messages", {
        headers: {
          Authorization: auth.userToken,
        },
      })
      .then((res) => {
        setPartners(res.data.partners);
        setDirectMessages(res.data.direct_messages);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  let displayMessages;
  if (isLoading) {
    displayMessages = <LoadingScreen />;
  } else {
    displayMessages = (
      <DirectMessages
        messages={directMessages}
        partners={partners}
        msgSectionTitle={"Messages"}
        getDirectMessages={getDirectMessages}
      />
    );
  }

  return <div className={"box inbox-container"}>{displayMessages}</div>;
};

export default UserMessages;
