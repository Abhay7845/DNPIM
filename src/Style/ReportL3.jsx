import { makeStyles } from "@material-ui/core";

export const useStyle = makeStyles({
  root: {
    width: "100%",
    height: "100%",
    margin: "0%",
    padding: "0%",
  },
  imgShow: {
    margin: "4%",
  },
  productInfo: {
    marginTop: "3%",
    height: "64vh",
  },
  hidden: {
    display: "none",
  },
  show: {
    display: "block",
  },
  hadingCss: {
    fontWeight: "bolder",
    fontStretch: "normal",
    fontSize: "16px",
    lineHeight: "normal",
    fontFamily: "Raleway, sans - serif",
    letterSpacing: "2px",
  },
  innerHightCss: {
    minHeight: "80vh",
  },
  headingColor: {
    backgroundColor: "#c4c4c0",
    fontWeight: "bolder",
  },
});
