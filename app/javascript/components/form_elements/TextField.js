import React from "react";

const TextField = ({
  label,
  placeholder,
  initialValue,
  inputId,
  inputType,
  autoFocus,
  testId,
  maxLength,
}) => {
  return (
    <div className={"field text-field"}>
      {label && <label className={"label"}>{label}</label>}
      <div className={"control"}>
        <input
          id={inputId}
          className={"input"}
          placeholder={placeholder}
          defaultValue={initialValue}
          type={inputType}
          autoFocus={autoFocus}
          maxLength={maxLength}
          data-testid={testId}
        />
      </div>
    </div>
  );
};

export default TextField;
