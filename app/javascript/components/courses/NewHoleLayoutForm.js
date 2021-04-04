import React from "react";

import TextField from "../form_elements/TextField";
import SubmitButton from "../form_elements/SubmitButton";

const NewHoleLayoutForm = ({ addLayout }) => {
  return (
    <div className={"new-hole-layout-form"}>
      <TextField
        label={"New Layout"}
        inputId={"new-layout-name"}
        inputType={"text"}
        testId={"new-layout-name"}
        placeholder={"Name"}
      />
      <TextField
        label={"# of holes"}
        inputId={"number-of-holes"}
        inputType={"text"}
        testId={"number-of-holes"}
        initialValue={18}
      />
      <SubmitButton
        color={"is-success"}
        displayText={"Add Layout"}
        clickFunction={addLayout}
      />
    </div>
  );
};

export default NewHoleLayoutForm;
