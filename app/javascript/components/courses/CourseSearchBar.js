import React, { useState } from "react";

import { Redirect } from "react-router-dom";

import TextField from "../form_elements/TextField";
import SubmitButton from "../form_elements/SubmitButton";

const CourseSearchBar = () => {
  const [redirect, setRedirect] = useState(null);

  function courseSearch(event) {
    event.preventDefault();

    const searchTerms = document.getElementById("search-courses").value;
    if (searchTerms !== "") {
      setRedirect(<Redirect to={`/search/${searchTerms}`} />);
    }
  }

  return (
    <div className="search-courses">
      <form className="controls">
        <TextField
          inputId={"search-courses"}
          testId={"search-courses"}
          autoFocus={true}
          maxLength={100}
          placeholder={"Search for disc golf courses..."}
        />
        <SubmitButton
          clickFunction={courseSearch}
          color={"is-success"}
          displayText={"Search Courses"}
        />
        {redirect}
      </form>
    </div>
  );
};

export default CourseSearchBar;
