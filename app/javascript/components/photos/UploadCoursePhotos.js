import React, { useState } from "react";
import { photoValidations } from "../photos/photo-validations";

const UploadCoursePhotos = ({ setErrorMsg, setSelectedPhotos }) => {
  const [displayText, setDisplayText] = useState(null);

  const validations = photoValidations();

  function findPhotoErrors(coursePhotos) {
    let errorMsgs = [];
    coursePhotos.forEach((photo, i) => {
      if (i >= 20) {
        errorMsgs.push("Can't add more than 20 photos!");
      } else if (validations.photoIsTooLarge(photo.size)) {
        errorMsgs.push("Photos can't be over 5MB!");
      } else if (!validations.correctType(photo.name)) {
        errorMsgs.push("Photos can only be in JPEG/JPG/PNG format.");
      }
    });

    if (errorMsgs.length > 0) {
      setErrorMsg(
        <ul>
          {errorMsgs.map((msg, i) => (
            <li key={i}>{msg}</li>
          ))}
        </ul>
      );
    } else {
      return false;
    }
  }

  async function updateDisplay(event) {
    const files = await event.target.files;
    const photos = Object.keys(files)
      .filter((key) => {
        return key !== "length";
      })
      .map((key) => files[key]);

    if (!photos || findPhotoErrors(photos) !== false) return;

    setErrorMsg("");
    setDisplayText(
      photos.map((photo, i) => {
        return <li key={i}>{photo.name}</li>;
      })
    );
    setSelectedPhotos(photos);
  }

  return (
    <div className={"upload-course-photos"}>
      <h4 className={"title is-4 has-text-centered"}>Course Photos</h4>
      <br />
      <div className="file is-boxed is-link">
        <label className="file-label">
          <input
            className="file-input"
            type="file"
            onChange={() => updateDisplay(event)}
            multiple={true}
          />
          <span className="file-cta">
            <span className="file-icon">
              <img src={"/upload.png"} />
            </span>
            <span className="file-label">{"Select up to 20 photos"}</span>
          </span>
          {displayText && <ul className="file-name">{displayText}</ul>}
        </label>
      </div>
    </div>
  );
};

export default UploadCoursePhotos;
