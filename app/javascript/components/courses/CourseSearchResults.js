import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import axios from "axios";

import CourseListings from "./CourseListings";

const CourseSearchResults = () => {
  let { searchTerms } = useParams();

  const [courses, setCourses] = useState([]);

  useEffect(() => {
    searchCourses();
  }, [searchTerms]);

  async function searchCourses() {
    await axios
      .get(`/api/search_courses/`, {
        params: { search: searchTerms },
      })
      .then((response) => {
        if (response.data) {
          setCourses([response.data]);
        } else {
          setCourses([]);
        }
      })
      .catch((err) => console.error(err));
  }

  let title;
  if (courses.length === 0) {
    title = `No results found for '${searchTerms}'! Try again!`;
  } else if (courses.length === 1) {
    title = `1 result found for '${searchTerms}'`;
  } else if (courses.length > 1) {
    title = `${courses.length} results found for '${searchTerms}'`;
  }

  return (
    <div className="all-courses">
      <CourseListings courses={courses} title={title} />
    </div>
  );
};

export default CourseSearchResults;
