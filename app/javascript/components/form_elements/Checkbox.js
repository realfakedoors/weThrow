import React from "react";

const Checkbox = ({ label, inputId, testId }) => {
  return (
    <div className={"field"}>
      <div className={"control"}>
        <label className={"checkbox"}>
          <input
            id={inputId}
            type={"checkbox"}
            className={"checkbox"}
            data-testid={testId}
          />
          {label}
        </label>
      </div>
    </div>
  );
};

export default Checkbox;
