import React from "react";

import TextField from "../form_elements/TextField";
import DropdownMenu from "../form_elements/DropdownMenu";

import allStateAbbreviations from "../common/all-states.js";

const AddressForm = () => {
  return (
    <div className={"address-form"}>
      <h4 className={"title is-4 has-text-centered"}>Location</h4>
      <div className={"enter-address"}>
        <TextField
          label={"Street Address"}
          inputId={"street-address"}
          inputType={"text"}
          testId={"street-address"}
        />
        <TextField
          label={"City"}
          inputId={"city"}
          inputType={"text"}
          testId={"city"}
        />
        <DropdownMenu
          label={"State"}
          inputId={"state"}
          options={allStateAbbreviations}
          defaultValue={"CO"}
        />
        <TextField
          label={"Zip Code"}
          inputId={"zip"}
          inputType={"text"}
          testId={"zip"}
        />
      </div>
    </div>
  );
};

export default AddressForm;
