import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/use-auth";

import QRCode from "react-qr-code";

import SearchUsers from "../common/SearchUsers";

const AddAFriend = () => {
  const auth = useAuth();

  const [displayMode, setDisplayMode] = useState("options");

  const dashboardLink = (
    <Link to={"/dashboard"} className={"option-button button is-warning"}>
      Check your dashboard for friend requests.
    </Link>
  );
  let display;
  if (displayMode === "options") {
    display = (
      <div className={"options"}>
        <div
          className={"option-button button is-primary"}
          onClick={() => setDisplayMode("search")}
        >
          Search for a weThrow username.
        </div>
        <div
          className={"option-button button is-danger"}
          onClick={() => setDisplayMode("qrcode")}
        >
          Show a friend your QR code.
        </div>
        {dashboardLink}
      </div>
    );
  } else if (displayMode === "qrcode") {
    display = (
      <div className={"options"}>
        <QRCode
          value={`${window.location.hostname}/send_friend_request/${auth.userId}`}
          data-testid={"qr-code"}
        />
        <p></p>
        {dashboardLink}
      </div>
    );
  } else if (displayMode === "search") {
    display = (
      <div className={"options"}>
        <SearchUsers />
        <span></span>
        {dashboardLink}
      </div>
    );
  }

  return (
    <div className={"box add-a-friend"}>
      <h1 className={"title is-2 has-text-centered"}>Add a Friend</h1>
      {display}
    </div>
  );
};

export default AddAFriend;
