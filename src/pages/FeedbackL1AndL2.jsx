import React, { useEffect, useState } from "react";
import Rating from "@mui/material/Rating";
import StarIcon from "@material-ui/icons/Star";
import "bootstrap/dist/css/bootstrap.min.css";
import "../Style/CssStyle/FeedbackL1AndL2.css";
import UpperHeader from "../Components/UpperHeader";
import LowerHeader from "../Components/LowerHeader";
import MuliSelectDropdownField, {
  MuliSelectDropdownFieldQualityFeedback,
} from "../Components/MuliSelectDropdownField";
import axios from "axios";
import NpimDataDisplay from "../Components/NpimDataDisplay";
import {
  FormGroup,
  FormControlLabel,
  Switch,
  makeStyles,
  Grid,
  Button,
  Container,
  Typography,
  CssBaseline,
} from "@material-ui/core";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { useParams } from "react-router";
import HostManager from "../HostManager/HostManager";
import Loading from "../Components/Loading";
import StaticTabularInformation from "../Components/StaticTabularInformation";
import WarningPopup from "../Components/WarningPopup";
import ImgShow from "../Components/ImgShow";
import AlertPopup from "../Components/AlertPopup";

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
  feedbackSwitch: {
    justifyContent: "center",
    marginTop: "15px",
  },
  btnGroup: {
    minWidth: "100%",
  },
  hidden: {
    display: "none",
  },
  show: {
    display: "block",
  },
  btnGroupContainer: {
    paddingTop: "13%",
  },
  card: {
    maxWidth: "22rem",
    height: "55vh",
    margin: "5%",
  },

  img_show: {
    width: "22vw",
    height: "50vh",
  },

  img_info_show: {
    padding: "1%",
  },
  feedback_show: {
    marginTop: "2 %",
  },
  pro_info: {
    marginTop: "8%",
    height: "20rem",
  },
  feed_info: {
    marginTop: "8%",
    height: "20rem",
  },
  headingColor: {
    backgroundColor: "#832729",
    fontWeight: "bolder",
    color: "#ffff",
  },

  headingCss: {
    fontWeight: "bolder",
    fontStretch: "normal",
    fontSize: "16px",
    lineHeight: "normal",
    fontFamily: "Raleway, sans - serif",
    letterSpacing: "2px",
  },
  btn: {
    fontWeight: "bold",
    fontSize: "14px",
    fontFamily: "Raleway, sans-serif",
    letterSpacing: "2px",
    padding: "5px",
  },

  btnSub: {
    fontWeight: "bold",
    letterSpacing: "2px",
    backgroundColor: "#832729",
    color: "white",
  },
});

