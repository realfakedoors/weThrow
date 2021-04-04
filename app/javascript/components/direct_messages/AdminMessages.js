import React, { useState, useEffect } from "react";
import { useAuth } from "../../hooks/use-auth";

import LoadingScreen from "../common/LoadingScreen";
import DirectMessages from "./DirectMessages";

import axios from "axios";

const AdminMessages = () => {
  const auth = useAuth();

  const [isLoading, setLoading] = useState(true);
  const [directMessages, setDirectMessages] = useState([]);
  const [partners, setPartners] = useState([]);

  useEffect(() => {
    if (auth.userLoggedIn) {
      axios
        .get("/api/direct_messages", {
          params: {
            inbox: "admin",
          },
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
        msgSectionTitle={"Admin Messages"}
      />
    );
  }

  return <div className={"box"}>{displayMessages}</div>;
};

export default AdminMessages;
