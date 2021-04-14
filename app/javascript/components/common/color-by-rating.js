export const colorByRating = (rating) => {
  if (rating < 3.5) {
    return "#8f3d3d";
  } else if (rating >= 3.5 && rating < 6.5) {
    return "#8a8a0f";
  } else if (rating >= 6.5) {
    return "#3d5c3d";
  }
};

export const backgroundByRating = (rating) => {
  if (rating !== 0 && rating < 3.5) {
    return "#e8c9c9";
  } else if (rating >= 3.5 && rating < 6.5) {
    return "#f0f075";
  } else if (rating >= 6.5) {
    return "#d1e0d1";
  }
};

export const adjectiveByRating = (rating) => {
  if (rating < 3.5) {
    return "Poor";
  } else if (rating >= 3.5 && rating < 6.5) {
    return "Passable";
  } else if (rating >= 6.5) {
    return "Amazing";
  }
};
