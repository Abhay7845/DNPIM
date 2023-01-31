import {
  Button,
  Container,
  Grid,
  makeStyles,
  Paper,
  Typography,
  CssBaseline,
  Drawer,
} from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AlertPopup from "../Components/AlertPopup";
import { ProductDetailsTabularL3 } from "../Components/ComponentForL3";
import DisplayValidationComponent from "../Components/DisplayValidationForL3";
import ImgShow from "../Components/ImgShow";
import LazyLoadindDataGrid from "../Components/LazyLoadindDataGrid";
import Loading from "../Components/Loading";
import Error from "../Components/Notification";
import ReportsAppBar from "../Components/ReportsAppBar";
import SideAppBar from "../Components/SideAppBar";
import StaticTabularInformation from "../Components/StaticTabularInformation";
import StatusTabular from "../Components/StatusTabular";
import UpperHeader from "../Components/UpperHeader";
import HostManager from "../HostManager/HostManager";
import UrlManager from "../HostManager/UrlManager";

const useStyle = makeStyles({
  root: {
    width: "100%",
    height: "100%",
    margin: "0%",
    padding: "0%",
  },
  imgShow: {
    margin: "4%",
  },
  productInfo: {
    marginTop: "3%",
    height: "64vh",
  },
  hidden: {
    display: "none",
  },
  show: {
    display: "block",
  },
  haddingCss: {
    fontWeight: "bolder",
    fontStretch: "normal",
    fontSize: "16px",
    lineHeight: "normal",
    fontFamily: "Raleway, sans - serif",
    letterSpacing: "2px",
  },
  innerHightCss: {
    minHeight: "80vh",
  },
  headingColor: {
    backgroundColor: "#c4c4c0",
    fontWeight: "bolder",
  },
});

