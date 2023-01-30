import { Typography } from '@material-ui/core';
import { makeStyles, Paper } from '@material-ui/core';
import React from 'react';


const useStyles = makeStyles({

    hadding: {
        fontWeight: 500,
        fontSize: '18px',
        fontStretch: 'normal',
        // lineHeight: 5.4,
        fontFamily: 'Raleway',
        letterSpacing: '5px',
        textAlign: "left"

    },
    rowData: {
        fontWeight: 500,
        fontFamily: "Playfair Display",
        fontSize: '18px',
        // lineHeight: '20px',
        letterSpacing: '1px',
        textAlign: "left",



    }
})


const ProductDetailsTabular = (props) => {
    const classes = useStyles();

    console.log(props);
    return (
        <>


            <table style={{ width: "95%", fontWeight: 900, letterSpacing: "2px" }}>
                <tbody>
                    <tr>
                        <th className={classes.hadding} >COLLECTION</th>
                        <td >-&emsp;&emsp;&emsp;</td>
                        <td className={classes.rowData}>{props.information.collection}</td>
                    </tr>
                    <tr>
                        <th className={classes.hadding} >CONSUMER BASE</th>
                        <td style={{ padding: "0%" }}>-</td>
                        <td className={classes.rowData}>{props.information.consumerBase}</td>

                    </tr>
                    <tr>
                        <th className={classes.hadding} >GROUP</th>
                        <td style={{ padding: "0%" }}>-</td>
                        <td className={classes.rowData}>{props.information.itGroup}</td>
                    </tr>
                    <tr>
                        <th className={classes.hadding} >CATEGORY</th>
                        <td style={{ padding: "0%" }}>-</td>
                        <td className={classes.rowData}>{props.information.category}</td>
                    </tr >
                    <tr>
                        <th className={classes.hadding} >GENDER</th>
                        <td style={{ padding: "0%" }}>-</td>
                        <td className={classes.rowData}>{props.information.gender}</td>
                    </tr >
                    <tr>
                        <th className={classes.hadding} >COMPLEXITY</th>
                        <td style={{ padding: "0%" }}>-</td>
                        <td className={classes.rowData}>{props.information.complexity}</td>
                    </tr >
                    <tr>
                        <th className={classes.hadding} >STD WT</th>
                        <td style={{ padding: "0%" }}>-</td>
                        <td className={classes.rowData}>{props.information.stdWt}</td>
                    </tr >
                    <tr>
                        <th className={classes.hadding} >STD UCP</th>
                        <td style={{ padding: "0%" }}>-</td>
                        <td className={classes.rowData}>{props.information.stdUCP}</td>
                    </tr >
                    <tr>
                        <th className={classes.hadding} >METAL COLOUR</th>
                        <td style={{ padding: "0%" }}>-</td>
                        <td className={classes.rowData}>{props.information.colourWt}</td>
                    </tr >
                    <tr>
                        <th className={classes.hadding} >FINDINGS</th>
                        <td style={{ padding: "0%" }}>-</td>
                        <td className={classes.rowData}>{props.information.findings}</td>
                    </tr >
                </tbody >
            </table >

        </>
    );
};

export default ProductDetailsTabular;