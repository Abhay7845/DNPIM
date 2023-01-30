import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./LowerHeader.css"
import DropdownField from "./DropdownField";
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import axios from "axios";
import { AppBar, Container, Drawer, Grid, IconButton, makeStyles, TextField, Toolbar } from "@material-ui/core";
import SideAppBar from "./SideAppBar";
import HostManager from "../HostManager/HostManager";
import Loading from "./Loading";
import StatusTabular from "./StatusTabular";


const useStyles = makeStyles({
    root: {
        flexGrow: 1,
        backgroundColor: "white",
        letterSpacing: "2px",
        fontFamily: "Raleway, sans-serif",


    },
    menuButton: {
        marginRight: "2%",
    },
    searchButton: {
        marginLeft: "2%"
    },
    title: {
        flexGrow: 1,
    },
    projectLogo: {
        flexGrow: 1,
        marginTop: "1%",
        fontWeight: "12px",
    },

    lowerHeader: {
        minHeight: "2rem",
        
    },

    show: {
        display: "block"
    },
    hide: {
        display: "none"
    },

    phyInput: {


        textAlign: "center"
    }
});

const LowerHeader = (props) => {
    const classes = useStyles();
    const [dropValueForConsumerbaseState, setdropValueForConsumerbaseState] = useState([]);
    const [dropValueForGroupState, setdropValueForGroupState] = useState([]);
    const [dropValueForCollectionState, setdropValueForCollectionState] = useState([]);
    const [dropValueForCategoryState, setdropValueForCategoryState] = useState([]);
    const [barOpener, setBarOpener] = useState(false);
    const [statusCloserOpner, setstatusCloserOpner] = useState(false);
    const [statusData, setStatusData] = useState({


    });

    const [dropState, setDropState] = useState({
        consumerBase: "ALL",
        collection: "ALL",
        groupdata: "ALL",
        category: "ALL"
    });
    useEffect(() => {
        axios.get(`${HostManager.mainHost}/npim/dropdown/ALL/ALL/ALL/ALL`)
            .then((response) => {
                // setdropValueForConsumerbaseState(response.data.value);

                if (response.data.code == "1000") {
                    setdropValueForCollectionState(response.data.value);
                } else {
                    alert("Dropdown Master not Found...!");
                }


            }, (error) => {
                console.log(error);
                alert(error);
            });





    }, [dropState.consumerBase]);
    const onchangeHandler = (event) => {
        const { name, value } = event.target;
        setDropState(function (old) {

            switch (name) {
                case "consumerBase":
                    return {
                        ...old,
                        [name]: value,
                    }
                case "collection":
                    return {
                        ...old,
                        [name]: value,
                    }
                case "groupdata":
                    return {
                        ...old,
                        [name]: value,
                    }
                case "category":
                    return {
                        ...old,
                        [name]: value,
                    }
            }
        });

        if (name === "collection") {
            axios.get(`${HostManager.mainHost}/npim/dropdown/${value}/ALL/ALL/ALL`)
                .then((response) => {
                    // setdropValueForCollectionState(response.data.value);
                    setdropValueForConsumerbaseState(response.data.value);
                    setdropValueForGroupState([]);
                    setdropValueForCategoryState([])
                    setDropState(old => {
                        old.consumerBase = "ALL";
                        old.groupdata = "ALL";
                        old.category = "ALL";
                        return old;

                    });

                }, (error) => {
                    console.log(error);
                    alert(error);
                });
        } else if (name === "consumerBase") {
            axios.get(`${HostManager.mainHost}/npim/dropdown/${dropState.collection}/${value}/ALL/ALL`)
                .then((response) => {

                    setdropValueForGroupState(response.data.value);
                    console.log(response.data.value,"setdropValueForGroupState")
                    setdropValueForCategoryState([]);

                    setDropState(old => {
                        old.groupdata = "ALL";
                        old.category = "ALL";
                        return old;

                    });

                }, (error) => {
                    console.log(error);
                    alert(error);

                });
        } else if (name === "groupdata") {
            setdropValueForCategoryState([])
            console.log(value,"value")
            //const paramvalue=value==="PJWS (P1,P2,P3) / PEARL (PL)"?"PJWS (P1,P2,P3)-PEARL (PL)":value
            //console.log(paramvalue," paramvalue value")
            axios.get(`${HostManager.mainHost}/npim/dropdown/${dropState.collection}/${dropState.consumerBase}/${value}/ALL`)
                .then((response) => {
console.log(response)
                    console.log(response.data.value,"setdropValueForCategoryState response.data   value");

                    setdropValueForCategoryState(response.data.value)
                    setDropState(old => {
                        old.category = "ALL";
                        return old;

                    });
console.log(response.data.value,"setdropValueForCategoryState")
                }, (error) => {
                    console.log(error);
                    alert(error);
 
                });
        }


    };
    const myBarClickHandler = (event) => {
        setBarOpener(!barOpener);
    };


    const mySearchClickHandler = (event) => {
        if(props.L3){
            props.setAllDataFromValidation({
              sizeUomQuantityRes: [],
              sizeQuantityRes: [],
              stoneQualityRes: "",
              tegQuantityRes: [],
              typeSet2Res: "",
              quantityRes: "",
              findingsRes: "",
            })
          }
        props.onSear(dropState);
    };
    const statusOpener = (event) => {




        setstatusCloserOpner(!statusCloserOpner);
    };

    return (
        <React.Fragment>
            <Drawer
                anchor="left"
                open={barOpener}
                onClose={myBarClickHandler}
            >
                <SideAppBar
                    navBarList={props.navBarList}
                    statusOpener={statusOpener}
                />
            </Drawer>


            <Drawer
                anchor="top"
                open={statusCloserOpner}
                onClose={statusOpener}
            >
                <StatusTabular
                    statusData={props.statusData}
                />
            </Drawer>
            <section className="lower_header_show">

                <div className={classes.root}>

                    <AppBar position="static" color="transparent" className={classes.lowerHeader}>
                        <Toolbar>
                            <Grid container spacing={1}>

                            <IconButton onClick={myBarClickHandler} edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                                <MenuIcon />
                            </IconButton>
                            
                            {(!props.phyNpim) ?
                                <div className={classes.projectLogo}>
                                    <DropdownField name="collection"
                                        value={dropState.collection}
                                        lableName="Collection"
                                        bigSmall={true}
                                        dropList={dropValueForCollectionState}
                                        myChangeHandler={onchangeHandler} />
                                </div>

                                : ""}
                            
                            {(!props.phyNpim) ?

                                <div className={classes.projectLogo}>
                                    <DropdownField name="consumerBase"
                                        value={dropState.consumerBase}
                                        lableName="ConsumerBase"
                                        bigSmall={true}
                                        dropList={dropValueForConsumerbaseState}
                                        myChangeHandler={onchangeHandler} />
                                </div>

                                : ""}
                                
                               
                            {(!props.phyNpim) ?

                                <div className={classes.projectLogo}>
                                    <DropdownField name="groupdata"
                                        value={dropState.groupdata}
                                        lableName="Group"
                                        bigSmall={true}
                                        dropList={dropValueForGroupState}
                                        myChangeHandler={onchangeHandler} />
                                </div>
                                : ""}
                            
                        
                            {(!props.phyNpim) ?

                                <div className={classes.projectLogo}>
                                    <DropdownField
                                        name="category"
                                        value={dropState.category}
                                        lableName="Category"
                                        bigSmall={true}
                                        dropList={dropValueForCategoryState}
                                        myChangeHandler={onchangeHandler} />
                                </div>
                                : ""}
                        

                            
                            {(!props.phyNpim) ?
                                <div className={classes.searchButton}>
                                    <IconButton onClick={mySearchClickHandler} edge="end" color="inherit" aria-label="menu">
                                        <SearchIcon />
                                    </IconButton>

                                </div>

                                : ""}
                                

                            {(props.phyNpim) ?
                                <Grid container direction="row" alignItems="start" maxWidth="xs" justify="start" className={classes.projectLogo} >

                                    <TextField name="phydata" placeholder="Enter 14 digit Item Code" />

                                </Grid >

                                : ""}
                                </Grid>

                        </Toolbar>
                    </AppBar>
                </div>
            </section>
        </React.Fragment >
    );
};
export default LowerHeader;