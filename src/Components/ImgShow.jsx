import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
// import "./ImgShow.css";
import image from "../images/index.jpeg";
import ReactImageMagnify from "react-image-magnify";
import {
  makeStyles,
  Tabs,
  Tab,
  AppBar,
  Avatar,
  CardActionArea,
  Card,
  Typography,
} from "@material-ui/core";
import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";
import { useEffect } from "react";
import { loadingGif } from "../images/images";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    // width: '94.5%',
    maxWidth: "100%",
    minWidth: "100%",
    margin: "0%",
    padding: "0%",
  },
  itemCodeColor: {
    backgroundColor: "#c4c4c0",
  },
  // cardStyle: {
  //     // maxWidth: "35rem",
  //     marginLeft: "0%"
  // },
  hidden: {
    display: "none",
  },
  show: {
    display: "none",
  },
}));
const ImgShow = (props) => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [ImgLoad, setImgLoad] = React.useState(true);
  const [imgLink, setImgLink] = React.useState(props.videoLink);
  const [img, setimg] = React.useState("");

  useEffect(() => {
    setImgLink(props.videoLink);

    if (props.videoLink) {
      setValue(0);
    } else {
      setValue(1);
    }
  }, [props]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    if (event.target.src) {
      setImgLink(event.target.src);
    } else {
      setImgLink(props.videoLink);
    }
  };

  const imageCode = props.itemCode !== "" && props.itemCode.substring(2, 9);
  const conbineImage = props.imgLink !== "" && `${props.imgLink}${imageCode}`;

  return (
    <>
      <section className={classes.root}>
        <Card className={classes.cardStyle}>
          <CardActionArea>
            {imgLink.search("preview") > 0 ? (
              <iframe
                src={props.videoLink + "?autoplay=1&mute=1"}
                width="590"
                height="500"
                alt="Video is not available"
              />
            ) : (
              <ReactImageMagnify
                {...{
                  smallImage: {
                    src: ImgLoad ? loadingGif : `${conbineImage}_1.jpg`,
                    height: 472,
                    width: window.innerWidth * (40.41145833 / 100),
                    alt: "Image is not available",
                    onLoad: () => {
                      conbineImage.length <= 0
                        ? setImgLoad(true)
                        : setImgLoad(false);
                    },
                  },
                  largeImage: {
                    src: ImgLoad ? loadingGif : `${conbineImage}_1.jpg`,
                    width: 1500,
                    height: 1500,
                    alt: "Image is not available",
                    onLoad: () => {
                      conbineImage.length <= 0
                        ? setImgLoad(true)
                        : setImgLoad(false);
                    },
                  },
                  shouldUsePositiveSpaceLens: true,
                  enlargedImagePosition: "over",
                  enlargedImageClassName: "large_img",
                }}
              />
            )}
          </CardActionArea>
        </Card>
        <AppBar position="static" color="default">
          <Tabs
            value={value}
            onChange={handleChange}
            variant="scrollable"
            scrollButtons="on"
            indicatorColor="primary"
            textColor="primary"
            aria-label="scrollable force tabs example"
          >
            <Tab style={{ minWidth: "1%" }} icon={<PlayCircleOutlineIcon />} />
            <Tab
              style={{ minWidth: "1%" }}
              icon={<Avatar variant="square" src={`${conbineImage}_1.jpg`} />}
            />
            <Tab
              style={{ minWidth: "1%" }}
              icon={<Avatar variant="square" src={`${conbineImage}_2.jpg`} />}
            />
            <Tab
              style={{ minWidth: "1%" }}
              icon={<Avatar variant="square" src={`${conbineImage}_3.jpg`} />}
            />
            <Tab
              style={{ minWidth: "1%" }}
              icon={<Avatar variant="square" src={`${conbineImage}_4.jpg`} />}
            />
            <Tab
              style={{ minWidth: "1%" }}
              icon={<Avatar variant="square" src={`${conbineImage}_5.jpg`} />}
            />
          </Tabs>
        </AppBar>
      </section>
    </>
  );
};
export default ImgShow;
