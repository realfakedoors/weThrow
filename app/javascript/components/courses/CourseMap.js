import React from "react";

import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from "react-google-maps";

const CourseMap = (props) => {
  const courseLocation = {
    lat: props.lat,
    lng: props.lng,
  };
  return (
    <GoogleMap
      defaultZoom={14}
      defaultCenter={courseLocation}
      options={{ mapTypeControl: false }}
    >
      <Marker position={courseLocation} />
    </GoogleMap>
  );
};

export default withScriptjs(withGoogleMap(CourseMap));
