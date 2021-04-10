import React from "react";
import { useAuth } from "../../hooks/use-auth";
import { Link } from "react-router-dom";

import NewDirectMessageForm from "../direct_messages/NewDirectMessageForm";

const CuratorControls = ({ curatorId, courseName, courseId, authorized }) => {
  const auth = useAuth();

  return (
    <div className={"curator-controls"}>
      {/* Any logged-in user can send the curator a message */}
      {auth.userLoggedIn && (
        <NewDirectMessageForm
          subject={courseName}
          recipientId={curatorId}
          buttonText={"Contact Curator"}
        />
      )}
      {/* Only the course's curator or a weThrow admin can edit the course */}
      {authorized && (
        <Link to={`/edit_course/${courseId}`} className={"button is-danger"}>
          Edit Course
        </Link>
      )}
    </div>
  );
};

export default CuratorControls;
