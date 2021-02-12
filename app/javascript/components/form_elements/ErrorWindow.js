import React from "react";

const ErrorWindow = ({ errorMsg }) => {
  return (
    <h6 id={"error-window"} className={"has-text-danger"}>
      {errorMsg}
    </h6>
  );
};

export default ErrorWindow;
