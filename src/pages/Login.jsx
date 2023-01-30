import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import InputField from "../Components/InputField";
import PersonIcon from "@material-ui/icons/Person";
import PublicIcon from "@material-ui/icons/Public";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import Logo from "../images/Tanishq_Logo.png";
import axios from "axios";
import BackgroundAttachment from "../images/back.jpg";
import { Button, Container, makeStyles, Typography } from "@material-ui/core";
import { useHistory } from "react-router";
import HostManager from "../HostManager/HostManager";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

const useStyles = makeStyles({
  root: {
    width: "100wh",
    height: "100vh",
    backgroundRepeat: "no-repeat",
    backgroundImage: "url(" + BackgroundAttachment + ")",
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundAttachment: "fixed",
  },

  containerStyle: {
    paddingTop: "10%",
  },

  submitBtn: {
    // width: "50%",
    width: "100%",

    backgroundColor: "#ffd54f",
  },
});

const Login = () => {
  const history = useHistory();

  const classes = useStyles();
  const [errorSms, setErrorSms] = useState("");
  const [loginData, setLoglinData] = useState({
    uname: "",
    pwd: "",
    rso: "",
  });
  const [flag, setFlag] = useState(false);

  const [level, setLevel] = useState("");
  const OnChangeInput = (event) => {
    const { name, value } = event.target;

    setImmediate(() => {
      setLoglinData(function (preData) {
        switch (name) {
          case "uname":
            return {
              ...preData,
              [name]: value,
            };
          case "pwd":
            return {
              ...preData,
              [name]: value,
            };
          case "rso":
            return {
              ...preData,
              [name]: value,
            };
        }
      });
    });
  };

  const fieldValidator = (fieldValue, fieldName) => {
    if (fieldValue === "") {
      setErrorSms(`${fieldName} is Required...!`);
      return undefined;
    } else {
      return fieldValue;
    }
  };
  const OnClickHandler = (inputFrom) => {
    console.log("Data is Tha data in the data ", inputFrom);

    let inputData = {
      userID: fieldValidator(loginData.uname, "USERNAME"),
      password: fieldValidator(loginData.pwd, "PASSWORD"),
      region: fieldValidator(loginData.rso, "RSO NAME"),
      role: "",
      status: "",
      validInvalid: "",
    };

    if (inputData.userID && inputData.password && inputData.region) {
      // axios.post("http://localhost:8585/NPIM/npim/user/login", inputData).
      axios
        .post(`${HostManager.mainHost}/npim/user/login`, inputData)
        .then((responce) => {
          console.log(responce.data.value.role);
          setImmediate(() => {
            setLevel(responce.data.value.role);
          });

          if (responce.data.value.status === "open") {
            localStorage.setItem("store_value", responce.data.value.role);
            if (inputFrom === "DNPIM") {
              if (
                responce.data.value.role === "L1" ||
                responce.data.value.role === "L2"
              ) {
                history.push(
                  `/feedbackL1andL2/${responce.data.value.userID}/${loginData.rso}`
                );
              } else if (responce.data.value.role === "L3") {
                history.push(
                  `/indentL3/${responce.data.value.userID}/${loginData.rso}`
                );
              } else if (responce.data.value.role === "Admin") {
                history.push(
                  `/AdminHome/${responce.data.value.userID}/${loginData.rso}`
                );
              }
            } else if (inputFrom === "PNPIM") {
              if (
                responce.data.value.role === "L1" ||
                responce.data.value.role === "L2"
              ) {
                history.push(
                  `/FeedbacL1AndL2ForPhysical/${responce.data.value.userID}/${loginData.rso}`
                );
              } else if (responce.data.value.role === "L3") {
                history.push(
                  `/indentL3/kkk/${responce.data.value.userID}/${loginData.rso}`
                );
              } else if (responce.data.value.role === "Admin") {
                history.push(
                  `/AdminHome/jkk/${responce.data.value.userID}/${loginData.rso}`
                );
              }
            }
          } else if (responce.data.value.status === "close") {
            setImmediate(() => {
              setFlag(true);
            });
          }
        })
        .catch((error) => {
          //console.log(error.status);
          setErrorSms(`Wrong Combination of User Id and Password...!`);
          // switch (error.response.status) {
          //     case 401:
          //         setErrorSms(`Wrong Combination of User Id and Password...!`)
          //         break;
          //     case 500:
          //         alert(error.status, error);
          //         break;
          //     case 400:
          //         alert(error.status, error);
          //         break;
          //     default:
          //         alert(error);
          //         break;
          // }
        });
    }
  };

  const handleClose = () => {
    setImmediate(() => {
      setFlag(false);
    });
  };
  const goHandler = () => {
    history.push(
      `/PortelCloseReport/${loginData.uname}/${loginData.rso}/${level}`
    );
  };

  return (
    <React.Fragment>
      <div>
        <Dialog
          open={flag}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            <Typography variant="h6" color="secondary" align="center">
              {" "}
              NPIM Portel Closed...!
            </Typography>
          </DialogTitle>

          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              <Typography
                variant="subtitle2"
                color="textSecondary"
                align="center"
              >
                You can see the Report
              </Typography>
            </DialogContentText>
          </DialogContent>

          <DialogActions>
            <Button onClick={handleClose} color="primary" autoFocus>
              OK
            </Button>

            <Button onClick={goHandler} color="primary" autoFocus>
              Go TO Report
            </Button>
          </DialogActions>
        </Dialog>
      </div>

      <div className={classes.root}>
        <Container
          maxWidth="lg"
          align="center"
          className={classes.containerStyle}
        >
          <div className="card border" style={{ width: "30%", height: "25%" }}>
            <div className="card-body ">
              <div className="text-center mb-2  ">
                <img
                  src={Logo}
                  className="rounded"
                  alt="not Loded"
                  width="80"
                  height="60"
                />
              </div>
              <div className="text-sm-center">
                <span style={{ color: "red" }}>
                  {errorSms !== "" ? errorSms : null}
                </span>
              </div>
              <InputField
                value={loginData.uname}
                name="uname"
                lableName={<PersonIcon />}
                placeholderName="Enter Username "
                onHendler={OnChangeInput}
                type="text"
              />
              <InputField
                value={loginData.pwd}
                name="pwd"
                lableName={<VpnKeyIcon />}
                placeholderName="Enter Password "
                onHendler={OnChangeInput}
                type="password"
              />

              <InputField
                value={loginData.rso}
                name="rso"
                lableName={<PublicIcon />}
                placeholderName="Enter RSO "
                onHendler={OnChangeInput}
                type="text"
              />

              {/* <Button className={classes.submitBtn} variant="contained" onClick={() => OnClickHandler("DNPIM")}>
                            Digital NPIM
                        </Button>
                        <Button className={classes.submitBtn} variant="contained" onClick={() => OnClickHandler("PNPIM")}>
                            Physical NPIM
                        </Button> */}
              <Button
                className={classes.submitBtn}
                variant="contained"
                onClick={() => OnClickHandler("DNPIM")}
              >
                Submit
              </Button>
            </div>
          </div>
        </Container>
      </div>
    </React.Fragment>
  );
};
export default Login;
