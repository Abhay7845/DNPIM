import React, { useState, useEffect } from "react";
import axios from "axios";
const SingleImgCreator = (props) => {
const {itemCode}=props
   // const [imgLink, setImgLink] = useState();
    const [img,setimg]=useState("")

    // useEffect(() => {
    //     let imageCode = (props.itemCode).substring(2, 9);
    //     setImgLink(`${props.link}${imageCode}_1.jpg`);
    // }, [props]);
    const getImages = async () => {
        setimg([]);
        console.log("getimages() start");
        const imageCode = itemCode.substring(2, 9);
        console.log(imageCode, "start");
        const options = {
          headers: {
            ApiKey: "7C68491C-80D3-43B8-85CE-15A5DB7F9D60",
            UserToken: "2001025",
          },
        };
        try {
          console.log("try block start");
          if (imageCode !== "") {
            console.log("inside try block start");
            const response = await axios.get(
              `https://jewbridge.titanjew.in/ImageFetch/api/Image?Type=ProductImages&ImageParameter=1&ImageName=${imageCode}.jpg`,
              options
            );
            //const data= await response.json()
            console.log(response, "response image");
            //console.log(data,"data image")
            if (response.status === 200) {
              ////console.log(response.data, "vamsi responding");
              console.log(response.data.length, "buffer data");
              if (response.data.length > 0) {
                console.log(response.data, "image data");
                const byteCharacters = atob(response.data);
                const byteNumbers = new Array(byteCharacters.length);
                for (let i = 0; i < byteCharacters.length; i++) {
                  byteNumbers[i] = byteCharacters.charCodeAt(i);
                }
                const byteArray = new Uint8Array(byteNumbers);
                const blob = new Blob([byteArray], { type: "image/jpeg" });
                //console.log(blob, "blobbbb");
                var url = window.URL.createObjectURL(blob);
                console.log(url, "urlll");
                setimg(url);
              } else {
                setimg(`${props.link}${imageCode}_1.jpg`)
                //alert("No Image Avilable");
              }
            }
          }
        } catch (error) {
          console.log(error.message,"New error image single image creator")
          //alert("Error Image not avilable");}
          setimg(`${props.link}${imageCode}_1.jpg`)
        }
    }
    useEffect(() => {
        //getAPIkey()
        getImages();
        return ()=>{
            setimg("")
        } },[itemCode])
    return (
        <>
            {img.length > 0 ? (
        <img src={img} alt="No Image" width="100" height="100" />
      ) : (
        "No Image"
      )}
        </>
    );
};

export default SingleImgCreator;