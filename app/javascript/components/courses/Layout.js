import React, { useState, useEffect } from "react";

import Hole from "./Hole";

const Layout = ({ data, name, holes, setHoleLayout }) => {
  const [displayHoles, setDisplayHoles] = useState([]);
  const [totalDistance, setTotalDistance] = useState(0);
  const [totalPar, setTotalPar] = useState(0);
  const [highlightIfActive, setHighlight] = useState();

  useEffect(() => {
    let layoutDistance = 0;
    let layoutPar = 0;

    setDisplayHoles(
      holes.map((hole) => {
        layoutDistance += hole.distance;
        layoutPar += hole.par;
        return (
          <Hole
            key={hole.id}
            name={hole.name}
            par={hole.par}
            distance={hole.distance}
          />
        );
      })
    );
    setTotalDistance(layoutDistance);
    setTotalPar(layoutPar);
  }, []);

  function selectLayout() {
    setHighlight({ boxShadow: "0 0 25px #595959" });
    setHoleLayout(data);
  }

  return (
    <div className={"block layout"} style={highlightIfActive}>
      <div className={"layout-info"}>
        <span className={"layout-name is-size-4"}>
          <strong>{name}</strong>
        </span>
        <span className={"total-par subtitle is-6 uppercase"}>
          Par {totalPar}
        </span>
        <span className={"total-distance subtitle is-6 uppercase"}>
          {totalDistance} Feet
        </span>
      </div>
      <div className={"display-holes"}>{displayHoles}</div>
      {setHoleLayout && (
        <button className={"button is-link"} onClick={() => selectLayout()}>
          Use This Layout
        </button>
      )}
    </div>
  );
};

export default Layout;
