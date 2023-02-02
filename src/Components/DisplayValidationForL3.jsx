import { Grid } from "@material-ui/core";
import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import HostManager from "../HostManager/HostManager";
import {
  DropDownMaterialUI,
  DynamicMultiSelectAndInput,
  InputFieldMaterialUI,
  MultiSelectAndInput,
  MultiselectUomAndSize,
} from "./ComponentForL3";

export default function DisplayValidationComponent(props) {
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
  const [SizeState, setSizeState] = useState([]);
  console.log("allDataFromValidationProps==>", props);
  useEffect(async () => {
    await axios
      .get(`${HostManager.mainHostL3}/npim/size/dropdown/${itemCode}`)
      .then(
        (response) => {
          if (response.data.code === "1001") {
            setSizeState([]);
            // alert(response.data.value);
          } else {
            console.log({ Size: response.data.value });
            setSizeState(response.data.value);
          }
          console.log("responce of size ", response.data.value);
        },
        (error) => {
          console.log(error);
          alert(error);
          setSizeState([]);
        }
      );
  }, [itemCode]);
  const showfindings = allDataFromValidation?.tegQuantityRes.filter(
    (item) => item.size === "Only_EAR_RING"
  );

  //       if (feedShowState?.category==="Nosepin"){
  //         let findings=true
  // return(<Grid container spacing={1}>
  //  {findings?<DropDownMaterialUI

  // lableName="Findings"
  // onChangeHandler={findingsResHandler}
  // optionsList={findingsOption}
  // // valueData=""
  // />:null}
  // </Grid>)
  //       }
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
              lableName="Size/UOM/Quantity"
              optionsList={SizeState}
              sizeUomQuantityResHandler={sizeUomQuantityResHandler}
              // getData={ }
              //put props
            />
          </Grid>
        ) : null}
        {sizeQuantity && SizeState[0] ? (
          <Grid item xs={12} sm={12}>
            <MultiSelectAndInput
              lableName="Size/Quantity"
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
        {
          //  && stoneOptionList[0]
          cond ? (
            <Grid item xs={12} sm={12}>
              <DropDownMaterialUI
                lableName="Stone Quality"
                onChangeHandler={stoneQualityResHandler}
                optionsList={stoneOptionList}
                // optionsList={[1, 2, 3, 4, 5, 6]}

                // valueData=""
              />
            </Grid>
          ) : null
        }
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
    console.log(digit, "new digit");
    let tegQuantity, TypeSet2, Quantity, tegSelect, setSelect, findings;

    if (
      digit === "0" ||
      digit === "1" ||
      digit === "2" ||
      digit === "P" ||
      digit === "E" ||
      digit === "N"
    ) {
      //CHECK THE CONDITION AND CHILD CODE ABD ADD THE DTAA IN DROPDOWN

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

    // if (
    //     feedShowState.category === "SET2" &&
    //     showfindings[0]?.size === "Only_EAR_RING"
    //   ) {
    //     findings=true
    //   }
    return (
      <>
        {tegSelect ? (
          <Grid item xs={12} sm={12}>
            <DropDownMaterialUI
              lableName="Tag Selection"
              onChangeHandler={tegSelectionResHandler}
              optionsList={["Separate", "Set"]}
              // valueData=""
            />
          </Grid>
        ) : null}
        {setSelect && setSelectOptions[0] ? (
          <Grid item xs={12} sm={12}>
            <DynamicMultiSelectAndInput
              lableName="Set Select"
              optionsList={setSelectOptions}
              onChangeHandler={setSelectResHandler}
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
