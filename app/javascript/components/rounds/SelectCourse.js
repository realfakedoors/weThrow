import React, { useState } from "react";

import axios from "axios";

import TextField from "../form_elements/TextField";
import SubmitButton from "../form_elements/SubmitButton";
import ErrorWindow from "../form_elements/ErrorWindow";
import SelectableCourse from "./SelectableCourse";
import HoleLayouts from "../courses/HoleLayouts";

const SelectCourse = ({ setCourse, setStage }) => {
  const [course, selectCourse] = useState(null);
  const [holeLayout, setHoleLayout] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");

  async function searchCourses() {
    event.preventDefault();

    const searchTerms = document.getElementById("search-courses").value;
    if (searchTerms !== "") {
      await axios
        .get(`/api/search_courses/`, {
          params: { search: searchTerms },
        })
        .then((response) => {
          if (response.data) {
            setSearchResults([response.data]);
          } else {
            setSearchResults([]);
          }
        })
        .catch((err) => console.error(err));
    }
  }

  function submitCurrentLayout() {
    if (course && holeLayout) {
      setCourse({
        id: course.id,
        name: course.name,
        layout_name: holeLayout.name,
        holes: course.holes.filter(
          (hole) => hole.hole_layout_id === holeLayout.id
        ),
      });
      setStage("play-round");
    } else {
      setErrorMsg("Select a course and hole layout!");
    }
  }

  return (
    <div className={"select-course"}>
      <div className={"title uppercase has-text-centered"}>Pick A Course</div>
      <div className="search-courses">
        <div className="controls">
          <TextField
            inputId={"search-courses"}
            testId={"search-courses"}
            autoFocus={true}
            maxLength={100}
            placeholder={"Search for disc golf courses..."}
          />
          <SubmitButton
            clickFunction={() => searchCourses()}
            color={"is-success"}
            displayText={"Search Courses"}
          />
        </div>
      </div>
      <div className={"search-results"}>
        {searchResults.map((course, i) => {
          return (
            <SelectableCourse
              key={i}
              course={course}
              selectCourse={selectCourse}
            />
          );
        })}
      </div>
      {course && (
        <HoleLayouts
          allLayouts={course.hole_layouts}
          allHoles={course.holes}
          setHoleLayout={setHoleLayout}
        />
      )}
      {holeLayout && (
        <div className={"continue-button"}>
          <div
            className={"next-stage-button button is-link"}
            onClick={() => submitCurrentLayout()}
          >
            Start Your Round!
          </div>
        </div>
      )}
      <ErrorWindow errorMsg={errorMsg} />
    </div>
  );
};

export default SelectCourse;
