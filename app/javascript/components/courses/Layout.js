import React, { useState, useEffect } from "react";

import Hole from "./Hole";

const Layout = ({ name, holes }) => {
  const [displayHoles, setDisplayHoles] = useState([]);
  const [totalDistance, setTotalDistance] = useState(0);
  const [totalPar, setTotalPar] = useState(0);

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

  return (
    <div className={"block layout"}>
      <div className={"layout-info"}>
        <span className={"layout-name title is-4"}>{name}</span>
        <span className={"total-par subtitle is-6 uppercase"}>
          Par {totalPar}
        </span>
        <span className={"total-distance subtitle is-6 uppercase"}>
          {totalDistance} Feet
        </span>
      </div>
      <div className={"display-holes"}>{displayHoles}</div>
    </div>
  );
};

export default Layout;
