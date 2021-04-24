import React from "react";

const TopTenRounds = ({ roundData }) => {
  function generateRankIcon(rank) {
    switch (rank) {
      case 1:
        return <img src={"/gold-medal.svg"} alt={"First Place"} />;
      case 2:
        return <img src={"/silver-medal.svg"} alt={"Second Place"} />;
      case 3:
        return <img src={"/bronze-medal.svg"} alt={"Third Place"} />;
      default:
        return rank;
    }
  }

  function showDifferential(differential) {
    if (differential > 0) {
      return `+${differential}`;
    } else if (differential === 0) {
      return "E";
    } else {
      return differential;
    }
  }

  return (
    <div className={"box top-ten-rounds table-container"}>
      <h2 className={"subtitle is-4 uppercase has-text-centered"}>
        Hottest Rounds
      </h2>
      {roundData.length === 0 && (
        <div>
          {"No rounds have been submitted yet. Get out there and be the first!"}
        </div>
      )}
      <table className={"table is-striped"}>
        <tbody>
          {roundData.map((round, i) => {
            return (
              <tr key={i} className={"top-ten-round"}>
                <td className={"rank-icon"}>{generateRankIcon(i + 1)}</td>
                <td>{round.golfer_name}</td>
                <td>
                  <small className={"uppercase"}>{round.layout_name}</small>
                </td>
                <td>
                  <strong>{showDifferential(round.differential)}</strong>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default TopTenRounds;
