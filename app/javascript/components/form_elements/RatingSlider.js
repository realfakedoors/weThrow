import React, { useState } from "react";

const Slider = ({ inputId, testId }) => {
  const [value, setValue] = useState(5);

  function updateValue(event) {
    setValue(event.target.value);
  }

  return (
    <span className={"rating-slider-container"}>
      <span className={"title is-5"}>{"Rating"}</span>
      <input
        className={"rating-slider"}
        type={"range"}
        id={inputId}
        data-testid={testId}
        name={"heading"}
        min={"0.5"}
        max={"10"}
        step={"0.5"}
        value={value}
        onChange={(event) => updateValue(event)}
      />
      <span className={"title is-5"}>{value}</span>
    </span>
  );
};

export default Slider;
