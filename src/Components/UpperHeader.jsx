import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

import Logo from "../images/Tanishq_Logo.png";
import { Tooltip } from "@material-ui/core";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    backgroundColor: "#832729",
    color: "#FFFF",
  },

  title: {
    flexGrow: 1,
  },
  projectLogo: {
    flexGrow: 1,
  },
});

export default function UpperHeader(props) {
  const classes = useStyles();
  let navigate = useNavigate();
  const signOutHandler = () => {
    localStorage.removeItem("store_code");
    navigate("/DNpimPortal");
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" color="transparent">
        <Toolbar>
          <div className={classes.projectLogo}>
            <img src={Logo} alt="NOT LOADED" width="80" height="55" />
          </div>

          <Typography variant="h6" className={classes.title}>
            NPIM
          </Typography>
          <Tooltip title="Sign-Out" arrow>
            <Button
              onClick={signOutHandler}
              color="inherit"
              startIcon={<AccountCircleIcon />}
              endIcon={<ExitToAppIcon />}
            >
              {props.storeCode}
            </Button>
          </Tooltip>
        </Toolbar>
      </AppBar>
    </div>
  );
}
