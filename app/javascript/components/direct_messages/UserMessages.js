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
      axios
        .get("/direct_messages", {
          headers: {
            Authorization: auth.userToken,
          },
        })
        .then((res) => {
          setDirectMessages(res.data.direct_messages);
          setPartners(res.data.partners);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [auth.userLoggedIn]);

  let displayMessages;
  if (isLoading) {
    displayMessages = <LoadingScreen />;
  } else {
    displayMessages = (
      <DirectMessages
        messages={directMessages}
        partners={partners}
        msgSectionTitle={"Messages"}
      />
    );
  }

  return <div className={"box"}>{displayMessages}</div>;
};

export default UserMessages;
