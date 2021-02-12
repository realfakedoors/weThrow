import React from "react";

const SubmitButton = ({ clickFunction, color, displayText }) => {
  return (
    <div className={"field"}>
      <div className={"control"}>
        <button className={"button " + color} onClick={clickFunction}>
          {displayText}
        </button>
      </div>
    </div>
  );
};

export default SubmitButton;
