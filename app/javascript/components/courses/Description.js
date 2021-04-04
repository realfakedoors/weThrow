import React from "react";

const Description = ({ text }) => {
  return (
    <div className={"course-description title is-5 has-text-centered"}>
      {text}
    </div>
  );
};

export default Description;
