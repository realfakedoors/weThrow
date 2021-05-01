import React, { useState, useEffect } from "react";

import PlayerRound from "./PlayerRound";

const Scorecard = ({ golfers, course, setRoundData, setStage }) => {
  const [playerRounds, setPlayerRounds] = useState([]);
  const [completedRounds, setCompletedRounds] = useState([]);
  const [uniqueRounds, setUniqueRounds] = useState([]);

  useEffect(() => {
    const rounds = golfers.map((golfer) => {
      const golferHoles = course.holes.map((hole) => ({
        ...hole,
        golferId: golfer.id,
      }));
      return (
        <PlayerRound
          key={golfer.id}
          golfer={golfer}
          holes={golferHoles}
          updateCompletedRounds={updateCompletedRounds}
        />
      );
    });
    setPlayerRounds(rounds);
  }, []);

  useEffect(() => {
    const unique = [];
    const map = new Map();
    for (const round of completedRounds) {
      if (!map.has(round[0].golferId)) {
        map.set(round[0].golferId, true);
        unique.push(round);
      }
    }
    setUniqueRounds(unique);
  }, [completedRounds]);

  function updateCompletedRounds(round) {
    setCompletedRounds((completedRounds) => [...completedRounds, round]);
  }

  function filterHoles(golferId) {
    const golferRound = uniqueRounds.filter(
      (round) => round[0].golferId === golferId
    )[0];
    // eslint-disable-next-line no-unused-vars
    return golferRound.map(({ golferId, id, ...keepAttrs }) => keepAttrs);
  }

  function buildRoundData() {
    let roundData = golfers.map((golfer) => {
      return {
        round: {
          course_id: course.id,
          user_id: golfer.id,
          layout_name: course.layout_name,
          recorded_holes_attributes: filterHoles(golfer.id),
        },
      };
    });
    setRoundData(roundData);
    setStage("post-round");
  }

  return (
    <div>
      <div className={`recorded-round`}>
        <h2 className={"title is-2"}>{course.name}</h2>
        <h2 className={"subtitle is-3"}>{course.layout_name}</h2>
        <table className={"scorecard table is-bordered is-striped"}>
          <thead>
            <tr>
              <td></td>
              {course.holes.map((hole) => {
                return (
                  <td key={hole.id} className={"hole-info"}>
                    <div>
                      <p className={"has-text-centered name is-size-5"}>
                        {hole.name}
                      </p>
                    </div>
                    <div>
                      <p className={"has-text-centered distance is-size-7"}>
                        {hole.distance}
                      </p>
                    </div>
                    <div>
                      <p className={"has-text-centered"}>{hole.par}</p>
                    </div>
                  </td>
                );
              })}
              <th className={"total-col-header"}>Score</th>
              <th className={"total-col-header"}>Total</th>
            </tr>
          </thead>
          <tbody>{playerRounds}</tbody>
        </table>
      </div>
      <div>
        {uniqueRounds.length === golfers.length && (
          <div className={"continue-button submit-rounds"}>
            <div
              className={"next-stage-button button is-link"}
              onClick={() => buildRoundData()}
            >
              Submit Rounds
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Scorecard;
