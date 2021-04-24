import React, { useState } from "react";

import { colorByScore } from "../common/color-by-score";

const PotentialScores = [...Array(12).keys()].map((score) => score + 1);

const ScoreableHole = ({ golferId, holeId, par, calculateTotals }) => {
  const [currentStyle, setCurrentStyle] = useState({
    color: "black",
    backgroundColor: "transparent",
  });

  function updateHole(score) {
    setCurrentStyle(colorByScore(par, score));
    calculateTotals();
  }

  return (
    <div className={`scoreable-hole`}>
      <select
        id={`score-${holeId}-${golferId}`}
        data-testid={`score-${holeId}-${golferId}`}
        className={"score"}
        defaultValue={"unscored"}
        style={currentStyle}
        onChange={(event) => updateHole(event.target.value)}
      >
        <option value={"unscored"} disabled>
          -
        </option>

        {PotentialScores.map((score) => {
          return (
            <option value={score} key={score}>
              {score}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default ScoreableHole;
