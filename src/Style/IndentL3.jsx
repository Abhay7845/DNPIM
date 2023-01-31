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
    backgroundColor: "#832729",
    fontWeight: "bolder",
    color: "#ffff",
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
    padding: "2%",
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
    padding: "5px",
    backgroundColor: "#832729",
    color: "#ffff",
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
