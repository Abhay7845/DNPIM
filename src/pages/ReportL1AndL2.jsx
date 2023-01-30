import {
  Grid,
  makeStyles,
  Typography,
  Button,
  Toolbar,
  IconButton,
  AppBar,
  Drawer,
  Paper,
  FormGroup,
  FormControlLabel,
  Switch,
} from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import DropdownField from "../Components/DropdownField";
import TableConponent from "../Components/TableConponent";
import MenuIcon from "@material-ui/icons/Menu";
import UpperHeader from "../Components/UpperHeader";
import SideAppBar from "../Components/SideAppBar";
import { useParams } from "react-router-dom";
import ProductInfo from "../Components/ProductInfo";
import NpimDataDisplay from "../Components/NpimDataDisplay";
import HostManager from "../HostManager/HostManager";
import StatusTabular from "../Components/StatusTabular";
import Loading from "../Components/Loading";

const useStyles = makeStyles({
  root: {
    textAlign: "center",
  },
  reportDrop: {
    width: "50%",
    marginTop: "1%",
  },
  appBar: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: 2,
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },

  hidden: {
    display: "none",
  },
  show: {
    display: "block",
  },
});

const ReportL1AndL2 = (props) => {
  const { storeCode, rsoName } = useParams();

  const classes = useStyles();

  const [loading, setLoading] = useState(false);

  const [report, setReport] = useState([]);
  const [coloum, setColoum] = useState([]);
  const [barOpener, setBarOpener] = useState(false);

  const [editState, setEditState] = useState(false);

  const [productInfo, setProductInfo] = useState(NpimDataDisplay);

  const [selectReportList, setSelectReportList] = useState([
    "yet to submit",
    "submitted",
  ]);

  // , "groupwise", "consumerbase", "collection", "category"
  const [selectReport, setSelectReport] = useState("yet to submit");
  const [showinfo, setShowinfo] = useState(false);
  const [switchEnable, setSwitchEnable] = useState(true);
  const [statusData, setStatusData] = useState({});
  const [statusCloserOpner, setstatusCloserOpner] = useState(false);

  useEffect(() => {
    setImmediate(() => {
      setLoading(true);
    });

    // Rename: Scanned to "submitted" Unscanned to "Yet to Submit" in Reports page for L1 / L2

    setTimeout(() => {
      let reportUrl = "/npim/unscanned/report/L1/";

      switch (selectReport) {
        case "yet to submit":
          reportUrl = "/npim/unscanned/report/L1/";
          break;
        case "submitted":
          reportUrl = "/npim/scanned/report/L1/";
          break;
        case "groupwise":
          reportUrl = "/npim/groupwise/report/L1/";
          break;
        case "consumerbase":
          reportUrl = "/npim/consumerbase/report/L1/";
          break;
        case "collection":
          reportUrl = "/npim/collection/report/L1/";
          break;
        case "category":
          reportUrl = "/npim/category/report/L1/";
          break;

        default:
          reportUrl = "/npim/unscanned/report/L1/";
          break;
      }

      // axios.get(`${HostManager.mainHost}/npim/unscanned/report/L1/${storeCode}`)
      // axios.get(`http://localhost:8585/NPIM/npim/unscanned/report/L1/${storeCode}`)
      axios.get(`${HostManager.mainHost}${reportUrl}${storeCode}`).then(
        (response) => {
          if (response.data.code === "1000") {
            let data = response.data;
            setReport(data.value);
            setColoum(data.coloum);
            console.log(data);
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

      axios.get(`${HostManager.mainHost}/npim/status/L1/${storeCode}`).then(
        (response) => {
          console.log(response);

          if (response.data.code === "1001") {
            // alert(response.data.value);
          } else {
            setStatusData(response.data);
          }
        },
        (error) => {
          console.log(error);
          alert(error);
        }
      );

      setShowinfo(false);
      setImmediate(() => {
        setLoading(false);
      });
    }, 1500);
  }, [selectReport, editState]);

  const navBarList = [
    {
      id: 1,
      name: "Home",
      link: `/feedbackL1andL2/${storeCode}/${rsoName}`,
      icon: "HomeIcon",
    },
    // { id: 2, name: "Status", link: "/status", icon: "EqualizerIcon" },
    {
      id: 3,
      name: "Report",
      link: `/reportL1andL2/${storeCode}/${rsoName}`,
      icon: "ReportIcon",
    },
  ];

  const onchangeHandler = (event) => {
    setSelectReport(event.target.value);
    setSwitchEnable(true);
  };

  const scrollTop = () => {
    window.scrollTo({ top: "0", behavior: "smooth" });
  };

  const myBarClickHandler = (event) => {
    setBarOpener(!barOpener);
  };

  const getProdoctData = (data) => {
    scrollTop();
    console.log(data);
    setProductInfo(data);
    setShowinfo(true);
    setSwitchEnable(false);
  };

  const statusOpener = (event) => {
    setstatusCloserOpner(!statusCloserOpner);
  };

  const getResponceFormChild = (input) => {
    setImmediate(() => {
      setLoading(true);
    });

    if (!input.switchData && input.multiSelectDrop.toString().length == 0) {
      alert("Please select reason for NO ...");
      return;
    }
    if (input.qualityRating === 0) {
      alert("Please select Quality Rating ...");
      return;
    }
    if (
      input.qualityRating > 0 &&
      input.qualityRating <= 3 &&
      input.multiSelectQltyfeed.toString().length == 0
    ) {
      alert("Please select reason for QA ...");
      return;
    }
    setProductInfo((old) => {
      if (!input.switchData) {
        old.reasons = input.multiSelectDrop.toString();
        old.saleable = "NO";
        old.rsoName = rsoName;
      } else {
        old.reasons = "";
        old.saleable = "YES";
        old.rsoName = rsoName;
      }
      old.submitStatus = "report";
      old.strCode = storeCode;
      old.quality_Reasons = input.multiSelectQltyfeed.toString();
      old.quality_Rating = input.qualityRating.toString();

      return old;
    });
    setTimeout(
      () => {
        axios
          .post(`${HostManager.mainHost}/npim/insert/responses`, productInfo)
          .then((responce) => {
            console.log(responce.data);
            // if (responce.data.code === "1001") {
            //     alert(responce.data.value)
            // } else {
            // setProductInfo(responce.data.value);
            setSelectReport(selectReport);
            setShowinfo(false);

            // }
          })
          .catch((error) => {
            console.log(error);
            alert(error);
          });
        setImmediate(() => {
          setLoading(false);
        });

        setImmediate(() => {
          setSelectReport(selectReport);
        });

        setImmediate(() => {
          setEditState(!editState);
        });
      },

      1500
    );
  };

  return (
    <>
      <Drawer anchor="left" open={barOpener} onClose={myBarClickHandler}>
        <SideAppBar navBarList={navBarList} statusOpener={statusOpener} />
      </Drawer>

      <Drawer anchor="top" open={statusCloserOpner} onClose={statusOpener}>
        <StatusTabular statusData={statusData} />
      </Drawer>

      <Grid
        container
        spacing={3}

        // direction="column"
        // justify="flex-start"
        // alignItems="center"
      >
        <Grid item xs={12}>
          <UpperHeader storeCode={storeCode} />
          <Loading flag={loading} />
          <div className={classes.appBar}>
            <AppBar position="static" color="#f2feff">
              <Toolbar>
                <div className={classes.menuButton}>
                  <IconButton
                    onClick={myBarClickHandler}
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                  >
                    <MenuIcon />
                  </IconButton>
                </div>
                <Grid container>
                  <Grid item xs={12} sm={8}>
                    <div className={classes.title}>
                      <div className={classes.reportDrop}>
                        <DropdownField
                          name="Select Report Type"
                          value={selectReport}
                          lableName="Select Report Type"
                          bigSmall={false}
                          dropList={selectReportList}
                          myChangeHandler={onchangeHandler}
                        />
                      </div>
                    </div>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <FormGroup row className={classes.feedbackSwitch}>
                      <FormControlLabel
                        control={
                          <Switch
                            checked={showinfo}
                            onChange={() => setShowinfo(!showinfo)}
                            name="feedbackSwitch"
                            color="secondary"
                            disabled={switchEnable}
                          />
                        }
                        label="Product Description"
                      />
                    </FormGroup>
                  </Grid>
                </Grid>
              </Toolbar>
            </AppBar>
          </div>
        </Grid>

        <Grid item xs={12} className={showinfo ? classes.show : classes.hidden}>
          {report.length > 0 && coloum.length > 0 ? (
            <ProductInfo
              productInfo={productInfo}
              getResponceFormChild={getResponceFormChild}
              showinfo={showinfo}
            />
          ) : (
            "NO DATA"
          )}
        </Grid>
        <Grid item xs={12}>
          {report.length > 0 && coloum.length > 0 ? (
            <TableConponent
              report={report}
              coloum={coloum}
              reportType={selectReport}
              getProdoctData={getProdoctData}
              reportName={selectReport}
            />
          ) : (
            " no daata "
          )}
        </Grid>
      </Grid>
    </>
  );
};
export default ReportL1AndL2;
