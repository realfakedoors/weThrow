import React from "react";

import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const CourseMap = ({ courseLocation }) => {
  return (
    <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_KEY}>
      <GoogleMap
        zoom={14}
        center={courseLocation}
        options={{ mapTypeControl: false }}
        mapContainerStyle={{ height: `300px` }}
      >
        <Marker position={courseLocation} />
      </GoogleMap>
    </LoadScript>
  );
};

export default React.memo(CourseMap);
