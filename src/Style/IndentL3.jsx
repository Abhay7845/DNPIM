import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles({
  root: {
    margin: "0%",
    padding: "0%",
  },

  hidden: {
    display: "none",
  },
  show: {
    display: "block",
  },
  headingColor: {
    backgroundColor: "#c4c4c0",
    fontWeight: "bolder",
  },
  heightCss: {
    minHeight: "50vh",
  },
  heightOuter: {
    minHeight: "78vh",
    maxHeight: "100vh",
  },
  buttonSpacing: {
    marginTop: "3%",
  },
  btn: {
    fontWeight: 500,
    fontSize: "14px",
    fontFamily: "Raleway, sans-serif",
    letterSpacing: "2px",
    padding: "5px",
  },

  btnSub: {
    fontWeight: 500,
    fontSize: "14px",
    fontFamily: "Raleway, sans-serif",
    letterSpacing: "2px",
    padding: "5px",
    backgroundColor: "black",
    color: "white",
  },
  hadingCss: {
    fontWeight: "bolder",
    fontStretch: "normal",
    fontSize: "16px",
    lineHeight: "normal",
    fontFamily: "Raleway, sans - serif",
    letterSpacing: "2px",
  },
});
