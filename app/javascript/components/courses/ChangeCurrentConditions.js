import React from "react";
import { useAuth } from "../../hooks/use-auth";

import axios from "axios";

const ChangeCurrentConditions = ({
  courseId,
  courseConditions,
  setConditions,
}) => {
  const auth = useAuth();

  function setNewConditions() {
    const newConditions = document.getElementById("change-conditions").value;
    if (newConditions !== courseConditions) {
      axios
        .patch(
          `/api/courses/${courseId}`,
          { course: { current_conditions: newConditions } },
          { headers: { Authorization: auth.userToken } }
        )
        .then((response) => {
          setConditions(response.data.current_conditions);
        })
        .catch((err) => console.log(err));
    } else return;
  }

  return (
    <div className="change-current-conditions">
      <h3 className="subtitle is-7 has-text-centered set-current-conditions uppercase">
        Set Current Conditions
      </h3>
      <div className="select">
        {courseConditions && (
          <select
            id={"change-conditions"}
            defaultValue={courseConditions}
            onChange={setNewConditions}
          >
            <option value={"Unknown"}>Unknown</option>
            <option value={"Good"}>Good</option>
            <option value={"Sketchy"}>Sketchy</option>
            <option value={"Unplayable"}>Unplayable</option>
            <option value={"Closed"}>Closed</option>
          </select>
        )}
      </div>
    </div>
  );
};

export default ChangeCurrentConditions;
