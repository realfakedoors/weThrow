import React, { useState, useEffect } from "react";

import NewHoleLayoutForm from "./NewHoleLayoutForm";
import LayoutFields from "./LayoutFields";

const HoleInfoForm = ({
  setErrorMsg,
  addedHoleLayouts,
  setAddedHoleLayouts,
  holeData,
  setHoleData,
}) => {
  const [displayFields, setDisplayFields] = useState([]);

  useEffect(() => {
    setDisplayFields(
      addedHoleLayouts.map((fields, i) => {
        let holes;
        if (holeData) {
          holes = holeData[i];
        }
        return (
          <LayoutFields
            key={i}
            index={i}
            layoutName={fields.name}
            numberOfHoles={fields.holes}
            prepopulatedHoleData={holes}
            removeLayout={removeLayout}
          />
        );
      })
    );
  }, [addedHoleLayouts]);

  const addLayout = () => {
    const layoutName = document.getElementById("new-layout-name").value;
    const numberOfHoles = document.getElementById("number-of-holes").value;
    if (layoutName === "") {
      setErrorMsg("Enter a name for your hole layout!");
    } else if (numberOfHoles > 99) {
      setErrorMsg("Hole Layouts can only have 99 holes max!");
    } else {
      setAddedHoleLayouts(
        addedHoleLayouts.concat([
          { name: layoutName, holes: parseInt(numberOfHoles) },
        ])
      );
      setErrorMsg("");
      document.getElementById("new-layout-name").value = "";
    }
  };

  const removeLayout = (index) => {
    setHoleData((holeData) => {
      return holeData && holeData.filter((hole, i) => i !== index);
    });
    setAddedHoleLayouts((addedHoleLayouts) => {
      return (
        addedHoleLayouts && addedHoleLayouts.filter((layout, i) => i !== index)
      );
    });
  };

  return (
    <div className={"hole-info-form"}>
      <h4 className={"title is-4 has-text-centered"}>Hole Info</h4>
      <div className={"layout-fields"}>{displayFields}</div>
      <NewHoleLayoutForm addLayout={addLayout} />
    </div>
  );
};

export default HoleInfoForm;
