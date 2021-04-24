import React, { useState, useEffect } from "react";

import Layout from "./Layout";

const HoleLayouts = ({ allLayouts, allHoles, setHoleLayout }) => {
  const [allHoleLayouts, setLayouts] = useState([]);
  const [title, setTitle] = useState("");

  useEffect(() => {
    if (allLayouts.length === 0) {
      setTitle("No Hole Layouts added");
    } else {
      setTitle("Hole Layouts");
      setLayouts(
        allLayouts.map((layout) => {
          const layoutHoles = allHoles.filter(
            (hole) => hole.hole_layout_id === layout.id
          );
          return (
            <Layout
              key={layout.id}
              data={layout}
              name={layout.name}
              holes={layoutHoles}
              setHoleLayout={setHoleLayout}
            />
          );
        })
      );
    }
  }, []);

  return (
    <div className={"hole-layouts"}>
      <h3 className={"subtitle is-3 has-text-centered"}>{title}</h3>
      {allHoleLayouts}
    </div>
  );
};

export default HoleLayouts;
