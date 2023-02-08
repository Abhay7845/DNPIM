import { makeStyles } from "@material-ui/core";

export const useStyle = makeStyles({
  root: {
    width: "100%",
    height: "100%",
    margin: "0%",
    padding: "0%",
  },
  imgShow: {
    marginLeft: "1%",
  },
  hidden: {
    display: "none",
  },
  show: {
    display: "block",
  },
  hadingCss: {
    fontWeight: "bolder",
    fontSize: "16px",
    marginBottom: "2%",
    marginTop: "3%",
  },
  innerHightCss: {
    minHeight: "80vh",
  },
  headingColor: {
    backgroundColor: "#832729",
    color: "#ffff",
    fontWeight: "bolder",
  },
  btnSub: {
    fontWeight: "bold",
    fontSize: "14px",
    padding: "5px",
    backgroundColor: "#832729",
    color: "#ffff",
  },
});
