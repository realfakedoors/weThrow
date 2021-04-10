import React, { useState, useEffect } from "react";

import { GoogleMap, LoadScriptNext, Marker } from "@react-google-maps/api";

const containerStyle = {
  height: "400px",
};

const defaultCenter = {
  lat: 39.7392,
  lng: -104.9903,
};

const GoogleMapPicker = ({ defaultCoords, setMapCoords }) => {
  const [markerPosition, setMarkerPosition] = useState(defaultCenter);

  useEffect(() => {
    if (defaultCoords) {
      setMarkerPosition(defaultCoords);
    }
  }, [defaultCoords]);

  function handleClick(coords) {
    const newCoords = { lat: coords.latLng.lat(), lng: coords.latLng.lng() };
    setMapCoords(newCoords);
    setMarkerPosition(newCoords);
  }

  return (
    <LoadScriptNext googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_KEY}>
      <GoogleMap
        zoom={8}
        center={defaultCenter}
        options={{ streetViewControl: false, mapTypeControl: false }}
        mapContainerStyle={containerStyle}
        onClick={(coords) => handleClick(coords)}
      >
        <Marker position={markerPosition} />
      </GoogleMap>
    </LoadScriptNext>
  );
};

export default React.memo(GoogleMapPicker);
