import { FormControl, Grid, InputLabel, makeStyles, MenuItem, Select, TextField, Button, Container, Typography } from "@material-ui/core";
import { DataGrid, GridToolbarContainer, GridToolbarExport } from "@material-ui/data-grid";
import React, { useEffect, useState } from "react";
import { Multiselect } from "multiselect-react-dropdown";
const useStyles = makeStyles({
    formControl: {

        minWidth: "15%",
    },
    report: {
        width: "100%",
        margin: "0%",
        padding: "0%"
    },

});


const ComponentFroAdmin = () => {
    const classes = useStyles()
    return (
        <>


            <Grid container>
                <Grid item xs={6} sm={3}>

                </Grid>
                <Grid item xs={6} sm={3}>

                </Grid>
                <Grid item xs={6} sm={3}>

                </Grid>
                <Grid item xs={6} sm={3}>
                    <Button>Generate Report </Button>
                </Grid>
            </Grid>

        </>
    );
}


const TextFieldOfMUI = (props) => {
    const classes = useStyles();
    const { lable, type, textFieldHandlerChange, value, name, multiline, rows, autoComplete, required } = props
    return (
        <>


            <TextField
                fullWidth
                id="date"
                label={lable}
                type={type}
                variant="outlined"
                onChange={textFieldHandlerChange}
                value={value}
                name={name}
                multiline={multiline}
                rows={rows}
                required={required}
                autoComplete={autoComplete}
                InputLabelProps={{
                    shrink: true,
                }}
            />

        </>
    );
}


const SelectOfMUI = (props) => {
    const classes = useStyles();
    const { lable, optionList, selectHandleChange, value, name } = props
    return (
        <>


            <FormControl variant="outlined" fullWidth >
                <InputLabel id="demo-simple-select-outlined-label">{lable} </InputLabel>
                <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    value={value}
                    onChange={selectHandleChange}
                    name={name}
                    // placeholder="dartaagagy"
                    label={lable}
                >

                    {optionList.map((element) => {

                        return (<MenuItem key={element} value={element}>{element}</MenuItem>)

                    })}

                </Select>
            </FormControl>

        </>
    );
}


function CustomToolbar(props) {
    return (
        <GridToolbarContainer>
            <GridToolbarExport csvOptions={{ fileName: "DayEndReport" }} />
        </GridToolbarContainer>
    );
}

function DataGridForAdmin(props) {
    const classes = useStyles();

    const { col, rows, reportLable } = props;



    const coloum = col.map((element) => {

        return {

            field: element,
            // flex: 1,
            sortable: false,
            width: 140,
            // headerName: element.toUpperCase(),
        }


    });



    return (
        <>

            <Container maxWidth="xl" className={classes.report}>
                <Typography align="center" variant="h5" color="secondary">{reportLable}</Typography>
                <Typography align="center" variant="h6" color="primary">Count : {rows.length}</Typography>


                <DataGrid
                    rows={rows}
                    columns={coloum}
                    autoHeight={true}
                    //autoPageSize={true}

                    // columnHeader={classes.header}

                    // onRowSelected={(data) => {
                    //   console.log("selected data",data);
                    // } }
                    // onCellDoubleClick={(data) => {
                    //   console.log("selected data",data);
                    // }}
                    pageSize={10}
                    // loading={true}
                    disableColumnSelector
                    components={{
                        Toolbar: CustomToolbar,

                    }}
                />

            </Container>
        </>
    );
}


function MultiSelectFroAdmin(props) {

    const classes = useStyles();
    let { optionsList, lableName, onChangeHandler } = props;
    const options = optionsList.map((element) => {
        return {
            "abmMailId": element.abmMailId,
            "npd": element.npd,
            "npdManagerMailId": element.npdManagerMailId,
            "plainManager": element.plainManager,
            "rbmMailId": element.rbmMailId,
            "rmMailId": element.rmMailId,
            "storeMailId": element.storeMailId,
            "strCode": element.strCode,
            "studdedManager": element.studdedManager
        }


    });

    const onInternalSelectChange = (selectedList, selectedItem) => {

        console.log("selected item for Add", selectedItem.lableValue);
        onChangeHandler(selectedList);
    };

    const onInternalRemoveChange = (selectedList, removedItem) => {
        console.log("selected item for remove", removedItem.lableValue);
        onChangeHandler(selectedList);
    };

    return (
        <>
            <div className={classes.drop_multi}>
                <Typography align="center" color="primary">  {lableName}  </Typography>
                <Multiselect
                    options={options}
                    displayValue="strCode"
                    onSelect={onInternalSelectChange}
                    onRemove={onInternalRemoveChange}
                    showCheckbox={true}
                    // style={cssdata}
                    // selectedValues={[]}
                    closeOnSelect={false}
                    // selectionLimit={3}
                    placeholder="Choose Options"
                    disablePreSelectedValues={true}
                // ref={multiselectRef}
                />
            </div>

        </>
    );
};





export default ComponentFroAdmin
export { TextFieldOfMUI, SelectOfMUI, DataGridForAdmin, MultiSelectFroAdmin }




