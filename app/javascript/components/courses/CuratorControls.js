import React, { useState } from "react";
import { useAuth } from "../../hooks/use-auth";
import { Link } from "react-router-dom";

import NewDirectMessageForm from "../direct_messages/NewDirectMessageForm";

const CuratorControls = ({ curatorId, courseName, courseId, authorized }) => {
  const auth = useAuth();

  const [active, setActive] = useState("");

  function toggleActive() {
    active === "" ? setActive("is-active") : setActive("");
  }

  return (
    <div className={"curator-controls"}>
      {/* Any logged-in user can send the curator a message */}
      {auth.userLoggedIn && (
        <div className={`new-direct-message-dropdown dropdown is-up ${active}`}>
          <div className="dropdown-trigger" onClick={() => toggleActive()}>
            <button
              className="button is-link"
              aria-haspopup="true"
              aria-controls={`dropdown-menu-contact`}
            >
              <img src="/mail.svg" className="mail-icon" />
              <span>Contact Curator</span>
            </button>
          </div>
          <div
            className="dropdown-menu"
            id={`dropdown-menu-contact`}
            role="menu"
          >
            <div className="dropdown-content">
              <NewDirectMessageForm
                subject={`${courseName} - feedback`}
                recipientId={curatorId}
                setActive={setActive}
              />
            </div>
          </div>
        </div>
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
