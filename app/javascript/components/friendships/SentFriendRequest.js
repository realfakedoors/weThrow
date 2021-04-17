import React from "react";

const SentFriendRequest = ({ id, user, profilePic, deleteFriendship }) => {
  return (
    <tr className={"sent-friend-request"}>
      <td>
        <img src={profilePic} className={"image is-32x32"} />
      </td>
      <td colSpan={2}>{user.username}</td>
      <td className={"delete-button"} onClick={() => deleteFriendship(id)}>
        X
      </td>
    </tr>
  );
};

export default SentFriendRequest;
