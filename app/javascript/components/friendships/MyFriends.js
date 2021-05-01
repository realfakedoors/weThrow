import React, { useState, useEffect } from "react";
import { useAuth } from "../../hooks/use-auth";

import axios from "axios";

import NewFriendRequest from "./NewFriendRequest";
import ConfirmedFriendship from "./ConfirmedFriendship";
import SentFriendRequest from "./SentFriendRequest";

const MyFriends = () => {
  const auth = useAuth();

  const [newFriendRequests, setNewFriendRequests] = useState([]);
  const [confirmedFriendships, setConfirmedFriendships] = useState([]);
  const [sentFriendRequests, setSentFriendRequests] = useState([]);

  useEffect(() => {
    grabFriendshipData();
    return () => {
      setNewFriendRequests([]);
      setConfirmedFriendships([]);
      setSentFriendRequests([]);
    };
  }, []);

  async function grabFriendshipData() {
    axios
      .get("/api/friendships", {
        headers: { Authorization: auth.userToken },
      })
      .then((res) => {
        setNewFriendRequests(res.data.new_friend_requests);
        setConfirmedFriendships(res.data.confirmed);
        setSentFriendRequests(res.data.sent);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function acceptFriendRequest(friendshipId) {
    axios
      .patch(
        `/api/friendships/${friendshipId}`,
        {},
        {
          headers: { Authorization: auth.userToken },
        }
      )
      .then(() => {
        grabFriendshipData();
      })
      .catch((err) => console.error(err));
  }

  function deleteFriendship(friendshipId) {
    axios
      .delete(`/api/friendships/${friendshipId}`, {
        headers: { Authorization: auth.userToken },
      })
      .then(() => {
        grabFriendshipData();
      })
      .catch((err) => console.error(err));
  }

  return (
    <div className={"box my-friends table-container"}>
      <h2 className={"title is-5"}>My Friends</h2>
      <table className={"table"}>
        <tbody>
          {newFriendRequests.length > 0 ? (
            <tr
              className={
                "section-heading subtitle is-7 uppercase has-text-centered"
              }
            >
              <td colSpan={6}>{"New Friend Requests"}</td>
            </tr>
          ) : null}
          {newFriendRequests.map((request) => {
            const id = request.friendship_id;
            return (
              <NewFriendRequest
                key={id}
                id={id}
                user={request.other_user}
                profilePic={request.profile_pic}
                acceptFriendRequest={acceptFriendRequest}
                deleteFriendship={deleteFriendship}
              />
            );
          })}
          {confirmedFriendships.length > 0 ? (
            <tr
              className={
                "section-heading subtitle is-7 uppercase has-text-centered"
              }
            >
              <td colSpan={6}>{"Confirmed Friends"}</td>
            </tr>
          ) : null}
          {confirmedFriendships.map((friendship) => {
            const id = friendship.friendship_id;
            return (
              <ConfirmedFriendship
                key={id}
                id={id}
                user={friendship.other_user}
                profilePic={friendship.profile_pic}
                deleteFriendship={deleteFriendship}
              />
            );
          })}
          {sentFriendRequests.length > 0 ? (
            <tr
              className={
                "section-heading subtitle is-7 uppercase has-text-centered"
              }
            >
              <td colSpan={6}>{"Sent Friend Requests"}</td>
            </tr>
          ) : null}
          {sentFriendRequests.map((request) => {
            const id = request.friendship_id;
            return (
              <SentFriendRequest
                key={id}
                id={id}
                user={request.other_user}
                profilePic={request.profile_pic}
                deleteFriendship={deleteFriendship}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default MyFriends;
