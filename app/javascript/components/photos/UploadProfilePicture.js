import React, { useState } from "react";
import { useAuth } from "../../hooks/use-auth";
import { photoValidations } from "./photo-validations";

import axios from "axios";

import SubmitButton from "../form_elements/SubmitButton";
import ErrorWindow from "../form_elements/ErrorWindow";

const UploadProfilePicture = () => {
  const auth = useAuth();

  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [displayText, setDisplayText] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [loading, setLoading] = useState(false);

  const validations = photoValidations();

  function validateProfilePicture(photo) {
    if (validations.photoIsTooLarge(photo.size)) {
      setErrorMsg("Profile pictures can't be over 5MB!");
    } else if (!validations.correctType(photo.name)) {
      setErrorMsg("Profile pictures can only be in JPEG/JPG/PNG format.");
    } else {
      return true;
    }
  }

  async function updateDisplay(event) {
    const photo = await event.target.files[0];
    if (!photo || !validateProfilePicture(photo)) return;

    setErrorMsg(null);
    setDisplayText(photo.name);
    setSelectedPhoto(photo);
  }

  async function submitProfilePicture(event) {
    event.preventDefault();
    if (!selectedPhoto) {
      setErrorMsg("No photo selected!");
    } else {
      setErrorMsg(null);
      setLoading(true);

      const photoData = new FormData();
      let url;

      await axios
        .get("/photos/new", {
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
          photoData.append("file", selectedPhoto);
          photoData.append("Content-Type", selectedPhoto.type);
        })
        .catch((err) => console.error(err));

      const xml = await fetch(url, {
        method: "POST",
        body: photoData,
      }).then((res) => res.text());

      const uploadUrl = new DOMParser()
        .parseFromString(xml, "application/xml")
        .getElementsByTagName("Location")[0].textContent;

      await axios
        .post(
          "/photos/",
          {
            photo: {
              url: uploadUrl,
              photo_attachable_id: parseInt(auth.userId),
              photo_attachable_type: "User",
            },
          },
          {
            headers: {
              Authorization: auth.userToken,
            },
          }
        )
        .catch((err) => {
          console.error(err);
        });

      auth.setUserProfilePicture(uploadUrl);
      setLoading(false);
    }
  }

  return (
    <div className="upload-profile-picture card">
      <h3 className={"subtitle has-text-centered"}>Your Profile Picture</h3>
      <div className="card-image">
        <figure className="image is-128x128">
          {!loading && <img src={auth.userProfilePicture} />}
        </figure>
      </div>
      <div className="profile-picture-form card-content">
        <div className="file is-boxed is-info">
          <label className="file-label">
            <input
              className="file-input"
              type="file"
              name="resume"
              onChange={() => updateDisplay(event)}
            />
            <span className="file-cta">
              <span className="file-icon">
                <img src={"upload.png"} />
              </span>
              <span className="file-label">{"Choose a Photo"}</span>
            </span>
            {displayText && <span className="file-name">{displayText}</span>}
          </label>
        </div>
        <SubmitButton
          clickFunction={() => submitProfilePicture(event)}
          color={"is-success"}
          displayText={"Change"}
        />
        <ErrorWindow errorMsg={errorMsg} />
      </div>
    </div>
  );
};

export default UploadProfilePicture;
