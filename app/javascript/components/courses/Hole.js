import React from "react";

const Hole = ({ name, par, distance }) => {
  return (
    <span className={"hole has-text-centered"}>
      <div>{name}</div>
      <div>{distance}</div>
      <div>{par}</div>
    </span>
  );
};

export default Hole;
