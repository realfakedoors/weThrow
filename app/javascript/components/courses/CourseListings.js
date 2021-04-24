import React, { useState, useEffect } from "react";

import CourseSearchBar from "./CourseSearchBar";
import CourseListing from "./CourseListing";
import MappedCourseIndex from "./MappedCourseIndex";

const CourseListings = ({ courses, title }) => {
  const [listings, setListings] = useState([]);

  useEffect(() => {
    const allListings = courses.map((course, i) => {
      let coursePhotoUrl = "/default_user.svg";
      if (course.photos.length > 0) {
        coursePhotoUrl = course.photos[0].url;
      }
      return (
        <CourseListing
          key={i}
          courseId={course.id}
          name={course.name}
          city={course.city}
          state={course.state}
          photoUrl={coursePhotoUrl}
          currentConditions={course.current_conditions}
        />
      );
    });
    setListings(allListings);
  }, [courses]);

  return (
    <div className={"course-index"}>
      <div className={"course-listings box"}>
        <CourseSearchBar />
        <h2 className={"title is-3 has-text-centered"}>{title}</h2>
        {listings}
      </div>
      <MappedCourseIndex courses={courses} />
    </div>
  );
};

export default CourseListings;
