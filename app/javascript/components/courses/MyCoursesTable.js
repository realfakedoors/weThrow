import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/use-auth";

import axios from "axios";

import CurrentConditions from "./CurrentConditions";

const MyCoursesTable = () => {
  const auth = useAuth();

  const [myCourses, setMyCourses] = useState([]);

  useEffect(() => {
    getMyCourses();
    return () => {
      setMyCourses({});
    };
  }, []);

  async function getMyCourses() {
    await axios
      .get(`/api/my_courses`, { headers: { Authorization: auth.userToken } })
      .then((res) => {
        setMyCourses(
          res.data.map((course, i) => {
            return (
              <tr key={i}>
                <td>
                  <Link to={`/courses/${course.id}`}>{course.name}</Link>
                </td>
                <td>
                  {course.city}, {course.state}
                </td>
                <td>
                  <CurrentConditions
                    courseConditions={course.current_conditions}
                    conditionSize={"small"}
                  />
                </td>
              </tr>
            );
          })
        );
      })
      .catch((err) => console.error(err));
  }

  return (
    <div className={"box my-courses-table table-container"}>
      <h2 className={"title is-5"}>My Courses</h2>
      <span className={"block create-course-button"}>
        <Link to={"/new_course"} className={"button is-primary"}>
          Create Course
        </Link>
      </span>
      <table className={"table is-striped"}>
        <tbody>{myCourses}</tbody>
      </table>
    </div>
  );
};

export default MyCoursesTable;
