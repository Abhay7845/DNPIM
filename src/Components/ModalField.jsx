import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import ReactImageMagnify from "react-image-magnify";
import image from "../images/index.jpeg"


const ModalField = (props) => {



    const [smShow, setSmShow] = useState(false);
    const [lgShow, setLgShow] = useState(false);

    const { innerWidth: width, innerHeight: height } = window;


    console.log(innerHeight, innerWidth);

    return (<>

        <Button onClick={() => setSmShow(true)}>Small modal</Button>{' '}
        <Button onClick={() => setLgShow(true)}>Large modal</Button>
        <Modal
            size="sm"
            show={smShow}
            onHide={() => setSmShow(false)}
            aria-labelledby="example-modal-sizes-title-sm"
        >
            <Modal.Header closeButton>
                <Modal.Title id="example-modal-sizes-title-sm">
                    Small Modal
          </Modal.Title>
            </Modal.Header>
            <Modal.Body>



                <ReactImageMagnify {...{
                    smallImage: {
                        alt: 'Wristwatch by Ted Baker London',
                        // isFluidWidth: true,
                        src: image,
                        // width: 400,
                        // height: 400,
                        alt: "Image is Not Load",
                    },
                    largeImage: {
                        src: image,
                        width: 1200,
                        height: 1800,
                        alt: "Image is Not Load",
                    },
                    shouldUsePositiveSpaceLens: true,
                    enlargedImagePosition: "over"

                    // enlargedImageClassName: "large_img",

                }} />


            </Modal.Body>
        </Modal>
        <Modal
            size="lg"
            show={lgShow}
            onHide={() => setLgShow(false)}
            aria-labelledby="example-modal-sizes-title-lg"
        >
            <Modal.Header closeButton>
                <Modal.Title id="example-modal-sizes-title-lg">
                    Large Modal
          </Modal.Title>
            </Modal.Header>
            <Modal.Body>

                <div className="">

                    <ReactImageMagnify {...{
                        smallImage: {
                            alt: 'Wristwatch by Ted Baker London',
                            isFluidWidth: true,
                            src: image,
                            // width: innerWidth - 50,
                            // width: innerWidth - (innerWidth / (2 + 6)),

                            // width: (innerWidth < 800) ? (innerWidth - (innerWidth / (2 + 6))) : (innerWidth - ((innerWidth / 2) - 85)),
                            // width: innerWidth - ((innerWidth / 2) - 85),

                            // height: 400,
                            alt: "Image is Not Load",
                        },
                        largeImage: {
                            src: image,
                            // width: 1200,
                            // height: 1800,
                            width: 1200,
                            height: 1800,
                            alt: "Image is Not Load",
                        },
                        shouldUsePositiveSpaceLens: true,
                        enlargedImagePosition: "over"

                        // enlargedImageClassName: "large_img",

                    }} />

                    <h6> width :  {innerWidth}</h6>
                    <h6> height :  {innerHeight}</h6>


                </div>

            </Modal.Body>
        </Modal>

    </>);

};

export default ModalField;





