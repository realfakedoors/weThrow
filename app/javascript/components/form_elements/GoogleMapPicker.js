import React, { useState, useEffect } from "react";

import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from "react-google-maps";

const GoogleMapPicker = (props) => {
  const defaultPosition = {
    lat: 39.7392,
    lng: -104.9903,
  };
  const [markerPosition, setMarkerPosition] = useState(defaultPosition);

  useEffect(() => {
    if (props.defaultCoords.lat) {
      setMarkerPosition(props.defaultCoords);
    }
  }, [props.defaultCoords]);

  function handleClick(coords) {
    const newCoords = { lat: coords.latLng.lat(), lng: coords.latLng.lng() };
    props.setMapCoords(newCoords);
    setMarkerPosition(newCoords);
  }

  return (
    <GoogleMap
      defaultZoom={8}
      defaultCenter={defaultPosition}
      options={{ streetViewControl: false, mapTypeControl: false }}
      onClick={(coords) => handleClick(coords)}
    >
      <Marker position={markerPosition} />
    </GoogleMap>
  );
};

export default withScriptjs(withGoogleMap(GoogleMapPicker));
