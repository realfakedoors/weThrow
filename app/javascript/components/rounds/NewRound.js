import React, { useState, useEffect } from "react";

import ChooseGolfers from "./ChooseGolfers";
import SelectCourse from "./SelectCourse";
import Scorecard from "./Scorecard";
import PostRoundOptions from "./PostRoundOptions";
import SubmitRounds from "./SubmitRounds";

const NewRound = () => {
  const [stage, setStage] = useState("choose-golfers");
  const [display, setDisplay] = useState(null);

  const [golfers, setGolfers] = useState([]);
  const [course, setCourse] = useState(null);
  const [roundData, setRoundData] = useState(null);

  useEffect(() => {
    switch (stage) {
      case "choose-golfers":
        setDisplay(
          <ChooseGolfers setGolfers={setGolfers} setStage={setStage} />
        );
        break;
      case "select-course":
        setDisplay(<SelectCourse setCourse={setCourse} setStage={setStage} />);
        break;
      case "play-round":
        setDisplay(
          <Scorecard
            golfers={golfers}
            course={course}
            setRoundData={setRoundData}
            setStage={setStage}
          />
        );
        break;
      case "post-round":
        setDisplay(
          <PostRoundOptions
            golfers={golfers}
            roundData={roundData}
            setRoundData={setRoundData}
            setStage={setStage}
          />
        );
        break;
      case "submit-rounds":
        setDisplay(<SubmitRounds roundData={roundData} courseId={course.id} />);
        break;
      default:
        setDisplay(null);
        break;
    }
  }, [stage]);

  return <div className={"new-round box"}>{display}</div>;
};

export default NewRound;
