import React, { useEffect, useState } from "react";
import { Container, Grid, Typography, CssBaseline } from "@material-ui/core";
import ImgShow from "../Components/ImgShow";
import LowerHeader from "../Components/LowerHeader";
import ProductDetailsTabular from "../Components/ProductDetailsTabular";
import UpperHeader from "../Components/UpperHeader";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { Button, CircularProgress } from "@material-ui/core";
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
import "../Style/CssStyle/IndentL3.css";

const IndentL3 = () => {
  const { storeCode, rsoName } = useParams();
  const classes = useStyles();
  const [feedShowState, setFeedShowState] = useState(NpimDataDisplay);
  const [loading, setLoading] = useState(false);
  const [resetDrop, SetResetDrop] = useState(true);
  const [SizeState, setSizeState] = useState([]);
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
  console.log("feedShowState==>", feedShowState);
  const [productDetails, setProductDetails] = useState({
    storeCode: storeCode,
    collection: "ALL",
    consumerBase: "ALL",
    group: "ALL",
    category: "ALL",
    itemCode: feedShowState.itemCode,
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
      .then((response) => {
        let mailSms = "";
        if (response.data.code === "1001") {
          console.log("response.data.value==>", response);
          mailSms = "No more data available for the selected category";
          setImmediate(() => {
            setAlertPopupStatus({
              status: true,
              main: mailSms,
              contain: "",
              mode: true,
            });
          });
        } else if (response.data.code === "1003") {
          document.getElementById("result").style.visibility = "hidden";
          console.log("response.data.value==>", response.data.value);
          setAlertPopupStatus({
            status: true,
            main: response.data.value,
            contain: "",
            mode: true,
          });
        } else if (response.data.code === "1000") {
          console.log("response.data.value==>", response.data);
          setImmediate(() => {
            setFeedShowState(response.data.value);
            setDigit(response.data.value.itemCode[6]);
            seventhDigits = response.data.value.itemCode[6];
            // DisplayValidationRunner();
          });
        }
      })
      .catch((error) => {
        console.log("error==>", error);
      });

    await axios
      .get(`${HostManager.mainHostL3}/npim/get/status/L3/${storeCode}`)
      .then(
        (response) => {
          if (response.data.code === "1001") {
            console.log("");
          } else {
            setStatusData(response.data);
          }
        },
        (error) => {
          console.log(error);
        }
      );
    setImmediate(() => {
      setLoading(false);
    });
  }, [productDetails]);
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
      }
    } else {
      setSizeState([]);
    }
  }, [feedShowState.itemCode]);

  const navBarList = [
    {
      id: 1,
      name: "Home",
      link: `/indentL3/${storeCode}/${rsoName}`,
      icon: "HomeIcon",
    },
    {
      id: 3,
      name: "Report",
      link: `/reportL3/${storeCode}/${rsoName}`,
      icon: "ReportIcon",
    },
  ];
  const onSearchClick = (dropState) => {
    setProductDetails({
      storeCode: storeCode,
      collection: dropState.collection,
      consumerBase: dropState.consumerBase,
      group: dropState.groupData,
      category: dropState.category,
      itemCode: "",
    });
  };

  const onBarClick = () => {};
  function NewDisplayValidation() {
    let data = {};
    if (digit === "F" || digit === "R" || digit === "V" || digit === "W") {
      let sizeUomQuantity, sizeQuantity, Quantity;
      if (digit === "V" && feedShowState.category === "BANGLE") {
        sizeUomQuantity = true;
      } else if (
        (digit === "V" || digit === "F") &&
        stoneQualityCheck(feedShowState)
      ) {
        sizeQuantity = true;
        Quantity = true;
      } else if (digit === "F" && !stoneQualityCheck(feedShowState)) {
        sizeQuantity = true;
        Quantity = true;
      }
      return (data = {
        sizeUomQuantityRes: sizeUomQuantity && SizeState[0] ? true : false,
        sizeQuantityRes: sizeQuantity && SizeState[0] ? true : false,
        stoneQualityRes: stoneQualityCheck(feedShowState) ? true : false,
      });
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
      let tegQuantity, TypeSet2, Quantity, tegSelect, setSelect;
      if (
        digit === "0" ||
        digit === "1" ||
        digit === "3" ||
        digit === "2" ||
        digit === "4" ||
        digit === "5" ||
        digit === "6" ||
        digit === "7" ||
        digit === "T"
      ) {
        tegQuantity = true;
      }
      if (
        digit === "K" ||
        digit === "P" ||
        digit === "Y" ||
        digit === "B" ||
        digit === "C"
      ) {
        Quantity = true;
      }
      if (
        (digit === "N" || digit === "2") &&
        !stoneQualityCheck(feedShowState)
      ) {
        TypeSet2 = true;
      }
      return (data = {
        tagSelect: tegSelect ? true : false,
        setSelect: setSelect && setSelectState[0] ? true : false,
        Quantity: Quantity ? true : false,
        tegQuantityRes: tegQuantity ? true : false,
        typeSet2Res: TypeSet2 ? true : false,
        stoneQuality: stoneQualityCheck(feedShowState) ? true : false,
      });
    } else {
      let findings, stoneQuality, Quantity;
      if (stoneQualityCheck(feedShowState)) {
        stoneQuality = true;
      }
      if (
        digit === "K" ||
        digit === "P" ||
        digit === "Y" ||
        digit === "B" ||
        digit === "J" ||
        digit === "D" ||
        digit === "N" ||
        digit === "X" ||
        digit === "O" ||
        digit === "H" ||
        digit === "S" ||
        digit === "C"
      ) {
        Quantity = true;
      }
      return (data = {
        quantityRes: Quantity ? true : false,
        findingsRes: findings ? true : false,
        stoneQualityRes: stoneQualityCheck(feedShowState) ? true : false,
      });
    }
  }
  const onClickSubmitBtnHandler = (event) => {
    let msg = {};
    // const data = NewDisplayValidation();
    // // const result = Object.keys(data).filter(
    // //   (eachKey) => data[eachKey] === true
    // // );
    // console.log("result==>", result);
    // for (let key of result) {
    //   for (let resultKey of Object.keys(allDataFromValidation)) {
    //     if (
    //       key === resultKey &&
    //       allDataFromValidation[resultKey].length === 0
    //     ) {
    //       msg = {
    //         ...msg,
    //         status: false,
    //         message: `${result.join("/")} is required`,
    //       };
    //     }
    //   }
    // }
    let stdUcpNotSelectData;
    if (!msg.status && Object.keys(msg).length > 0) {
      Error(msg.message);
    } else {
      setImmediate(() => {
        setLoading(true);
      });
      stdUcpNotSelectData = `stdUcp-${0}`;
      const inputData = {
        itemCode: feedShowState.itemCode,
        strCode: storeCode,
        saleable: "",
        reasons: "",
        childNodesE: feedShowState.childNodesE,
        childNodesN: feedShowState.childNodesN,
        childNodeF:
          feedShowState.childNodesF === undefined
            ? ""
            : feedShowState.childNodesF,
        childNodeK:
          feedShowState.childNodesK === undefined
            ? ""
            : feedShowState.childNodeK,
        childNodeV:
          feedShowState.childNodeV === undefined
            ? ""
            : feedShowState.childNodeV,
        childNodeH:
          feedShowState.childNodesH === undefined
            ? ""
            : feedShowState.childNodeH,
        childNodeO:
          feedShowState.childNodeO === undefined
            ? ""
            : feedShowState.childNodeO,
        findings: allDataFromValidation.findingsRes,
        indQty: allDataFromValidation.quantityRes,
        indCategory: feedShowState.category,
        submitStatus: "indent",
        set2Type: allDataFromValidation.typeSet2Res,
        stoneQuality: allDataFromValidation.stoneQualityRes
          ? allDataFromValidation.stoneQualityRes
          : stdUcpNotSelectData,
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
      console.log("inputData==>", inputData);
      DisplayValidationRunner();
      setTimeout(() => {
        axios
          .post(
            `${HostManager.mainHostL3}/npim/insert/responses/from/L3`,
            inputData
          )
          .then((response) => {
            console.log("response==>", response);
            let mailSms = "";
            if (response.data.code === "1001") {
              if (
                productDetails.collection === "ALL" ||
                productDetails.consumerBase === "ALL" ||
                productDetails.group === "ALL" ||
                productDetails.category === "ALL"
              ) {
                mailSms =
                  "You have successfully completed the Indented. Thankyou";
              } else if (
                productDetails.collection !== "ALL" ||
                productDetails.consumerBase !== "ALL" ||
                productDetails.group !== "ALL" ||
                productDetails.category !== "ALL"
              ) {
                mailSms = "No more data available for the selected category.";
              } else {
                mailSms = response.data.value;
              }
              setImmediate(() => {
                alert("Data Saved successfully");
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
            } else {
              setImmediate(() => {
                //  setStatusRefresh(!statusRefresh);
                setImmediate(() => {
                  setAlertPopupStatus({
                    status: true,
                    main: "Data has been saved Successfully",
                    contain: "",
                    mode: true,
                  });
                });
                setDigit();
                //setFeedShowState(response.data.value);
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
              });
              onClickNextPreBtnHandler("next");
              seventhDigits = response.data.value.itemCode[6];
            }
          })
          .catch((error) => {
            console.log("error==>", error);
          });
        setImmediate(() => {
          setLoading(false);
        });
      });
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
      SetResetDrop(resetDrop);
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
    allDataFromValidation.quantityRes = "";
    const Input = {
      storeCode: storeCode,
      collection: productDetails.collection,
      consumerBase: productDetails.consumerBase,
      group: productDetails.group,
      category: productDetails.category,
      itemCode: feedShowState.itemCode,
      direction: direction,
    };
    await axios
      .post(`${HostManager.mainHost}/npim/get/product/details/PreNex`, Input)
      .then((response) => {
        console.log("responseNext==>", response);
        let mailSms = "";
        if (response.data.code === "1001") {
          mailSms = "No more data available for the selected category";
          setImmediate(() => {
            setAlertPopupStatus({
              status: true,
              main: mailSms,
              contain: "",
              mode: true,
            });
          });
        } else if (response.data.code === "1003") {
          document.getElementById("result").style.visibility = "hidden";
          setAlertPopupStatus({
            status: true,
            main: response.data.value,
            contain: "",
            mode: true,
          });
        } else if (response.data.code === "1000") {
          setImmediate(() => {
            setFeedShowState(response.data.value);
            seventhDigits = response.data.value.itemCode[6];
          });
        }
      })
      .catch((error) => {
        console.log(error);
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
    } else {
      return false;
    }
  }
  function CheckConsumerBase(inputObj) {
    if (inputObj.consumerBase === "Solitaire".toUpperCase()) {
      return true;
    } else {
      return false;
    }
  }

  function DisplayValidationRunner() {
    setDigit(feedShowState.itemCode[6]);
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
    return stoneOptionList;
  }
  function createTegOfItems(inputObj) {
    let tegOfItems = ["Single_Tag", "Separate_Tag"];
    if (inputObj.childNodesE || inputObj.childNodesN) {
      if (inputObj.childNodesE)
        tegOfItems[1 + tegOfItems.length] = "Only_Mangalsutra";
      if (inputObj.childNodesN)
        tegOfItems[1 + tegOfItems.length] = "Only_EAR_RING";
    } else {
      return false;
    }
    return tegOfItems;
  }

  function allDataChangeHandler(allValidationInput) {
    setImmediate(() => {
      setAllDataFromValidation(allValidationInput);
    });
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
            if (response.data.code === "1000") {
              setImmediate(() => {
                setSetSelectState(
                  response.data.value.map((element) => element.category)
                );
              });
            } else {
              console.log(response.data.value);
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
            if (response.data.code === "1000") {
              setImmediate(() => {
                setSetSelectState(response.data.value);
              });
            } else {
              console.log(response.data.value);
            }
          },
          (error) => {
            console.log(error);
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

  return (
    <>
      <CssBaseline />
      <Container maxWidth="xl" className={classes.root}>
        <AlertPopup
          status={alertPopupStatus.status}
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
          <div className="row mx-2 w-100 productsDetailsStyle">
            <Grid item xs={12} sm={5}>
              <ImgShow
                itemCode={feedShowState.itemCode}
                imgLink="https://tanishqdigitalnpim.titan.in/NpimImages/"
                videoLink={feedShowState.videoLink || ""}
              />
            </Grid>
            <Grid item xs={12} sm={7}>
              <Grid container className="ProductDataDetails">
                <Grid item xs={12} sm={12} className="mx-1">
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
                  ) : (
                    ""
                  )}
                  <br />
                  <Grid container spacing={1}>
                    {digit ? (
                      <DisplayValidationComponent
                        digit={feedShowState.itemCode[6]}
                        cond={stoneQualityCheck(feedShowState)}
                        itemCode={feedShowState.itemCode}
                        stoneOptionList={stoneOptionsData(feedShowState)}
                        setType2option={["Chain", "Dori"]}
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
                <Grid item xs={12} sm={12} className="mx-1">
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
                <Grid item xs={12} sm={12} className="mt-3">
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
                        onClick={onClickSubmitBtnHandler}
                        fullWidth
                      >
                        {loading ? (
                          <span
                            className="spinner-border spinner-border-sm text-light"
                            role="status"
                            aria-hidden="true"
                          />
                        ) : (
                          <span>Submit</span>
                        )}
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
            </Grid>
          </div>
        </Grid>
      </Container>
    </>
  );
};
export default IndentL3;
