import React, { useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Multiselect } from "multiselect-react-dropdown";
import { makeStyles } from "@material-ui/core";
import "../Style/CssStyle/MuliSelectDropdownField.css";

const useStyles = makeStyles({
  optionContainer: {
    textAlign: "left",
  },
  option: {
    color: "red",
  },
});

const MuliSelectDropdownField = (props) => {
  const classes = useStyles();
  const multiselectRef = useRef();

  const resetSelectField = () => {
    multiselectRef.current.resetSelectedValues();
  };

  const data = [
    {
      valueData: "Not Relevant To Market",
      lableValue: "Not Relevant To Market",
    },
    {
      valueData: "Price is High",
      lableValue: "Price is High",
    },
    {
      valueData: "Wearibility Issue",
      lableValue: "Wearibility Issue",
    },
    {
      valueData: "Similar design exists",
      lableValue: "Similar design exists",
    },
    {
      valueData: "Design Not Applicable",
      lableValue: "Design Not Applicable",
    },
  ];

  const onInternalSelectChange = (selectedList, selectedItem) => {
    let selectedData = selectedList.map((data) => {
      return data.valueData;
    });
    return props.onMultiSelect(selectedData);
  };

  const onInternalRemoveChange = (selectedList, removedItem) => {
    let selectedData = selectedList.map((data) => {
      return data.valueData;
    });
    return props.onMultiSelect(selectedData);
  };

  return (
    <>
      <div>
        <label>Choose reasons for No</label>

        <div className="drop_multi">
          <Multiselect
            onSelect={onInternalSelectChange}
            onRemove={onInternalRemoveChange}
            options={data}
            displayValue="lableValue"
            showCheckbox={true}
            closeOnSelect={true}
            selectionLimit={3}
            placeholder="Click here to Choose Reasons for No"
            disablePreSelectedValues={true}
          />
        </div>
      </div>
    </>
  );
};
export const MuliSelectDropdownFieldQualityFeedback = (props) => {
  console.log(props, "MuliSelectDropdownFieldQualityFeedback");
  const classes = useStyles();
  const multiselectRef = useRef();

  const resetSelectField = () => {
    multiselectRef.current.resetSelectedValues();
  };
  const dataQlty = [
    {
      valueData: "Not Relevant To Market",
      lableValue: "Not Relevant To Market",
    },
    {
      valueData: "Diamond Visibility not ok",
      lableValue: "Diamond Visibility not ok",
    },
    {
      valueData: "Fall and Linking Issues",
      lableValue: "Fall and Linking Issues",
    },
    {
      valueData: "Finding Quality Issues-Screw,Hooks,etc..",
      lableValue: "Finding Quality Issues-Screw,Hooks,etc..",
    },
    {
      valueData: "Higne and Lock issues in Babgle",
      lableValue: "Higne and Lock issues in Babgle",
    },
    {
      valueData: "Sharp edges and Soldering Quality issues",
      lableValue: "Sharp edges and Soldering Quality issues",
    },
    {
      valueData: "Stone setting related issues",
      lableValue: "Stone setting related issues",
    },
    {
      valueData: "Surface finish and intricate area finish not ok",
      lableValue: "Surface finish and intricate area finish not ok",
    },
  ];

  const onInternalSelectChange = (selectedList, selectedItem) => {
    let selectedData = selectedList.map((data) => {
      return data.valueData;
    });
    return props.onMultiSelectQlty(selectedData);
  };
  const onInternalRemoveChange = (selectedList, removedItem) => {
    let selectedData = selectedList.map((data) => {
      return data.valueData;
    });
    return props.onMultiSelectQlty(selectedData);
  };

  return (
    <>
      <div>
        <label>Choose Reasons</label>
        <div className="drop_multi">
          <Multiselect
            options={dataQlty}
            displayValue="lableValue"
            onSelect={onInternalSelectChange}
            onRemove={onInternalRemoveChange}
            showCheckbox={true}
            closeOnSelect={true}
            selectionLimit={3}
            placeholder="Click here to choose reasons for QA"
            className="searchbox"
          />
        </div>
      </div>
    </>
  );
};
export default MuliSelectDropdownField;
