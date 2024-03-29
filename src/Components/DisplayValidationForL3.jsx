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
  const [ChildNodeN, setChildNodeN] = useState([]);
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

  const finger = !feedShowState.childNodeF ? "" : "Only_FINGER_RING";
  const harm = !feedShowState.childNodeH ? "" : "Only_HARAM";
  const Tikka = !feedShowState.childNodeK ? "" : "Only_TIKKA";
  const other = !feedShowState.childNodeO ? "" : "Only_OTHER";
  const bangle = !feedShowState.childNodeV ? "" : "Only_BANGLE";
  const earing = !feedShowState.childNodesE ? "" : "Only_EARRING";
  const neckwear = !feedShowState.childNodesN ? "" : "Only_NECKWEAR";

  const optionForOtherAllSet = [
    "Single_Tag",
    "Separate_Tag",
    earing,
    neckwear,
    harm,
    Tikka,
    other,
    finger,
    bangle,
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
    "Only_EARRING",
    "Only_MANGALSUTRA",
  ];
  useEffect(() => {
    if (digit === "0") {
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
  const childNodeN = feedShowState.childNodesN;
  useEffect(() => {
    axios
      .get(`${HostManager.mainHostL3}/npim/size/dropdown/${itemCode}`)
      .then((res) => res)
      .then((response) => {
        if (response.data.code === "1000") {
          setSizeState(response.data.value);
        } else {
          console.log("Data Not Found");
        }
      })
      .catch((error) => console.log("error==>", error));
  }, [itemCode]);

  useEffect(() => {
    axios
      .get(`${HostManager.mainHostL3}/npim/size/dropdown/${childNodeN}`)
      .then((res) => res)
      .then((response) => {
        if (response.data.code === "1000") {
          setChildNodeN(response.data.value);
        } else {
          console.log("Data Not Found");
        }
      })
      .catch((error) => console.log("error==>", error));
  }, [childNodeN]);

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

  if (
    digit === "F" ||
    digit === "R" ||
    digit === "V" ||
    digit === "X" ||
    digit === "Y" ||
    digit === "L"
  ) {
    let sizeUomQuantity, sizeQuantity;
    if (digit === "V") {
      sizeUomQuantity = true;
    } else if (
      (digit === "V" || digit === "C" || digit === "F" || digit === "B") &&
      cond
    ) {
      sizeQuantity = true;
    } else if ((digit === "C" || digit === "F" || digit === "B") && !cond) {
      sizeQuantity = true;
    }
    return (
      <>
        {digit === "V" ? (
          <Grid item xs={12} sm={12}>
            <MultiselectUomAndSize
              labelName="Size/UOM/Quantity"
              optionsList={SizeState}
              sizeUomQuantityResHandler={sizeUomQuantityResHandler}
            />
          </Grid>
        ) : (
          ""
        )}

        {digit === "Y" ||
        feedShowState.category
          .toUpperCase()
          .replace(/\s{2,}/g, " ")
          .trim() === "FINGER RING" ||
        feedShowState.category
          .toUpperCase()
          .replace(/\s{2,}/g, " ")
          .trim() === "TOE RING" ||
        feedShowState.category
          .toUpperCase()
          .replace(/\s{2,}/g, " ")
          .trim() === "ANKLETS" ? (
          <Grid item xs={12} sm={12}>
            <MultiSelectCoupleBand
              optionsList={SizeState}
              onChangeHandler={sizeQuantityResHandler}
              allDataFromValidation={allDataFromValidation}
              feedShowState={feedShowState}
              findingsResHandler={findingsResHandler}
              findingsOptions={findingsOption}
            />
          </Grid>
        ) : null}

        {feedShowState.category === "OTHERS" ? (
          <InputFieldMaterialUI
            labelName="Quantity"
            typeName="number"
            onChangeHandler={quantityResHandler}
            allDataFromValidation={allDataFromValidation}
          />
        ) : (
          ""
        )}

        {feedShowState.category
          .toUpperCase()
          .replace(/\s{2,}/g, " ")
          .trim() === "COUPLE BAND" ? (
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
            />
            <MultiSelectCoupleBand
              labelName="FOR LADIES"
              optionsList={CoupleLadiesSize}
              onChangeHandler={sizeQuantityResHandler}
              allDataFromValidation={allDataFromValidation}
              feedShowState={feedShowState}
              findingsResHandler={findingsResHandler}
              findingsOptions={findingsOption}
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
        ) : (
          ""
        )}
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
    digit === "T"
  ) {
    let TypeSet2, tegSelect, setSelect, findings;
    if (
      digit === "1" ||
      digit === "3" ||
      digit === "4" ||
      digit === "5" ||
      digit === "6" ||
      digit === "7" ||
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
      digit === "T"
    ) {
      tegSelect = true;
      setSelect = true;
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
              FingerRingSize={SizeState}
              ChildNodeNSize={ChildNodeN}
            />
          </Grid>
        ) : null}

        {TypeSet2 ? (
          <Grid item xs={12} sm={12}>
            <DropDownMaterialUI
              labelName="Type Set-2"
              onChangeHandler={typeSet2ResHandler}
              optionsList={setType2option}
            />
          </Grid>
        ) : null}
        {cond ? (
          <Grid item xs={12} sm={12}>
            <DropDownMaterialUI
              labelName="Stone Quality"
              onChangeHandler={stoneQualityResHandler}
              optionsList={stoneOptionList}
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
            />
          </Grid>
        ) : null}
      </>
    );
  }
}
