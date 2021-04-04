import React from "react";

const TextArea = ({ label, placeholder, inputId, testId }) => {
  return (
    <div className={"field text-field"}>
      <label className={"label"}>{label}</label>
      <div className={"control"}>
        <textarea
          id={inputId}
          placeholder={placeholder}
          className={"textarea"}
          data-testid={testId}
        />
      </div>
    </div>
  );
};

export default TextArea;
