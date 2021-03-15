import React from "react";

import UploadProfilePicture from "./photos/UploadProfilePicture";

const Dashboard = () => {
  return (
    <div className={"box"}>
      <h1 className={"title is-1 has-text-centered"}>Dashboard</h1>
      <UploadProfilePicture />
    </div>
  );
};

export default Dashboard;
