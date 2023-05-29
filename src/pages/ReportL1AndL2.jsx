import React, { useEffect, useState } from "react";
import {
  Grid,
  makeStyles,
  Toolbar,
  IconButton,
  AppBar,
  Drawer,
  FormGroup,
  FormControlLabel,
  Switch,
} from "@material-ui/core";
import axios from "axios";
import DropdownField from "../Components/DropdownField";
import TableComponent from "../Components/TableComponent";
import MenuIcon from "@material-ui/icons/Menu";
import UpperHeader from "../Components/UpperHeader";
import SideAppBar from "../Components/SideAppBar";
import { useParams } from "react-router-dom";
import ProductInfo from "../Components/ProductInfo";
import NpimDataDisplay from "../Components/NpimDataDisplay";
import HostManager from "../HostManager/HostManager";
import StatusTabular from "../Components/StatusTabular";
import Loading from "../Components/Loading";
import swal from "sweetalert";

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
  const [colum, setColumn] = useState([]);
  const [barOpener, setBarOpener] = useState(false);
  const [productInfo, setProductInfo] = useState(NpimDataDisplay);
  const [selectReport, setSelectReport] = useState("submitted");
  const [showInfo, setShowInfo] = useState(false);
  const [switchEnable, setSwitchEnable] = useState(true);
  const [statusData, setStatusData] = useState({});
  const [statusCloserOpener, setStatusCloserOpener] = useState(false);
  const selectReportList = ["yet to submit", "submitted"];

  useEffect(() => {
    setImmediate(() => {
      setLoading(true);
    });
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
    axios
      .get(`${HostManager.mainHost}${reportUrl}${storeCode}`)
      .then((response) => {
        if (response.data.code === "1000") {
          setReport(response.data.value);
          setColumn(response.data.coloum);
        } else {
          alert(response.data.value);
        }
      })
      .catch((error) => console.log("error=>", error));
    setShowInfo(false);
    setImmediate(() => {
      setLoading(false);
    });
  }, [selectReport]);

  useEffect(() => {
    axios
      .get(`${HostManager.mainHost}/npim/status/L1/${storeCode}`)
      .then((response) => {
        if (response.data.code === "1001") {
        } else if (response.data.code === "1000") {
          setStatusData(response.data);
        }
      })
      .catch((error) => console.log("error==>", error));
  }, []);

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

  const getProductData = (data) => {
    scrollTop();
    console.log("Data==>", data);
    setProductInfo(data);
    setShowInfo(true);
    setSwitchEnable(false);
  };

  const statusOpener = (event) => {
    setStatusCloserOpener(!statusCloserOpener);
  };

  const getResponseFormChild = (input) => {
    setLoading(true);
    if (!input.switchData && input.multiSelectDrop.toString().length === 0) {
      alert("Please Select Reason for NO");
      return;
    }
    if (input.qualityRating === 0) {
      alert("Please Select Quality Rating");
      return;
    }
    if (
      input.qualityRating > 0 &&
      input.qualityRating <= 4 &&
      input.multiSelectQtyFeed.toString().length === 0
    ) {
      alert("Please Select Reason for QA");
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
      old.quality_Reasons = input.multiSelectQtyFeed.toString();
      old.quality_Rating = input.qualityRating.toString();
      return old;
    });
    console.log("productInfo==>", productInfo);
    axios
      .post(`${HostManager.mainHostL3}/npim/update/responses`, productInfo)
      .then((response) => {
        if (response.data.code === "1000") {
          swal({
            title: "Success!",
            text: "Your Data Has been Updated Successfully",
            icon: "success",
            buttons: "OK",
          });
        }
      })
      .catch((error) => {
        console.log("error==>", error);
      });
  };

  return (
    <>
      <Drawer anchor="left" open={barOpener} onClose={myBarClickHandler}>
        <SideAppBar navBarList={navBarList} statusOpener={statusOpener} />
      </Drawer>
      <Drawer anchor="top" open={statusCloserOpener} onClose={statusOpener}>
        <StatusTabular statusData={statusData} />
      </Drawer>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <UpperHeader storeCode={storeCode} />
          <Loading flag={loading} />
          <div className={classes.appBar}>
            <AppBar position="static" color="default">
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
                            checked={showInfo}
                            onChange={() => setShowInfo(!showInfo)}
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
        <Grid item xs={12} className={showInfo ? classes.show : classes.hidden}>
          {report.length > 0 && colum.length > 0 ? (
            <ProductInfo
              productInfo={productInfo}
              getResponseFormChild={getResponseFormChild}
              showinfo={showInfo}
            />
          ) : (
            <p className="text-center">No Date</p>
          )}
        </Grid>
        <Grid item xs={12}>
          {report.length > 0 && (
            <TableComponent
              report={report}
              coloum={colum}
              reportType={selectReport}
              getProdoctData={getProductData}
              reportName={selectReport}
            />
          )}
        </Grid>
      </Grid>
    </>
  );
};
export default ReportL1AndL2;
