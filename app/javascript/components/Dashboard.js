import React from "react";
import { Link } from "react-router-dom";

import UploadProfilePicture from "./photos/UploadProfilePicture";

const Dashboard = () => {
  return (
    <div className={"box"}>
      <h1 className={"title is-1 has-text-centered"}>Dashboard</h1>
      <UploadProfilePicture />
      <hr />
      <span className={"block create-course-button"}>
        <Link to={"/new_course"} className={"button is-primary"}>
          Create Course
        </Link>
      </span>
    </div>
  );
};

export default Dashboard;
