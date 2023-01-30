import React ,{useRef}from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({

    selectDrop: {
        fontFamily: "Roboto,sans-serif",
        fontWeight: 500,
        fontSize: "500",
        letterSpacing: "2px",
        fontWeight: "bold",
    },


})


const DropdownField = (props) => {


    const classes = useStyles();

    const genrateOptions = (dropList) => {
        let optionItems = dropList.map((option) =>
            <option className={classes.selectDrop} key={option} value={option}>{option}</option>
        );

        return optionItems;

    };


    return (
        <React.Fragment>

            <div className={props.bigSmall ? "input-group input-group-sm mb-3" : "input-group mb-3"}>
                <div className="input-group-prepend">
                    <label style={{ fontWeight: "bold" }} className="input-group-text" htmlFor="inputGroupSelect01">{props.lableName}</label>
                </div>
                <select onChange={props.myChangeHandler} name={props.name} value={props.value} className={`custom-select ${classes.selectDrop}`} id="inputGroupSelect01">
                    <option className={classes.selectDrop} value="ALL">ALL</option>
                    {genrateOptions(props.dropList)}

                </select>
            </div>
        </React.Fragment>
    );

};
export default DropdownField;
