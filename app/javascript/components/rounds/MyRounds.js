import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import axios from "axios";
import littleTime from "little-time";

import { useAuth } from "../../hooks/use-auth";

const MyRounds = () => {
  const auth = useAuth();

  const [myRounds, setMyRounds] = useState([]);

  useEffect(() => {
    getMyRounds();
    return () => {
      setMyRounds({});
    };
  }, []);

  function showDifferential(differential) {
    if (differential > 0) {
      return `+${differential}`;
    } else if (differential === 0) {
      return "E";
    } else {
      return differential;
    }
  }

  async function getMyRounds() {
    await axios
      .get(`/api/rounds`, { headers: { Authorization: auth.userToken } })
      .then((res) => {
        setMyRounds(
          res.data.map((round, i) => {
            return (
              <tr key={i}>
                <td>
                  <small>{littleTime(round.created_at).fromNow()}</small>
                </td>
                <td>
                  <Link to={`/courses/${round.course_id}`}>
                    <strong>{round.course.name}</strong>
                  </Link>
                </td>
                <td>
                  <small className={"uppercase"}>{round.layout_name}</small>
                </td>
                <td>
                  <strong>{showDifferential(round.differential)}</strong>
                </td>
              </tr>
            );
          })
        );
      })
      .catch((err) => console.error(err));
  }

  return (
    <div className={"box my-rounds table-container"}>
      <h2 className={"title is-5"}>My Rounds</h2>
      {myRounds.length === 0 && (
        <div>{"Play & submit rounds to track them here!"}</div>
      )}
      <table className={"table is-striped"}>
        <tbody>{myRounds}</tbody>
      </table>
    </div>
  );
};

export default MyRounds;
