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
  reportDrop: {
    width: "50%",
    marginTop: "1%",
  },
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
        <AppBar position="static" color="default">
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
            <Grid container>
              <Grid item xs={12} sm={6}>
                {reportOptions ? (
                  <div className={classes.title}>
                    <div className={classes.reportDrop}>
                      <DropdownField
                        name="Report"
                        // value={selectReport}
                        lableName="Report"
                        bigSmall={false}
                        dropList={reportOptions}
                        myChangeHandler={(event) => {
                          reportDropHandler(event.target.value);
                        }}
                      />
                    </div>
                  </div>
                ) : null}
              </Grid>
              <Grid item xs={12} sm={6}>
                {showInformationHandler ? (
                  <FormGroup row className={classes.feedbackSwitch}>
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
                )}{" "}
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
      </div>
    </>
  );
}

export default ReportsAppBar;
