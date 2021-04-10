import React, { useState, useEffect } from "react";

import axios from "axios";

import CourseListings from "./CourseListings";

const AllCourses = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    getAllCourses();
  }, []);

  async function getAllCourses() {
    await axios
      .get(`/api/courses/`)
      .then((response) => {
        setCourses(response.data);
      })
      .catch((err) => console.error(err));
  }

  return (
    <div className="all-courses">
      {courses.length > 0 && <CourseListings courses={courses} />}
    </div>
  );
};

export default AllCourses;
