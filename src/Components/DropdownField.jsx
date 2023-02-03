import React, { useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  selectDrop: {
    fontFamily: "Roboto,sans-serif",
    fontWeight: 500,
    fontSize: "500",
    letterSpacing: "2px",
    fontWeight: "bold",
    padding: "5px",
    border: "1.3px solid #832729",
    cursor: "pointer",
    borderTop: "none",
    borderLeft: "none",
    borderRight: "none",
    outline: "none",
  },
});

const DropdownField = (props) => {
  const classes = useStyles();
  const generateOptions = (dropList) => {
    let optionItems = dropList.map((option) => (
      <option className={classes.selectDrop} key={option} value={option}>
        {option}
      </option>
    ));

    return optionItems;
  };

  return (
    <>
      <div
        className={
          props.bigSmall
            ? "input-group input-group-sm mb-3"
            : "input-group mb-3"
        }
      >
        <select
          onChange={props.myChangeHandler}
          name={props.name}
          value={props.value}
          className={classes.selectDrop}
          id="inputGroupSelect01"
        >
          <option className={classes.selectDrop} value="ALL">
            Select {props.lableName}
          </option>
          {generateOptions(props.dropList)}
        </select>
      </div>
    </>
  );
};
export default DropdownField;
