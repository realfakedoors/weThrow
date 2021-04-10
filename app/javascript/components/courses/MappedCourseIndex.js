import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import {
  GoogleMap,
  LoadScriptNext,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";

const MappedCourseIndex = ({ courses }) => {
  const [allMarkers, setMarkers] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);

  useEffect(() => {
    let markers = [];
    courses.forEach((course, i) => {
      const markerPosition = {
        lat: parseFloat(course.lat),
        lng: parseFloat(course.lng),
      };
      const infoWindowPosition = {
        lat: parseFloat(course.lat) + 0.06,
        lng: parseFloat(course.lng),
      };
      markers.push(
        <Marker
          position={markerPosition}
          key={i}
          onClick={() => {
            setSelectedCourse({ position: infoWindowPosition, course: course });
          }}
        />
      );
    });
    setMarkers(markers);
  }, [courses]);

  const fullScreenMapStyle = {
    height: `calc(100vh + 56px)`,
    width: "100vw",
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 1,
    overflow: "hidden",
  };

  const infoWindowStyle = {
    background: "white",
    padding: "5px",
  };

  return (
    <LoadScriptNext googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_KEY}>
      <GoogleMap
        zoom={9}
        center={{ lat: 39.7392, lng: -104.9903 }}
        options={{ mapTypeControl: false }}
        mapContainerStyle={fullScreenMapStyle}
        className={"mapped-course-index"}
      >
        {allMarkers}
        {selectedCourse && (
          <InfoWindow
            position={selectedCourse.position}
            style={infoWindowStyle}
            onCloseClick={() => setSelectedCourse(null)}
          >
            <div>
              <Link to={`/courses/${selectedCourse.course.id}`}>
                {selectedCourse.course.name}
              </Link>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </LoadScriptNext>
  );
};

export default MappedCourseIndex;
