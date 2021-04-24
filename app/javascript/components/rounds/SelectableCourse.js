import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const SelectableCourse = ({ course, selectCourse }) => {
  const [photo, setPhoto] = useState("/default_user.svg");
  const [highlightIfActive, setHighlight] = useState();

  useEffect(() => {
    if (course.photos.length > 0) {
      setPhoto(course.photos[0].url);
    }
  }, []);

  function pickCourse() {
    setHighlight({ boxShadow: "0 0 25px #595959" });
    selectCourse(course);
  }

  return (
    <div className={"result media"} style={highlightIfActive}>
      <span className={"media-left course-image"}>
        <img src={photo} />
      </span>
      <span className={"media-content"}>
        <Link
          to={`/courses/${course.id}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          {course.name}
        </Link>
        <div
          className={"subtitle is-6 uppercase"}
        >{`${course.city}, ${course.state}`}</div>
      </span>
      <span className={"media-right"}>
        <button className={"button is-link"} onClick={() => pickCourse()}>
          Select Course
        </button>
      </span>
    </div>
  );
};

export default SelectableCourse;
