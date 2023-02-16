import {
  AppBar,
  Toolbar,
  IconButton,
  FormGroup,
  FormControlLabel,
  Switch,
  makeStyles,
  Grid,
} from "@material-ui/core";
import React from "react";
import MenuIcon from "@material-ui/icons/Menu";
import DropdownField from "./DropdownField";

const useStyles = makeStyles({
  appBar: {
    flexGrow: 1,
    backgroundColor: "#f2feff",
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

function ReportsAppBar(props) {
  const classes = useStyles();
  const {
    barHandler,
    reportOptions,
    reportLable,
    reportDropHandler,
    showInformationHandler,
    showinfo,
    switchEnable,
  } = props;

  return (
    <>
      <div className={classes.appBar}>
        <AppBar position="static" color="inherit">
          <Toolbar>
            <div className={classes.menuButton}>
              <IconButton
                onClick={barHandler}
                edge="start"
                color="inherit"
                aria-label="menu"
              >
                <MenuIcon />
              </IconButton>
            </div>
            <Grid container className="d-flex justify-content-between">
              {reportOptions ? (
                <DropdownField
                  name="Report"
                  labelName="Report"
                  dropList={reportOptions}
                  myChangeHandler={(event) => {
                    reportDropHandler(event.target.value);
                  }}
                />
              ) : null}
              {showInformationHandler ? (
                <FormGroup row>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={showinfo}
                        onChange={showInformationHandler}
                        name="feedbackSwitch"
                        color="secondary"
                        disabled={switchEnable}
                      />
                    }
                    label="Product Description"
                  />
                </FormGroup>
              ) : (
                ""
              )}
            </Grid>
          </Toolbar>
        </AppBar>
      </div>
    </>
  );
}

export default ReportsAppBar;
