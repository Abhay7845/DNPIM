import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../Style/CssStyle/LowerHeader.css";
import DropdownField from "./DropdownField";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import axios from "axios";
import { AppBar, Drawer, Grid, IconButton, Toolbar } from "@material-ui/core";
import SideAppBar from "./SideAppBar";
import HostManager from "../APIList/HostManager";
import StatusTabular from "./StatusTabular";
import { useStyles } from "../Style/LowerHeader";
import Loading from "./Loading";

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
  const [loading, setLoading] = useState(false);
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
      }
    );
  }, [dropState.consumerBase]);
  const onchangeHandler = (event) => {
    const { name, value } = event.target;
    console.log("Value==>", value);
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
      setImmediate(() => {
        setLoading(true);
      });
      axios
        .get(`${HostManager.mainHost}/npim/dropdown/${value}/ALL/ALL/ALL`)
        .then(
          (response) => {
            console.log("response1==>", response.data);
            setDropValueForNeedState(response.data.value);
            setDropValueForGroupState([]);
            setDropValueForCategoryState([]);
            setDropState((old) => {
              old.consumerBase = "ALL";
              old.groupData = "ALL";
              old.category = "ALL";
              return old;
            });
            setImmediate(() => {
              setLoading(false);
            });
          },
          (error) => {
            console.log(error);
            alert("No Data Available for Selected Value");
          }
        );
    } else if (name === "consumerBase") {
      setImmediate(() => {
        setLoading(true);
      });
      axios
        .get(
          `${HostManager.mainHost}/npim/dropdown/${dropState.collection}/${value}/ALL/ALL`
        )
        .then(
          (response) => {
            console.log("response2==>", response.data);
            setDropValueForGroupState(response.data.value);
            setDropValueForCategoryState([]);
            setDropState((old) => {
              old.groupData = "ALL";
              old.category = "ALL";
              return old;
            });
            setImmediate(() => {
              setLoading(false);
            });
          },
          (error) => {
            console.log(error);
            alert("No Data Available for Selected Value");
          }
        );
    } else if (name === "groupData") {
      setImmediate(() => {
        setLoading(true);
      });
      setDropValueForCategoryState([]);
      axios
        .get(
          `${HostManager.mainHost}/npim/dropdown/${dropState.collection}/${dropState.consumerBase}/${value}/ALL`
        )
        .then(
          (response) => {
            console.log("response3==>", response.data);
            setDropValueForCategoryState(response.data.value);
            setDropState((old) => {
              old.category = "ALL";
              return old;
            });
            setImmediate(() => {
              setLoading(false);
            });
          },
          (error) => {
            console.log("error==>", error);
            alert("No Data Available for Selected Value");
            setImmediate(() => {
              setLoading(false);
            });
          }
        );
    }
  };
  const myBarClickHandler = (event) => {
    setBarOpener(!barOpener);
  };

  const mySearchClickHandler = () => {
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
      <Loading flag={loading} />
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
                  <div className="row">
                    <div className="col">
                      <DropdownField
                        name="collection"
                        value={dropState.collection}
                        labelName="Collection"
                        bigSmall={true}
                        dropList={dropValueForCollectionState}
                        myChangeHandler={onchangeHandler}
                      />
                    </div>
                    <div className="col">
                      <DropdownField
                        name="consumerBase"
                        value={dropState.consumerBase}
                        labelName="NeedSate"
                        bigSmall={true}
                        dropList={dropValueForNeedState}
                        myChangeHandler={onchangeHandler}
                      />
                    </div>
                    <div className="col">
                      <DropdownField
                        name="groupData"
                        value={dropState.groupData}
                        labelName="Group"
                        bigSmall={true}
                        dropList={dropValueForGroupState}
                        myChangeHandler={onchangeHandler}
                      />
                    </div>
                    <div className="col">
                      <DropdownField
                        name="category"
                        value={dropState.category}
                        labelName="Category"
                        bigSmall={true}
                        dropList={dropValueForCategoryState}
                        myChangeHandler={onchangeHandler}
                      />
                    </div>
                    <div>
                      <IconButton
                        onClick={mySearchClickHandler}
                        edge="end"
                        color="inherit"
                        aria-label="menu"
                        className={classes.searchButton}
                      >
                        <SearchIcon />
                      </IconButton>
                    </div>
                  </div>
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
