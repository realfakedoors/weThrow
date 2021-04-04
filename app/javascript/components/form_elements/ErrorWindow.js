import React from "react";

const ErrorWindow = ({ errorMsg }) => {
  return (
    <h6 className={"error-window has-text-danger has-text-centered"}>
      {errorMsg}
    </h6>
  );
};

export default ErrorWindow;
