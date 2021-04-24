import React from "react";

import {
  colorByDifficulty,
  backgroundByDifficulty,
  adjectiveByDifficulty,
} from "../common/color-by-difficulty";

const Difficulty = ({ avgRound }) => {
  function displayDifferential(round) {
    if (round > 0) {
      return `+${round}`;
    } else if (round === 0) {
      return "E";
    } else {
      return round;
    }
  }
  return (
    <div
      className={"course-difficulty"}
      style={{ backgroundColor: backgroundByDifficulty(avgRound) }}
    >
      {avgRound !== null && (
        <div className={"difficulty-title"}>Average Round</div>
      )}
      <div
        className={"differential"}
        style={{ color: colorByDifficulty(avgRound) }}
      >
        {displayDifferential(avgRound)}
      </div>
      <div
        className={"challenge-level"}
        style={{ color: colorByDifficulty(avgRound) }}
      >
        {adjectiveByDifficulty(avgRound)}
      </div>
    </div>
  );
};

export default Difficulty;
