import {
  Container,
  CssBaseline,
  Grid,
  Paper,
  makeStyles,
  Button,
  Typography,
  Drawer,
} from "@material-ui/core";
import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import {
  DataGridForAdmin,
  SelectOfMUI,
  TextFieldOfMUI,
} from "../Components/ComponentFroAdmin";
import Loading from "../Components/Loading";
import ReportsAppBar from "../Components/ReportsAppBar";
import SideAppBar from "../Components/SideAppBar";
import UpperHeader from "../Components/UpperHeader";
import UrlManager from "../HostManager/UrlManager";
import { Alert } from "@material-ui/lab";
const useStyles = makeStyles({
  root: {
    margin: "0%",
    padding: "0%",
  },
});

const DayEndReportAdmin = () => {
  const { storeCode, rsoName } = useParams();

  // const storeCode = "NAt1";
  // const rsoName = "NAt1";

  const classes = useStyles();
  const [endDayReport, setEndDayReport] = useState({
    col: [],
    rows: [],
  });
  const [endDayReportInput, setEndDayReportInput] = useState({
    level: "",
    fromDate: "",
    toDate: "",
  });
  const [fieldAlert, setFieldAlert] = useState({
    flagData: false,
    message: "",
    severity: "",
  });
  const [barOpener, setBarOpener] = useState(false);
  const [loading, setLoading] = useState(false);

  // const navBarList = [
  //     { id: 1, name: "Day End Report", link: `/dayEndreportForAdmin/${storeCode}/${rsoName}`, icon: "ReportIcon" },
  //     // { id: 1, name: "Favorite", link: `/favoriteL3/${storeCode}`, icon: "FeedbackIcon" },
  //     { id: 3, name: "Copy Store Indents", link: `/reportL31/${storeCode}/${rsoName}`, icon: "FeedbackIcon" },
  //     { id: 3, name: "Send Store Report", link: `/SendStoreReportAdmin/${storeCode}/${rsoName}`, icon: "FeedbackIcon" },
  // ];

  const navBarList = [
    {
      id: 1,
      name: "Home",
      link: `/AdminHome/${storeCode}/${rsoName}`,
      icon: "HomeIcon",
    },
    {
      id: 2,
      name: "Day End Report",
      link: `/dayEndreportForAdmin/${storeCode}/${rsoName}`,
      icon: "ReportIcon",
    },
    {
      id: 4,
      name: "Send Store Report",
      link: `/SendStoreReportAdmin/${storeCode}/${rsoName}`,
      icon: "SendIcon",
    },
  ];

  function endDayReportCall(inputData) {
    setImmediate(() => {
      setLoading(true);
    });

    axios.get(`${UrlManager.endDayReportForAdmin}/${inputData}`).then(
      (response) => {
        console.log(response);

        if (response.data.code === "1001") {
          setImmediate(() => {
            setFieldAlert({
              flagData: true,
              message: response.data.value,
              severity: "error",
            });
            setEndDayReport({
              col: [],
              rows: [],
            });
            setLoading(false);
          });

          // alert(response.data.value);
        } else {
          setImmediate(() => {
            setFieldAlert({
              flagData: true,
              message: "Successful...!",
              severity: "success",
            });
            console.log(response.data.coloum, "headings");
            console.log(response.data.value, "values");
            setEndDayReport({
              col: response.data.coloum,
              rows: response.data.value,
            });
            setLoading(false);
          });
        }
      },
      (error) => {
        console.log(error);
        setLoading(false);
        alert(error);
      }
    );
  }

  const onChangeInputHandler = (event) => {
    console.log(event.target.value);
    const { name, value } = event.target;
    setEndDayReportInput((old) => {
      return {
        ...old,
        [name]: value,
      };
    });
  };

  const onClickGenrateReport = (event) => {
    let { level, fromDate, toDate } = endDayReportInput;

    if (!level) {
      setImmediate(() => {
        setFieldAlert({
          flagData: true,
          message: "Please Choose Any Level...!",
          severity: "error",
        });
      });
    } else if (!fromDate) {
      setImmediate(() => {
        setFieldAlert({
          flagData: true,
          message: "Please Choose Any From Date ...!",
          severity: "error",
        });
      });
    } else if (!toDate) {
      toDate = fromDate;
    }
    if (level && fromDate && toDate) {
      endDayReportCall(`?fromDate=${fromDate}&level=${level}&toDate=${toDate}`);
    }
  };

  return (
    <>
      <CssBaseline />

      <Drawer
        anchor="left"
        open={barOpener}
        onClose={() => {
          setImmediate(() => {
            setBarOpener(false);
          });
        }}
      >
        <SideAppBar
          navBarList={navBarList}
          pageName="admin"
          // statusOpener={statusOpener}
        />
      </Drawer>

      <Container maxWidth="xl" className={classes.root}>
        <Grid container>
          <Grid item xs={12} sm={12}>
            <UpperHeader itemCode={123} storeCode={storeCode} />
            <Loading flag={loading} />
          </Grid>
          <Grid item xs={12} sm={12}>
            <ReportsAppBar
              barHandler={() => {
                setImmediate(() => {
                  setBarOpener(true);
                });
              }}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <Container style={{ marginTop: "2%" }}>
              <Paper>
                {fieldAlert.flagData ? (
                  <Alert severity={fieldAlert.severity}>
                    {fieldAlert.message}
                  </Alert>
                ) : (
                  ""
                )}
                <Grid container>
                  <Grid item xs={6} sm={3}>
                    <SelectOfMUI
                      lable="Level"
                      optionList={["L1/L2", "L3"]}
                      selectHandleChange={onChangeInputHandler}
                      value={endDayReportInput.level}
                      name="level"
                    />
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <TextFieldOfMUI
                      lable="From"
                      type="date"
                      textFieldHandlerChange={onChangeInputHandler}
                      value={endDayReportInput.fromDate}
                      name="fromDate"
                    />
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <TextFieldOfMUI
                      lable="To"
                      type="date"
                      textFieldHandlerChange={onChangeInputHandler}
                      value={endDayReportInput.toDate}
                      name="toDate"
                    />
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <Button
                      color="inherit"
                      variant="contained"
                      fullWidth
                      style={{ minHeight: "100%" }}
                      onClick={onClickGenrateReport}
                    >
                      Generate Report{" "}
                    </Button>
                  </Grid>
                </Grid>
              </Paper>
            </Container>
          </Grid>
        </Grid>
      </Container>

      <Container maxWidth="xl">
        {endDayReport.col[0] && endDayReport.rows[0] ? (
          <DataGridForAdmin
            col={endDayReport.col}
            rows={endDayReport.rows}
            reportLable="End Day Report"
          />
        ) : null}
      </Container>
    </>
  );
};

export default DayEndReportAdmin;
