import {
  FormControl,
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
  InputLabel,
} from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";
import HostManager from "../HostManager/HostManager";
import OTPInput from "otp-input-react";
import React, { useEffect, useState } from "react";
import { Multiselect } from "multiselect-react-dropdown";
import SingleImgCreator from "./SingleImgCreator";
import Blink from "react-blink-text";
import { useParams } from "react-router-dom";
import "../Style/CssStyle/LowerHeader.css";
import { useStyles } from "../Style/ComponentForL3";
import axios from "axios";

let specialLabelValue;
function DataGridReport(props) {
  const classes = useStyles();
  const { col, rows, caller, reportLable, rowDataHandler } = props;
  const column = col.map((element) => {
    let fieldRes;

    if (element === "Action") {
      fieldRes = {
        field: "Action",
        headerName: "Action",
        sortable: false,
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
                    columns={column}
                    pagination
                    pageSize={5}
                    rowCount={100}
                    paginationMode="server"

                /> */}
        <DataGrid
          rows={rows}
          columns={column}
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
  const { optionsList, sizeUomQuantityResHandler } = props;
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

  const options = optionsList.map((element, index) => {
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
    return sizeUomQuantityResHandler(getData);
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
          closeOnSelect={true}
          placeholder="Choose Size"
          disablePreSelectedValues={true}
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
                  <input
                    type="text"
                    maxLength="1"
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
                  <input
                    type="text"
                    maxLength="1"
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
                  <input
                    type="text"
                    maxLength="1"
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
                  <input
                    type="text"
                    maxLength="1"
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
                  <input
                    type="text"
                    maxLength="1"
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
          Label
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
  const { labelName, onChangeHandler, optionsList } = props;
  const generateOptions = (dropList) => {
    let optionItems = dropList.map((option) => (
      <MenuItem key={option} value={option}>
        {option}
      </MenuItem>
    ));
    return optionItems;
  };

  return (
    <>
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel>{labelName}</InputLabel>
        <Select label={labelName} onChange={onChangeHandler}>
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {generateOptions(optionsList)}
        </Select>
      </FormControl>
    </>
  );
}

function InputFieldMaterialUI(props) {
  const classes = useStyles();
  const { onChangeHandler, allDataFromValidation } = props;
  const [showHelper, setHelper] = useState(0);

  useEffect(() => {
    if (allDataFromValidation.quantityRes !== "") {
      if (
        allDataFromValidation.quantityRes.length > 1 ||
        parseInt(allDataFromValidation.quantityRes) === 0 ||
        parseInt(allDataFromValidation.quantityRes) > 10
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
        <b>Indent Quantity</b>
        <OTPInput
          inputClassName="otp"
          value={allDataFromValidation?.quantityRes}
          onChange={(value) => {
            onChangeHandler(value);
          }}
          autoFocus
          OTPLength={1}
          otpType="number"
        />
        {
          <p className="text-danger">
            {showHelper == 0 ? "" : "Please enter a valid quantity"}
          </p>
        }
      </div>
    </>
  );
}

function MultiSelectCoupleBand(props) {
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
    Only_BANGLE: false,
    Only_NECKWEAR_OR_PENDANT: false,
  });
  const {
    feedShowState,
    findingsResHandler,
    findingsOptions,
    onChangeHandler,
    optionsList,
    labelName,
  } = props;
  console.log("props==>", props);
  const options = optionsList.map((element) => {
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
        case "1":
          return {
            ...old,
            [name]: value,
          };
        case "2":
          return {
            ...old,
            [name]: value,
          };
        case "3":
          return {
            ...old,
            [name]: value,
          };
        case "4":
          return {
            ...old,
            [name]: value,
          };
        case "5":
          return {
            ...old,
            [name]: value,
          };
        case "6":
          return {
            ...old,
            [name]: value,
          };
        case "7":
          return {
            ...old,
            [name]: value,
          };
        case "8":
          return {
            ...old,
            [name]: value,
          };
        case "9":
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
        case "Only_BANGLE":
          return {
            ...old,
            [name]: value,
          };
      }
    });
  };
  const onInternalSelectChange = (selectedList, selectedItem) => {
    console.log("selected==>", selectedItem.lableValue);
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
    console.log("get data==>", getData);
    return onChangeHandler(getData);
  };

  const enableRow = (lableValue) => {
    for (let rowName in sizeRow) {
      if (rowName === lableValue && sizeRow[rowName]) {
        return true;
      }
    }
    return false;
  };
  const optionsOnlyE = ["Only_EARRING"];
  const optionE = optionsOnlyE.map((element) => {
    return {
      valueData: element,
      lableValue: element,
    };
  });

  return (
    <>
      <div className={classes.drop_multi}>
        <b className="text-primary">{labelName}</b>
        <Multiselect
          options={options}
          displayValue="lableValue"
          onSelect={onInternalSelectChange}
          onRemove={onInternalRemoveChange}
          showCheckbox={true}
          closeOnSelect={true}
          placeholder="Choose Size"
          disablePreSelectedValues={true}
        />
        <table className="w-100">
          <tbody className="d-flex">
            {options.map((row, index) => (
              <tr
                key={index}
                onChange={rowHandlerChange}
                id={row.lableValue}
                className={
                  enableRow(row.lableValue) ? classes.show : classes.hide
                }
              >
                <input
                  type="text"
                  maxLength="1"
                  id={`${row.lableValue}sq`}
                  name={`${row.lableValue}sq`}
                  className={classes.inputField}
                  placeholder={row.lableValue}
                />
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <table style={{ width: "100%", padding: 1, margin: 0 }}>
        <tbody>
          {optionE.map((row, index) => (
            <tr
              key={index}
              onChange={rowHandlerChange}
              id={row.lableValue}
              className={
                enableRow(row.lableValue) ? classes.showDropdown : classes.hide
              }
            >
              {feedShowState.findings ? (
                <DropDownMaterialUI
                  labelName="Findings"
                  onChangeHandler={findingsResHandler}
                  optionsList={findingsOptions}
                  // valueData=""
                />
              ) : (
                ""
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

function ProductDetailsTabularL3(props) {
  const classes = useStyles();
  console.log("props123==>", props.information);
  return (
    <>
      <Typography className={classes.hadingCss} align="center">
        <b>Product Specification</b>
      </Typography>
      <table className="w-100 mx-2">
        <tbody>
          {props.information.collection ? (
            <tr>
              <th>COLLECTION</th>
              <td>-</td>
              <td>{props.information.collection}</td>
            </tr>
          ) : null}
          {props.information.consumerBase ? (
            <tr>
              <th>NEED STATE</th>
              <td>-</td>
              <td>{props.information.consumerBase}</td>
            </tr>
          ) : null}
          {props.information.itGroup ? (
            <tr>
              <th>GROUP</th>
              <td>-</td>
              <td>{props.information.itGroup}</td>
            </tr>
          ) : null}
          {props.information.category ? (
            <tr>
              <th>CATEGORY</th>
              <td>-</td>
              <td>{props.information.category}</td>
            </tr>
          ) : null}
          {props.information.gender ? (
            <tr>
              <th>GENDER</th>
              <td>-</td>
              <td>{props.information.gender}</td>
            </tr>
          ) : null}
          {props.information.complexity ? (
            <tr>
              <th>COMPLEXITY</th>
              <td>-</td>
              <td>{props.information.complexity}</td>
            </tr>
          ) : null}
          {props.information.stdWt ? (
            <tr>
              <th>Std Wt</th>
              <td>-</td>
              <td>{props.information.stdWt}</td>
            </tr>
          ) : null}
          {props.information.stdUCP || props.information.stdUcp ? (
            <tr>
              <th>Std UCp</th>
              <td>-</td>
              <td>
                {props.information.stdUCP
                  ? props.information.stdUCP
                  : props.information.stdUcp}
              </td>
            </tr>
          ) : null}
          {props.information.indCategory ? (
            <tr>
              <th>IND-CATEGORY</th>
              <td>-</td>
              <td>{props.information.indCategory}</td>
            </tr>
          ) : null}
          {props.information.colourWt ? (
            <tr>
              <th>METAL COLOR</th>
              <td>-</td>
              <td>{props.information.colourWt}</td>
            </tr>
          ) : null}
          {props.information.findings ? (
            <tr>
              <th>FINDINGS</th>
              <td>-</td>
              <td>{props.information.findings}</td>
            </tr>
          ) : null}
          {props.information.size ? (
            <tr>
              <th>SIZE</th>
              <td>-</td>
              <td>{props.information.size}</td>
            </tr>
          ) : null}
          {props.information.uom ? (
            <tr>
              <th>UOM</th>
              <td>-</td>
              <td>{props.information.uom}</td>
            </tr>
          ) : null}
          {props.information.itemQty ? (
            <tr>
              <th>QUANTITY</th>
              <td>-</td>
              <td>{props.information.itemQty}</td>
            </tr>
          ) : null}
        </tbody>
      </table>
    </>
  );
}

function SmallDataTable(props) {
  let digit = props.itemCode[6];
  const { storeCode } = useParams();
  const [tableData, setTableData] = useState({});
  const productDetails = {
    storeCode: storeCode,
    collection: "ALL",
    consumerBase: "ALL",
    group: "ALL",
    category: "ALL",
    itemCode: props.itemCode,
  };
  console.log("tableData==>", tableData);
  useEffect(() => {
    axios
      .post(`${HostManager.mainHost}/npim/get/product/details`, productDetails)
      .then((res) => res)
      .then((result) => {
        if (result.data.code === "1000") {
          setTableData(result.data.value);
        }
        if (result.data.code === "1001") {
          console.log("Data Not Available");
        }
      });
  }, [props.itemCode]);

  if (digit) {
    if (
      digit == "0" ||
      digit == "1" ||
      digit == "2" ||
      digit == "3" ||
      digit == "4" ||
      digit == "5" ||
      digit == "6" ||
      digit == "7" ||
      digit == "T" ||
      digit == "N"
    ) {
      if (props.childNodesE || props.childNodesN) {
        return (
          <>
            <br />
            <table
              className="table table-bordered"
              style={{ marginLeft: "0px" }}
            >
              <thead>
                <tr>
                  <th scope="col">CATEGORY</th>
                  <th scope="col">StdWt</th>
                  <th scope="col">UCP</th>
                </tr>
              </thead>
              <tbody>
                {tableData.childNodeF === "" ? (
                  ""
                ) : (
                  <tr>
                    <td>FINGER RING</td>
                    <td>{tableData.stdWtF}</td>
                    <td>{tableData.stdUcpF}</td>
                  </tr>
                )}
                {tableData.childNodesE === "" ? (
                  ""
                ) : (
                  <tr>
                    <td>EAR RING</td>
                    <td>{tableData.stdWtE}</td>
                    <td>{tableData.stdUcpE}</td>
                  </tr>
                )}
                {tableData.childNodesN === "" ? (
                  ""
                ) : (
                  <tr>
                    <td>NECKWEAR</td>
                    <td>{tableData.stdWtN}</td>
                    <td>{tableData.stdUcpN}</td>
                  </tr>
                )}
                {tableData.childNodeH === "" ? (
                  ""
                ) : (
                  <tr>
                    <td>HARAM</td>
                    <td>{tableData.stdWtH}</td>
                    <td>{tableData.stdUcpH}</td>
                  </tr>
                )}
                {tableData.childNodeK === "" ? (
                  ""
                ) : (
                  <tr>
                    <td>TIKKA</td>
                    <td>{tableData.stdWtK}</td>
                    <td>{tableData.stdUcpK}</td>
                  </tr>
                )}
                {tableData.childNodeV === "" ? (
                  ""
                ) : (
                  <tr>
                    <td>BANGLE</td>
                    <td>{tableData.stdWtV}</td>
                    <td>{tableData.stdUcpV}</td>
                  </tr>
                )}
                {tableData.childNodeO === "" ? (
                  ""
                ) : (
                  <tr>
                    <td>OTHER</td>
                    <td>{tableData.stdWtO}</td>
                    <td>{tableData.stdUcpO}</td>
                  </tr>
                )}
              </tbody>
            </table>
          </>
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
  const classes = useStyles();
  const [sizeRow, setSizeRow] = useState();
  const [ChildNodeV, setChildNodeV] = useState([]);
  const {
    findingsResHandler,
    feedShowState,
    onChangeHandler,
    sizeUomQuantityResHandler,
    labelName,
    typeSet2ResHandler,
    optionsList,
    FingerRingSize,
    ChildNodeNSize,
  } = props;
  useEffect(() => {
    if (optionsList)
      setImmediate(() => {
        setSizeRow(
          optionsList.reduce(
            (total, value) => ({ ...total, [value[1]]: false }),
            {}
          )
        );
      });
  }, [optionsList]);

  const findings = feedShowState.findings;
  const findingsOptions = !findings ? "" : findings.split(",");
  const options = optionsList.map((element) => {
    return {
      valueData: element,
      lableValue: element,
    };
  });
  const fingerRingSize = FingerRingSize.map((element) => {
    return {
      valueData: element,
      lableValue: element,
    };
  });
  const ChildNodeN = ChildNodeNSize.map((element) => {
    return {
      valueData: element,
      lableValue: element,
    };
  });

  const optionsOnlyE = ["Only_EARRING"];
  const optionE = optionsOnlyE.map((element) => {
    return {
      valueData: element,
      lableValue: element,
    };
  });
  const optionsOnlyF = ["Only_FINGER_RING"];
  const optionF = optionsOnlyF.map((element) => {
    return {
      valueData: element,
      lableValue: element,
    };
  });
  const optionsOnlyM = ["Only_MANGALSUTRA"];
  const optionM = optionsOnlyM.map((element) => {
    return {
      valueData: element,
      lableValue: element,
    };
  });
  const optionsOnlyV = ["Only_BANGLE"];
  const optionV = optionsOnlyV.map((element) => {
    return {
      valueData: element,
      lableValue: element,
    };
  });
  const optionsOnlyN = ["Only_NECKWEAR"];
  const optionN = optionsOnlyN.map((element) => {
    return {
      valueData: element,
      lableValue: element,
    };
  });
  const setType2option = ["Chain", "Dori"];

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
          quantity: document.getElementById(`${rowName}sq`).value,
        };
      }
    }
    console.log("getData==>", getData);
    return onChangeHandler(getData);
  };
  const enableRow = (lableValue) => {
    for (let rowName in sizeRow) {
      if (rowName === lableValue && sizeRow[rowName]) {
        return true;
      }
    }
    return false;
  };

  const childNodeV = feedShowState.childNodeV;

  useEffect(() => {
    axios
      .get(`${HostManager.mainHostL3}/npim/size/dropdown/${childNodeV}`)
      .then((res) => res)
      .then((result) => {
        if (result.data.code === "1000") {
          setChildNodeV(result.data.value);
        }
        if (result.data.code === "1001") {
          console.log("Size Not Available");
        }
      })
      .catch((error) => console.log("error==>", error));
  }, [childNodeV]);

  return (
    <>
      <div className={classes.drop_multi}>
        <Typography align="center" color="primary">
          {labelName}
        </Typography>
        <Multiselect
          options={options}
          displayValue="lableValue"
          onSelect={onInternalSelectChange}
          onRemove={onInternalRemoveChange}
          showCheckbox={true}
          closeOnSelect={true}
          placeholder="Choose Tag"
          disablePreSelectedValues={true}
        />
        <table className="w-100">
          <tbody className="d-flex">
            {options.map((row, index) => (
              <tr
                key={index}
                onChange={rowHandlerChange}
                id={row.lableValue}
                className={
                  enableRow(row.lableValue) ? classes.show : classes.hide
                }
              >
                <input
                  type="text"
                  maxlength="1"
                  id={`${row.lableValue}sq`}
                  name={`${row.lableValue}sq`}
                  className={
                    row.lableValue === "Only_BANGLE" ||
                    row.lableValue === "Only_FINGER_RING" ||
                    row.lableValue === "Only_MANGALSUTRA"
                      ? classes.hide
                      : classes.inputField
                  }
                  placeholder={row.lableValue}
                />
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <table style={{ width: "100%", margin: 0 }}>
        <tbody>
          {optionE.map((row, index) => (
            <tr
              key={index}
              onChange={rowHandlerChange}
              id={row.lableValue}
              className={
                enableRow(row.lableValue) ? classes.showDropdown : classes.hide
              }
            >
              {feedShowState.findings ? (
                <DropDownMaterialUI
                  labelName="Findings"
                  onChangeHandler={findingsResHandler}
                  optionsList={findingsOptions}
                />
              ) : (
                ""
              )}
            </tr>
          ))}
        </tbody>
      </table>
      <table style={{ width: "100%", margin: 0 }}>
        <tbody>
          {optionF.map((row, index) => (
            <tr
              key={index}
              onChange={rowHandlerChange}
              id={row.lableValue}
              className={
                enableRow(row.lableValue) ? classes.showDropdown : classes.hide
              }
            >
              <Multiselect
                options={fingerRingSize}
                displayValue="lableValue"
                onSelect={onInternalSelectChange}
                onRemove={onInternalRemoveChange}
                showCheckbox={true}
                closeOnSelect={true}
                placeholder="Choose Size"
                disablePreSelectedValues={true}
              />
              <table className="w-100">
                <tbody className="d-flex">
                  {fingerRingSize.map((row, index) => (
                    <tr
                      key={index}
                      onChange={rowHandlerChange}
                      id={row.lableValue}
                      className={
                        enableRow(row.lableValue) ? classes.show : classes.hide
                      }
                    >
                      <input
                        type="text"
                        maxlength="1"
                        id={`${row.lableValue}sq`}
                        name={`${row.lableValue}sq`}
                        className={classes.inputField}
                        placeholder={row.lableValue}
                      />
                    </tr>
                  ))}
                </tbody>
              </table>
            </tr>
          ))}
        </tbody>
      </table>
      <table style={{ width: "100%", margin: 0 }}>
        <tbody>
          {optionM.map((row, index) => (
            <tr
              key={index}
              onChange={rowHandlerChange}
              id={row.lableValue}
              className={
                enableRow(row.lableValue) ? classes.showDropdown : classes.hide
              }
            >
              <Multiselect
                options={ChildNodeN}
                displayValue="lableValue"
                onSelect={onInternalSelectChange}
                onRemove={onInternalRemoveChange}
                showCheckbox={true}
                closeOnSelect={true}
                placeholder="Choose Size"
                disablePreSelectedValues={true}
              />
              <table className="w-100">
                <tbody className="d-flex">
                  {ChildNodeN.map((row, index) => (
                    <tr
                      key={index}
                      onChange={rowHandlerChange}
                      id={row.lableValue}
                      className={
                        enableRow(row.lableValue) ? classes.show : classes.hide
                      }
                    >
                      <input
                        type="text"
                        maxlength="1"
                        id={`${row.lableValue}sq`}
                        name={`${row.lableValue}sq`}
                        className={classes.inputField}
                        placeholder={row.lableValue}
                      />
                    </tr>
                  ))}
                </tbody>
              </table>
            </tr>
          ))}
        </tbody>
      </table>
      <table style={{ width: "100%", margin: 0 }}>
        <tbody>
          {optionV.map((row, index) => (
            <tr
              key={index}
              onChange={rowHandlerChange}
              id={row.lableValue}
              className={
                enableRow(row.lableValue) ? classes.showDropdown : classes.hide
              }
            >
              <MultiselectUomAndSize
                optionsList={ChildNodeV}
                sizeUomQuantityResHandler={sizeUomQuantityResHandler}
              />
            </tr>
          ))}
        </tbody>
      </table>
      <table className="w-100">
        <tbody>
          {optionN.map((row, index) => (
            <tr
              key={index}
              onChange={rowHandlerChange}
              id={row.lableValue}
              className={
                enableRow(row.lableValue) ? classes.showDropdown : classes.hide
              }
            >
              <DropDownMaterialUI
                labelName="Type Set-2"
                onChangeHandler={typeSet2ResHandler}
                optionsList={setType2option}
              />
            </tr>
          ))}
        </tbody>
      </table>
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
  // MultiSelectAndInput,
  MultiSelectCoupleBand,
  ProductDetailsTabularL3,
  SmallDataTable,
  DynamicMultiSelectAndInput,
  BlinkingComponent,
  AlertForL3,
};
