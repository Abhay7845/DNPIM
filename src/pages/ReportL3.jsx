import React, { useEffect, useState } from "react";
import {
  Button,
  CircularProgress,
  Container,
  Grid,
  Typography,
  CssBaseline,
  Drawer,
} from "@material-ui/core";
import axios from "axios";
import { useParams } from "react-router-dom";
import AlertPopup from "../Components/AlertPopup";
import { ProductDetailsTabularL3 } from "../Components/ComponentForL3";
import DisplayValidationComponent from "../Components/DisplayValidationForL3";
import ImgShow from "../Components/ImgShow";
import LazyLoadingDataGrid from "../Components/LazyLoadingDataGrid";
import Loading from "../Components/Loading";
import Error from "../Components/Notification";
import ReportsAppBar from "../Components/ReportsAppBar";
import SideAppBar from "../Components/SideAppBar";
import StaticTabularInformation from "../Components/StaticTabularInformation";
import StatusTabular from "../Components/StatusTabular";
import UpperHeader from "../Components/UpperHeader";
import HostManager from "../HostManager/HostManager";
import UrlManager from "../HostManager/UrlManager";
import { useStyle } from "../Style/ReportL3";
import "../Style/CssStyle/LazyLoadingDataGrid.css";

const ReportL3 = () => {
  const classes = useStyle();
  const { storeCode, rsoName } = useParams();
  const [col, setCol] = useState([]);
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [barOpener, setBarOpener] = useState(false);
  const [statusCloserOpener, setStatusCloserOpener] = useState(false);
  const [statusData, setStatusData] = useState();
  const [reportLabel, setReportLabel] = useState("Item_Wise_Report");
  const [dataRowInformation, setDataRowInformation] = useState({});
  const [showInfo, setShowInfo] = useState(false);
  const [digit, setDigit] = useState(false);
  const [modification, setModification] = useState(true);
  const [switchEnable, setSwitchEnable] = useState(false);
  const [setSelectState, setSetSelectState] = useState([]);
  const [alertPopupStatus, setAlertPopupStatus] = useState({
    status: false,
    main: "",
    contain: "",
  });
  const [SizeState, setSizeState] = useState([]);
  const [allDataFromValidation, setAllDataFromValidation] = useState({
    sizeUomQuantityRes: [],
    sizeQuantityRes: [],
    stoneQualityRes: "",
    tegQuantityRes: [],
    typeSet2Res: "",
    quantityRes: "",
    findingsRes: "",
  });
  console.log("statusData123==>", statusData);
  const reportDropHandler = (input) => {
    setReportLabel(input);
  };
  const [popupOpen, setPopupOpen] = useState(false);
  const handelOpen = () => {
    setPopupOpen(true);
  };
  const handelClose = () => {
    setPopupOpen(false);
  };
  const handelYes = () => {
    setImmediate(() => {
      setLoading(true);
    });
    const confirmURL = `https://tanishqdigitalnpim.titan.in:8443/PNPIM/NPIML3//npim/item/wise/rpt/edr/L3/${storeCode}`;
    axios
      .post(confirmURL, rows)
      .then((res) => res)
      .then((response) => {
        if (response.data.code === "1000") {
          setAlertPopupStatus({
            status: true,
            main: response.data.value.updation_Status,
            contain: "",
          });
        }
        setImmediate(() => {
          setLoading(false);
        });
      })
      .catch((error) => console.log("error==>", error));
  };
  let seventhDigits;
  useEffect(() => {
    setImmediate(() => {
      setLoading(true);
    });

    let urlReport;
    switch (reportLabel) {
      case "Item_Wise_Report":
        urlReport = `${UrlManager.itemWiseReportL3}${storeCode}`;
        break;
      case "NeedSate":
        urlReport = `${UrlManager.SummaryReportL3}${storeCode}/NeedSate`;
        break;
      case "Collection":
        urlReport = `${UrlManager.SummaryReportL3}${storeCode}/Collection`;
        break;
      case "ItGroup":
        urlReport = `${UrlManager.SummaryReportL3}${storeCode}/ItGroup`;
        break;
      case "Category":
        urlReport = `${UrlManager.SummaryReportL3}${storeCode}/Category`;
        break;
      case "Cancel_Item_List":
        urlReport = `${UrlManager.canceledItemReportL3}${storeCode}`;
        break;
      default:
        urlReport = urlReport = `${UrlManager.itemWiseReportL3}${storeCode}`;
        break;
    }
    axios.get(urlReport).then(
      (response) => {
        console.log(response);
        setImmediate(() => {
          if (response.data.code === "1000") {
            setCol(response.data.coloum);
            setRows(response.data.value);
            setSwitchEnable(true);
          } else {
            setCol(response.data.coloum);
            setRows([]);
            setSwitchEnable(true);
          }
        });
      },
      (error) => {
        console.log(error);
      }
    );

    axios.get(`${HostManager.mainHostL3}/npim/get/status/L3/${storeCode}`).then(
      (response) => {
        console.log("response1234==>", response);
        if (response.data.code === "1001") {
          alert(response.data.value);
        } else {
          setImmediate(() => {
            setStatusData(response.data);
          });
        }
      },
      (error) => {
        console.log("errorStatus==>", error);
      }
    );
    setTimeout(() => {
      setImmediate(() => {
        setLoading(false);
      });
    }, 3000);
  }, [statusCloserOpener, reportLabel, modification, popupOpen]);
  useEffect(async () => {
    if (dataRowInformation.itemCode !== "") {
      try {
        const response = await axios.get(
          `${HostManager.mainHostL3}/npim/size/dropdown/${dataRowInformation.itemCode}`
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
  }, [dataRowInformation.itemCode]);
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

  function scrollTop() {
    window.scrollTo({ top: "0", behavior: "smooth" });
  }
  function NewDisplayValidation() {
    let digitt = dataRowInformation.itemCode[6];
    if (
      digitt === "B" ||
      digitt === "C" ||
      digitt === "F" ||
      digitt === "R" ||
      digitt === "V" ||
      digitt === "W"
    ) {
      let sizeUomQuantity, sizeQuantity;
      if (digitt === "V" && dataRowInformation?.category === "BANGLE") {
        sizeUomQuantity = true;
      } else if (
        (digitt === "V" ||
          digitt === "C" ||
          digitt === "F" ||
          digitt === "B") &&
        stoneQualityCheck(dataRowInformation)
      ) {
        sizeQuantity = true;
      } else if (
        (digitt === "C" || digitt === "F" || digitt === "B") &&
        !stoneQualityCheck(dataRowInformation)
      ) {
        sizeQuantity = true;
      }
      return {
        sizeUomQuantityRes: sizeUomQuantity && SizeState[0] ? true : false,
        sizeQuantityRes: sizeQuantity && SizeState[0] ? true : false,
        stoneQualityRes: stoneQualityCheck(dataRowInformation) ? true : false,
      };
    } else if (
      digitt === "0" ||
      digitt === "1" ||
      digitt === "2" ||
      digitt === "3" ||
      digitt === "4" ||
      digitt === "5" ||
      digitt === "6" ||
      digitt === "7" ||
      digitt === "T"
    ) {
      let tegQuantity, TypeSet2, Quantity, tegSelect, setSelect;
      if (
        digitt === "0" ||
        digitt === "1" ||
        digitt === "2" ||
        digitt === "3" ||
        digitt === "4" ||
        digitt === "5" ||
        digitt === "6" ||
        digitt === "7" ||
        digitt === "T"
      ) {
        tegQuantity = true;
      }
      if (
        (digitt === "N" || digitt === "E" || digitt === "2") &&
        !stoneQualityCheck(dataRowInformation)
      ) {
        TypeSet2 = true;
      }
      if (
        digitt === "3" ||
        digitt === "5" ||
        digitt === "6" ||
        digitt === "7"
      ) {
        tegSelect = true;
        setSelect = true;
        Quantity = false;
      }

      return {
        tagSelect: tegSelect ? true : false,
        setSelect: setSelect && setSelectState[0] ? true : false,
        Quantity: Quantity ? true : false,
        tegQuantityRes: tegQuantity ? true : false,
        typeSet2Res: TypeSet2 ? true : false,
        stoneQuality: stoneQualityCheck(dataRowInformation) ? true : false,
      };
    } else {
      let findings, stoneQuality, Quantity;

      if (stoneQualityCheck(dataRowInformation)) {
        stoneQuality = true;
      }
      Quantity = true;
      return {
        quantityRes: Quantity ? true : false,
        findingsRes: findings ? true : false,
        stoneQualityRes: stoneQualityCheck(dataRowInformation) ? true : false,
      };
    }
  }
  console.log("dataRowInformation==>", dataRowInformation);
  const onClickSubmitBtnHandler = (event) => {
    let msg = {};
    // const data = NewDisplayValidation();
    // const result = Object.keys(data).filter(
    //   (eachKey) => data[eachKey] === true
    // );
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
    setImmediate(() => {
      setLoading(true);
    });

    seventhDigits = dataRowInformation.itemCode[6];
    let displayData = { status: true };
    let stdUcpNotSelectData;
    if (!msg.status && Object.keys(msg).length > 0) {
      Error(msg.message);
    } else {
      stdUcpNotSelectData = `stdUcp-${displayData.data}`;
      DisplayValidationRunner();
      const inputData = {
        itemCode: dataRowInformation.itemCode,
        strCode: storeCode,
        saleable: "",
        reasons: "",
        childNodesE:
          dataRowInformation.childNodesE === undefined
            ? ""
            : dataRowInformation.childNodesE,
        childNodesN:
          dataRowInformation.childNodesN === undefined
            ? ""
            : dataRowInformation.childNodesN,
        childNodeF:
          dataRowInformation.childNodesF === undefined
            ? ""
            : dataRowInformation.childNodesF,
        childNodeK:
          dataRowInformation.childNodesK === undefined
            ? ""
            : dataRowInformation.childNodeK,
        childNodeV:
          dataRowInformation.childNodeV === undefined
            ? ""
            : dataRowInformation.childNodeV,
        childNodeH:
          dataRowInformation.childNodesH === undefined
            ? ""
            : dataRowInformation.childNodeH,
        childNodeO:
          dataRowInformation.childNodeO === undefined
            ? ""
            : dataRowInformation.childNodeO,
        findings: allDataFromValidation.findingsRes,
        indQty: allDataFromValidation.quantityRes,
        indCategory: dataRowInformation.category,
        submitStatus: "report",
        set2Type: allDataFromValidation.typeSet2Res,
        stoneQuality: allDataFromValidation.stoneQualityRes
          ? allDataFromValidation.stoneQualityRes
          : stdUcpNotSelectData,
        stoneQualityVal: dataRowInformation.stoneQualityVal,
        rsoName: rsoName,
        npimEventNo: dataRowInformation.npimEventNo,
        indentLevelType: "L3",
        collection: dataRowInformation.collection,
        consumerbase: dataRowInformation.consumerBase,
        itgroup: dataRowInformation.itGroup,
        category: dataRowInformation.category,
        exSize: dataRowInformation.size,
        exUOM: dataRowInformation.uom,
        exIndCategory: dataRowInformation.indCategory,
        exStonequality: dataRowInformation.stoneQuality,
        sizeUomQuantitys: allDataFromValidation.sizeUomQuantityRes,
        sizeQuantitys: allDataFromValidation.sizeQuantityRes,
        tagQuantitys: allDataFromValidation.tegQuantityRes,
      };
      console.log("inputData==>", inputData);
      setTimeout(() => {
        axios
          .post(
            `${HostManager.mainHostL3}/npim/update/responses/from/L3`,
            inputData
          )
          .then((response) => {
            console.log("response==>", response.data);
            alert(response.data.value);
            setImmediate(() => {
              setShowInfo(false);
              setModification(!modification);
            });
            setImmediate(() => {
              setLoading(false);
            });
          })
          .catch((error) => {
            console.log("error==>", error);
          });
        reportDropHandler(reportLabel);
      });
    }
    setImmediate(() => {
      setLoading(false);
    });
  };
  const onClickCancelBtnHandler = (event) => {
    setImmediate(() => {
      setLoading(true);
    });
    DisplayValidationRunner();
    const inputData = {
      itemCode: dataRowInformation.itemCode,
      strCode: storeCode,
      saleable: "",
      size: "0",
      uom: "0",
      reasons: "",
      findings: allDataFromValidation.findingsRes,
      indQty: "0",
      indCategory: allDataFromValidation.indCategory,
      submitStatus: "report",
      set2Type: allDataFromValidation.typeSet2Res,
      stoneQuality: "0",
      stoneQualityVal: "0",
      rsoName: rsoName,
      npimEventNo: dataRowInformation.npimEventNo,
      IndentLevelType: dataRowInformation.indentLevelType,
      exSize: dataRowInformation.size,
      exUOM: dataRowInformation.uom,
      exIndCategory: dataRowInformation.indCategory,
      exStonequality: dataRowInformation.stoneQuality,
    };
    setTimeout(() => {
      axios
        .post(`${HostManager.mainHostL3}/npim/update/responses`, inputData)
        .then((response) => {
          alert(response.data.value);
          setImmediate(() => {
            setShowInfo(false);
            setModification(!modification);
          });
        })
        .catch((error) => {
          console.log("error==>", error);
        });
      setImmediate(() => {
        setLoading(false);
      });
      reportDropHandler(reportLabel);
    }, 1500);
    setImmediate(() => {
      setLoading(false);
    });
  };
  function closeHandler(params) {
    setImmediate(() => {
      setAlertPopupStatus({
        status: false,
        main: "",
        contain: "",
      });
    });
    setImmediate(() => {
      setLoading(false);
    });
  }
  const barHandler = () => {
    setImmediate(() => {
      setBarOpener(!barOpener);
    });
  };
  const statusOpener = () => {
    setImmediate(() => {
      setStatusCloserOpener(!statusCloserOpener);
    });
  };
  const rowDataHandler = (input) => {
    console.log("input123==>", input);
    setImmediate(() => {
      setLoading(true);
      setDataRowInformation(input);
      setShowInfo(true);
      setSwitchEnable(false);
    });
    DisplayValidationRunner();
    scrollTop();
    setTimeout(() => {
      setImmediate(() => {
        setLoading(false);
      });
    });
  };
  const DeleteRowData = (event) => {
    console.log("event==>", event);
    setImmediate(() => {
      setLoading(true);
      setDataRowInformation(event);
    });
    const inputFiled = {
      itemCode: event.itemCode,
      strCode: "NAT1",
      saleable: "",
      size: "0",
      uom: "0",
      reasons: "",
      findings: "",
      indQty: "0",
      indCategory: "0",
      submitStatus: "report",
      set2Type: "",
      stoneQuality: "0",
      stoneQualityVal: "0",
      rsoName: "6",
      npimEventNo: "",
      IndentLevelType: "",
      exSize: event.size,
      exUOM: "",
      exIndCategory: event.indCategory,
      exStonequality: "STDUCP",
    };
    console.log("inputFiled==>", inputFiled);
    axios
      .post(`${HostManager.mainHostL3}/npim/update/responses`, inputFiled)
      .then((response) => {
        alert(response.data.value);
        setImmediate(() => {
          setShowInfo(false);
          setModification(!modification);
        });
      })
      .catch((error) => {
        console.log(error);
      });
    reportDropHandler(reportLabel);
    setImmediate(() => {
      setLoading(false);
    });
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

  function createTegOfItems(inputObj) {
    let tegOfItems = ["Single_Tag", "Separate_Tag"];
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

  function stoneOptionsData(inputObj) {
    let stoneOptionList = [];

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
    //tem added
    if (inputObj.stdUCP) {
      stoneOptionList[1 + stoneOptionList.length] = `stdUCP-${inputObj.stdUCP}`;
    }
    return stoneOptionList;
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
    console.log("typeSet2Data==>", typeSet2Data.target.value);
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
  }

  const getAll = (name, value) => {
    allDataFromValidation[name] = value;
    setAllDataFromValidation();
  };

  function tegSelectionResHandler(tegSelectionData) {
    if (tegSelectionData.target.value === "Separate") {
      axios
        .get(
          `${HostManager.mailHostAdmin}/npim/get/set/category/list/${dataRowInformation.itemCode}`
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
          }
        );
    } else if (tegSelectionData.target.value === "Set") {
      axios
        .get(
          `${HostManager.mailHostAdmin}/npim/item/set/category/code/${dataRowInformation.itemCode}`
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
    }
  }

  function DisplayValidationRunner() {
    setImmediate(() => {
      setDigit(false);
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
    setTimeout(() => {
      setImmediate(() => {
        setDigit(true);
      });
    }, 1500);
  }
  function showInformationHandler() {
    setImmediate(() => {
      setShowInfo(!showInfo);
    });
  }
  return (
    <>
      <CssBaseline />
      <AlertPopup
        status={alertPopupStatus.status}
        mainLable={alertPopupStatus.main}
        containLable={alertPopupStatus.contain}
        procideHandler=""
        discardHandler=""
        closeHandler={closeHandler}
      />
      <Drawer
        anchor="left"
        open={barOpener}
        onClose={() => {
          setImmediate(() => {
            setBarOpener(false);
          });
        }}
      >
        <SideAppBar navBarList={navBarList} statusOpener={statusOpener} />
      </Drawer>
      <Drawer anchor="top" open={statusCloserOpener} onClose={statusOpener}>
        <StatusTabular statusData={statusData} />
      </Drawer>
      <Container className={classes.root} maxWidth="xl">
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <UpperHeader storeCode={storeCode} />
            <Loading flag={loading} />
            <ReportsAppBar
              reportDropHandler={reportDropHandler}
              reportOptions={[
                "Item_Wise_Report",
                "NeedSate",
                "Collection",
                "ItGroup",
                "Category",
                "Cancel_Item_List",
              ]}
              barHandler={barHandler}
              showInformationHandler={showInformationHandler}
              showinfo={showInfo}
              switchEnable={switchEnable}
            />
          </Grid>
          {dataRowInformation && showInfo ? (
            <Grid item xs={12}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={5}>
                  <div className={classes.imgShow}>
                    <ImgShow
                      itemCode={dataRowInformation.itemCode}
                      imgLink="https://tanishqdigitalnpim.titan.in/NpimImages/"
                      videoLink=""
                    />
                  </div>
                </Grid>
                <Grid item xs={12} sm={7}>
                  <Grid container>
                    <Grid item xs={12}>
                      <Typography
                        className={classes.headingColor}
                        align="center"
                      >
                        {dataRowInformation.itemCode}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <ProductDetailsTabularL3
                        information={dataRowInformation}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography className={classes.hadingCss} align="center">
                        <b>Indent Details</b>
                      </Typography>
                      <Container>
                        <Grid container spacing={2}>
                          {dataRowInformation.itemCode[6] && digit ? (
                            <DisplayValidationComponent
                              digit={dataRowInformation.itemCode[6]}
                              cond={stoneQualityCheck(dataRowInformation)}
                              itemCode={dataRowInformation.itemCode}
                              stoneOptionList={stoneOptionsData(
                                dataRowInformation
                              )}
                              setType2option={["Chain", "Dori"]}
                              findingsOption={[
                                dataRowInformation.findings || "",
                              ]}
                              setSelectOptions={setSelectState}
                              tegOfItemOption={createTegOfItems(
                                dataRowInformation
                              )}
                              sizeUomQuantityResHandler={
                                sizeUomQuantityResHandler
                              }
                              sizeQuantityResHandler={sizeQuantityResHandler}
                              stoneQualityResHandler={stoneQualityResHandler}
                              tegQuantityResHandler={tegQuantityResHandler}
                              typeSet2ResHandler={typeSet2ResHandler}
                              quantityResHandler={quantityResHandler}
                              findingsResHandler={findingsResHandler}
                              tegSelectionResHandler={tegSelectionResHandler}
                              setSelectResHandler={tegQuantityResHandler}
                              feedShowState={dataRowInformation}
                              allDataFromValidation={allDataFromValidation}
                            />
                          ) : null}
                        </Grid>
                      </Container>
                    </Grid>
                    <Grid item xs={12}>
                      {stoneQualityCheck(dataRowInformation) ? (
                        <Container>
                          <StaticTabularInformation
                            si2Gh={dataRowInformation.si2Gh}
                            vsGh={dataRowInformation.vsGh}
                            vvs1={dataRowInformation.vvs1}
                            i2Gh={dataRowInformation.i2Gh}
                            si2Ij={dataRowInformation.si2Ij}
                          />
                        </Container>
                      ) : (
                        ""
                      )}
                    </Grid>
                    <Grid item xs={12} className="my-4">
                      <Container>
                        <Grid container spacing={4}>
                          {reportLabel !== "Cancel_Item_List" ? (
                            <Grid item xs={12} sm={6}>
                              <Button
                                variant="outlined"
                                color="primary"
                                className={classes.btnCan}
                                onClick={onClickCancelBtnHandler}
                              >
                                Cancel Indent
                              </Button>
                            </Grid>
                          ) : null}
                          <Grid
                            item
                            xs={12}
                            sm={reportLabel !== "Cancel_Item_List" ? 6 : 12}
                          >
                            <Button
                              variant="outlined"
                              className={classes.btnSub}
                              onClick={onClickSubmitBtnHandler}
                            >
                              {loading === true ? (
                                <CircularProgress
                                  size={20}
                                  style={{
                                    background: "transparent",
                                    color: "#ffff",
                                  }}
                                />
                              ) : (
                                "SUBMIT"
                              )}
                            </Button>
                          </Grid>
                        </Grid>
                      </Container>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          ) : null}
          <Grid item xs={12}>
            {rows.length > 0 && col.length > 0 ? (
              <LazyLoadingDataGrid
                col={col}
                rows={rows}
                autoHeight={true}
                autoPageSize={true}
                reportLabel={reportLabel}
                rowDataHandler={rowDataHandler}
                handelOpen={handelOpen}
                handelClose={handelClose}
                handelYes={handelYes}
                popupOpen={popupOpen}
                DeleteRowData={DeleteRowData}
              />
            ) : (
              <Typography align="center" variant="h5" color="secondary">
                DATA NOT AVAILABLE
              </Typography>
            )}
          </Grid>
        </Grid>
      </Container>
    </>
  );
};
export default ReportL3;
