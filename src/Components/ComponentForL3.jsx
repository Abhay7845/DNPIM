import {
  FormControl,
  makeStyles,
  Dialog,
  MenuItem,
  DialogContent,
  DialogContentText,
  DialogActions,
  DialogTitle,
  Select,
  Typography,
  Button,
  Container,
  Paper,
  InputLabel,
  TextField,
  Grid,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";
import axios from "axios";
import OTPInput from "otp-input-react";
import React, { useEffect, useState } from "react";
import { Multiselect } from "multiselect-react-dropdown";
import SingleImgCreator from "./SingleImgCreator";
import Blink from "react-blink-text";
import "../Style/CssStyle/LowerHeader.css";

const useStyles = makeStyles({
  drop_multi: {
    width: "100%",
    minWidth: "100%",
  },
  inputField: {
    width: "100%",
    "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
      border: "1px solid #484850",
      borderRadius: "5px 5px 0 0",
    },
  },
  formControl: {
    minWidth: "100%",
    "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
      border: "1px solid #484850",
      borderRadius: "5px 5px 0 0",
    },
  },
  hide: {
    display: "none",
  },
  show: {
    display: "block",
  },
  header: {
    backgroundColor: "red",
  },
  report: {
    width: "100%",
    margin: "0%",
    padding: "0%",
  },
  haddingCss: {
    fontWeight: "bolder",
    fontStretch: "normal",
    fontSize: "16px",
    lineHeight: "normal",
    fontFamily: "Raleway, sans - serif",
    letterSpacing: "2px",
  },
  hadding: {
    fontWeight: 500,
    fontSize: "18px",
    fontStretch: "normal",
    // lineHeight: 5.4,
    fontFamily: "Raleway, sans-serif",
    letterSpacing: "1px",
    textAlign: "left",
  },
  rowData: {
    fontWeight: 500,
    fontFamily: "Playfair Display,seri",
    fontSize: "18px",
    // lineHeight: '20px',
    letterSpacing: "1px",
    textAlign: "left",
  },
});
let specialLabelValue;
function DataGridReport(props) {
  const classes = useStyles();

  const { col, rows, caller, reportLable, rowDataHandler } = props;

  const coloum = col.map((element) => {
    let fieldRes;

    if (element === "Action") {
      fieldRes = {
        field: "Action",
        headerName: "Action",
        sortable: false,
        // width: 100,
        flex: 1,

        disableClickEventBubbling: true,
        renderCell: (params) => {
          return (
            <Button
              onClick={(data) => {
                rowDataHandler(params.row);
              }}
            >
              Edit
            </Button>
          );
        },
      };
    } else if (element === "Image") {
      fieldRes = {
        field: "Image",
        headerName: "Image",
        sortable: false,
        // width: 100,
        innerHeight: 500,
        flex: 1,

        renderCell: (params) => {
          return (
            <SingleImgCreator
              itemCode={
                params.row.itemCode ? params.row.itemCode : "502783VWQR1A02"
              }
              link="https://tanishqdigitalnpim.titan.in/NpimImages/"
            />
          );
        },
      };
    } else {
      fieldRes = {
        field: element,
        flex: 1,
        sortable: false,
        // width: 200,
        // headerName: element.toUpperCase(),
      };
    }

    return fieldRes;
  });

  return (
    <>
      <Container maxWidth="xl" className={classes.report}>
        <Typography align="center" variant="h5" color="secondary">
          {reportLable}
        </Typography>

        {/* <DataGrid
                    columnHeader={classes.header}
                    rows={rows}
                    columns={coloum}
                    pagination
                    pageSize={5}
                    rowCount={100}
                    paginationMode="server"

                /> */}
        <DataGrid
          rows={rows}
          columns={coloum}
          autoHeight={true}
          autoPageSize={true}
          pageSize={100}
          // pageSize={10}
          // paginationMode="server"
          disableColumnSelector
        />
      </Container>
    </>
  );
}