const FeedbackL1AndL2 = () => {
  const classes = useStyles();
  const { storeCode, rsoName } = useParams();
  const [feedShowState, setFeedShowState] = useState(NpimDataDisplay);
  const [multiSelectDrop, setMultiSelectDrop] = useState([]);
  const [multiSelectQltyfeed, setMultiSelectQltyFeedback] = useState([]);
  const [loading, setLoading] = useState(false);
  const [switchData, setSwitchData] = useState(true);
  const [resetDrop, SetResetDrop] = useState(true);
  const [value, setValue] = useState(0);
  const [warningPopupState, setWarningPopupState] = useState(false);
  const [alertPopupStatus, setAlertPopupStatus] = useState({
    status: false,
    main: "",
    contain: "",
    mode: false,
  });
  const [productDetails, setProductDetails] = useState({
    storeCode: storeCode,
    collection: "ALL",
    consumerBase: "ALL",
    group: "ALL",
    category: "ALL",
  });
  const [statusData, setStatusData] = useState({});
  const navBarList = [
    {
      id: 1,
      name: "Home",
      link: `/feedbackL1andL2/${storeCode}/${rsoName}`,
      icon: "HomeIcon",
    },
    {
      id: 3,
      name: "Report",
      link: `/reportL1andL2/${storeCode}/${rsoName}`,
      icon: "ReportIcon",
    },
  ];

  const handleChange = (event) => {
    setSwitchData(!switchData);
    console.log(switchData);
  };
  useEffect(() => {
    setImmediate(() => {
      setLoading(true);
    });
    setTimeout(() => {
      axios
        .post(
          `${HostManager.mainHost}/npim/get/product/details`,
          productDetails
        )
        .then((response) => {
          console.log("response==>", response.data);
          let mailSms = "";
          if (response.data.code === "1001") {
            mailSms = "No more data available for the selected category.";
            setImmediate(() => {
              setAlertPopupStatus({
                status: true,
                main: mailSms,
                contain: "",
                mode: true,
              });
            });
          } else if (response.data.code === "1003") {
            setAlertPopupStatus({
              status: true,
              main: response.data.value,
              contain: "",
              mode: true,
            });
          } else {
            setFeedShowState(response.data.value);
          }
        })
        .catch((error) => {
          console.log("error==>", error);
          alert("Data Not Found");
        });

      axios.get(`${HostManager.mainHost}/npim/status/L1/${storeCode}`).then(
        (response) => {
          if (response.data.code === "1001") {
            console.log("Data Not Found");
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
    }, 1000);
  }, [productDetails]);
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
    console.log("click bar *****************");
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
    });

    setImmediate(() => {
      setLoading(false);
      SetResetDrop(true);
    });
  }
  const onClickSubmitBtnHandler = (event) => {
    setImmediate(() => {
      setLoading(true);
    });

    if (!switchData && multiSelectDrop.toString().length == 0) {
      alert("Please Select Reason for NO");
      return;
    }
    if (value === 0) {
      alert("Please Select Quality Rating");
      return;
    }
    if (value > 0 && value <= 4 && multiSelectQltyfeed.toString().length == 0) {
      alert("Please Select for Low Quality Reason QA");
      return;
    }
    setFeedShowState((old) => {
      if (!switchData) {
        old.reasons = multiSelectDrop.toString();
        old.saleable = "NO";
        old.rsoName = rsoName;
      } else {
        old.reasons = "";
        old.saleable = "YES";
        old.rsoName = rsoName;
      }
      old.collection = productDetails.collection;
      old.consumerBase = productDetails.consumerBase;
      old.itGroup = productDetails.group;
      old.submitStatus = "feedback";
      old.category = productDetails.category;
      old.quality_Reasons = multiSelectQltyfeed.toString();
      old.quality_Rating = value.toString();
      return old;
    });
    setImmediate(() => {
      setLoading(true);
    });
    setTimeout(() => {
      axios
        .post(`${HostManager.mainHost}/npim/insert/responses`, feedShowState)
        .then((response) => {
          console.log("responseL1L2==>", response);
          let mailSms = "";
          if (response.data.code === "1001") {
            setMultiSelectDrop([]);
            setMultiSelectQltyFeedback([]);
            setValue(0);
            document.getElementById("result").style.visibility = "hidden";
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
            }
            setImmediate(() => {
              setAlertPopupStatus({
                status: true,
                main: mailSms,
                contain: "",
                mode: true,
              });
            });
          } else if (response.data.code === "1000") {
            setImmediate(() => {
              setAlertPopupStatus({
                status: true,
                main: "Data has been saved Successfully",
                contain: "",
                mode: true,
              });
            });
            setValue(0);
            setMultiSelectDrop([]);
            setMultiSelectQltyFeedback([]);
            setFeedShowState(response.data.value);
          }
        })
        .catch((error) => {
          console.log("error==>", error);
          setValue(0);
          setMultiSelectDrop([]);
          setMultiSelectQltyFeedback([]);
        });
      setSwitchData(true);
      setImmediate(() => {
        setLoading(false);
      });
    }, 1500);
  };

  const onMultiSelect = (multiSelectData) => {
    setMultiSelectDrop(multiSelectData);
    console.log(multiSelectDrop);
  };
  const onMultiSelectQltyFeedback = (multiSelectQlty) => {
    setMultiSelectQltyFeedback(multiSelectQlty);
    console.log(multiSelectQlty);
  };

  const onClickNextPreBtnHandler = (direction) => {
    setImmediate(() => {
      setLoading(true);
    });
    const Input = {
      storeCode: storeCode,
      collection: productDetails.collection,
      consumerBase: productDetails.consumerBase,
      group: productDetails.group,
      category: productDetails.category,
      itemCode: feedShowState.itemCode,
      direction: direction,
    };

    setTimeout(() => {
      axios
        .post(`${HostManager.mainHost}/npim/get/product/details/PreNex`, Input)
        .then((response) => {
          let mailSms = "";
          if (response.data.code === "1001") {
            mailSms = "No more data available for the selected category.";
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
          } else {
            setFeedShowState(response.data.value);
          }
        })
        .catch((error) => {
          console.log(error);
          alert(error);
        });
      setSwitchData(true);
      setImmediate(() => {
        setLoading(false);
      });
    }, 1500);
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <WarningPopup
        flag={warningPopupState}
        headerSms="No more data available for the selected category"
        subSms="Please click on Agree...!"
        reportLink={`/reportL1andL2/${storeCode}/${rsoName}`}
      />
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

      <Grid container className={classes.root} spacing={2}>
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
              L3={false}
            />
          ) : (
            "Loading...!"
          )}
        </Grid>
        <Grid item xs={12}>
          <div className="container-fluid section-details">
            <div className="p-3 p-md-0 row">
              <div className="col-md-5">
                <div className="img_info_show">
                  {feedShowState.itemCode !== "" ? (
                    <ImgShow
                      className="img_show"
                      itemCode={feedShowState.itemCode}
                      imgLink="https://tanishqdigitalnpim.titan.in/NpimImages/"
                      //imgLink={img}
                      videoLink={feedShowState.videoLink || ""}
                    />
                  ) : (
                    "Loading Images"
                  )}
                </div>
              </div>
              <div className="col-md-7">
                <Typography className={classes.headingColor} align="center">
                  {feedShowState.itemCode}
                </Typography>
                <div className="row my-3">
                  <div className="col-md-6">
                    <div className="pro_info">
                      <h5 className="text-center my-1">
                        <b>PRODUCT DETAILS</b>
                      </h5>
                      <table className="w-100">
                        <tbody>
                          <tr>
                            <th>COLLECTION</th>
                            <td>- &nbsp;&nbsp;</td>
                            <td>{feedShowState.collection}</td>
                          </tr>
                          <tr>
                            <th>NEED STATE</th>
                            <td>-</td>
                            <td>{feedShowState.consumerBase}</td>
                          </tr>
                          <tr>
                            <th>GROUP</th>
                            <td>-</td>
                            <td>{feedShowState.itGroup}</td>
                          </tr>
                          <tr>
                            <th>CATEGORY</th>
                            <td>-</td>
                            <td>{feedShowState.category}</td>
                          </tr>
                          <tr>
                            <th>GENDER</th>
                            <td>-</td>
                            <td>{feedShowState.gender}</td>
                          </tr>
                          <tr>
                            <th>COMPLEXITY</th>
                            <td>-</td>
                            <td>{feedShowState.complexity}</td>
                          </tr>
                          <tr>
                            <th>STD WT</th>
                            <td>-</td>
                            <td>{feedShowState.stdWt}</td>
                          </tr>
                          <tr>
                            <th>STD UCP</th>
                            <td>-</td>
                            <td>{feedShowState.stdUCP}</td>
                          </tr>
                          <tr>
                            <th>METAL COLOR</th>
                            <td>-</td>
                            <td>{feedShowState.colourWt}</td>
                          </tr>
                          <tr>
                            <th>FINDING</th>
                            <td>-</td>
                            <td>{feedShowState.findings}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="feed_info">
                      <h5 className="text-center my-1">
                        <b>FEEDBACK</b>
                      </h5>
                      <FormGroup row className={classes.feedbackSwitch}>
                        <FormControlLabel
                          control={
                            <Switch
                              checked={switchData}
                              onChange={handleChange}
                              name="feedbackSwitch"
                              color="primary"
                            />
                          }
                          label={
                            switchData ? (
                              <Typography color="primary">YES</Typography>
                            ) : (
                              <Typography color="secondary">NO</Typography>
                            )
                          }
                        />
                      </FormGroup>
                      <br />
                      {!switchData ? (
                        <div className="mutli_select_drop">
                          <MuliSelectDropdownField
                            onMultiSelect={onMultiSelect}
                            value={multiSelectDrop}
                          />
                        </div>
                      ) : (
                        ""
                      )}
                      <div>
                        {value > 0 && value <= 4 && (
                          <div className="mutli_select_drop">
                            <MuliSelectDropdownFieldQualityFeedback
                              onMultiSelectQlty={onMultiSelectQltyFeedback}
                              value={multiSelectQltyfeed}
                            />
                          </div>
                        )}
                        <Typography component="legend" align="left">
                          Quality Feedback
                        </Typography>
                        <Rating
                          name="simple-controlled"
                          value={value}
                          onChange={(event, newValue) => {
                            setValue(newValue);
                          }}
                          emptyIcon={<StarIcon />}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                {feedShowState.si2Gh ? (
                  <div className="row-cols-1 staticTabularInfo">
                    <Container m={0} p={0}>
                      <StaticTabularInformation
                        si2Gh={feedShowState.si2Gh}
                        vsGh={feedShowState.vsGh}
                        vvs1={feedShowState.vvs1}
                        i2Gh={feedShowState.i2Gh}
                        si2Ij={feedShowState.si2Ij}
                      />
                    </Container>
                  </div>
                ) : (
                  ""
                )}
                <div className="row-cols-1 btn_feed_show">
                  <Container className={classes.btnGroupContainer}>
                    <Grid container spacing={4}>
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
                          variant="contained"
                          fullWidth
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
                  </Container>
                </div>
              </div>
            </div>
          </div>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};
export default FeedbackL1AndL2;
