import React, { useState, useEffect } from "react";

import { colorByScore } from "../common/color-by-score";

const PostRoundOptions = ({ golfers, roundData, setRoundData, setStage }) => {
  const [golferRounds, setGolferRounds] = useState([]);

  useEffect(() => {
    let rounds = golfers.map((golfer) => {
      golfer.round = roundData.find(
        (round) => round.round.user_id === golfer.id
      );
      return golfer;
    });
    const cleanRounds = rounds.map((golfer) => {
      let holes = golfer.round.round.recorded_holes_attributes.map((hole) => {
        return {
          name: hole.name,
          par: hole.par,
          distance: hole.distance,
          score: hole.score,
        };
      });
      golfer.round.round.recorded_holes_attributes = holes;
      return golfer;
    });
    setGolferRounds(cleanRounds);
  }, [golfers]);

  function grabDifferential(allHoles) {
    const totalPar = allHoles
      .map((hole) => hole.par)
      .reduce((total, hole) => total + hole);
    const totalScore = allHoles
      .map((hole) => hole.score)
      .reduce((total, hole) => total + hole);
    const differential = totalScore - totalPar;

    if (differential > 0) {
      return `+${differential}`;
    } else if (differential === 0) {
      return "E";
    } else {
      return differential;
    }
  }

  function submitRounds() {
    event.preventDefault();

    const roundsToSubmit = golferRounds.filter((round) => {
      return (
        document.querySelector(`input[name="${round.id}-choice"]:checked`)
          .value === "save"
      );
    });

    setRoundData(roundsToSubmit);
    setStage("submit-rounds");
  }

  return (
    <div className={"post-round"}>
      <h4 className={"subtitle is-4"}>
        {"how'd you shoot out there? did you want to"}
      </h4>
      <h1 className={"title is-1"}>{"Save Your Round?"}</h1>
      <div className={"golfer-rounds"}>
        {golferRounds.length > 0 &&
          golferRounds.map((golfer, i) => {
            return (
              <div key={i} className={"golfer-round box"}>
                <span className={"golfer-info"}>
                  <img src={golfer.profile_pic} className={"image is-32x32"} />
                  <span className={"subtitle is-5"}>{golfer.name}</span>
                </span>
                <span className={"differential"}>
                  {grabDifferential(
                    golfer.round.round.recorded_holes_attributes
                  )}
                </span>
                <span className={"scorecard"}>
                  {golfer.round.round.recorded_holes_attributes.map(
                    (hole, i) => {
                      return (
                        <span
                          className={"hole"}
                          key={i}
                          style={colorByScore(hole.par, hole.score)}
                        >
                          <div className={"score"}>{hole.score}</div>
                        </span>
                      );
                    }
                  )}
                </span>
                <span className={"choose-to-save-round"}>
                  <div className="control">
                    <label className="radio">
                      <input
                        type="radio"
                        name={`${golfer.id}-choice`}
                        value={`save`}
                        defaultChecked
                      />
                      Save
                    </label>
                    <label className="radio">
                      <input
                        type="radio"
                        name={`${golfer.id}-choice`}
                        value={`discard`}
                      />
                      Discard
                    </label>
                  </div>
                </span>
              </div>
            );
          })}
      </div>
      <div className={"continue-button"}>
        <div
          className={"next-stage-button button is-link"}
          onClick={() => submitRounds()}
        >
          Next
        </div>
      </div>
    </div>
  );
};

export default PostRoundOptions;
