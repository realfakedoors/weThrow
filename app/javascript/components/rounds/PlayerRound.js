import React, { useState } from "react";

import ScoreableHole from "./ScoreableHole";

const PlayerRound = ({ golfer, holes, updateCompletedRounds }) => {
  const [differential, setDifferential] = useState(0);
  const [totalScore, setTotalScore] = useState(0);

  function calculateTotals() {
    const holeFields = holes.map((hole) => {
      const newScore = document.getElementById(`score-${hole.id}-${golfer.id}`)
        .value;
      if (newScore !== "unscored") {
        hole.score = parseInt(newScore);
      }
      return hole;
    });
    const filledOutFields = holeFields.filter((hole) => {
      return hole.golferId === golfer.id && hole.score;
    });
    if (filledOutFields.length === holeFields.length) {
      updateCompletedRounds(filledOutFields);
    }
    const newPar = filledOutFields
      .map((hole) => {
        return hole.par;
      })
      .reduce((a, b) => a + b, 0);
    const newScore = filledOutFields
      .map((hole) => {
        return hole.score;
      })
      .reduce((a, b) => a + b, 0);
    setTotalScore(newScore);
    setDifferential(newScore - newPar);
  }

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
    <tr>
      <td className={"golfer-avatar"}>
        <img src={golfer.profile_pic} className={"image is-48x48"} />
        <span className={"subtitle is-5"}>{golfer.name}</span>
      </td>
      {holes.map((hole, i) => {
        return (
          <td key={i}>
            <ScoreableHole
              golferId={golfer.id}
              holeId={hole.id}
              par={hole.par}
              calculateTotals={calculateTotals}
            />
          </td>
        );
      })}
      <td className={"total-score"}>{displayDifferential(differential)}</td>
      <td className={"total-score"}>{totalScore}</td>
    </tr>
  );
};

export default PlayerRound;
