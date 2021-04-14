import React, { useState, useEffect } from "react";

import HoleFields from "./HoleFields";

const LayoutFields = ({
  index,
  layoutName,
  numberOfHoles,
  prepopulatedHoleData,
  removeLayout,
}) => {
  const [fields, setFields] = useState([]);

  useEffect(() => {
    let newFields = [];
    for (let i = 0; i < numberOfHoles; i++) {
      const fieldId = `${layoutName}-${index}-${i}`;
      if (prepopulatedHoleData) {
        const hole = prepopulatedHoleData[i];
        newFields.push(
          <HoleFields
            fieldId={fieldId}
            key={fieldId}
            defaultHoleName={hole.name}
            defaultPar={hole.par}
            defaultDistance={hole.distance}
          />
        );
      } else {
        newFields.push(
          <HoleFields fieldId={fieldId} key={fieldId} defaultHoleName={i + 1} />
        );
      }
    }
    setFields(newFields);
  }, [prepopulatedHoleData]);

  return (
    <div className={"layout-fields"}>
      <div className={"name-bar"}>
        <span className={"title is-5"}>{layoutName}</span>
        <span
          className={"delete-button"}
          title={"Remove Layout"}
          onClick={() => removeLayout(index)}
        >
          X
        </span>
      </div>
      <div className={"all-hole-fields"}>{fields}</div>
    </div>
  );
};

export default LayoutFields;
