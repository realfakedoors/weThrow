import React from "react";

const DropdownMenu = ({
  label,
  inputId,
  defaultOption,
  defaultValue,
  options,
  testId,
}) => {
  return (
    <div className={"field text-field"}>
      <label className={"label"}>{label}</label>
      <div className={"control select"}>
        <select id={inputId} data-testid={testId} defaultValue={defaultValue}>
          {defaultOption && <option value={defaultOption} />}
          {options.map((option) => {
            return (
              <option key={option} value={option}>
                {option}
              </option>
            );
          })}
        </select>
      </div>
    </div>
  );
};

export default DropdownMenu;
