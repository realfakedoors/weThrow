import React from "react";

import TextField from "../form_elements/TextField";
import TextArea from "../form_elements/TextArea";
import DropdownMenu from "../form_elements/DropdownMenu";
import Checkbox from "../form_elements/Checkbox";

const GeneralCourseInfoForm = ({ title }) => {
  const generateYears = [];
  const currentYear = new Date().getFullYear();
  for (let i = 1975; i <= currentYear; i++) {
    generateYears.push(i);
  }

  return (
    <div className={"general-course-info-form"}>
      <h2 className={"title is-2 has-text-centered"}>{title}</h2>
      <TextField
        label={"Course Name"}
        inputId={"course-name"}
        inputType={"text"}
        testId={"course-name"}
        autoFocus={true}
      />
      <TextField
        label={"Course Designer"}
        inputId={"course-designer"}
        inputType={"text"}
        testId={"course-designer"}
      />
      <TextArea
        label={"Description"}
        placeholder={"What makes your course cool?"}
        inputId={"description"}
        testId={"description"}
      />
      <br />
      <div className={"set-tags"}>
        <DropdownMenu
          label={"Availability"}
          inputId={"availability"}
          options={["Public", "Pay-to-Play", "Temporary", "Private", "Closed"]}
        />
        <DropdownMenu
          label={"Seasonality"}
          inputId={"seasonality"}
          options={["Year-Round", "Seasonal", "Event-Only"]}
        />
        <DropdownMenu
          label={"Teepads"}
          inputId={"teepads"}
          options={["Concrete", "Turf", "Rubber", "Natural"]}
        />
        <TextField
          label={"Baskets"}
          inputId={"baskets"}
          placeholder={"Brand & Model"}
          inputType={"text"}
          testId={"baskets"}
        />
      </div>
      <div className={"set-tags"}>
        <DropdownMenu
          label={"Established"}
          inputId={"established"}
          options={generateYears.reverse()}
        />
        <DropdownMenu
          label={"Pets"}
          inputId={"pets"}
          options={["Allowed", "Leash-Only", "Not Allowed"]}
        />
        <div className={"misc-checkboxes"}>
          <Checkbox
            label={"Public Restrooms"}
            inputId={"restrooms"}
            testId={"restrooms"}
          />
          <Checkbox
            label={"Cart-Friendly"}
            inputId={"cart-friendly"}
            testId={"cart-friendly"}
          />
          <Checkbox
            label={"Free Parking"}
            inputId={"parking"}
            testId={"parking"}
          />
          <Checkbox
            label={"Camping On-Site"}
            inputId={"camping"}
            testId={"camping"}
          />
          <Checkbox
            label={"Dedicated Property"}
            inputId={"property"}
            testId={"property"}
          />
        </div>
      </div>
    </div>
  );
};

export default GeneralCourseInfoForm;
