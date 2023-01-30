import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles((theme) => ({
    // root: {
    //     width: '100%',
    // },
    // heading: {
    //     fontSize: theme.typography.pxToRem(15),
    //     fontWeight: theme.typography.fontWeightRegular,
    // },
}));

export default function TestData() {
    const [dimensions, setDimensions] = React.useState({

        height: window.innerHeight,

        width: window.innerWidth

    })

    React.useEffect(() => {

        function handleResize() {

            setDimensions({

                height: window.innerHeight,

                width: window.innerWidth

            })



        }


        window.addEventListener('resize', handleResize)

    })

    return <>

        Rendered at {dimensions.width} x {dimensions.height}
        {/* <img src="https://previews.agefotostock.com/previewimage/medibigoff/c5dbe1c6d474ac1fe7aa59d35cd1b46c/ssj-153805.jpg"
            width={dimensions.width} height={dimensions.height} /> */}
    </>
}
