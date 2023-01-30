import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
// import "./ImgShow.css";
import image from "../images/index.jpeg"
import ReactImageMagnify from "react-image-magnify";
import { makeStyles, Tabs, Tab, AppBar, Avatar, CardActionArea, Card, Typography } from "@material-ui/core";
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
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
        padding: "0%"


    },
    itemCodeColor: {
        backgroundColor: "#c4c4c0",
    },
    // cardStyle: {
    //     // maxWidth: "35rem",
    //     marginLeft: "0%"
    // },
    hidden: {
        display: "none"
    },
    show: {
        display: "none"
    },
    // list_img_show: {
    //     maxWidth: "35rem",
    // },
    // image_data_show: {
    //     maxWidth: "70rem",
    // }

}));
const ImgShow = (props) => {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    const [ImgLoad, setImgLoad] = React.useState(true);
    const [imgLink, setImgLink] = React.useState(props.videoLink);
    const [img,setimg]=React.useState("")

console.log(props,"DNPIM image Props")
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
    const imgLoadError = (event) => {
        console.log(event);
    };
    const imageCode = props.itemCode!==""&&(props.itemCode).substring(2, 9);
    const conbineImage = props.imgLink!==""&&`${props.imgLink}${imageCode}`;
    console.log(conbineImage,"conbine image")
    ///////////////API Hitting For Images Start///////////////////////
    // const getImages = async (itemcode) => {
    //     console.log("getimages() start");
    //     const imageCode =itemcode.substring(2, 9)
    //     console.log(imageCode, "start");
    //     setimg(`${props.imgLink}${imageCode}`);
    //     setImgLoad(true)
    //     const options = {
    //       headers: {
    //         ApiKey: "7C68491C-80D3-43B8-85CE-15A5DB7F9D60",
    //         UserToken: "2001025",
    //       },
    //     };
    //     try {
    //       console.log("try block start");
    //       if (imageCode !== "") {
    //         console.log("inside try block start");
    //         const response = await axios.get(
    //           `https://jewbridge.titanjew.in/ImageFetch/api/Image?Type=ProductImages&ImageParameter=1&ImageName=${imageCode}.jpg`,
    //           options
    //         );
    //         //const data= await response.json()
    //         console.log(response, "response image");
    //         //console.log(data,"data image")
    //         if (response.status === 200) {
    //           ////console.log(response.data, "vamsi responding");
    //           console.log(response.data.length, "buffer data");
    //           if (response.data.length > 0) {
    //             console.log(response.data, "image data");
    //             const byteCharacters = atob(response.data);
    //             const byteNumbers = new Array(byteCharacters.length);
    //             for (let i = 0; i < byteCharacters.length; i++) {
    //               byteNumbers[i] = byteCharacters.charCodeAt(i);
    //             }
    //             const byteArray = new Uint8Array(byteNumbers);
    //             const blob = new Blob([byteArray], { type: "image/jpeg" });
    //             //console.log(blob, "blobbbb");
    //             var url = window.URL.createObjectURL(blob);
    //             console.log(url, "urlll");
    //             setimg(url);
    //             setImgLoad(false)
    //           } else {
    //             setimg(`${props.imgLink}${imageCode}`);
    //             setImgLoad(false)
    //             //alert("No Image Avilable");
    //           }
    //         }
    //       }
    //     } catch (error) {
    //         setImgLoad(false)
    //         setimg(`${props.imgLink}${imageCode}`);
    //       //console.log(error.message)}
    //     }
    //   };

    //   useEffect(() => {
    //     //getAPIkey()
    //     if(props.imageCode!==""){
    //         getImages(props.itemCode);
    //     }
    //     console.log("images API after getimages()")
    //     //   const APIKEY=await responseAPIKEY.json()
    //     //   //console.log(APIKEY,"APIKEY")
    //     //  const response= await fetch("https://jewbridge.titanjew.in/ImageFetch/api/Image?Type=ProductImages&ImageParameter=1&ImageName=0819ORA.jpg")
    //   }, [props.itemCode]);
    ///////////////API Hitting For Images End///////////////////////
    console.log(conbineImage,"new feature")
    return (<React.Fragment>
        <section className={classes.root} >
            <Card className={classes.cardStyle}>
                <CardActionArea>
                    {/* <Typography className={classes.itemCodeColor} align="center">{props.itemCode}</Typography> */}
                    {/* <h6 className="font-weight-bold text-center">{props.itemCode}</h6> */}
                    {/* <div className="img_show"> */}
                    {
                        (imgLink.search("preview") > 0) ?
                            < iframe
                                src={props.videoLink + "?autoplay=1&mute=1"}
                                // src="https://tanishqdigitalnpim.titan.in/NpimImages/4117NTR.mov"
                                width="590"
                                height="500"
                                alt="Video is not available"
                            />
                            :
                            <ReactImageMagnify {...{
                                smallImage: {
                                    //isFluidWidth: true,
                                    //src: ImgLoad?loadingGif:(imgLink && imgLink !== "") ? imgLink : `${conbineImage}_1.jpg`,
                                    // width: "100%",
                                    src:ImgLoad?loadingGif:`${conbineImage}_1.jpg`,
                                     height: 472,
                                    width: (window.innerWidth * (40.41145833 / 100)),
                                    //height: (window.innerHeight * (70.09345794392523 / 100)),
                                    alt: "Image is not available",
                                    onLoad:()=>{conbineImage.length<=0?setImgLoad(true):setImgLoad(false)}
                                },
                                largeImage: {
                                    //src: (imgLink && imgLink !== "") ? imgLink : `${conbineImage}_1.jpg`,
                                    src:ImgLoad?loadingGif:`${conbineImage}_1.jpg`,
                                    width: 1500,
                                    height: 1500,
                                    alt: "Image is not available",
                                    onLoad:()=>{conbineImage.length<=0?setImgLoad(true):setImgLoad(false)}
                                },
                                shouldUsePositiveSpaceLens: true,
                                enlargedImagePosition: "over",
                                enlargedImageClassName: "large_img",
                            }} />
                    }
                    {/* </div> */}
                </CardActionArea>
            </Card>
            {/* <div className="list_img_show "> */}
            {/* <div className={classes.root}> */}
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
                    <Tab style={{ minWidth: "1%" }}
                        icon={<PlayCircleOutlineIcon />}
                    />
                    <Tab style={{ minWidth: "1%" }}
                        icon={<Avatar variant="square"
                            src={`${conbineImage}_1.jpg`} />}
                    />
                    <Tab style={{ minWidth: "1%" }}
                        icon={<Avatar variant="square"
                            src={`${conbineImage}_2.jpg`} />}
                    />
                    <Tab style={{ minWidth: "1%" }}
                        icon={<Avatar variant="square"
                            src={`${conbineImage}_3.jpg`} />}
                    />
                    <Tab style={{ minWidth: "1%" }}
                        icon={<Avatar variant="square"
                            src={`${conbineImage}_4.jpg`} />}
                    />
                    <Tab style={{ minWidth: "1%" }}
                        icon={<Avatar variant="square"
                            src={`${conbineImage}_5.jpg`} />}
                    />
                </Tabs>
            </AppBar>
            {/* </div> */}
            {/* </div> */}

        </section>
    </React.Fragment>)
};
export default ImgShow;