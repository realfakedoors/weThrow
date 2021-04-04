import React from "react";

const Tags = ({
  cartFriendly,
  dedicatedProperty,
  camping,
  freeParking,
  publicRestrooms,
}) => {
  return (
    <div className={"block course-tags"}>
      {cartFriendly && (
        <div className={"tag is-success is-light"}>Cart Friendly</div>
      )}
      {dedicatedProperty && (
        <div className={"tag is-primary is-light"}>Dedicated Property</div>
      )}
      {camping && <div className={"tag is-link is-light"}>Camping On-Site</div>}
      {freeParking && (
        <div className={"tag is-info is-light"}>Free Parking</div>
      )}
      {publicRestrooms && (
        <div className={"tag is-warning is-light"}>Public Restrooms</div>
      )}
    </div>
  );
};

export default Tags;
