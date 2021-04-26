import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../../hooks/use-auth";

import axios from "axios";

import Tags from "./Tags";
import CourseMap from "./CourseMap";
import Location from "./Location";
import Difficulty from "./Difficulty";
import Description from "./Description";
import CurrentConditions from "./CurrentConditions";
import ChangeCurrentConditions from "./ChangeCurrentConditions";
import CourseDetails from "./CourseDetails";
import CourseReviews from "./CourseReviews";
import TopTenRounds from "./TopTenRounds";
import CuratorControls from "./CuratorControls";
import HoleLayouts from "./HoleLayouts";
import AverageRating from "../common/AverageRating";
import PhotoGallery from "../photos/PhotoGallery";

const Course = () => {
  let { id } = useParams();

  const auth = useAuth();

  const [courseData, setCourseData] = useState(null);
  const [currentConditions, setConditions] = useState(null);
  const [roundData, setRoundData] = useState([]);

  useEffect(() => {
    getCourseData();
  }, []);

  async function getCourseData() {
    await axios
      .get(`/api/courses/${id}`)
      .then((response) => {
        setCourseData(response.data.course);
        setConditions(response.data.course.current_conditions);
        setRoundData(response.data.top_ten_rounds);
      })
      .catch((err) => console.error(err));
  }

  function userIsAuthorized() {
    if (courseData.curator_id === parseInt(auth.userId) || auth.adminStatus) {
      return true;
    } else {
      return false;
    }
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
              <AverageRating
                mean={courseData.avg_rating}
                numberOfRatings={courseData.reviews.length}
              />
              <Difficulty avgRound={courseData.avg_round} />
            </div>
            <Tags
              cartFriendly={courseData.cart_friendly}
              dedicatedProperty={courseData.dedicated_property}
              camping={courseData.camping}
              freeParking={courseData.free_parking}
              publicRestrooms={courseData.public_restrooms}
            />
            {courseData.lat && (
              <CourseMap
                courseLocation={{
                  lat: parseFloat(courseData.lat),
                  lng: parseFloat(courseData.lng),
                }}
              />
            )}
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
            <CourseReviews
              reviews={courseData.reviews}
              courseId={courseData.id}
              courseName={courseData.name}
              getCourseData={() => getCourseData()}
            />
            <TopTenRounds roundData={roundData} />
            <CuratorControls
              courseName={courseData.name}
              curatorId={courseData.curator_id}
              courseId={courseData.id}
              authorized={userIsAuthorized()}
            />
          </div>
          <div className={"course-info-right column"}>
            {courseData.photos.length > 0 && (
              <PhotoGallery photoData={courseData.photos} />
            )}
            <Description text={courseData.description} />
            <CurrentConditions
              courseConditions={currentConditions}
              courseView={true}
              conditionSize={"large"}
            />
            {userIsAuthorized() && (
              <ChangeCurrentConditions
                courseId={courseData.id}
                courseConditions={currentConditions}
                setConditions={setConditions}
              />
            )}
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
