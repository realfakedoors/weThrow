import React, { useState, useEffect } from "react";
import { useAuth } from "../../hooks/use-auth";

import axios from "axios";

import { Redirect } from "react-router-dom";

import GeneralCourseInfoForm from "./GeneralCourseInfoForm";
import AddressForm from "./AddressForm";
import HoleInfoForm from "./HoleInfoForm";
import GoogleMapPicker from "../form_elements/GoogleMapPicker";
import UploadCoursePhotos from "../photos/UploadCoursePhotos";
import SubmitButton from "../form_elements/SubmitButton";
import ErrorWindow from "../form_elements/ErrorWindow";
import LoadingScreen from "../common/LoadingScreen";

const CourseForm = ({ title, buttonText, prepopulatedCourseData }) => {
  const auth = useAuth();

  const [errorMsg, setErrorMsg] = useState("");
  const [mapCoords, setMapCoords] = useState({
    lat: 39.7392,
    lng: -104.9903,
  });
  const [selectedPhotos, setSelectedPhotos] = useState([]);
  const [addedHoleLayouts, setAddedHoleLayouts] = useState([]);
  const [holeData, setHoleData] = useState(null);
  const [redirectOnSubmit, setRedirect] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (prepopulatedCourseData) {
      setMapCoords({
        lat: parseFloat(prepopulatedCourseData.lat),
        lng: parseFloat(prepopulatedCourseData.lng),
      });
      populateForm(prepopulatedCourseData);
      populateHoleLayouts({
        layouts: prepopulatedCourseData.hole_layouts,
        holes: prepopulatedCourseData.holes,
      });
    }
  }, [prepopulatedCourseData]);

  function populateHoleLayouts(data) {
    let newLayouts = [];
    let newPrepopulatedHoleData = [];
    data.layouts.forEach((layout) => {
      const layoutHoles = data.holes.filter(
        (hole) => hole.hole_layout_id === layout.id
      );
      newPrepopulatedHoleData.push(layoutHoles);
      const numberOfHoles = layoutHoles.length;
      newLayouts.push({ name: layout.name, holes: numberOfHoles });
    });
    setHoleData(newPrepopulatedHoleData);
    setAddedHoleLayouts(newLayouts);
  }

  async function populateForm(data) {
    document.getElementById("course-name").value = data.name;
    document.getElementById("course-designer").value = data.course_designer;
    document.getElementById("description").value = data.description;
    document.getElementById("availability").value = data.public_availability;
    document.getElementById("seasonality").value = data.seasonality;
    document.getElementById("street-address").value = data.address;
    document.getElementById("city").value = data.city;
    document.getElementById("state").value = data.state;
    document.getElementById("zip").value = data.zip;
    document.getElementById("teepads").value = data.teepads;
    document.getElementById("baskets").value = data.baskets;
    document.getElementById("established").value = data.established;
    document.getElementById("pets").value = data.pet_policy;
    document.getElementById("restrooms").checked = data.public_restrooms;
    document.getElementById("cart-friendly").checked = data.cart_friendly;
    document.getElementById("parking").checked = data.free_parking;
    document.getElementById("camping").checked = data.camping;
    document.getElementById("property").checked = data.dedicated_property;
  }

  async function uploadCoursePhotos() {
    let photoRecords = [];
    if (selectedPhotos.length > 20) {
      return;
    }
    for (const photo of selectedPhotos) {
      const photoData = new FormData();
      let url;

      await axios
        .get("/api/photos/new", {
          headers: {
            Authorization: auth.userToken,
          },
        })
        .then((res) => {
          const fields = res.data.fields;
          url = res.data.url;

          Object.keys(fields).forEach((key) =>
            photoData.append(key, fields[key])
          );
          photoData.append("file", photo);
          photoData.append("Content-Type", photo.type);
        })
        .catch((err) => console.error(err));

      const xml = await fetch(url, {
        method: "POST",
        body: photoData,
      }).then((res) => res.text());

      const uploadUrl = new DOMParser()
        .parseFromString(xml, "application/xml")
        .getElementsByTagName("Location")[0].textContent;

      photoRecords.push({ url: uploadUrl, uploader_id: auth.userId });
    }
    return photoRecords;
  }

  async function prepareCourseData(event) {
    event.preventDefault();

    const holeLayouts = addedHoleLayouts.map((layout, i) => {
      let holeData = [];
      for (let hole = 0; hole < layout.holes; hole++) {
        const fieldId = `${layout.name}-${i}-${hole}`;
        const holeName = document.getElementById(`${fieldId}-hole-name`).value;
        const par = parseInt(document.getElementById(`${fieldId}-par`).value);
        const distance =
          parseInt(document.getElementById(`${fieldId}-distance`).value) || 0;
        holeData.push({ name: holeName, par: par, distance: distance });
      }
      return {
        name: layout.name,
        holes_attributes: holeData,
      };
    });

    const courseData = {
      name: document.getElementById("course-name").value,
      course_designer: document.getElementById("course-designer").value,
      description: document.getElementById("description").value,
      public_availability: document.getElementById("availability").value,
      seasonality: document.getElementById("seasonality").value,
      lat: mapCoords.lat,
      lng: mapCoords.lng,
      address: document.getElementById("street-address").value,
      city: document.getElementById("city").value,
      state: document.getElementById("state").value,
      zip: document.getElementById("zip").value,
      teepads: document.getElementById("teepads").value,
      baskets: document.getElementById("baskets").value,
      established: document.getElementById("established").value,
      pet_policy: document.getElementById("pets").value,
      public_restrooms: document.getElementById("restrooms").checked,
      cart_friendly: document.getElementById("cart-friendly").checked,
      free_parking: document.getElementById("parking").checked,
      camping: document.getElementById("camping").checked,
      dedicated_property: document.getElementById("property").checked,
      hole_layouts_attributes: holeLayouts,
    };

    if (validateCourse(courseData)) {
      setLoading(true);
      const coursePhotos = await uploadCoursePhotos();
      courseData.photos_attributes = coursePhotos;
      submitCourse(courseData);
    }
  }

  function validateCourse(courseData) {
    if (courseData.name.length < 6) {
      setErrorMsg("Course Name should be longer than 6 characters!");
    } else if (courseData.name.length > 75) {
      setErrorMsg("Course Name can't be longer than 75 characters!");
    } else if (courseData.description.length > 600) {
      setErrorMsg("Description can't be longer than 600 characters.");
    } else if (courseData.city === "") {
      setErrorMsg("Enter a city, town, locality or area.");
    } else {
      setErrorMsg("");
      return true;
    }
  }

  function submitCourse(courseData) {
    if (prepopulatedCourseData) {
      // Update Course
      axios
        .patch(
          `/api/courses/${prepopulatedCourseData.id}`,
          {
            course: courseData,
          },
          {
            headers: {
              Authorization: auth.userToken,
            },
          }
        )
        .then((res) => {
          setRedirect(<Redirect to={`/courses/${res.data.id}`} />);
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      // Create Course
      axios
        .post(
          "/api/courses",
          {
            course: courseData,
          },
          {
            headers: {
              Authorization: auth.userToken,
            },
          }
        )
        .then((res) => {
          setRedirect(<Redirect to={`/courses/${res.data.id}`} />);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }

  function deleteCourse(courseId) {
    axios
      .delete(`/api/courses/${courseId}`, {
        headers: { Authorization: auth.userToken },
      })
      .then(() => {
        setRedirect(<Redirect to={"/"} />);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  let display;
  if (loading) {
    display = <LoadingScreen />;
  } else {
    display = (
      <div>
        <GeneralCourseInfoForm title={title} />
        <hr />
        <AddressForm />
        <GoogleMapPicker
          setMapCoords={setMapCoords}
          defaultCoords={mapCoords}
        />
        <hr />
        <HoleInfoForm
          setErrorMsg={setErrorMsg}
          addedHoleLayouts={addedHoleLayouts}
          setAddedHoleLayouts={setAddedHoleLayouts}
          holeData={holeData}
          setHoleData={setHoleData}
        />
        <hr />
        <UploadCoursePhotos
          setErrorMsg={setErrorMsg}
          setSelectedPhotos={setSelectedPhotos}
        />
        <hr />
        <div className={"submit-button"}>
          <SubmitButton
            color={"is-success"}
            displayText={buttonText}
            clickFunction={prepareCourseData}
          />
          {prepopulatedCourseData && (
            <SubmitButton
              color={"is-danger"}
              displayText={`Delete ${prepopulatedCourseData.name}`}
              clickFunction={() => deleteCourse(prepopulatedCourseData.id)}
            />
          )}
        </div>
        <ErrorWindow errorMsg={errorMsg} />
      </div>
    );
  }

  return (
    <div className={"course-form"}>
      {display}
      {redirectOnSubmit}
    </div>
  );
};

export default CourseForm;
