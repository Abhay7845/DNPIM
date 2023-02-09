import React, { useState, useEffect } from "react";
import axios from "axios";
const SingleImgCreator = (props) => {
  const { itemCode } = props;
  // const [imgLink, setImgLink] = useState();
  const [img, setImg] = useState("");

  const getImages = async () => {
    setImg([]);
    const imageCode = itemCode.substring(2, 9);
    const options = {
      headers: {
        ApiKey: "7C68491C-80D3-43B8-85CE-15A5DB7F9D60",
        UserToken: "2001025",
      },
    };
    try {
      if (imageCode !== "") {
        const response = await axios.get(
          `https://jewbridge.titanjew.in/ImageFetch/api/Image?Type=ProductImages&ImageParameter=1&ImageName=${imageCode}.jpg`,
          options
        );
        if (response.status === 200) {
          console.log(response.data.length, "buffer data");
          if (response.data.length > 0) {
            const byteCharacters = atob(response.data);
            const byteNumbers = new Array(byteCharacters.length);
            for (let i = 0; i < byteCharacters.length; i++) {
              byteNumbers[i] = byteCharacters.charCodeAt(i);
            }
            const byteArray = new Uint8Array(byteNumbers);
            const blob = new Blob([byteArray], { type: "image/jpeg" });
            var url = window.URL.createObjectURL(blob);
            setImg(url);
          } else {
            setImg(`${props.link}${imageCode}_1.jpg`);
          }
        }
      }
    } catch (error) {
      setImg(`${props.link}${imageCode}_1.jpg`);
    }
  };
  useEffect(() => {
    getImages();
    return () => {
      setImg("");
    };
  }, [itemCode]);
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
