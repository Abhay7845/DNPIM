import React, { useEffect, useState } from "react";
import { Container, Grid, Typography, CssBaseline } from "@material-ui/core";
import ImgShow from "../Components/ImgShow";
import LowerHeader from "../Components/LowerHeader";
import ProductDetailsTabular from "../Components/ProductDetailsTabular";
import UpperHeader from "../Components/UpperHeader";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { Button } from "@material-ui/core";
import StaticTabularInformation from "../Components/StaticTabularInformation";
import { StaticTabularConsumerBase } from "../Components/StaticTabularInformation";
import NpimDataDisplay from "../Components/NpimDataDisplay";
import { useParams } from "react-router-dom";
import Loading from "../Components/Loading";
import axios from "axios";
import HostManager from "../HostManager/HostManager";
import DisplayValidationComponent from "../Components/DisplayValidationForL3";
import AlertPopup from "../Components/AlertPopup";
import {
  BlinkingComponent,
  SmallDataTable,
} from "../Components/ComponentForL3";
import Error from "../Components/Notification";
import { useStyles } from "../Style/IndentL3";

const IndentL3 = () => {
  const { storeCode, rsoName } = useParams();
  const classes = useStyles();
  const [feedShowState, setFeedShowState] = useState(NpimDataDisplay);
  const [loading, setLoading] = useState(false);
  const [statusRefresh, setStatusRefresh] = useState(false);
  const [resetDrop, SetResetDrop] = useState(true);
  const [SizeState, setSizeState] = useState([]);

  console.log(feedShowState, "IMPORTANT IMPORTANT IMPORTANT");
  // const [stoneOption, setStoneOption] = useState([]);
  const [alertPopupStatus, setAlertPopupStatus] = useState({
    status: false,
    main: "",
    contain: "",
    mode: false,
  });

  const [allDataFromValidation, setAllDataFromValidation] = useState({
    sizeUomQuantityRes: [],
    sizeQuantityRes: [],
    stoneQualityRes: "",
    tegQuantityRes: [],
    typeSet2Res: "",
    quantityRes: "",
    findingsRes: "",
  });

  const [productDetails, setProductDetails] = useState({
    storeCode: storeCode,
    collection: "ALL",
    consumerBase: "ALL",
    group: "ALL",
    category: "ALL",
  });

  const [statusData, setStatusData] = useState({});

  const [digit, setDigit] = useState();
  const [setSelectState, setSetSelectState] = useState([]);

  let seventhDigits;

  useEffect(async () => {
    setImmediate(() => {
      setLoading(true);
    });
    setDigit();
    await axios
      .post(`${HostManager.mainHost}/npim/get/product/details`, productDetails)
      .then((responce) => {
        console.log(responce.data);

        let mailSms = "";
        if (responce.data.code === "1001") {
          mailSms = "No more data available for the selected category";
          setImmediate(() => {
            setAlertPopupStatus({
              status: true,
              main: mailSms,
              contain: "",
              mode: true,
            });
          });
        } else if (responce.data.code === "1003") {
          document.getElementById("result").style.visibility = "hidden";
          setAlertPopupStatus({
            status: true,
            main: responce.data.value,
            contain: "",
            mode: true,
          });
        } else {
          setFeedShowState(responce.data.value);
          setDigit(responce.data.value.itemCode[6]);
          seventhDigits = responce.data.value.itemCode[6];
          // DisplayValidationRunner();
        }
      })
      .catch((error) => {
        console.log(error);
        alert(error);
      });

    await axios
      .get(`${HostManager.mainHostL3}/npim/get/status/L3/${storeCode}`)
      .then(
        (response) => {
          console.log(response);
          if (response.data.code === "1001") {
            alert(response.data.value);
          } else {
            setStatusData(response.data);
          }
        },
        (error) => {
          console.log(error);
          // alert(error);
        }
      );
    setImmediate(() => {
      setLoading(false);
    });
  }, [productDetails, statusRefresh]);
  useEffect(async () => {
    if (feedShowState.itemCode !== "") {
      try {
        const response = await axios.get(
          `${HostManager.mainHostL3}/npim/size/dropdown/${feedShowState.itemCode}`
        );
        if (response.status === 200) {
          if (response.data.code !== "1001") {
            setSizeState(response.data.value);
          } else {
            setSizeState([]);
          }
        }
      } catch (err) {
        setSizeState([]);
        console.log(err.message, "frorm display validation");
      }
    } else {
      setSizeState([]);
    }
  }, [feedShowState.itemCode]);
  // let digit = feedShowState.itemCode[6];

  // console.log("data of seven data is the data ", digit);

  const navBarList = [
    {
      id: 1,
      name: "Home",
      link: `/indentL3/${storeCode}/${rsoName}`,
      icon: "HomeIcon",
    },
    // { id: 1, name: "Favorite", link: `/favoriteL3/${storeCode}`, icon: "StarsIcon" },
    {
      id: 3,
      name: "Report",
      link: `/reportL3/${storeCode}/${rsoName}`,
      icon: "ReportIcon",
    },
  ];
  const onSearchClick = (dropState) => {
    console.log(dropState);
    setProductDetails({
      storeCode: storeCode,
      collection: dropState.collection,
      consumerBase: dropState.consumerBase,
      group: dropState.groupdata,
      category: dropState.category,
    });
    console.log(productDetails);
  };

  const onBarClick = () => {
    console.log("click bbar *****************");
  };

  function NewDisplayValidation() {
    let data = {};
    console.log(digit, "digit in indent L3");
    const showfindings = allDataFromValidation?.tegQuantityRes.filter(
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
        stoneQualityCheck(feedShowState)
      ) {
        sizeQuantity = true;
      } else if (
        (digit === "C" || digit === "F" || digit === "Y" || digit === "B") &&
        !stoneQualityCheck(feedShowState)
      ) {
        sizeQuantity = true;
      }

      return (data = {
        sizeUomQuantityRes: sizeUomQuantity && SizeState[0] ? true : false,
        sizeQuantityRes: sizeQuantity && SizeState[0] ? true : false,
        stoneQualityRes: stoneQualityCheck(feedShowState) ? true : false,
      });
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
        //CHECK THE CONDITION AND CHILD CODE ABD ADD THE DTAA IN DROPDOWN

        createTegOfItems(feedShowState)
          ? (tegQuantity = true)
          : (Quantity = true);
      }

      if (
        (digit === "N" || digit === "E" || digit === "2") &&
        !stoneQualityCheck(feedShowState)
      ) {
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
      //   feedShowState.category === "SET2" &&
      //   showfindings[0]?.size === "Only_EAR_RING"
      // ) {
      //   console.log(showfindings, "showw");
      //   findings=true
      // }
      return (data = {
        tagSelect: tegSelect ? true : false,
        setSelect: setSelect && setSelectState[0] ? true : false,
        Quantity: Quantity ? true : false,
        tegQuantityRes: tegQuantity ? true : false,
        typeSet2Res: TypeSet2 ? true : false,
        // findingsRes:findings?true:false,
        stoneQuality: stoneQualityCheck(feedShowState) ? true : false,
      });
    } else {
      let findings, stoneQuality, Quantity;

      if (digit === "S" || digit === "D" || digit === "J") {
        findings = true;
      }
      if (stoneQualityCheck(feedShowState)) {
        stoneQuality = true;
      }

      Quantity = true;
      return (data = {
        quantityRes: Quantity ? true : false,
        findingsRes: findings ? true : false,
        stoneQualityRes: stoneQualityCheck(feedShowState) ? true : false,
      });
    }
  }
  const onClickSubmitBtnHandler = (event) => {
    let msg = {};
    const data = NewDisplayValidation();
    const result = Object.keys(data).filter(
      (eachKey) => data[eachKey] === true
    );
    for (let keyy of result) {
      console.log(keyy, "resultt");
      for (let resultkey of Object.keys(allDataFromValidation)) {
        if (
          keyy === resultkey &&
          allDataFromValidation[resultkey].length === 0
        ) {
          msg = {
            ...msg,
            status: false,
            message: `${result.join("/")} is required`,
          };
          console.log(allDataFromValidation[resultkey].length, "length");
        }
      }
    }
    console.log(result, "new popup");
    console.log(msg, "new msg");
    setImmediate(() => {
      setLoading(true);
    });

    // let displayData = displayPresentValidation(feedShowState.stdUCP);
    // let displayData = DisplayValidation(feedShowState.stdUCP);
    // let displayData = {status:true}

    // console.log(displayData, "display");
    let stdUcpNotSeletData;
    if (!msg.status && Object.keys(msg).length > 0) {
      //if (!displayData.status)
      // alert(displayData.alert);
      Error(msg.message);
      // setImmediate(() => {
      //   setAlertPopupStatus({
      //     status: true,
      //     main: msg.message,
      //     contain: "",
      //   });
      // });
    } else {
      stdUcpNotSeletData = `stdUcp-${0}`;

      console.log("data of the feedShowState", feedShowState);

      const inputData = {
        itemCode: feedShowState.itemCode,
        strCode: storeCode,
        saleable: "",
        reasons: "",
        childNodesE: feedShowState.childNodesE,
        childNodesN: feedShowState.childNodesN,
        findings: allDataFromValidation.findingsRes,
        indQty: allDataFromValidation.quantityRes,
        indCategory: feedShowState.category,
        submitStatus: "indent",
        set2Type: allDataFromValidation.typeSet2Res,
        stoneQuality: allDataFromValidation.stoneQualityRes
          ? allDataFromValidation.stoneQualityRes
          : stdUcpNotSeletData,
        stoneQualityVal: feedShowState.stoneQualityVal,
        rsoName: rsoName,
        npimEventNo: feedShowState.npimEventNo,
        indentLevelType: feedShowState.itemLevelType,
        collection: productDetails.collection,
        consumerbase: productDetails.consumerBase,
        itgroup: productDetails.group,
        category: productDetails.category,
        sizeUomQuantitys: allDataFromValidation.sizeUomQuantityRes,
        sizeQuantitys: allDataFromValidation.sizeQuantityRes,
        tagQuantitys: allDataFromValidation.tegQuantityRes,
      };

      console.log("input from thr L3 data insert  inputData", inputData);

      DisplayValidationRunner();

      setTimeout(() => {
        axios
          .post(
            `${HostManager.mainHostL3}/npim/insert/responses/from/L3`,
            inputData
          )
          .then((responce) => {
            let mailSms = "";
            console.log(responce.data);
            if (responce.data.code === "1001") {
              if (
                productDetails.collection == "ALL" ||
                productDetails.consumerBase == "ALL" ||
                productDetails.group == "ALL" ||
                productDetails.category == "ALL"
              ) {
                mailSms =
                  "You have successfully completed the Indented. Thankyou.";
              } else if (
                productDetails.collection !== "ALL" ||
                productDetails.consumerBase !== "ALL" ||
                productDetails.group !== "ALL" ||
                productDetails.category !== "ALL"
              ) {
                mailSms = "No more data available for the selected category.";
              } else {
                mailSms = responce.data.value;
              }

              setImmediate(() => {
                setAlertPopupStatus({
                  status: true,
                  main: mailSms,
                  contain: "",
                  mode: true,
                });
              });

              setAllDataFromValidation({
                sizeUomQuantityRes: [],
                sizeQuantityRes: [],
                stoneQualityRes: "",
                tegQuantityRes: [],
                typeSet2Res: "",
                quantityRes: "",
                findingsRes: "",
              });
              onClickNextPreBtnHandler("next");
              // alert(responce.data.value)
            } else {
              console.log(responce, "cool");
              setImmediate(() => {
                //  setStatusRefresh(!statusRefresh);
                //alert(responce.status)
                setImmediate(() => {
                  setAlertPopupStatus({
                    status: true,
                    main: "Data has been saved Successfully",
                    contain: "",
                    mode: true,
                  });
                });
                setDigit();
                //setFeedShowState(responce.data.value);
                //document.getElementById("result").style.visibility = "hidden";
                setImmediate(() => {
                  setAllDataFromValidation({
                    sizeUomQuantityRes: [],
                    sizeQuantityRes: [],
                    stoneQualityRes: "",
                    tegQuantityRes: [],
                    typeSet2Res: "",
                    quantityRes: "",
                    findingsRes: "",
                  });
                });

                setImmediate(() => {
                  setLoading(false);
                });
                // document.getElementById("result").style.visibility = "visible";
              });

              onClickNextPreBtnHandler("next");
              seventhDigits = responce.data.value.itemCode[6];
            }
          })
          .catch((error) => {
            // setAllDataFromValidation({
            //   sizeUomQuantityRes: [],
            //   sizeQuantityRes: [],
            //   stoneQualityRes: "",
            //   tegQuantityRes: [],
            //   typeSet2Res: "",
            //   quantityRes: "",
            //   findingsRes: "",
            // });

            console.log(error);
            alert(error);
          });
        setImmediate(() => {
          setLoading(false);
        });

        // digit = feedShowState.itemCode[6];
      }, 1000);
    }

    setImmediate(() => {
      setLoading(false);
    });
  };

  function closeHandler() {
    setImmediate(() => {
      setAlertPopupStatus({
        status: false,
        main: "",
        contain: "",
        mode: false,
      });
    });
    setImmediate(() => {
      setLoading(false);
    });
  }

  function closeHandlerForRest() {
    setImmediate(() => {
      setAlertPopupStatus({
        status: false,
        main: "",
        contain: "",
        mode: false,
      });

      SetResetDrop(!resetDrop);

      // setProductDetails({
      //   storeCode: storeCode,
      //   collection: "ALL",
      //   consumerBase: "ALL",
      //   group: "ALL",
      //   category: "ALL",
      // });
    });

    setImmediate(() => {
      setLoading(false);
      SetResetDrop(true);
    });
  }

  const onClickNextPreBtnHandler = async (direction) => {
    setImmediate(() => {
      setLoading(true);
    });
    //document.getElementById("result").style.visibility = "visible";
    const Input = {
      storeCode: storeCode,
      collection: productDetails.collection,
      consumerBase: productDetails.consumerBase,
      group: productDetails.group,
      category: productDetails.category,
      itemCode: feedShowState.itemCode,
      direction: direction,
    };
    console.log(Input);

    await axios
      .post(`${HostManager.mainHost}/npim/get/product/details/PreNex`, Input)
      .then((responce) => {
        console.log(responce.data);
        let mailSms = "";
        if (responce.data.code === "1001") {
          mailSms = "No more data available for the selected category.";
          setImmediate(() => {
            setAlertPopupStatus({
              status: true,
              main: mailSms,
              contain: "",
              mode: true,
            });
          });
        } else if (responce.data.code === "1003") {
          //document.getElementById("result").style.visibility = "hidden";
          setAlertPopupStatus({
            status: true,
            main: responce.data.value,
            contain: "",
            mode: true,
          });
        } else {
          setFeedShowState(responce.data.value);
          seventhDigits = responce.data.value.itemCode[6];
        }
      })
      .catch((error) => {
        console.log(error);
        alert(error);
      });

    setImmediate(() => {
      setLoading(false);
    });
    DisplayValidationRunner();
  };

  function stoneQualityCheck(inputObj) {
    if (inputObj.si2Gh) {
      return true;
    }
    if (inputObj.vsGh) {
      return true;
    }
    if (inputObj.vvs1) {
      return true;
    }
    if (inputObj.i2Gh) {
      return true;
    }
    if (inputObj.si2Ij) {
      return true;
    }
    // if (inputObj.stdUCP) {
    //     return true;
    // }
    else {
      return false;
    }
  }
  function CheckConsumerBase(inputObj) {
    //console.log(inputObj,"CheckConsumerBase")
    //console.log("Solitaire".toUpperCase(),"uppercase")
    if (inputObj.consumerBase === "Solitaire".toUpperCase()) {
      return true;
    } else {
      return false;
    }
  }

  //const check= CheckConsumerBase(feedShowState)
  //console.log(check,"check")
  function DisplayValidationRunner() {
    setDigit(feedShowState.itemCode[6]);
    console.log("inside Display Validation setDigit");
  }

  function stoneOptionsData(inputObj) {
    let stoneOptionList = [];
    if (inputObj.stdUCP) {
      stoneOptionList[1 + stoneOptionList.length] = `stdUCP-${inputObj.stdUCP}`;
    }
    if (inputObj.si2Gh) {
      stoneOptionList[1 + stoneOptionList.length] = `si2Gh-${inputObj.si2Gh}`;
    }
    if (inputObj.vsGh) {
      stoneOptionList[1 + stoneOptionList.length] = `vsGh-${inputObj.vsGh}`;
    }
    if (inputObj.vvs1) {
      stoneOptionList[1 + stoneOptionList.length] = `vvs1-${inputObj.vvs1}`;
    }
    if (inputObj.i2Gh) {
      stoneOptionList[1 + stoneOptionList.length] = `i2Gh-${inputObj.i2Gh}`;
    }
    if (inputObj.si2Ij) {
      stoneOptionList[1 + stoneOptionList.length] = `si2Ij-${inputObj.si2Ij}`;
    }

    // setImmediate(() => { setStoneOption(stoneOptionList) });
    return stoneOptionList;
  }
  function createTegOfItems(inputObj) {
    let tegOfItems = ["Single_Tag", "Separate_Tag"]; //separate_Tag
    if (inputObj.childNodesE || inputObj.childNodesN) {
      if (inputObj.childNodesE)
        tegOfItems[1 + tegOfItems.length] = "Only_EAR_RING";
      if (inputObj.childNodesN)
        tegOfItems[1 + tegOfItems.length] = "Only_NECKWEAR_OR_PENDANT";
    } else {
      return false;
    }
    return tegOfItems;
  }

  // function createTegOfItems(inputObj) {
  //     let tegOfItems = ["Single_Tag", "Separate_Tag"];  //separate_Tag
  //     if (inputObj.childNodesE || inputObj.childNodesN) {

  //         (inputObj.childNodesE) ? tegOfItems[1 + tegOfItems.length] = "Only_EAR_RING" : "";
  //         (inputObj.childNodesN) ? tegOfItems[1 + tegOfItems.length] = "Only_NECKWEAR_OR_PENDANT" : "";

  //         // (inputObj.childNodesE) ? tegOfItems[1 + tegOfItems.length] = "Only_EAR_RING" : "";
  //         // (inputObj.childNodesN) ? tegOfItems[1 + tegOfItems.length] = "Only_NECKWEAR_OR_PENDANT" : "";
  //     } else {
  //         return false;
  //     }
  //     return tegOfItems;
  // }

  function allDataChangeHandler(allValidationInput) {
    console.log("All Data input  From  ", allValidationInput);

    setImmediate(() => {
      setAllDataFromValidation(allValidationInput);
    });

    console.log("All Data validation From  ", allDataFromValidation);
  }

  function sizeUomQuantityResHandler(sizeUomQuantityData) {
    setImmediate(() => {
      setAllDataFromValidation({
        sizeUomQuantityRes: sizeUomQuantityData,
        sizeQuantityRes: allDataFromValidation.sizeQuantityRes,
        stoneQualityRes: allDataFromValidation.stoneQualityRes,
        tegQuantityRes: allDataFromValidation.tegQuantityRes,
        typeSet2Res: allDataFromValidation.typeSet2Res,
        quantityRes: allDataFromValidation.quantityRes,
        findingsRes: allDataFromValidation.findingsRes,
      });
    });
    // getAll("sizeUomQuantityRes", sizeUomQuantityData)
  }
  function sizeQuantityResHandler(sizeQuantityData) {
    setImmediate(() => {
      setAllDataFromValidation({
        sizeUomQuantityRes: allDataFromValidation.sizeUomQuantityRes,
        sizeQuantityRes: sizeQuantityData,
        stoneQualityRes: allDataFromValidation.stoneQualityRes,
        tegQuantityRes: allDataFromValidation.tegQuantityRes,
        typeSet2Res: allDataFromValidation.typeSet2Res,
        quantityRes: allDataFromValidation.quantityRes,
        findingsRes: allDataFromValidation.findingsRes,
      });
    });
    // getAll("sizeQuantityRes", sizeQuantityData)
  }
  function stoneQualityResHandler(stoneQualityData) {
    setImmediate(() => {
      setAllDataFromValidation({
        sizeUomQuantityRes: allDataFromValidation.sizeUomQuantityRes,
        sizeQuantityRes: allDataFromValidation.sizeQuantityRes,
        stoneQualityRes: stoneQualityData.target.value,
        tegQuantityRes: allDataFromValidation.tegQuantityRes,
        typeSet2Res: allDataFromValidation.typeSet2Res,
        quantityRes: allDataFromValidation.quantityRes,
        findingsRes: allDataFromValidation.findingsRes,
      });
    });
    // getAll("stoneQualityRes", stoneQualityData.target.value)
  }
  function tegQuantityResHandler(tegQuantityData) {
    setImmediate(() => {
      setAllDataFromValidation({
        sizeUomQuantityRes: allDataFromValidation.sizeUomQuantityRes,
        sizeQuantityRes: allDataFromValidation.sizeQuantityRes,
        stoneQualityRes: allDataFromValidation.stoneQualityRes,
        tegQuantityRes: tegQuantityData,
        typeSet2Res: allDataFromValidation.typeSet2Res,
        quantityRes: allDataFromValidation.quantityRes,
        findingsRes: allDataFromValidation.findingsRes,
      });
    });

    // getAll("tegQuantityRes", tegQuantityData)
  }
  function typeSet2ResHandler(typeSet2Data) {
    setImmediate(() => {
      setAllDataFromValidation({
        sizeUomQuantityRes: allDataFromValidation.sizeUomQuantityRes,
        sizeQuantityRes: allDataFromValidation.sizeQuantityRes,
        stoneQualityRes: allDataFromValidation.stoneQualityRes,
        tegQuantityRes: allDataFromValidation.tegQuantityRes,
        typeSet2Res: typeSet2Data.target.value,
        quantityRes: allDataFromValidation.quantityRes,
        findingsRes: allDataFromValidation.findingsRes,
      });
    });
    // getAll("typeSet2Res", typeSet2Data.target.value)
  }
  function quantityResHandler(quantityData) {
    setImmediate(() => {
      setAllDataFromValidation({
        sizeUomQuantityRes: allDataFromValidation.sizeUomQuantityRes,
        sizeQuantityRes: allDataFromValidation.sizeQuantityRes,
        stoneQualityRes: allDataFromValidation.stoneQualityRes,
        tegQuantityRes: allDataFromValidation.tegQuantityRes,
        typeSet2Res: allDataFromValidation.typeSet2Res,
        quantityRes: quantityData,
        findingsRes: allDataFromValidation.findingsRes,
      });
    });
    // getAll("quantityRes", quantityData.target.value)
  }
  function findingsResHandler(findingsData) {
    setImmediate(() => {
      setAllDataFromValidation({
        sizeUomQuantityRes: allDataFromValidation.sizeUomQuantityRes,
        sizeQuantityRes: allDataFromValidation.sizeQuantityRes,
        stoneQualityRes: allDataFromValidation.stoneQualityRes,
        tegQuantityRes: allDataFromValidation.tegQuantityRes,
        typeSet2Res: allDataFromValidation.typeSet2Res,
        quantityRes: allDataFromValidation.quantityRes,
        findingsRes: findingsData.target.value,
      });
    });
    // getAll("findFingsRes", findingsData.target.value)
  }
  function tegSelectionResHandler(tegSelectionData) {
    if (tegSelectionData.target.value === "Separate") {
      axios
        .get(
          `${HostManager.mailHostAdmin}/npim/get/set/category/list/${feedShowState.itemCode}`
        )

        .then(
          (response) => {
            if (response.data.code == 1000) {
              setImmediate(() => {
                setSetSelectState(
                  response.data.value.map((element) => element.category)
                );
              });
            } else {
              console.log(response.data.value);
              alert(response.data.value);
            }
          },
          (error) => {
            console.log(error);
            alert(error);
          }
        );
    } else if (tegSelectionData.target.value === "Set") {
      axios
        .get(
          `${HostManager.mailHostAdmin}/npim/item/set/category/code/${feedShowState.itemCode}`
        )

        .then(
          (response) => {
            if (response.data.code == 1000) {
              setImmediate(() => {
                setSetSelectState(response.data.value);
              });
            } else {
              console.log(response.data.value);
              alert(response.data.value);
            }
          },
          (error) => {
            console.log(error);
            alert(error);
          }
        );
    } else {
    }
  }

  function setSelectResHandler(setSelectData) {
    setImmediate(() => {
      setAllDataFromValidation({
        sizeUomQuantityRes: allDataFromValidation.sizeUomQuantityRes,
        sizeQuantityRes: allDataFromValidation.sizeQuantityRes,
        stoneQualityRes: allDataFromValidation.stoneQualityRes,
        tegQuantityRes: setSelectData,
        typeSet2Res: allDataFromValidation.typeSet2Res,
        quantityRes: allDataFromValidation.quantityRes,
        findingsRes: allDataFromValidation.findingsRes,
      });
    });

    // getAll("tegQuantityRes", tegQuantityData)
  }

  // const getAll = (name, value) => {
  //     allDataFromValidation[name] = value;

  //     console.log("data form the get all method   :", allDataFromValidation);
  //     console.log("name : ", name, "value : ", value);
  // }

  return (
    <>
      <CssBaseline />
      <Container maxWidth="xl" className={classes.root}>
        <AlertPopup
          status={alertPopupStatus.status}
          // status={true}
          mainLable={alertPopupStatus.main}
          containLable={alertPopupStatus.contain}
          procideHandler=""
          discardHandler=""
          closeHandler={() => {
            alertPopupStatus.mode ? closeHandlerForRest() : closeHandler();
          }}
        />
        <Grid container>
          <Grid item xs={12}>
            <UpperHeader
              itemCode={feedShowState.itemCode}
              storeCode={storeCode}
            />
            <Loading flag={loading} />

            {resetDrop ? (
              <LowerHeader
                onBar={onBarClick}
                onSear={onSearchClick}
                navBarList={navBarList}
                statusData={statusData}
                setAllDataFromValidation={setAllDataFromValidation}
                L3={true}
              />
            ) : (
              "Loading...!"
            )}
          </Grid>
          <div
            id="result"
            className="section-details row"
            style={{ visibility: "visible" }}
          >
            <Grid item xs={12} sm={5}>
              <div className="my-4 mx-2">
                {feedShowState.itemCode ? (
                  <ImgShow
                    itemCode={feedShowState.itemCode}
                    imgLink="https://tanishqdigitalnpim.titan.in/NpimImages/"
                    videoLink={feedShowState.videoLink || ""}
                    //imgLink={img}
                  />
                ) : null}
              </div>
            </Grid>
            <Grid item xs={12} sm={7}>
              <div className="my-4">
                <Grid container>
                  <Grid item xs={12} sm={12}>
                    <Typography className={classes.headingColor} align="center">
                      {feedShowState.itemCode}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography className="text-center my-2">
                      <b>Product Specification</b>
                    </Typography>
                    {feedShowState.adVariant ? (
                      <BlinkingComponent
                        color="red"
                        text="AD-Variant"
                        fontSize={15}
                      />
                    ) : null}
                    <ProductDetailsTabular information={feedShowState} />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography className="text-center my-2">
                      <b>Indent Details</b>
                    </Typography>
                    {feedShowState.btqCount ? (
                      <BlinkingComponent
                        color="red"
                        text={` ${feedShowState.btqCount}  Btqs Indented `}
                        fontSize={15}
                      />
                    ) : null}
                    <br />
                    <Grid container spacing={1}>
                      {digit ? (
                        <DisplayValidationComponent
                          digit={feedShowState.itemCode[6]}
                          cond={stoneQualityCheck(feedShowState)}
                          // cond={false}
                          // sizeOptionList={sizeOption}
                          itemCode={feedShowState.itemCode}
                          stoneOptionList={stoneOptionsData(feedShowState)}
                          setType2option={["Need-Chain", "Need-Dori"]}
                          findingsOption={[feedShowState.findings || ""]}
                          setSelectOptions={setSelectState}
                          tegOfItemOption={createTegOfItems(feedShowState)}
                          allDataChangeHandler={allDataChangeHandler}
                          sizeUomQuantityResHandler={sizeUomQuantityResHandler}
                          sizeQuantityResHandler={sizeQuantityResHandler}
                          stoneQualityResHandler={stoneQualityResHandler}
                          tegQuantityResHandler={tegQuantityResHandler}
                          typeSet2ResHandler={typeSet2ResHandler}
                          quantityResHandler={quantityResHandler}
                          findingsResHandler={findingsResHandler}
                          tegSelectionResHandler={tegSelectionResHandler}
                          setSelectResHandler={tegQuantityResHandler}
                          allDataFromValidation={allDataFromValidation}
                          feedShowState={feedShowState}
                        />
                      ) : (
                        ""
                      )}
                    </Grid>
                    {SmallDataTable(feedShowState)}
                    <div>
                      {feedShowState.consumerBase ===
                        "solitarie".toUpperCase() && (
                        <a
                          href="https://tanishqsolitaires.titanjew.in/SolitairePortal/Home/Login"
                          target="iframe_a"
                        >
                          <Button
                            variant="contained"
                            color="primary"
                            className="mt-3"
                          >
                            Book Now
                          </Button>
                        </a>
                      )}
                    </div>
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    {stoneQualityCheck(feedShowState) ? (
                      <StaticTabularInformation
                        si2Gh={feedShowState.si2Gh}
                        vsGh={feedShowState.vsGh}
                        vvs1={feedShowState.vvs1}
                        i2Gh={feedShowState.i2Gh}
                        si2Ij={feedShowState.si2Ij}
                        consumerBase={false}
                      />
                    ) : (
                      ""
                    )}
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    {CheckConsumerBase(feedShowState) ? (
                      <StaticTabularConsumerBase />
                    ) : (
                      ""
                    )}
                  </Grid>
                  <Grid item xs={12} sm={12} className={classes.buttonSpacing}>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={4}>
                        <Button
                          className={classes.btn}
                          onClick={() => {
                            onClickNextPreBtnHandler("pre");
                          }}
                          startIcon={<ArrowBackIosIcon />}
                          variant="outlined"
                          fullWidth
                        >
                          Previous
                        </Button>
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <Button
                          className={classes.btnSub}
                          onClick={() => {
                            setTimeout(() => {
                              onClickSubmitBtnHandler();
                            }, 1000);
                          }}
                          variant="contained"
                          fullWidth
                          //disabled={feedShowState.consumerBase==="KIDS"?true:false}
                        >
                          Submit
                        </Button>
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <Button
                          className={classes.btn}
                          onClick={() => {
                            onClickNextPreBtnHandler("next");
                          }}
                          endIcon={<ArrowForwardIosIcon />}
                          variant="outlined"
                          fullWidth
                        >
                          Next
                        </Button>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </div>
            </Grid>
          </div>
        </Grid>
      </Container>
    </>
  );
};
export default IndentL3;
