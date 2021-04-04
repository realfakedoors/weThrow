import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import axios from "axios";

import Tags from "./Tags";
import CourseMap from "./CourseMap";
import Location from "./Location";
import Difficulty from "./Difficulty";
import Description from "./Description";
import CurrentConditions from "./CurrentConditions";
import CourseDetails from "./CourseDetails";
import CuratorControls from "./CuratorControls";
import HoleLayouts from "./HoleLayouts";
import AverageRating from "../common/AverageRating";
import PhotoGallery from "../photos/PhotoGallery";

const Course = () => {
  let { id } = useParams();

  const [courseData, setCourseData] = useState(null);
  const [currentConditions, setConditions] = useState(null);

  useEffect(() => {
    getCourseData();
  }, []);

  useEffect(() => {
    if (courseData && courseData.current_conditions) {
      setConditions(courseData.current_conditions);
    }
  }, [courseData]);

  async function getCourseData() {
    await axios
      .get(`/api/courses/${id}`)
      .then((response) => {
        setCourseData(response.data);
      })
      .catch((err) => console.error(err));
  }

  return (
    <div className={"course box is-mobile is-centered"}>
      {courseData && (
        <div className={"columns"}>
          <div className={"course-info-left column is-three-fifths"}>
            <h1 className={"title is-1"}>{courseData.name}</h1>
            <h4
              className={"subtitle is-4 uppercase"}
            >{`${courseData.city}, ${courseData.state}`}</h4>
            <div className={"quick-info"}>
              <AverageRating />
              <Difficulty />
            </div>
            <Tags
              cartFriendly={courseData.cart_friendly}
              dedicatedProperty={courseData.dedicated_property}
              camping={courseData.camping}
              freeParking={courseData.free_parking}
              publicRestrooms={courseData.public_restrooms}
            />
            <CourseMap
              lat={parseFloat(courseData.lat)}
              lng={parseFloat(courseData.lng)}
              googleMapURL={
                "https://maps.googleapis.com/maps/api/js?&key=" +
                process.env.REACT_APP_GOOGLE_MAPS_KEY +
                "&v=3.exp"
              }
              loadingElement={<div style={{ height: `300px` }} />}
              containerElement={<div style={{ height: `300px` }} />}
              mapElement={<div style={{ height: `300px` }} />}
            />
            <Location
              address={courseData.address}
              city={courseData.city}
              state={courseData.state}
              zip={courseData.zip}
              lat={courseData.lat}
              lng={courseData.lng}
            />
            <CourseDetails
              availability={courseData.public_availability}
              seasonality={courseData.seasonality}
              petPolicy={courseData.pet_policy}
              teepads={courseData.teepads}
              baskets={courseData.baskets}
              established={courseData.established}
              designer={courseData.course_designer}
              curatorName={courseData.curator_name}
            />
            <CuratorControls
              courseName={courseData.name}
              curatorId={courseData.curator_id}
              courseId={courseData.id}
            />
          </div>
          <div className={"course-info-right column"}>
            {courseData.photos.length > 0 && (
              <PhotoGallery photoData={courseData.photos} />
            )}
            <Description text={courseData.description} />
            <CurrentConditions
              courseId={courseData.id}
              courseConditions={currentConditions}
              setConditions={setConditions}
              curatorId={courseData.curator_id}
            />
            <HoleLayouts
              allLayouts={courseData.hole_layouts}
              allHoles={courseData.holes}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Course;
