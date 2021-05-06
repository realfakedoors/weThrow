import React from "react";

import SubmitButton from "../form_elements/SubmitButton";

const NewFriendRequest = ({
  id,
  user,
  profilePic,
  acceptFriendRequest,
  deleteFriendship,
}) => {
  return (
    <tr className={"new-friend-request"}>
      <td>
        <img src={profilePic} className={"image is-32x32"} />
      </td>
      <td className={"has-text-centered"}>{user.username}</td>
      <td>
        <SubmitButton
          color={"is-success"}
          displayText={"Accept"}
          clickFunction={() => acceptFriendRequest(id)}
        />
      </td>
      <td>
        <SubmitButton
          color={"is-danger"}
          displayText={"Decline"}
          clickFunction={() => deleteFriendship(id)}
        />
      </td>
    </tr>
  );
};

export default NewFriendRequest;
