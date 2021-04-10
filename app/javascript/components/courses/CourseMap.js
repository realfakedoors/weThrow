import React from "react";

import { GoogleMap, LoadScriptNext, Marker } from "@react-google-maps/api";

const CourseMap = ({ courseLocation }) => {
  return (
    <LoadScriptNext googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_KEY}>
      <GoogleMap
        zoom={13}
        center={courseLocation}
        options={{ mapTypeControl: false }}
        mapContainerStyle={{ height: `300px` }}
      >
        <Marker position={courseLocation} />
      </GoogleMap>
    </LoadScriptNext>
  );
};

export default React.memo(CourseMap);
