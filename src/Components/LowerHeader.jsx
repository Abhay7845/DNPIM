import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../Style/CssStyle/LowerHeader.css";
import DropdownField from "./DropdownField";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import axios from "axios";
import {
  AppBar,
  Drawer,
  Grid,
  IconButton,
  makeStyles,
  TextField,
  Toolbar,
} from "@material-ui/core";
import SideAppBar from "./SideAppBar";
import HostManager from "../HostManager/HostManager";
import StatusTabular from "./StatusTabular";

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    backgroundColor: "#ffff",
  },
  menuButton: {
    marginRight: "2%",
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
    display: "block",
  },
  hide: {
    display: "none",
  },

  phyInput: {
    textAlign: "center",
  },
});

const LowerHeader = (props) => {
  const classes = useStyles();
  const [dropValueForNeedState, setDropValueForNeedState] = useState([]);
  const [dropValueForGroupState, setDropValueForGroupState] = useState([]);
  const [dropValueForCollectionState, setDropValueForCollectionState] =
    useState([]);
  const [dropValueForCategoryState, setDropValueForCategoryState] = useState(
    []
  );
  const [barOpener, setBarOpener] = useState(false);
  const [statusCloserOpener, setStatusCloserOpener] = useState(false);

  const [dropState, setDropState] = useState({
    consumerBase: "ALL",
    collection: "ALL",
    groupData: "ALL",
    category: "ALL",
  });
  useEffect(() => {
    axios.get(`${HostManager.mainHost}/npim/dropdown/ALL/ALL/ALL/ALL`).then(
      (response) => {
        if (response.data.code == "1000") {
          setDropValueForCollectionState(response.data.value);
        } else {
          alert("Dropdown Master not Found...!");
        }
      },
      (error) => {
        console.log(error);
        alert(error);
      }
    );
  }, [dropState.consumerBase]);
  const onchangeHandler = (event) => {
    const { name, value } = event.target;
    setDropState(function (old) {
      switch (name) {
        case "consumerBase":
          return {
            ...old,
            [name]: value,
          };
        case "collection":
          return {
            ...old,
            [name]: value,
          };
        case "groupData":
          return {
            ...old,
            [name]: value,
          };
        case "category":
          return {
            ...old,
            [name]: value,
          };
      }
    });

    if (name === "collection") {
      axios
        .get(`${HostManager.mainHost}/npim/dropdown/${value}/ALL/ALL/ALL`)
        .then(
          (response) => {
            setDropValueForNeedState(response.data.value);
            setDropValueForGroupState([]);
            setDropValueForCategoryState([]);
            setDropState((old) => {
              old.consumerBase = "ALL";
              old.groupData = "ALL";
              old.category = "ALL";
              return old;
            });
          },
          (error) => {
            console.log(error);
            alert(error);
          }
        );
    } else if (name === "consumerBase") {
      axios
        .get(
          `${HostManager.mainHost}/npim/dropdown/${dropState.collection}/${value}/ALL/ALL`
        )
        .then(
          (response) => {
            setDropValueForGroupState(response.data.value);
            setDropValueForCategoryState([]);
            setDropState((old) => {
              old.groupData = "ALL";
              old.category = "ALL";
              return old;
            });
          },
          (error) => {
            console.log(error);
            alert(error);
          }
        );
    } else if (name === "groupData") {
      setDropValueForCategoryState([]);
      axios
        .get(
          `${HostManager.mainHost}/npim/dropdown/${dropState.collection}/${dropState.consumerBase}/${value}/ALL`
        )
        .then(
          (response) => {
            setDropValueForCategoryState(response.data.value);
            setDropState((old) => {
              old.category = "ALL";
              return old;
            });
          },
          (error) => {
            console.log(error);
            alert(error);
          }
        );
    }
  };
  const myBarClickHandler = (event) => {
    setBarOpener(!barOpener);
  };

  const mySearchClickHandler = (event) => {
    if (props.L3) {
      props.setAllDataFromValidation({
        sizeUomQuantityRes: [],
        sizeQuantityRes: [],
        stoneQualityRes: "",
        tegQuantityRes: [],
        typeSet2Res: "",
        quantityRes: "",
        findingsRes: "",
      });
    }
    props.onSear(dropState);
  };
  const statusOpener = (event) => {
    setStatusCloserOpener(!statusCloserOpener);
  };

  return (
    <React.Fragment>
      <Drawer anchor="left" open={barOpener} onClose={myBarClickHandler}>
        <SideAppBar navBarList={props.navBarList} statusOpener={statusOpener} />
      </Drawer>

      <Drawer anchor="top" open={statusCloserOpener} onClose={statusOpener}>
        <StatusTabular statusData={props.statusData} />
      </Drawer>
      <section className="lower_header_show">
        <div className={classes.root}>
          <AppBar
            position="static"
            color="transparent"
            className={classes.lowerHeader}
          >
            <Toolbar>
              <Grid container spacing={1}>
                <IconButton
                  onClick={myBarClickHandler}
                  edge="start"
                  className={classes.menuButton}
                  color="inherit"
                  aria-label="menu"
                >
                  <MenuIcon />
                </IconButton>
                <div className="dropDownStyle">
                  {!props.phyNpim ? (
                    <div className="row">
                      <div className="col">
                        <DropdownField
                          name="collection"
                          value={dropState.collection}
                          lableName="Collection"
                          bigSmall={true}
                          dropList={dropValueForCollectionState}
                          myChangeHandler={onchangeHandler}
                        />
                      </div>
                      <div className="col">
                        <DropdownField
                          name="consumerBase"
                          value={dropState.consumerBase}
                          lableName="NeedSate"
                          bigSmall={true}
                          dropList={dropValueForNeedState}
                          myChangeHandler={onchangeHandler}
                        />
                      </div>
                      <div className="col">
                        <DropdownField
                          name="groupData"
                          value={dropState.groupData}
                          lableName="Group"
                          bigSmall={true}
                          dropList={dropValueForGroupState}
                          myChangeHandler={onchangeHandler}
                        />
                      </div>
                      <div className="col">
                        <DropdownField
                          name="category"
                          value={dropState.category}
                          lableName="Category"
                          bigSmall={true}
                          dropList={dropValueForCategoryState}
                          myChangeHandler={onchangeHandler}
                        />
                      </div>
                    </div>
                  ) : (
                    <>
                      <div>
                        <Grid>
                          <TextField
                            name="phyData"
                            placeholder="Enter 14 digit Item Code"
                          />
                        </Grid>
                      </div>
                      <div>
                        <IconButton
                          onClick={mySearchClickHandler}
                          edge="end"
                          color="inherit"
                          aria-label="menu"
                        >
                          <SearchIcon />
                        </IconButton>
                      </div>
                    </>
                  )}
                </div>
              </Grid>
            </Toolbar>
          </AppBar>
        </div>
      </section>
    </React.Fragment>
  );
};
export default LowerHeader;
