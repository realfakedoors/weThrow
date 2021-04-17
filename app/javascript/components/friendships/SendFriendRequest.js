import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

import axios from "axios";

import { useAuth } from "../../hooks/use-auth";

const SendFriendRequest = () => {
  let { id } = useParams();
  const auth = useAuth();

  const [requestResult, setRequestResult] = useState(null);

  useEffect(() => {
    if (auth.userLoggedIn) {
      const friendship_params = {
        buddy_id: auth.userId,
        pal_id: id,
      };
      axios
        .post(
          "/api/friendships",
          {
            friendship: friendship_params,
          },
          {
            headers: { Authorization: auth.userToken },
          }
        )
        .then(() => {
          setRequestResult(
            <h1 className={"title is-1 has-text-success"}>
              Friend request sent!
            </h1>
          );
        })
        .catch((err) => {
          console.error(err);
          setRequestResult(
            <div>
              <h1 className={"title is-1 has-text-danger"}>
                Failed to send friend request!
              </h1>
              <h6 className={"subtitle is-3 has-text-danger"}>
                {"Are you sure you aren't already friends?"}
              </h6>
            </div>
          );
        });
    }
  }, [auth.userLoggedIn]);

  return (
    <div className={"send-friend-request box"}>
      {requestResult}
      <Link to={"/dashboard"} className={"button is-success"}>
        Check your Dashboard
      </Link>
    </div>
  );
};

export default SendFriendRequest;
