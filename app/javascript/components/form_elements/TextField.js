import React from "react";

const TextField = ({ label, inputId, inputType, autoFocus, testId }) => {
  return (
    <div className={"field"}>
      <label className={"label"}>{label}</label>
      <div className={"control"}>
        <input id={inputId} className={"input"} type={inputType} autoFocus={autoFocus} data-testid={testId} />
      </div>
    </div>
  );
};

export default TextField;
