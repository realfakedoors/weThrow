import React from "react";

const ConfirmedFriendship = ({ id, user, profilePic, deleteFriendship }) => {
  return (
    <tr className={"confirmed-friendship"}>
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

export default ConfirmedFriendship;
