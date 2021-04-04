import React, { useState, useEffect } from "react";
import { useAuth } from "../../hooks/use-auth";
import { useParams, Redirect } from "react-router-dom";

import axios from "axios";

import CourseForm from "./CourseForm";

const EditCourse = () => {
  const auth = useAuth();
  let { id } = useParams();

  const [display, setDisplay] = useState(null);

  useEffect(() => {
    if (auth.userId) {
      axios.get(`/api/courses/${id}`).then((res) => {
        const curatorId = res.data.curator_id;
        if (curatorId === parseInt(auth.userId) || auth.adminStatus) {
          const courseName = res.data.name;
          setDisplay(
            <CourseForm
              title={`Edit ${courseName}`}
              buttonText={`Update ${courseName}`}
              prepopulatedCourseData={res.data}
            />
          );
        } else {
          setDisplay(<Redirect to={`/courses/${id}`} />);
        }
      });
    }
  }, [auth.userId]);

  return <div className={"new-course box"}>{display}</div>;
};

export default EditCourse;
