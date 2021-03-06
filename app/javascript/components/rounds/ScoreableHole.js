import React, { useState } from "react";

import { colorByScore } from "../common/color-by-score";

const PotentialScores = [...Array(12).keys()].map((score) => score + 1);

const ScoreableHole = ({ golferId, holeId, par, calculateTotals }) => {
  const [currentColor, setCurrentColor] = useState({
    color: "black",
  });
  const [backgroundColor, setBackgroundColor] = useState("white");

  function updateHole(score) {
    let colors = colorByScore(par, score);
    const newColor = colors.color;
    const newBackground = colors.backgroundColor;
    setCurrentColor({ color: newColor });
    setBackgroundColor(newBackground);
    calculateTotals();
  }

  return (
    <div className={`scoreable-hole`}>
      <select
        id={`score-${holeId}-${golferId}`}
        data-testid={`score-${holeId}-${golferId}`}
        className={`score has-background-${backgroundColor}`}
        defaultValue={"unscored"}
        style={currentColor}
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
