import React from "react";
import { useAuth } from "../hooks/use-auth";

import UploadProfilePicture from "./photos/UploadProfilePicture";
import MyCoursesTable from "./courses/MyCoursesTable";
import MyRounds from "./rounds/MyRounds";
import MyFriends from "./friendships/MyFriends";

const Dashboard = () => {
  const auth = useAuth();

  return (
    <div className={"box"}>
      <h1 className={"title is-1 has-text-centered"}>Dashboard</h1>
      {auth.userLoggedIn && (
        <div className={"dashboard-controls"}>
          <UploadProfilePicture />
          <MyCoursesTable />
          <MyRounds />
          <MyFriends />
        </div>
      )}
    </div>
  );
};

export default Dashboard;
