import React, { useState, useEffect } from "react";

import axios from "axios";

import { useAuth } from "../../hooks/use-auth";

import Golfer from "./Golfer";

const ChooseGolfers = ({ setGolfers, setStage }) => {
  const auth = useAuth();

  const [friends, setFriends] = useState([]);
  const [currentCard, setCard] = useState([]);

  useEffect(() => {
    if (auth.userLoggedIn) {
      grabFriends();
      addCurrentUserToCard();
    }
    return () => {
      setFriends([]);
      setCard([]);
    };
  }, [auth.userLoggedIn]);

  function grabFriends() {
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

  function addCurrentUserToCard() {
    setCard(
      currentCard.concat([
        {
          profile_pic: auth.userProfilePicture,
          other_user: {
            id: parseInt(auth.userId),
            username: auth.userName,
          },
        },
      ])
    );
  }

  function addGolferToCard(id) {
    setCard(
      currentCard.concat([
        friends.find((golfer) => golfer.other_user.id === id),
      ])
    );
    setFriends(friends.filter((golfer) => golfer.other_user.id !== id));
  }

  function removeGolferFromCard(id) {
    setFriends(
      friends.concat([
        currentCard.find((golfer) => golfer.other_user.id === id),
      ])
    );
    setCard(currentCard.filter((golfer) => golfer.other_user.id !== id));
  }

  function submitCurrentCard() {
    setGolfers(
      currentCard.map((golfer) => {
        return {
          id: golfer.other_user.id,
          profile_pic: golfer.profile_pic,
          name: golfer.other_user.username,
        };
      })
    );
    setStage("select-course");
  }

  return (
    <div className={"choose-golfers"}>
      <div className={"title uppercase has-text-centered"}>Select Friends</div>
      <section className={"friends-list"}>
        {friends.length === 0 && (
          <div className={"title is-5"}>
            {"Add (and confirm) friends to play rounds with them!"}
          </div>
        )}
        {friends.map((friend, i) => {
          return (
            <Golfer
              key={i}
              profilePicture={friend.profile_pic}
              userInfo={friend.other_user}
              addGolferToCard={addGolferToCard}
            />
          );
        })}
      </section>
      <section className={"current-card"}>
        <div className={"title uppercase has-text-centered"}>Current Card</div>
        <div className={"currently-selected-golfers"}>
          {currentCard.map((golfer, i) => {
            return (
              <Golfer
                key={i}
                profilePicture={golfer.profile_pic}
                userInfo={golfer.other_user}
                removeGolferFromCard={removeGolferFromCard}
              />
            );
          })}
        </div>
      </section>
      <section className={"continue-button"}>
        <div
          className={"next-stage-button button is-link"}
          onClick={() => submitCurrentCard()}
        >
          Choose A Course...
        </div>
      </section>
    </div>
  );
};

export default ChooseGolfers;
