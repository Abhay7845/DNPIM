import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import HostManager from "../HostManager/HostManager";
export default function DisplayValidationComponent(props) {
  const {
    digit,
    cond,
    itemCode,
    stoneOptionList,
    setType2option,
    findingsOption,
    tegOfItemOption,
    allDataFromValidation,
    sizeUomQuantityResHandler,
    sizeQuantityResHandler,
    stoneQualityResHandler,
    tegQuantityResHandler,
    typeSet2ResHandler,
    quantityResHandler,
    findingsResHandler,
    tegSelectionResHandler,
    setSelectResHandler,
    setSelectOptions,
  } = props;
  const [SizeState, setSizeState] = useState([]);

  console.log(
    allDataFromValidation,
    "allDataFromValidation from Display VALIDATION"
  );
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

    if (digit === "V" && !cond) {
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

    return {
      sizeUMOQty: sizeUomQuantity && SizeState[0],
      SizeQuantity: sizeQuantity && SizeState[0],
      StoneQuality: stoneQualityCheck(feedShowState),
    };
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
    let tegQuantity, TypeSet2, Quantity, tegSelect, setSelect;

    if (
      digit === "0" ||
      digit === "1" ||
      digit === "2" ||
      digit === "P" ||
      digit === "E" ||
      digit === "N"
    ) {
      //CHECK THE CONDITION AND CHILD CODE ABD ADD THE DTAA IN DROPDOWN

      createTegOfItems(feedShowState)
        ? (tegQuantity = true)
        : (Quantity = true);
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

    return {
      tagSelect: true,
      setSelect: setSelect && setSelectOptions[0],
      Quantity: Quantity,
      tagQuantity: tagQuantity,
      TypeSet2: TypeSet2,
      stoneQuality: stoneQualityCheck(feedShowState),
    };
  } else {
    let findings, stoneQuality, Quantity;

    if (digit === "S" || digit === "D" || digit === "J") {
      findings = true;
    }
    if (cond) {
      stoneQuality = true;
    }

    Quantity = true;
    return {
      Quantity: Quantity,
      findings: findings,
      StoneQuality: stoneQualityCheck(feedShowState),
    };
  }
}
