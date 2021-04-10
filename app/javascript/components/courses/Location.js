import React from "react";

const Location = ({ address, city, state, zip, lat, lng }) => {
  return (
    <div className={"course-location"}>
      {lat && (
        <h2 className={"subtitle is-4 has-text-centered"}>
          <a
            href={`http://www.google.com/maps/place/${lat},${lng}`}
            rel={"noreferrer"}
            target={"_blank"}
          >
            Open in Google Maps
          </a>
        </h2>
      )}
      <p>{address}</p>
      <p>{`${city}, ${state}`}</p>
      <p>{zip}</p>
    </div>
  );
};

export default Location;
