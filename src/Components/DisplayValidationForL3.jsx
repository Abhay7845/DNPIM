import { Grid } from "@material-ui/core";
import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import HostManager from "../APIList/HostManager";
import {
  DropDownMaterialUI,
  DynamicMultiSelectAndInput,
  InputFieldMaterialUI,
  MultiSelectCoupleBand,
  MultiselectUomAndSize,
} from "./ComponentForL3";

export default function DisplayValidationComponent(props) {
  const [option, setOption] = useState([]);
  const [SizeState, setSizeState] = useState([]);
  const [CoupleGentsSize, setCoupleGentsSize] = useState([]);
  const [CoupleLadiesSize, setCoupleLadiesSize] = useState([]);
  const [tagOption, setTagOption] = useState("");
  const {
    digit,
    cond,
    itemCode,
    stoneOptionList,
    setType2option,
    allDataFromValidation,
    sizeUomQuantityResHandler,
    sizeQuantityResHandler,
    stoneQualityResHandler,
    tegQuantityResHandler,
    feedShowState,
    typeSet2ResHandler,
    quantityResHandler,
    findingsResHandler,
    findingsOption,
  } = props;

  const finger = !feedShowState.childNodeF ? "" : "Only_Finger_Ring";
  const harm = !feedShowState.childNodeH ? "" : "Only_HARAM";
  const Tikka = !feedShowState.childNodeK ? "" : "Only_TIKKA";
  const other = !feedShowState.childNodeO ? "" : "Only_OTHER";
  const bangle = !feedShowState.childNodeV ? "" : "Only_BANGLE";
  const earing = !feedShowState.childNodesE ? "" : "Only_EARRING";
  const neckwear = !feedShowState.childNodesN ? "" : "Only_NECKWEAR";

  const optionForOtherAllSet = [
    "Single_Tag",
    "Separate_Tag",
    finger,
    earing,
    neckwear,
    bangle,
    harm,
    Tikka,
    other,
  ];
  console.log("feedShowState==>", feedShowState);
  const tagsOptions = optionForOtherAllSet.filter((item) => !item === false);
  const optionForSet0 = [
    "Single_Tag",
    "Separate_Tag",
    "Only_EARRING",
    "Only_CHAIN_WITH_PENDANT",
  ];
  const optionForSet1 = [
    "Single_Tag",
    "Separate_Tag",
    "Only_EARRING",
    "Only_NECKWEAR_OR_PENDANT",
  ];
  const tagsTCategory = [
    "Single_Tag",
    "Separate_Tag",
    "Only_Mangalsutra",
    "Only_EARRING",
  ];
  useEffect(() => {
    if (digit === "0" || digit === "G") {
      setOption(optionForSet0);
    }
    if (digit === "1") {
      setOption(optionForSet1);
    }
    if (digit === "T") {
      setOption(tagsTCategory);
    }
    if (
      digit === "2" ||
      digit === "3" ||
      digit === "4" ||
      digit === "5" ||
      digit === "6" ||
      digit === "7"
    ) {
      setOption(tagsOptions);
    }
  }, []);

  const chooseOption = ["Single_Tag", "Separate_Tag"];
  useEffect(() => {
    axios.get(`${HostManager.mainHostL3}/npim/size/dropdown/${itemCode}`).then(
      (response) => {
        if (response.data.code === "1000") {
          setSizeState(response.data.value);
        } else {
          console.log("Data Not Found");
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }, [itemCode]);

  useEffect(() => {
    axios
      .get(
        `https://tanishqdigitalnpim.titan.in:8443/PNPIM/NPIML3/npim/L3/dropdown/couple/band/${itemCode}/COUPLE%20GENTS`
      )
      .then((res) => res)
      .then((result) => {
        if (result.data.Code === "1000") {
          setCoupleGentsSize(result.data.value);
        } else if (result.data.Code === "1001") {
          console.log("Size Not Available");
        }
      })
      .catch((error) => console.log("error==>", error));
  }, [itemCode]);
  useEffect(() => {
    axios
      .get(
        `https://tanishqdigitalnpim.titan.in:8443/PNPIM/NPIML3/npim/L3/dropdown/couple/band/${itemCode}/COUPLE%20LADIES`
      )
      .then((res) => res)
      .then((result) => {
        if (result.data.Code === "1000") {
          setCoupleLadiesSize(result.data.value);
        } else if (result.data.Code === "1001") {
          console.log("Size Not Available");
        }
      })
      .catch((error) => console.log("error==>", error));
  }, [itemCode]);

  if (digit === "F" || digit === "R" || digit === "V") {
    let sizeUomQuantity, sizeQuantity;
    if (digit === "V" && feedShowState.category === "BANGLE") {
      sizeUomQuantity = true;
    } else if (
      (digit === "V" ||
        digit === "C" ||
        digit === "F" ||
        digit === "Y" ||
        digit === "B") &&
      cond
    ) {
      sizeQuantity = true;
    } else if (
      (digit === "C" || digit === "F" || digit === "Y" || digit === "B") &&
      !cond
    ) {
      sizeQuantity = true;
    }
    return (
      <>
        {feedShowState.category === "BANGLE" ? (
          <Grid item xs={12} sm={12}>
            <MultiselectUomAndSize
              labelName="Size/UOM/Quantity"
              optionsList={SizeState}
              sizeUomQuantityResHandler={sizeUomQuantityResHandler}
              //put props
            />
          </Grid>
        ) : (
          ""
        )}
        {feedShowState.category === "FINGER RING" ? (
          <Grid item xs={12} sm={12}>
            <MultiSelectCoupleBand
              optionsList={SizeState}
              onChangeHandler={sizeQuantityResHandler}
              allDataFromValidation={allDataFromValidation}
              feedShowState={feedShowState}
              findingsResHandler={findingsResHandler}
              findingsOptions={findingsOption}
              //put props
            />
          </Grid>
        ) : null}
        {feedShowState.category === "COUPLE BAND" ? (
          <div className="mx-1 w-100 my-2">
            <DropDownMaterialUI
              labelName="Choose Tag"
              onChangeHandler={(e) => setTagOption(e.target.value)}
              optionsList={chooseOption}
            />
          </div>
        ) : (
          ""
        )}
        {tagOption === "Single_Tag" ? (
          <Grid item xs={12} sm={12}>
            <MultiSelectCoupleBand
              optionsList={SizeState}
              onChangeHandler={sizeQuantityResHandler}
              allDataFromValidation={allDataFromValidation}
              feedShowState={feedShowState}
              findingsResHandler={findingsResHandler}
              findingsOptions={findingsOption}
              //put props
            />
          </Grid>
        ) : null}
        {tagOption === "Separate_Tag" ? (
          <Grid item xs={12} sm={12}>
            <MultiSelectCoupleBand
              labelName="FOR GENTS"
              optionsList={CoupleGentsSize}
              onChangeHandler={sizeQuantityResHandler}
              allDataFromValidation={allDataFromValidation}
              feedShowState={feedShowState}
              findingsResHandler={findingsResHandler}
              findingsOptions={findingsOption}
              //put props
            />
            <br />
            <MultiSelectCoupleBand
              labelName="FOR LADIES"
              optionsList={CoupleLadiesSize}
              onChangeHandler={sizeQuantityResHandler}
              allDataFromValidation={allDataFromValidation}
              feedShowState={feedShowState}
              findingsResHandler={findingsResHandler}
              findingsOptions={findingsOption}
              //put props
            />
          </Grid>
        ) : null}
        {cond ? (
          <Grid item xs={12} sm={12} className="my-3">
            <DropDownMaterialUI
              labelName="Stone Quality"
              onChangeHandler={stoneQualityResHandler}
              optionsList={stoneOptionList}
            />
          </Grid>
        ) : null}
      </>
    );
  } else if (
    digit === "0" ||
    digit === "1" ||
    digit === "2" ||
    digit === "3" ||
    digit === "4" ||
    digit === "5" ||
    digit === "6" ||
    digit === "7" ||
    digit === "G" ||
    digit === "T"
  ) {
    let TypeSet2, tegSelect, setSelect, findings;
    if (
      digit === "1" ||
      digit === "2" ||
      digit === "3" ||
      digit === "4" ||
      digit === "5" ||
      digit === "6" ||
      digit === "7" ||
      digit === "G" ||
      digit === "T"
    )
      if ((digit === "N" || digit === "E" || digit === "2") && !cond) {
        TypeSet2 = true;
      }
    if (
      digit === "0" ||
      digit === "1" ||
      digit === "2" ||
      digit === "3" ||
      digit === "4" ||
      digit === "5" ||
      digit === "6" ||
      digit === "7" ||
      digit === "G" ||
      digit === "T"
    ) {
      tegSelect = true;
      setSelect = true;
      // Quantity = true;
    }
    return (
      <>
        {tegSelect ? (
          <Grid item xs={12} sm={12}>
            <DynamicMultiSelectAndInput
              optionsList={option}
              feedShowState={feedShowState}
              onChangeHandler={tegQuantityResHandler}
              sizeUomQuantityResHandler={sizeUomQuantityResHandler}
              typeSet2ResHandler={typeSet2ResHandler}
            />
          </Grid>
        ) : null}
        {TypeSet2 ? (
          <Grid item xs={12} sm={12}>
            <DropDownMaterialUI
              labelName="Type Set-2"
              onChangeHandler={typeSet2ResHandler}
              optionsList={setType2option}
              // valueData=""
            />
          </Grid>
        ) : null}
        {cond ? (
          <Grid item xs={12} sm={12}>
            <DropDownMaterialUI
              labelName="Stone Quality"
              onChangeHandler={stoneQualityResHandler}
              optionsList={stoneOptionList}
              // valueData=""
            />
          </Grid>
        ) : null}
      </>
    );
  } else {
    return (
      <>
        <Grid item xs={12} sm={12}>
          <InputFieldMaterialUI
            labelName="Quantity"
            typeName="number"
            onChangeHandler={quantityResHandler}
            allDataFromValidation={allDataFromValidation}
          />
        </Grid>
        {feedShowState.findings ? (
          <Grid item xs={12} sm={12}>
            <DropDownMaterialUI
              labelName="Findings"
              onChangeHandler={findingsResHandler}
              optionsList={findingsOption}
            />
          </Grid>
        ) : null}
        {cond ? (
          <Grid item xs={12} sm={12}>
            <DropDownMaterialUI
              labelName="Stone Quality"
              onChangeHandler={stoneQualityResHandler}
              optionsList={stoneOptionList}
              // valueData=""
            />
          </Grid>
        ) : null}
      </>
    );
  }
}
