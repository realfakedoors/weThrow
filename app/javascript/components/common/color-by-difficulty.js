export const colorByDifficulty = (differential) => {
  if (differential <= -4) {
    return "#777";
  } else if (differential > -4 && differential <= 4) {
    return "#444";
  } else if (differential > 4 && differential <= 8) {
    return "#ff8000";
  } else if (differential > 8) {
    return "#f53d3d";
  }
};

export const backgroundByDifficulty = (differential) => {
  if (differential === null) {
    return "white";
  } else if (differential <= -4) {
    return "#99ff99";
  } else if (differential > -4 && differential <= 4) {
    return "#e6ff99";
  } else if (differential > 4 && differential <= 8) {
    return "#fbeab6";
  } else if (differential > 8) {
    return "#f9f1f1";
  }
};

export const adjectiveByDifficulty = (differential) => {
  if (differential === null) {
    return "No Rounds Yet";
  } else if (differential <= -4) {
    return "Easy-Peasy";
  } else if (differential > -4 && differential <= 4) {
    return "Intermediate";
  } else if (differential > 4 && differential <= 8) {
    return "Difficult";
  } else if (differential > 8) {
    return "Very Challenging";
  }
};
