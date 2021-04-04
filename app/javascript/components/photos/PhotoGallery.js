import React, { useState, useEffect } from "react";

const PhotoGallery = ({ photoData }) => {
  const [featuredPhoto, setFeaturedPhoto] = useState(null);
  const [gallery, setGallery] = useState([]);

  useEffect(() => {
    const randomPhoto = Math.floor(Math.random() * photoData.length);
    setFeaturedPhoto(photoData[randomPhoto].url);
    if (photoData.length > 1) {
      setGallery(
        photoData.map((photo, i) => {
          return (
            <img
              className="gallery-photo image is-64x64"
              key={i}
              src={photo.url}
              onClick={() => setFeaturedPhoto(photo.url)}
            />
          );
        })
      );
    }
  }, []);

  return (
    <div className={"photo-gallery"}>
      <div className={"featured-photo-container"}>
        <img className="featured-photo" src={featuredPhoto} />
      </div>
      {gallery}
    </div>
  );
};

export default PhotoGallery;
