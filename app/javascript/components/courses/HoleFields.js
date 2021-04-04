import React from "react";

import TextField from "../form_elements/TextField";
import DropdownMenu from "../form_elements/DropdownMenu";

const HoleFields = ({
  fieldId,
  defaultHoleName,
  defaultPar,
  defaultDistance,
}) => {
  return (
    <div className={"hole-fields has-text-centered"}>
      <TextField
        inputId={`${fieldId}-hole-name`}
        inputType={"text"}
        testId={`${fieldId}-hole-name`}
        initialValue={defaultHoleName}
        maxLength={3}
      />
      <DropdownMenu
        label={"Par"}
        inputId={`${fieldId}-par`}
        options={[3, 4, 5]}
        testId={`${fieldId}-par`}
        defaultValue={defaultPar}
      />
      <TextField
        label={"Distance"}
        inputId={`${fieldId}-distance`}
        inputType={"text"}
        testId={`${fieldId}-distance`}
        initialValue={defaultDistance}
      />
    </div>
  );
};

export default HoleFields;
