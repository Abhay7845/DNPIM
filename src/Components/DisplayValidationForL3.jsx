import { Grid } from "@material-ui/core";
import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import HostManager from "../APIList/HostManager";
import {
  DropDownMaterialUI,
  DynamicMultiSelectAndInput,
  InputFieldMaterialUI,
  MultiSelectAndInput,
  MultiselectUomAndSize,
} from "./ComponentForL3";

export default function DisplayValidationComponent(props) {
  const [option, setOption] = useState([]);
  const {
    digit,
    cond,
    itemCode,
    stoneOptionList,
    setType2option,
    tegOfItemOption,
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
    tegSelectionResHandler,
    setSelectResHandler,
    setSelectOptions,
  } = props;

  const optionForSet4 = [
    "Single_Tag",
    "Separate_Tag",
    "Only_EAR_RING",
    "Only_NECKWEAR",
    "Only_BANGLE",
    "Only_TIKKA",
    "Only_HARAM",
  ];
  const optionForSet5 = [
    "Single_Tag",
    "Separate_Tag",
    "Only_EAR_RING",
    "Only_NECKWEAR",
    "Only_HARAM",
    "Only_BANGLE",
    "Only_TIKKA",
  ];
  const optionForSet6 = [
    "Single_Tag",
    "Separate_Tag",
    "Only_EAR_RING",
    "Only_NECKWEAR",
    "Only_HARAM",
    "Only_BANGLE",
    "Only_TIKKA",
    "Only_Finger_Ring",
  ];
  const optionForSet7 = [
    "Single_Tag",
    "Separate_Tag",
    "Only_EAR_RING",
    "Only_NECKWEAR",
    "Only_HARAM",
    "Only_BANGLE",
    "Only_TIKKA",
    "Only_Finger_Ring",
  ];
  const optionForSetT = [
    "Single_Tag",
    "Separate_Tag",
    "Only_Mangalsutra",
    "Only_EAR_RING",
  ];
  const coupleBand = ["Single_Tag", "Separate_Tag"];

  useEffect(() => {
    // if (digit === "0") {
    //   setOption(optionForSet0);
    // }
    // if (digit === "1") {
    //   setOption(optionForSet1);
    // }
    // if (digit === "2") {
    //   setOption(optionForSet2);
    // }
    // if (digit === "3") {
    //   setOption(optionForSet3);
    // }
    if (digit === "4") {
      setOption(optionForSet4);
    }
    if (digit === "5") {
      setOption(optionForSet5);
    }
    if (digit === "6") {
      setOption(optionForSet6);
    }
    if (digit === "7") {
      setOption(optionForSet7);
    }
    if (digit === "T") {
      setOption(optionForSetT);
    }
    if (digit === "F") {
      setOption(coupleBand);
    }
  }, []);

  const [SizeState, setSizeState] = useState([]);
  console.log("tegOfItemOption==>", tegOfItemOption);
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
  const showFindings = allDataFromValidation?.tegQuantityRes.filter(
    (item) => item.size === "Only_EAR_RING"
  );

  if (
    digit === "B" ||
    digit === "C" ||
    digit === "F" ||
    digit === "R" ||
    digit === "V" ||
    digit === "W" ||
    digit === "Y"
  ) {
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
        {sizeUomQuantity && SizeState[0] ? (
          <Grid item xs={12} sm={12}>
            <MultiselectUomAndSize
              labelName="Size/UOM/Quantity"
              optionsList={SizeState}
              sizeUomQuantityResHandler={sizeUomQuantityResHandler}
              //put props
            />
          </Grid>
        ) : null}
        {sizeQuantity ? (
          <Grid item xs={12} sm={12}>
            <MultiSelectAndInput
              labelName="Size/Quantity"
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
  } else if (
    digit === "E" ||
    digit === "N" ||
    digit === "P" ||
    digit === "2" ||
    digit === "3" ||
    digit === "0" ||
    digit === "1" ||
    digit === "3" ||
    digit === "4" ||
    digit === "5" ||
    digit === "6" ||
    digit === "7"
  ) {
    let tegQuantity, TypeSet2, Quantity, tegSelect, setSelect, findings;
    if (
      digit === "0" ||
      digit === "1" ||
      digit === "2" ||
      digit === "P" ||
      digit === "E" ||
      digit === "N"
    ) {
      //CHECK THE CONDITION AND CHILD CODE ABD ADD THE DATA IN DROPDOWN
      tegOfItemOption ? (tegQuantity = true) : (Quantity = true);
    }
    if ((digit === "N" || digit === "E" || digit === "2") && !cond) {
      TypeSet2 = true;
    }
    if (
      digit === "3" ||
      digit === "4" ||
      digit === "5" ||
      digit === "6" ||
      digit === "7"
    ) {
      tegSelect = true;
      setSelect = true;
      Quantity = false;
      // stoneQuality = false;
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
            />
          </Grid>
        ) : null}
        {setSelect && setSelectOptions[0] ? (
          <Grid item xs={12} sm={12}>
            <DynamicMultiSelectAndInput
              labelName="Set Select"
              optionsList={setSelectOptions}
              onChangeHandler={setSelectResHandler}
              sizeUomQuantityResHandler={sizeUomQuantityResHandler}
              //put props
            />
          </Grid>
        ) : null}
        {Quantity ? (
          <Grid item xs={12} sm={12}>
            <InputFieldMaterialUI
              lableName="Quantity"
              typeName="number"
              onChangeHandler={quantityResHandler}
              allDataFromValidation={allDataFromValidation}
              // valueName={ }
            />
          </Grid>
        ) : null}
        {tegQuantity ? (
          <Grid item xs={12} sm={12}>
            <MultiSelectAndInput
              lableName="Tags/Quantity"
              optionsList={tegOfItemOption}
              onChangeHandler={tegQuantityResHandler}
              feedShowState={feedShowState}
              findingsResHandler={findingsResHandler}
              findingsOptions={findingsOption}
              //put props
            />
          </Grid>
        ) : null}

        {TypeSet2 ? (
          <Grid item xs={12} sm={12}>
            <DropDownMaterialUI
              lableName="Type Set-2"
              onChangeHandler={typeSet2ResHandler}
              optionsList={setType2option}
              // valueData=""
            />
          </Grid>
        ) : null}
        {cond ? (
          <Grid item xs={12} sm={12}>
            <DropDownMaterialUI
              lableName="Stone Quality"
              onChangeHandler={stoneQualityResHandler}
              optionsList={stoneOptionList}
              // valueData=""
            />
          </Grid>
        ) : null}
        {/* {findings?(
          <>
            <Grid item xs={12} sm={12}>
              <DropDownMaterialUI
                lableName="Findings"
                onChangeHandler={findingsResHandler}
                optionsList={findingsOption}
                // valueData=""
              />
            </Grid>
          </>
        ):null} */}
      </>
    );
  } else {
    let findings, stoneQuality, Quantity;

    if (digit === "S" || digit === "D" || digit === "J") {
      findings = true;
    }
    if (cond) {
      stoneQuality = true;
    }

    Quantity = true;
    return (
      <>
        {Quantity ? (
          <Grid item xs={12} sm={12}>
            <InputFieldMaterialUI
              lableName="Quantity"
              typeName="number"
              onChangeHandler={quantityResHandler}
              allDataFromValidation={allDataFromValidation}
              // valueName={ }
            />
          </Grid>
        ) : null}
        {findings ? (
          <Grid item xs={12} sm={12}>
            <DropDownMaterialUI
              lableName="Findings"
              onChangeHandler={findingsResHandler}
              optionsList={findingsOption}
              // valueData=""
            />
          </Grid>
        ) : null}
        {cond ? (
          <Grid item xs={12} sm={12}>
            <DropDownMaterialUI
              lableName="Stone Quality"
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
