export const colorByScore = (par, score) => {
  const differential = score - par;
  if (differential <= -2) {
    return {
      color: "white",
      backgroundColor: "#6bc7b0",
    };
  } else if (differential === -1) {
    return {
      color: "white",
      backgroundColor: "#82c76b",
    };
  } else if (differential === 1) {
    return {
      color: "white",
      backgroundColor: "#c7996b",
    };
  } else if (differential >= 2) {
    return {
      color: "white",
      backgroundColor: "#c76b6b",
    };
  } else {
    return {
      color: "black",
      backgroundColor: "transparent",
    };
  }
};