const ReportL3 = () => {
  const { storeCode, rsoName } = useParams();
  // const storeCode = "NAT1"
  const classes = useStyle();
  const [col, setCol] = useState([]);
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [barOpener, setBarOpener] = useState(false);
  const [statusCloserOpner, setStatusCloserOpner] = useState(false);
  const [statusData, setStatusData] = useState();
  const [reportLable, setReportLable] = useState("Item_Wise_Report");
  const [dataRowInformation, setDataRowInformation] = useState({});
  const [showInfo, setShowInfo] = useState(false);
  const [digit, setDigit] = useState(false);
  const [sizeOption, setSizeOption] = useState([]);
  const [modification, setModification] = useState(true);
  const [switchEnable, setSwitchEnable] = useState(false);
  const [setSelectState, setSetSelectState] = useState([]);
  const [alertPopupStatus, setAlertPopupStatus] = useState({
    status: false,
    main: "",
    contain: "",
  });
  const [SizeState, setSizeState] = useState([]);
  // let allDataFromValidation = {
  //     sizeUomQuantityRes: [],
  //     sizeQuantityRes: [],
  //     stoneQualityRes: "",
  //     tegQuantityRes: [],
  //     typeSet2Res: "",
  //     quantityRes: "",
  //     findingsRes: "",
  // };

  const [allDataFromValidation, setAllDataFromValidation] = useState({
    sizeUomQuantityRes: [],
    sizeQuantityRes: [],
    stoneQualityRes: "",
    tegQuantityRes: [],
    typeSet2Res: "",
    quantityRes: "",
    findingsRes: "",
  });
  const reportDropHandler = (input) => {
    console.log(input, "input");
    setReportLable(input);
    // setImmediate(() => {
    //     setLoading(true);
    //     setShowInfo(false)
    // });
    console.log("dropdown data in the  : ", input);
    // DisplayValidationRunner()
    // let urlReport;

    // switch (input) {
    //     case "Item_Wise_Report":

    //         urlReport = `${UrlManager.itemWiseReportL3}${storeCode}`;
    //         break;
    //     case "ConsumerBase":

    //         urlReport = `${UrlManager.SummaryReportL3}${storeCode}/ConsumerBase`;
    //         break;
    //     case "Collection":

    //         urlReport = `${UrlManager.SummaryReportL3}${storeCode}/Collection`;
    //         break;
    //     case "ItGroup":

    //         urlReport = `${UrlManager.SummaryReportL3}${storeCode}/ItGroup`;
    //         break;
    //     case "Category":

    //         urlReport = `${UrlManager.SummaryReportL3}${storeCode}/Category`;
    //         break;
    //     case "Cancel_Item_List":

    //         urlReport = `${UrlManager.canceledItemReportL3}${storeCode}`;
    //         break;

    //     default:
    //         urlReport = urlReport = `${UrlManager.itemWiseReportL3}${storeCode}`;
    //         break;
    // }

    // axios.get(urlReport)
    //     .then((response) => {

    //         console.log(response);

    //         setImmediate(() => {
    //             if (response.data.code === "1000") {
    //                 setCol(response.data.coloum);
    //                 setRows(response.data.value);
    //                 setSwitchEnable(true)
    //             } else {
    //                 setCol(response.data.coloum);
    //                 setRows([]);
    //                 setSwitchEnable(true)
    //             }

    //         });
    //     }, (error) => {
    //         console.log(error);
    //         setCol([]);
    //         setRows([]);
    //         setSwitchEnable(true)
    //         alert(error);

    //     });
    // setImmediate(() => {
    //     setLoading(false);
    // });
  };
  const [popupopen, setpopupopen] = useState(false);
  const handelOpen = () => {
    setpopupopen(true);
  };
  const handelClose = () => {
    setpopupopen(false);
  };
  const handelYes = async () => {
    const confirmURL = `https://tanishqdigitalnpim.titan.in:8443/PNPIM/NPIML3//npim/item/wise/rpt/edr/L3/${storeCode}`;
    try {
      const response = await axios.post(confirmURL, rows);
      console.log(response, "yes response");
      if (response.status === 200) {
        setpopupopen(false);
        console.log(response.data, "on YEs");
        //setSuccessCount(response.data)
      } else {
        alert("something went Worng");
      }
    } catch (e) {
      alert("something went Worng");
    }
  };
  let seventhDigits;
  console.log(reportLable, "alert reportLable");
  useEffect(() => {
    setImmediate(() => {
      setLoading(true);
    });

    let urlReport;
    console.log(reportLable, "reportLable from Switch");
    console.log(urlReport, "urlReport from Switch");

    switch (reportLable) {
      case "Item_Wise_Report":
        urlReport = `${UrlManager.itemWiseReportL3}${storeCode}`;
        break;
      case "ConsumerBase":
        urlReport = `${UrlManager.SummaryReportL3}${storeCode}/ConsumerBase`;
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
        alert(error);
      }
    );

    axios.get(`${HostManager.mainHostL3}/npim/get/status/L3/${storeCode}`).then(
      (response) => {
        console.log(response);

        if (response.data.code === "1001") {
          alert(response.data.value);
        } else {
          setImmediate(() => {
            setStatusData(response.data);
          });
        }
      },
      (error) => {
        console.log(error);
        // alert(error);
      }
    );

    setTimeout(() => {
      setImmediate(() => {
        setLoading(false);
      });
    }, 3000);
  }, [statusCloserOpner, reportLable, modification, popupopen]);
  // showInfo
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
        console.log(err.message, "frorm display validation");
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
    // { id: 1, name: "Favorite", link: `/favoriteL3/${storeCode}`, icon: "StarsIcon" },
    {
      id: 3,
      name: "Report",
      link: `/reportL3/${storeCode}/${rsoName}`,
      icon: "ReportIcon",
    },
  ];

  function extraCalls(itemcode) {
    // axios.get(`https://tanishqdigitalnpim.titan.in:8443/Npim/getSize/${dataRowInformation.itemCode}`)
    axios
      .get(
        `https://tanishqdigitalnpim.titan.in:8443/Npim/getSize/502783VWQR1A02`
      )

      .then(
        (response) => {
          // data = response.data.data;
          // console.log(data);

          setImmediate(() => {
            setSizeOption(response.data.data);
          });
          console.log(sizeOption);
        },
        (error) => {
          console.log(error);
          alert(error);
        }
      );
  }

  function scrollTop() {
    window.scrollTo({ top: "0", behavior: "smooth" });
  }
  function NewDisplayValidation() {
    let digitt = dataRowInformation?.itemCode[6];
    const showfindings = allDataFromValidation?.tegQuantityRes.filter(
      (item) => item.size === "Only_EAR_RING"
    );
    if (
      digitt === "B" ||
      digitt === "C" ||
      digitt === "F" ||
      digitt === "R" ||
      digitt === "V" ||
      digitt === "W" ||
      digitt === "Y"
    ) {
      let sizeUomQuantity, sizeQuantity;

      if (digitt === "V" && dataRowInformation?.category === "BANGLE") {
        sizeUomQuantity = true;
      } else if (
        (digitt === "V" ||
          digitt === "C" ||
          digitt === "F" ||
          digitt === "Y" ||
          digitt === "B") &&
        stoneQualityCheck(dataRowInformation)
      ) {
        sizeQuantity = true;
      } else if (
        (digitt === "C" ||
          digitt === "F" ||
          digitt === "Y" ||
          digitt === "B") &&
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
      digitt === "E" ||
      digitt === "N" ||
      digitt === "P" ||
      digitt === "2" ||
      digitt === "3" ||
      digitt === "0" ||
      digitt === "1" ||
      digitt === "3" ||
      digitt === "4" ||
      digitt === "5" ||
      digitt === "6" ||
      digitt === "7"
    ) {
      let tegQuantity, TypeSet2, Quantity, tegSelect, setSelect, findings;

      if (
        digitt === "0" ||
        digitt === "1" ||
        digitt === "2" ||
        digitt === "P" ||
        digitt === "E" ||
        digitt === "N"
      ) {
        //CHECK THE CONDITION AND CHILD CODE ABD ADD THE DTAA IN DROPDOWN

        createTegOfItems(dataRowInformation)
          ? (tegQuantity = true)
          : (Quantity = true);
      }

      if (
        (digitt === "N" || digitt === "E" || digitt === "2") &&
        !stoneQualityCheck(dataRowInformation)
      ) {
        TypeSet2 = true;
      }

      if (
        digitt === "3" ||
        digitt === "4" ||
        digitt === "5" ||
        digitt === "6" ||
        digitt === "7"
      ) {
        tegSelect = true;
        setSelect = true;
        Quantity = false;
        // stoneQuality = false;
      }
      // if (
      //   dataRowInformation.category === "SET2" &&
      //   showfindings[0]?.size === "Only_EAR_RING"
      // ) {
      //   findings=true
      // }

      return {
        tagSelect: tegSelect ? true : false,
        setSelect: setSelect && setSelectState[0] ? true : false,
        Quantity: Quantity ? true : false,
        tegQuantityRes: tegQuantity ? true : false,
        typeSet2Res: TypeSet2 ? true : false,
        // findingsRes:findings?true:false,
        stoneQuality: stoneQualityCheck(dataRowInformation) ? true : false,
      };
    } else {
      let findings, stoneQuality, Quantity;

      if (digitt === "S" || digitt === "D" || digitt === "J") {
        findings = true;
      }
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
    console.log(data, "data");
    console.log(msg, "msg data");
    setImmediate(() => {
      setLoading(true);
    });

    seventhDigits = dataRowInformation.itemCode[6];
    // let displayData = displayPresentValidation(dataRowInformation.stdUCP);
    let displayData = { status: true };
    let stdUcpNotSeletData;

    if (!msg.status && Object.keys(msg).length > 0) {
      // alert(displayData.alert);
      //   setImmediate(() => {
      //     setAlertPopupStatus({
      //       status: true,
      //       main: msg.message,
      //       contain: "",
      //     });
      //   });
      Error(msg.message);
      console.log(allDataFromValidation);
    } else {
      stdUcpNotSeletData = `stdUcp-${displayData.data}`;
      console.log("data of the dataRowInformation", dataRowInformation);
      DisplayValidationRunner();
      const inputData = {
        itemCode: dataRowInformation.itemCode,
        strCode: storeCode,
        saleable: "",
        reasons: "",
        childNodesE: dataRowInformation.childNodesE,
        childNodesN: dataRowInformation.childNodesN,
        findings: allDataFromValidation.findingsRes,
        indQty: allDataFromValidation.quantityRes,
        indCategory: dataRowInformation.category,
        submitStatus: "report",
        set2Type: allDataFromValidation.typeSet2Res,
        stoneQuality: allDataFromValidation.stoneQualityRes
          ? allDataFromValidation.stoneQualityRes
          : stdUcpNotSeletData,
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

      console.log("input from thr L3 data insert  inputData", inputData);

      setTimeout(() => {
        axios
          .post(
            `${HostManager.mainHostL3}/npim/update/responses/from/L3`,
            inputData
          )
          .then((responce) => {
            console.log(responce.data);
            alert(responce.data.value);
            setImmediate(() => {
              setShowInfo(false);
              setModification(!modification);
            });
            setImmediate(() => {
              setLoading(false);
            });
          })
          .catch((error) => {
            console.log(error);
            alert(error);
          });

        reportDropHandler(reportLable);
      }, 1500);
    }

    console.log("all data change ahandler data aia ", allDataFromValidation);

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
      indCategory: "0",
      submitStatus: "report",
      set2Type: allDataFromValidation.typeSet2Res,
      stoneQuality: "0",
      stoneQualityVal: "0",
      rsoName: rsoName,
      npimEventNo: dataRowInformation.npimEventNo,
      IndentLevelType: dataRowInformation.indentLevelType,
      exSize: dataRowInformation.size,
      exUOM: dataRowInformation.uom,
      exIndCategory: dataRowInformation.category,
      exStonequality: dataRowInformation.stoneQuality,
    };

    console.log("input from thr L3 data update   inputData", inputData);

    setTimeout(() => {
      axios
        .post(`${HostManager.mainHostL3}/npim/update/responses`, inputData)
        .then((responce) => {
          console.log(responce.data);

          alert(responce.data.value);
          setImmediate(() => {
            setShowInfo(false);
            setModification(!modification);
          });
        })
        .catch((error) => {
          console.log(error);
          alert(error);
        });
      setImmediate(() => {
        setLoading(false);
      });

      reportDropHandler(reportLable);
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
    console.log("side car clicker in report ");
    setImmediate(() => {
      setBarOpener(!barOpener);
    });
  };

  const statusOpener = () => {
    setImmediate(() => {
      setStatusCloserOpner(!statusCloserOpner);
    });
  };

  const rowDataHandler = (input) => {
    setDataRowInformation(input);
    setImmediate(() => {
      setLoading(true);
      setDataRowInformation(input);
      setShowInfo(true);
      setSwitchEnable(false);
    });

    console.log("input data form row  in report in ", input);
    DisplayValidationRunner();
    scrollTop();

    setTimeout(() => {
      setImmediate(() => {
        setLoading(false);
      });
    }, 1500);
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
    // if (inputObj.stdUCP) {
    //     return true;
    // }
    if (inputObj.si2Ij) {
      return true;
    } else {
      return false;
    }
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
  //     } else {
  //         return false;
  //     }
  //     return tegOfItems;
  // }

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
    // setImmediate(() => { setStoneOption(stoneOptionList) });
    return stoneOptionList;
  }

  // function allDataChangeHandler(allValidationInput) {
  //     console.log("All Data input  From  ", allValidationInput);

  //     setImmediate(() => {
  //         setAllDataFromValidation(allValidationInput)
  //     });

  //     console.log("All Data validation From  ", allDataFromValidation);

  // }

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
    // getAll("findingsRes", findingsData.target.value)
  }

  const getAll = (name, value) => {
    allDataFromValidation[name] = value;

    setAllDataFromValidation();

    // const [allDataFromValidation, setAllDataFromValidation] = useState({

    console.log("data form the get all method   :", allDataFromValidation);
    console.log("name : ", name, "value : ", value);
  };

  function tegSelectionResHandler(tegSelectionData) {
    if (tegSelectionData.target.value === "Separate") {
      axios
        .get(
          `${HostManager.mailHostAdmin}/npim/get/set/category/list/${dataRowInformation.itemCode}`
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
          `${HostManager.mailHostAdmin}/npim/item/set/category/code/${dataRowInformation.itemCode}`
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

  // function displayPresentValidation(input) {

  //     if (seventhDigits === "B" || seventhDigits === "C" || seventhDigits === "F" || seventhDigits === "R" ||
  //         seventhDigits === "V" || seventhDigits === "W" || seventhDigits === "Y") {

  //         let sizeUomQuantity, sizeQuantity, stoneQuality;

  //         sizeUomQuantity = allDataFromValidation.sizeUomQuantityRes;
  //         sizeQuantity = allDataFromValidation.sizeQuantityRes;
  //         stoneQuality = allDataFromValidation.stoneQualityRes;

  //         if (seventhDigits === "V" && !stoneQualityCheck(dataRowInformation)) {

  //             if (sizeUomQuantity.length > 0) {

  //                 for (const element of sizeUomQuantity) {
  //                     let condData = (element.size && (element.uom8 || element.uom6 || element.uom4 ||
  //                         element.uom2 || element.uom1)) ? console.log("fine") : element.size;

  //                     if (condData) {
  //                         return {
  //                             alert: "indent Quantity Required for size: " + condData,
  //                             status: false
  //                         }
  //                     }
  //                 }

  //                 let dataRes = {
  //                     status: true,
  //                     alert: "sucess",
  //                     data: 0
  //                 };

  //                 return dataRes;

  //             } else {
  //                 return {
  //                     alert: "indent Quantity Required ",
  //                     status: false
  //                 }
  //             }

  //         } else if ((seventhDigits === "V" || seventhDigits === "C" || seventhDigits === "F"
  //             || seventhDigits === "Y" || seventhDigits === "B") && stoneQualityCheck(dataRowInformation)) {

  //             if (sizeQuantity.length > 0 && stoneQualityCheck(dataRowInformation)) {

  //                 for (const element of sizeQuantity) {
  //                     let condData = (element.size && element.quantity) ? console.log("fine") : element.size;

  //                     if (condData) {
  //                         return {
  //                             alert: "indent Quantity Required for size: " + condData,
  //                             status: false
  //                         }
  //                     }

  //                 }

  //                 if (!stoneQuality) {

  //                     let dataRes = {
  //                         status: true,
  //                         alert: "sucess",
  //                         data: input
  //                     };

  //                     return dataRes;
  //                     // {
  //                     //     alert: "indent Stone Quality Required  ",
  //                     //     status: false
  //                     // }
  //                 }

  //             } else {
  //                 return {
  //                     alert: "indent Quantity Require ",
  //                     status: false
  //                 }
  //             }

  //         } else if ((digit === "C" || digit === "F" || digit === "Y" || digit === "B") && !stoneQualityCheck(dataRowInformation)) {

  //             if (sizeQuantity.length > 0 && !stoneQualityCheck(dataRowInformation)) {

  //                 for (const element of sizeQuantity) {
  //                     let condData = (element.size && element.quantity) ? console.log("fine") : element.size;

  //                     if (condData) {
  //                         return {
  //                             alert: "indent Quantity Required for size: " + condData,
  //                             status: false
  //                         }
  //                     }

  //                 }

  //             } else {
  //                 return {
  //                     alert: "indent Quantity Require ",
  //                     status: false
  //                 }
  //             }

  //         }

  //     } else if (seventhDigits === "E" || seventhDigits === "N" || seventhDigits === "P" || seventhDigits === "2" ||
  //         seventhDigits === "3" || seventhDigits === "0" || seventhDigits === "1" || seventhDigits === "4" || seventhDigits === "5" || seventhDigits === "6" || seventhDigits === "7") {

  //         let tegQuantity, TypeSet2, Quantity, stoneQuality;

  //         tegQuantity = allDataFromValidation.tegQuantityRes;
  //         TypeSet2 = allDataFromValidation.typeSet2Res;
  //         Quantity = allDataFromValidation.quantityRes;
  //         stoneQuality = allDataFromValidation.stoneQualityRes;

  //         if (seventhDigits === "0" || seventhDigits === "1" || seventhDigits === "2" || seventhDigits === "3" ||
  //             seventhDigits === "P" || seventhDigits === "E" || seventhDigits === "N" || seventhDigits === "4" || seventhDigits === "5" || seventhDigits === "6" || seventhDigits === "7") {

  //             //CHECK THE CONDITION AND CHILD CODE ABD ADD THE DTAA IN DROPDOWN

  //             // (tegOfItemOption) ? tegQuantity = true : Quantity = true;

  //             if (tegQuantity.length > 0) {

  //                 for (const element of tegQuantity) {
  //                     let condData = (element.tag && element.quantity) ? console.log("fine") : element.tag;

  //                     if (condData) {
  //                         return {
  //                             alert: "indent Quantity Required for teg: " + condData,
  //                             status: false
  //                         }
  //                     }
  //                 }

  //             } else if (!Quantity) {
  //                 return {
  //                     alert: "indent Quantity Required  ",
  //                     status: false
  //                 }
  //             }
  //             if (!stoneQuality) {

  //                 let dataRes = {
  //                     status: true,
  //                     alert: "sucess",
  //                     data: input
  //                 };

  //                 return dataRes;
  //                 // {
  //                 //     alert: "indent Stone Quality Required  ",
  //                 //     status: false
  //                 // }
  //             }

  //         }

  //         if ((seventhDigits === "N" || seventhDigits === "E" || seventhDigits === "2") && !stoneQualityCheck(dataRowInformation)) {
  //             if (!TypeSet2) {
  //                 return {
  //                     alert: "indent TypeSet2 Required  ",
  //                     status: false
  //                 }
  //             }
  //         }

  //     } else {

  //         let findings, stoneQuality, Quantity;
  //         findings = allDataFromValidation.findingsRes;
  //         stoneQuality = allDataFromValidation.stoneQualityRes;
  //         Quantity = allDataFromValidation.quantityRes;

  //         if (seventhDigits === "S" || seventhDigits === "D" || seventhDigits === "J") {
  //             if (!findings) {
  //                 return {
  //                     alert: "indent Findings Required  ",
  //                     status: false
  //                 }
  //             }
  //         }
  //         if (!Quantity) {
  //             return {
  //                 alert: "indent Quantity Required  ",
  //                 status: false
  //             }
  //         }
  //         if (!stoneQuality) {

  //             let dataRes = {
  //                 status: true,
  //                 alert: "sucess",
  //                 data: input
  //             };

  //             return dataRes;
  //             // {
  //             //     alert: "indent Stone Quality Required  ",
  //             //     status: false
  //             // }
  //         }

  //     }

  //     return {
  //         alert: "sucess  ",
  //         status: true
  //     }

  // }

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

      <Drawer anchor="top" open={statusCloserOpner} onClose={statusOpener}>
        <StatusTabular statusData={statusData} />
      </Drawer>

      <Container className={classes.root} maxWidth="xl">
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <UpperHeader
              // itemCode={dataRowInformation.itemCode}
              storeCode={storeCode}
              // storeCode
            />
            <Loading flag={loading} />
            <ReportsAppBar
              reportDropHandler={reportDropHandler}
              reporOptions={[
                "Item_Wise_Report",
                "ConsumerBase",
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
                  <Paper className={classes.innerHightCss}>
                    <div className={classes.imgShow}>
                      <ImgShow
                        itemCode={dataRowInformation.itemCode}
                        imgLink="https://tanishqdigitalnpim.titan.in/NpimImages/"
                        videoLink=""
                      />
                    </div>
                  </Paper>
                </Grid>
                <Grid item xs={12} sm={7} style={{ marginTop: "0.65%" }}>
                  <Paper className={classes.innerHightCss}>
                    <div className={classes.productInfo}>
                      <Grid container spacing={2}>
                        <Grid item xs={12}>
                          <Typography
                            className={classes.headingColor}
                            align="center"
                          >
                            {dataRowInformation.itemCode}
                          </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          {/* <Paper> */}
                          <ProductDetailsTabularL3
                            information={dataRowInformation}
                          />
                          {/* </Paper> */}
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          {/* <Paper> */}

                          <div>
                            <Typography
                              className={classes.haddingCss}
                              align="center"
                            >
                              Indent Details
                            </Typography>
                            <Container>
                              <Grid container spacing={2}>
                                {dataRowInformation.itemCode[6] && digit ? (
                                  <DisplayValidationComponent
                                    digit={dataRowInformation.itemCode[6]}
                                    // digit="V"
                                    cond={stoneQualityCheck(dataRowInformation)}
                                    //cond={false}
                                    // sizeOptionList={sizeOption}
                                    itemCode={dataRowInformation.itemCode}
                                    stoneOptionList={stoneOptionsData(
                                      dataRowInformation
                                    )}
                                    setType2option={["Need-Chain", "Need-Dori"]}
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
                                    sizeQuantityResHandler={
                                      sizeQuantityResHandler
                                    }
                                    stoneQualityResHandler={
                                      stoneQualityResHandler
                                    }
                                    tegQuantityResHandler={
                                      tegQuantityResHandler
                                    }
                                    typeSet2ResHandler={typeSet2ResHandler}
                                    quantityResHandler={quantityResHandler}
                                    findingsResHandler={findingsResHandler}
                                    tegSelectionResHandler={
                                      tegSelectionResHandler
                                    }
                                    setSelectResHandler={tegQuantityResHandler}
                                    feedShowState={dataRowInformation}
                                    allDataFromValidation={
                                      allDataFromValidation
                                    }
                                  />
                                ) : null}
                              </Grid>
                            </Container>
                          </div>
                          {/* </Paper> */}
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
                        <Grid item xs={12}>
                          {/* <Paper> */}
                          <Container>
                            <Grid container spacing={4}>
                              {reportLable !== "Cancel_Item_List" ? (
                                <Grid item xs={12} sm={6}>
                                  <Button
                                    variant="outlined"
                                    color="primary"
                                    fullWidth
                                    onClick={onClickCancelBtnHandler}
                                  >
                                    Cancel Indent
                                  </Button>
                                </Grid>
                              ) : null}
                              <Grid
                                item
                                xs={12}
                                sm={reportLable !== "Cancel_Item_List" ? 6 : 12}
                              >
                                <Button
                                  variant="outlined"
                                  color="secondary"
                                  fullWidth
                                  onClick={onClickSubmitBtnHandler}
                                >
                                  Submit
                                </Button>
                              </Grid>
                            </Grid>
                          </Container>
                          {/* </Paper> */}
                        </Grid>
                      </Grid>
                    </div>
                  </Paper>
                </Grid>
              </Grid>
            </Grid>
          ) : null}
          <Grid item xs={12} sm={12} fullWidth>
            {/* <Container maxWidth="xl"  > */}
            {/* <Paper> */}

            {rows.length > 0 && col.length > 0 ? (
              <LazyLoadindDataGrid
                col={col}
                rows={rows}
                autoHeight={true}
                autoPageSize={true}
                reportLable={reportLable}
                rowDataHandler={rowDataHandler}
                handelOpen={handelOpen}
                handelClose={handelClose}
                handelYes={handelYes}
                popupopen={popupopen}
              />
            ) : (
              <Typography align="center" variant="h5" color="secondary">
                {" "}
                No Data Found...!
              </Typography>
            )}
            {/* </Paper> */}
            {/* </Container> */}
          </Grid>
        </Grid>
      </Container>
    </>
  );
};
export default ReportL3;
