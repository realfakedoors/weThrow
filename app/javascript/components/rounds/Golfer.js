import React from "react";

const Golfer = ({
  profilePicture,
  userInfo,
  addGolferToCard,
  removeGolferFromCard,
}) => {
  return (
    <div className={"golfer"}>
      <div className={"profile-picture image is-64x64"}>
        <img className={"is-rounded"} src={profilePicture} />
      </div>
      <h5 className={"title is-5"}>{userInfo.username}</h5>
      <h6 className={"subtitle is-6"}>{userInfo.name}</h6>
      {removeGolferFromCard ? (
        <button
          className={"button is-danger"}
          onClick={() => removeGolferFromCard(userInfo.id)}
          data-testid={`remove ${userInfo.id}`}
        >
          Remove
        </button>
      ) : (
        <button
          className={"button is-success"}
          onClick={() => addGolferToCard(userInfo.id)}
          data-testid={`add ${userInfo.id}`}
        >
          Add to Card
        </button>
      )}
    </div>
  );
};

export default Golfer;