function MultiselectUomAndSize(props) {
  const { lableName, optionsList } = props;

  const classes = useStyles();
  const [sizeRow, setSizeRow] = useState({
    A: false,
    B: false,
    C: false,
    D: false,
    E: false,
    F: false,
    G: false,
    H: false,
    I: false,
    J: false,
    K: false,
    L: false,
    M: false,
    N: false,
    O: false,
    P: false,
    Q: false,
    R: false,
    S: false,
    T: false,
    U: false,
    V: false,
    W: false,
    X: false,
    Y: false,
    Z: false,
  });
  // const resetSelectField = () => {
  //     multiselectRef.current.resetSelectedValues()
  // }

  // const options = [{
  //     "valueData": "A",
  //     "lableValue": "A",
  // },
  // {
  //     "valueData": "B",
  //     "lableValue": "B",
  // }
  // ]

  const options = props.optionsList.map((element, index) => {
    return {
      valueData: element,
      lableValue: element,
    };
  });

  const enableRows = (name, value) => {
    setSizeRow(function (old) {
      switch (name) {
        case "A":
          return {
            ...old,
            [name]: value,
          };
        case "B":
          return {
            ...old,
            [name]: value,
          };
        case "C":
          return {
            ...old,
            [name]: value,
          };
        case "D":
          return {
            ...old,
            [name]: value,
          };
        case "E":
          return {
            ...old,
            [name]: value,
          };
        case "F":
          return {
            ...old,
            [name]: value,
          };
        case "G":
          return {
            ...old,
            [name]: value,
          };
        case "H":
          return {
            ...old,
            [name]: value,
          };
        case "I":
          return {
            ...old,
            [name]: value,
          };
        case "J":
          return {
            ...old,
            [name]: value,
          };
        case "K":
          return {
            ...old,
            [name]: value,
          };
        case "L":
          return {
            ...old,
            [name]: value,
          };
        case "M":
          return {
            ...old,
            [name]: value,
          };
        case "N":
          return {
            ...old,
            [name]: value,
          };
        case "O":
          return {
            ...old,
            [name]: value,
          };
        case "P":
          return {
            ...old,
            [name]: value,
          };
        case "Q":
          return {
            ...old,
            [name]: value,
          };
        case "R":
          return {
            ...old,
            [name]: value,
          };
        case "S":
          return {
            ...old,
            [name]: value,
          };
        case "T":
          return {
            ...old,
            [name]: value,
          };
        case "U":
          return {
            ...old,
            [name]: value,
          };

        case "V":
          return {
            ...old,
            [name]: value,
          };
        case "W":
          return {
            ...old,
            [name]: value,
          };

        case "X":
          return {
            ...old,
            [name]: value,
          };
        case "Y":
          return {
            ...old,
            [name]: value,
          };
        case "Z":
          return {
            ...old,
            [name]: value,
          };
      }
    });
  };
  const onInternalSelectChange = (selectedList, selectedItem) => {
    console.log("selected item for Add", selectedItem.lableValue);
    enableRows(selectedItem.lableValue, true);
  };

  const onInternalRemoveChange = (selectedList, removedItem) => {
    console.log("selected item for remove", removedItem.lableValue);
    enableRows(removedItem.lableValue, false);
  };
  const rowHandlerChange = (event) => {
    let getData = [];
    let count = 0;

    for (let rowName in sizeRow) {
      if (sizeRow[rowName]) {
        getData[count++] = {
          size: rowName,
          uom8: document.getElementById(`${rowName}8`).value
            ? document.getElementById(`${rowName}8`).value
            : "",
          uom6: document.getElementById(`${rowName}6`).value
            ? document.getElementById(`${rowName}6`).value
            : "",
          uom4: document.getElementById(`${rowName}4`).value
            ? document.getElementById(`${rowName}4`).value
            : "",
          uom2: document.getElementById(`${rowName}2`).value
            ? document.getElementById(`${rowName}2`).value
            : "",
          uom1: document.getElementById(`${rowName}1`).value
            ? document.getElementById(`${rowName}1`).value
            : "",
        };
      }
    }
    console.log("get data ", getData);

    return props.sizeUomQuantityResHandler(getData);
  };

  const enableRow = (lableValue) => {
    for (let rowName in sizeRow) {
      if (rowName === lableValue && sizeRow[rowName]) {
        return true;
      }
    }
    return false;
  };

  return (
    <>
      <div className={classes.drop_multi}>
        <Typography align="center" color="primary">
          Size UOM Quantity
        </Typography>
        <Multiselect
          options={options}
          displayValue="lableValue"
          onSelect={onInternalSelectChange}
          onRemove={onInternalRemoveChange}
          showCheckbox={true}
          // style={cssdata}
          // selectedValues={[]}
          closeOnSelect={true}
          // selectionLimit={3}
          placeholder="Choose Options"
          disablePreSelectedValues={true}
          // ref={multiselectRef}
        />
        <table style={{ width: "100%", padding: 1, margin: 0 }}>
          <tbody>
            {options.map((row, index) => (
              <tr
                key={index}
                onChange={rowHandlerChange}
                id={row.lableValue}
                className={
                  enableRow(row.lableValue) ? classes.show : classes.hide
                }
              >
                <td>
                  <Typography size="small" color="primary">
                    {row.lableValue}
                  </Typography>
                </td>
                <td>
                  <Typography size="small" color="primary">
                    8
                  </Typography>
                </td>
                <td>
                  {" "}
                  <input
                    min="0"
                    type="number"
                    id={`${row.lableValue}8`}
                    name={`${row.lableValue}8`}
                    className={classes.inputField}
                  />
                </td>

                <td>
                  <Typography size="small" color="primary">
                    6
                  </Typography>
                </td>
                <td>
                  {" "}
                  <input
                    min="0"
                    type="number"
                    id={`${row.lableValue}6`}
                    name={`${row.lableValue}6`}
                    className={classes.inputField}
                  />
                </td>

                <td>
                  <Typography size="small" color="primary">
                    4
                  </Typography>
                </td>
                <td>
                  {" "}
                  <input
                    min="0"
                    type="number"
                    id={`${row.lableValue}4`}
                    name={`${row.lableValue}4`}
                    className={classes.inputField}
                  />
                </td>

                <td>
                  <Typography size="small" color="primary">
                    2
                  </Typography>
                </td>
                <td>
                  {" "}
                  <input
                    min="0"
                    type="number"
                    id={`${row.lableValue}2`}
                    name={`${row.lableValue}2`}
                    className={classes.inputField}
                  />
                </td>

                <td>
                  <Typography size="small" color="primary">
                    1
                  </Typography>
                </td>
                <td>
                  {" "}
                  <input
                    min="0"
                    type="number"
                    id={`${row.lableValue}1`}
                    name={`${row.lableValue}1`}
                    className={classes.inputField}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

function MultiSelectDropDownForAll(props) {
  const classes = useStyles();

  // const {placeholder, optionsList, onMultiSelect} = props

  let optionsList = ["prasun", "kamal", "Rekha", "chandan", "megha"];
  const placeholder = "size";

  const options = optionsList.map((element, index) => {
    return { valueData: element, lableValue: element };
  });

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
      <div className={classes.drop_multi}>
        <Typography align="center" color="primary">
          Lable
        </Typography>

        {options ? (
          <Multiselect
            options={options}
            displayValue="lableValue"
            onSelect={onInternalSelectChange}
            onRemove={onInternalRemoveChange}
            showCheckbox={true}
            closeOnSelect={true}
            // selectionLimit={3}
            placeholder={placeholder}
            disablePreSelectedValues={true}
          />
        ) : (
          <Typography align="center" color="secondary">
            Options are loading ...!
          </Typography>
        )}
      </div>
    </>
  );
}
//FINDINGS//
function DropDownMaterialUI(props) {
  const classes = useStyles();
  const { lableName, onChangeHandler, optionsList, valueData } = props;

  const genrateOptions = (dropList) => {
    let optionItems = dropList.map((option) => (
      <MenuItem key={option} value={option}>
        {option}
      </MenuItem>
    ));

    return optionItems;
  };

  return (
    <>
      {/* <Typography> {lableName}</Typography> */}

      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel id="demo-simple-select-outlined-label">
          {lableName}
        </InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          // value={age}
          label={lableName}
          autoWidth={true}
          onChange={onChangeHandler}
          // value={valueData}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>

          {genrateOptions(optionsList)}
        </Select>
      </FormControl>
    </>
  );
}
//FINDINGS//

function InputFieldMaterialUI(props) {
  const classes = useStyles();

  const {
    lableName,
    typeName,
    onChangeHandler,
    valueName,
    allDataFromValidation,
  } = props;
  console.log(
    allDataFromValidation,
    "allDataFromValidation allDataFromValidation form component L3"
  );
  console.log(valueName, "valueName");
  const [showhelper, setHelper] = useState(0);

  // if(allDataFromValidation.quantityRes.length>1||allDataFromValidation.quantityRes===0){
  //     setHelper(1)
  // }
  useEffect(() => {
    if (allDataFromValidation.quantityRes !== "") {
      if (
        allDataFromValidation.quantityRes.length > 1 ||
        parseInt(allDataFromValidation.quantityRes) === 0 ||
        parseInt(allDataFromValidation.quantityRes) > 5
      ) {
        setHelper(1);
      } else {
        setHelper(0);
      }
    }
  }, [allDataFromValidation?.quantityRes]);

  return (
    <>
      <div className={classes.inputField}>
        {/* <Typography align="center" color="primary">{lableName}</Typography> */}
        <div>
          <lable htmlFor="indqty" style={{ fontSize: 15 }}>
            Indent Quantity
          </lable>
          <div id="indqty">
            <OTPInput
              inputClassName="otp"
              value={allDataFromValidation?.quantityRes}
              onChange={(valuee) => {
                onChangeHandler(valuee);
              }}
              autoFocus
              OTPLength={1}
              otpType="number"
              disabled={false}
            />
          </div>
          {
            <p style={{ color: "red" }}>
              {showhelper == 0 ? "" : "Please enter a valid quantity"}
            </p>
          }
        </div>
        {/* <TextField
          id="outlined-search"
          label="Indent Quantity"
          type={typeName}
          variant="outlined"
          onChange={onChangeHandler}
          value={valueName}
          fullWidth={true}
          InputProps={{ inputProps: { min: 1, max: 5, maxlength: "1" } }}
          helperText={showhelper == 0 ? "" : "Please enter a valid quantity"}
          onKeyPress={(event) => {
            if (event?.key === "-") {
              event.preventDefault();
              setHelper(1);
            } else {
              setHelper(0);
            }
          }}
          error={showhelper == 0 ? false : true}
        /> */}
      </div>
    </>
  );
}

function MultiSelectAndInput(props) {
  // const {lableName, options} = props
  const classes = useStyles();
  const [sizeRow, setSizeRow] = useState({
    A: false,
    B: false,
    C: false,
    D: false,
    E: false,
    F: false,
    G: false,
    H: false,
    I: false,
    J: false,
    K: false,
    L: false,
    M: false,
    N: false,
    O: false,
    P: false,
    Q: false,
    R: false,
    S: false,
    T: false,
    V: false,
    X: false,
    Y: false,
    Z: false,
    2: false,
    4: false,
    6: false,
    8: false,
    Single_Tag: false,
    Separate_Tag: false,
    Only_EAR_RING: false,
    Only_NECKWEAR_OR_PENDANT: false,
  });
  // const resetSelectField = (props) => {
  //     const { lableName } = props
  //     multiselectRef.current.resetSelectedValues()
  // }

  const options = props.optionsList.map((element) => {
    return {
      valueData: element,
      lableValue: element,
    };
  });
  const enableRows = (name, value) => {
    setSizeRow(function (old) {
      switch (name) {
        case "A":
          return {
            ...old,
            [name]: value,
          };
        case "B":
          return {
            ...old,
            [name]: value,
          };
        case "C":
          return {
            ...old,
            [name]: value,
          };
        case "D":
          return {
            ...old,
            [name]: value,
          };
        case "E":
          return {
            ...old,
            [name]: value,
          };
        case "F":
          return {
            ...old,
            [name]: value,
          };
        case "G":
          return {
            ...old,
            [name]: value,
          };
        case "H":
          return {
            ...old,
            [name]: value,
          };
        case "I":
          return {
            ...old,
            [name]: value,
          };
        case "J":
          return {
            ...old,
            [name]: value,
          };
        case "K":
          return {
            ...old,
            [name]: value,
          };
        case "L":
          return {
            ...old,
            [name]: value,
          };
        case "M":
          return {
            ...old,
            [name]: value,
          };
        case "N":
          return {
            ...old,
            [name]: value,
          };
        case "O":
          return {
            ...old,
            [name]: value,
          };
        case "P":
          return {
            ...old,
            [name]: value,
          };
        case "Q":
          return {
            ...old,
            [name]: value,
          };
        case "R":
          return {
            ...old,
            [name]: value,
          };
        case "S":
          return {
            ...old,
            [name]: value,
          };
        case "T":
          return {
            ...old,
            [name]: value,
          };
        case "U":
          return {
            ...old,
            [name]: value,
          };
        case "V":
          return {
            ...old,
            [name]: value,
          };
        case "W":
          return {
            ...old,
            [name]: value,
          };
        case "X":
          return {
            ...old,
            [name]: value,
          };
        case "Y":
          return {
            ...old,
            [name]: value,
          };
        case "Z":
          return {
            ...old,
            [name]: value,
          };
        case "2":
          return {
            ...old,
            [name]: value,
          };

        case "4":
          return {
            ...old,
            [name]: value,
          };
        case "6":
          return {
            ...old,
            [name]: value,
          };
        case "8":
          return {
            ...old,
            [name]: value,
          };

        case "Single_Tag":
          return {
            ...old,
            [name]: value,
          };
        case "Separate_Tag":
          return {
            ...old,
            [name]: value,
          };
        case "Only_EAR_RING":
          return {
            ...old,
            [name]: value,
          };
        case "Only_NECKWEAR_OR_PENDANT":
          return {
            ...old,
            [name]: value,
          };
      }
    });
  };
  const onInternalSelectChange = (selectedList, selectedItem) => {
    console.log("selected item for Add", selectedItem.lableValue);
    enableRows(selectedItem.lableValue, true);
    specialLabelValue = selectedItem.lableValue;
  };

  const onInternalRemoveChange = (selectedList, removedItem) => {
    console.log("selected item for remove", removedItem.lableValue);
    enableRows(removedItem.lableValue, false);
  };
  const rowHandlerChange = (event) => {
    let getData = [];
    let count = 0;

    for (let rowName in sizeRow) {
      if (sizeRow[rowName]) {
        getData[count++] = {
          size: rowName,
          quantity: document.getElementById(`${rowName}sq`).value
            ? document.getElementById(`${rowName}sq`).value
            : "",
        };
      }
    }
    console.log("get data ", getData);
    return props.onChangeHandler(getData);
  };

  const enableRow = (lableValue) => {
    for (let rowName in sizeRow) {
      if (rowName === lableValue && sizeRow[rowName]) {
        return true;
      }
    }
    return false;
  };

  return (
    <>
      <div className={classes.drop_multi}>
        <Typography align="center" color="primary">
          {" "}
          {props.lableName}{" "}
        </Typography>
        <Multiselect
          options={options}
          displayValue="lableValue"
          onSelect={onInternalSelectChange}
          onRemove={onInternalRemoveChange}
          showCheckbox={true}
          // style={cssdata}
          // selectedValues={[]}
          closeOnSelect={true}
          // selectionLimit={3}
          placeholder="Choose Options"
          disablePreSelectedValues={true}
          // ref={multiselectRef}
        />
        <table style={{ width: "100%", padding: 1, margin: 0 }}>
          <tbody>
            {options.map((row, index) => (
              <tr
                key={index}
                onChange={rowHandlerChange}
                id={row.lableValue}
                className={
                  enableRow(row.lableValue) ? classes.show : classes.hide
                }
              >
                <td>
                  <Typography size="small" color="primary">
                    {row.lableValue}
                  </Typography>
                </td>
                <td>
                  {" "}
                  <input
                    min="0"
                    type="number"
                    id={`${row.lableValue}sq`}
                    name={`${row.lableValue}sq`}
                    className={classes.inputField}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

function ProductDetailsTabularL3(props) {
  const classes = useStyles();

  console.log(props);

  return (
    <>
      {/* <Paper> */}
      <div>
        <Typography className={classes.haddingCss} align="center">
          Product Specification
        </Typography>
      </div>
      <table style={{ width: "95%", fontWeight: 900, letterSpacing: "2px" }}>
        <tbody>
          {props.information.collection ? (
            <tr>
              <th className={classes.hadding}>Collection</th>
              <td>-</td>
              <td className={classes.rowData}>
                {props.information.collection}
              </td>
            </tr>
          ) : null}
          {props.information.consumerBase ? (
            <tr>
              <th className={classes.hadding}>Consumer Base</th>
              <td>-</td>
              <td className={classes.rowData}>
                {props.information.consumerBase}
              </td>
            </tr>
          ) : null}
          {props.information.itGroup ? (
            <tr>
              <th className={classes.hadding}>Group</th>
              <td>-</td>
              <td className={classes.rowData}>{props.information.itGroup}</td>
            </tr>
          ) : null}
          {props.information.category ? (
            <tr>
              <th className={classes.hadding}>Category</th>
              <td>-</td>
              <td className={classes.rowData}>{props.information.category}</td>
            </tr>
          ) : null}
          {props.information.gender ? (
            <tr>
              <th className={classes.hadding}>Gender</th>
              <td>-</td>
              <td className={classes.rowData}>{props.information.gender}</td>
            </tr>
          ) : null}
          {props.information.complexity ? (
            <tr>
              <th className={classes.hadding}>Complexity</th>
              <td>-</td>
              <td className={classes.rowData}>
                {props.information.complexity}
              </td>
            </tr>
          ) : null}
          {props.information.stdWt ? (
            <tr>
              <th className={classes.hadding}>Std Wt</th>
              <td>-</td>
              <td className={classes.rowData}>{props.information.stdWt}</td>
            </tr>
          ) : null}
          {props.information.stdUCP || props.information.stdUcp ? (
            <tr>
              <th className={classes.hadding}>Std UCp</th>
              <td>-</td>
              <td className={classes.rowData}>
                {props.information.stdUCP
                  ? props.information.stdUCP
                  : props.information.stdUcp}
              </td>
            </tr>
          ) : null}
          {props.information.indCategory ? (
            <tr>
              <th className={classes.hadding}>Ind-Category</th>
              <td>-</td>
              <td className={classes.rowData}>
                {props.information.indCategory === "Single_Teg"
                  ? "Single_Tag"
                  : props.information.indCategory}
              </td>
            </tr>
          ) : null}
          {props.information.colourWt ? (
            <tr>
              <th className={classes.hadding}>Metal Colour</th>
              <td>-</td>
              <td className={classes.rowData}>{props.information.colourWt}</td>
            </tr>
          ) : null}
          {props.information.findings ? (
            <tr>
              <th className={classes.hadding}>Findings</th>
              <td>-</td>
              <td className={classes.rowData}>{props.information.findings}</td>
            </tr>
          ) : null}
          {props.information.size ? (
            <tr>
              <th className={classes.hadding}>Size</th>
              <td>-</td>
              <td className={classes.rowData}>{props.information.size}</td>
            </tr>
          ) : null}{" "}
          {props.information.uom ? (
            <tr>
              <th className={classes.hadding}>UOM</th>
              <td>-</td>
              <td className={classes.rowData}>{props.information.uom}</td>
            </tr>
          ) : null}{" "}
          {props.information.itemQty ? (
            <tr>
              <th className={classes.hadding}>Quantity</th>
              <td>-</td>
              <td className={classes.rowData}>{props.information.itemQty}</td>
            </tr>
          ) : null}
        </tbody>
      </table>

      {/* </Paper> */}
    </>
  );
}

function SmallDataTable(props) {
  let digit = props.itemCode[6];

  if (digit) {
    if (digit == "2" || digit == "N") {
      if (props.childNodesE || props.childNodesN) {
        return (
          <Paper elevation={0}>
            <Table size="small" aria-label="a dense table">
              <TableHead>
                <TableRow>
                  <TableCell align="left">
                    {" "}
                    <Typography variant="body1">Category</Typography>
                  </TableCell>
                  <TableCell align="left">
                    {" "}
                    <Typography variant="body1">Wt</Typography>
                  </TableCell>
                  <TableCell align="left">
                    {" "}
                    <Typography variant="body1">UCP</Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow key={1}>
                  <TableCell align="left">Necklace</TableCell>
                  <TableCell align="left">{props.stdWtN}</TableCell>
                  <TableCell align="left">{props.stdUcpN}</TableCell>
                </TableRow>
                <TableRow key={2}>
                  <TableCell align="left">Ear Ring</TableCell>
                  <TableCell align="left">{props.stdWtE}</TableCell>
                  <TableCell align="left">{props.stdUcpE}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Paper>
        );
      } else {
        return null;
      }
    } else {
      return null;
    }
  }
}

function DynamicMultiSelectAndInput(props) {
  // const {lableName, options} = props
  const classes = useStyles();
  const [sizeRow, setSizeRow] = useState();

  useEffect(() => {
    if (props.optionsList)
      setImmediate(() => {
        setSizeRow(
          props.optionsList.reduce(
            (total, value) => ({ ...total, [value[1]]: false }),
            {}
          )
        );
      });
  }, [props.optionsList]);

  // if (props.optionsList)
  //         (setImmediate(() => { setSizeRow(props.optionsList.reduce((total, value) => ({ ...total, [value[1]]: false }), {})) }))

  // (setImmediate(() => { setSizeRow(props.optionsList.reduce((total, value) => ({ ...total, [value[1]]: false }), {})) }))

  // const resetSelectField = (props) => {
  //     const { lableName } = props
  //     multiselectRef.current.resetSelectedValues()
  // }

  let setData = props.optionsList.reduce(
    (total, value) => ({ ...total, [value]: false }),
    {}
  );

  console.log("data of set is the ******************", setData);

  const options = props.optionsList.map((element) => {
    return {
      valueData: element,
      lableValue: element,
    };
  });

  const enableRows = (name, value) => {
    setSizeRow(function (old) {
      return {
        ...old,
        [name]: value,
      };
    });
  };
  const onInternalSelectChange = (selectedList, selectedItem) => {
    console.log("selected item for Add", selectedItem.lableValue);
    enableRows(selectedItem.lableValue, true);
  };

  const onInternalRemoveChange = (selectedList, removedItem) => {
    console.log("selected item for remove", removedItem.lableValue);
    enableRows(removedItem.lableValue, false);
  };
  const rowHandlerChange = (event) => {
    let getData = [];
    let count = 0;
    for (let rowName in sizeRow) {
      if (sizeRow[rowName]) {
        getData[count++] = {
          size: rowName,
          quantity: document.getElementById(`${rowName}sq`).value
            ? document.getElementById(`${rowName}sq`).value
            : "",
        };
      }
    }
    console.log("get data ", getData);

    return props.onChangeHandler(getData);
  };
  const enableRow = (lableValue) => {
    for (let rowName in sizeRow) {
      if (rowName === lableValue && sizeRow[rowName]) {
        return true;
      }
    }
    return false;
  };
  return (
    <>
      <div className={classes.drop_multi}>
        <Typography align="center" color="primary">
          {" "}
          {props.lableName}{" "}
        </Typography>
        <Multiselect
          options={options}
          displayValue="lableValue"
          onSelect={onInternalSelectChange}
          onRemove={onInternalRemoveChange}
          showCheckbox={true}
          // style={cssdata}
          // selectedValues={[]}
          closeOnSelect={true}
          // selectionLimit={3}
          placeholder="Choose Options"
          disablePreSelectedValues={true}
          // ref={multiselectRef}
        />
        <table style={{ width: "100%", padding: 1, margin: 0 }}>
          <tbody>
            {options.map((row, index) => (
              <tr
                key={index}
                onChange={rowHandlerChange}
                id={row.lableValue}
                className={
                  enableRow(row.lableValue) ? classes.show : classes.hide
                }
              >
                <td>
                  <Typography size="small" color="primary">
                    {row.lableValue}&nbsp{" "}
                  </Typography>
                </td>
                <td>
                  {" "}
                  <input
                    min="0"
                    type="number"
                    id={`${row.lableValue}sq`}
                    name={`${row.lableValue}sq`}
                    className={classes.inputField}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

function BlinkingComponent(props) {
  const { color, text, fontSize } = props;
  return (
    <>
      <Blink color={color} text={text} fontSize={fontSize}>
        Testing the Blink
      </Blink>
    </>
  );
}

function AlertForL3(props) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Open alert dialog
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Use Google's location service?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Let Google help apps determine location. This means sending
            anonymous location data to Google, even when no apps are running.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={handleClose} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default DataGridReport;
export {
  MultiselectUomAndSize,
  MultiSelectDropDownForAll,
  DropDownMaterialUI,
  InputFieldMaterialUI,
  MultiSelectAndInput,
  ProductDetailsTabularL3,
  SmallDataTable,
  DynamicMultiSelectAndInput,
  BlinkingComponent,
  AlertForL3,
};
