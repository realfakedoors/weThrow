export const colorByScore = (par, score) => {
  let color = "white";
  let backgroundColor = "white";
  const differential = score - par;
  if (differential <= -2) {
    backgroundColor = "info";
  } else if (differential === -1) {
    backgroundColor = "success";
  } else if (differential === 1) {
    backgroundColor = "warning";
    color = "black";
  } else if (differential >= 2) {
    backgroundColor = "danger";
  } else {
    color = "black";
  }
  return { color, backgroundColor };
};
