import React, { Suspense, useState } from "react";
import loadable from "./loadable";
import {
  ButtonBase,
  Typography,
  Button,
  Container,
  makeStyles,
  Grid,
} from "@material-ui/core";
import SingleImgCreator from "./SingleImgCreator";
import {
  GridToolbarContainer,
  GridToolbarExport,
} from "@material-ui/data-grid";
import AlertPopup, { ModelPopup } from "./AlertPopup";
import axios from "axios";
import { useParams } from "react-router-dom";
import UrlManager from "../HostManager/UrlManager";

const useStyles = makeStyles({
  drop_multi: {
    width: "100%",
    minWidth: "100%",
  },
  inputField: {
    width: "100%",
    "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
      border: "1px solid #484850",
      borderRadius: "5px 5px 0 0",
    },
  },
  formControl: {
    minWidth: "100%",
    "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
      border: "1px solid #484850",
      borderRadius: "5px 5px 0 0",
    },
  },
  hide: {
    display: "none",
  },
  show: {
    display: "block",
  },
  header: {
    backgroundColor: "red",
  },
  report: {
    width: "100wh",
    // minWidth: "100%",
    margin: "0%",
    padding: "0%",
  },

  haddingCss: {
    fontWeight: "bolder",
    fontStretch: "normal",
    fontSize: "16px",
    lineHeight: "normal",
    fontFamily: "Raleway, sans - serif",
    letterSpacing: "2px",
  },
  hadding: {
    fontWeight: 500,
    fontSize: "18px",
    fontStretch: "normal",
    // lineHeight: 5.4,
    fontFamily: "Raleway, sans-serif",
    letterSpacing: "1px",
    textAlign: "left",
  },
  rowData: {
    fontWeight: 500,
    fontFamily: "Playfair Display,seri",
    fontSize: "18px",
    // lineHeight: '20px',
    letterSpacing: "1px",
    textAlign: "left",
  },
  hoverbtn: {
    //marginLeft: -10,
    "&:hover": {
      backgroundColor: "#fafafa",
    },
  },
  search: {
    border: 0,
    outline: "none",
    width: "30%",
    background: "none",
    borderBottom: "1px solid #000000",
  },
});

const DataGrid = loadable(() =>
  import("@material-ui/data-grid").then((module) => {
    return { default: module.DataGrid };
  })
);

function CustomToolbar(props) {
  const classes = useStyles();
  const sucessCountArray=props?.rows.filter((row)=>row.confirmationStatus!=="")
  console.log(sucessCountArray,"successcount")
  // const isConfirmed=props?.rows.reduce((row)=>row.confirmationStatus!==""?true:false)
  // console.log(isConfirmed,"isConfirmed")
  const [isSendmail,setisSendmail]=useState(false)
  const [alertPopupStatus, setAlertPopupStatus] = useState({
    status: false,
    main: "",
    contain: "",
    mode: false,
  });
  const { storeCode } = useParams();
  function closeHandler() {
    setImmediate(() => {
      setAlertPopupStatus({
        status: false,
        main: "",
        contain: "",
        mode: false,
      });
    });
  }
  function closeHandlerForRest() {
    setImmediate(() => {
      setAlertPopupStatus({
        status: false,
        main: "",
        contain: "",
        mode: false,
      });
    });
  }
  const handelClick = () => {
    props.handelOpen();
    //setisSendmail(true)
  };
  const errorHandling = async () => {
    try {
      const response = await axios.get(`${UrlManager.mailerror}${storeCode}`);
      console.log(response, "error mail");
      if (response.status === 200) {
        //alert(response.data.value);
        setAlertPopupStatus({
          status: true,
          main:response?.data?.value,
          contain: "",
          mode: true,
        });
      }
    } catch (e) {
      alert(`${e.message} from error handling mail`);
    }
  };

  const handelSendMail = async () => {
    console.log("handelmail");
    try {
      const response = await axios.get(`${UrlManager.sendMail}${storeCode}`);
      if (response.status === 200) {
        console.log(response, "mails");
        if (response.data.code === "1000") {
          const success=`Thankyou for completeing the Indent Confirmation Process  sucessfully `
          const error=`There was an error in Triggering email please try again ..`
          const msg =response?.data?.value?.storeNPIMStatus === "LOCKED"
              ? `${response?.data?.value?.storeNPIMStatus} and mail already sent`
              :  response?.data?.mailStatus==="sent successfully"?success:error;
          //alert(msg);
          setAlertPopupStatus({
            status: true,
            main:msg,
            contain: "",
            mode: true,
          });
        } else {
          // alert(
          //   `${response?.data?.value?.storeNPIMStatus} and ${response?.data?.mailStatus}`
          // );
        errorHandling()
        }
      }
    } catch (e) {
      alert(`${e.message} from send mail btn`);
    }
  };
  return (
    <GridToolbarContainer>
      <GridToolbarExport csvOptions={{ fileName: `Npim-${new Date()}` }} />
      {props.reportLable === "Item_Wise_Report" && (
        <>
          <Grid container justify="center">
            <input
              type="text"
              placeholder="Search Itemcode"
              className={classes.search}
              value={props.searchValue}
              onChange={props.handelSearch}
            />
          </Grid>
          <Grid container>
          <h6>Total:  <span><b>{props?.rows.length}</b></span></h6>
          <h6 className="ml-5">Successful Indent Count:  <span><b>{sucessCountArray.length}</b></span></h6>
          </Grid>
          <Grid container justify="flex-end">
            <Button variant="contained" color="primary"  onClick={()=>{handelClick()}}>
              Confirm
            </Button>
            <Button variant="contained" color="primary" className="m-1"  onClick={()=>{handelSendMail()}}>
          Send Mail
        </Button>
          </Grid>
        </>
      )}
      {/* disabled={sucessCountArray.length===props?.rows.length?true:false}  */}
      <AlertPopup
        status={alertPopupStatus.status}
        // status={true}
        mainLable={alertPopupStatus.main}
        containLable={alertPopupStatus.contain}
        procideHandler=""
        discardHandler=""
        closeHandler={() => {
          alertPopupStatus.mode ? closeHandlerForRest() : closeHandler();
        }}
      />
      <ModelPopup
        open={props.popupopen}
        handelClose={props.handelClose}
        option1="NO"
        option2="YES"
        message=" Are you sure you want to conclude the indenting process . Click Yes to Confirm"
      onyes={props.handelYes}
      />
    </GridToolbarContainer>
  );
}
const LazyLoadindDataGrid = (props) => {
  const classes = useStyles();
  const { col, rows, caller, reportLable, rowDataHandler,popupopen,handelYes,handelClose,handelOpen } = props;
  const [searchValue, setSearchValue] = useState("");
  console.log(reportLable, "reportLable reportLable reportLable");
  const role = localStorage.getItem("store_value");
  console.log(role, "ROLE");
  const coloum = col.map((element) => {
    let fieldRes;

    if (element === "Action") {
      fieldRes = {
        field: "Action",
        headerName: "Action",
        sortable: false,
        // width: 100,
        flex: 1,
        disableClickEventBubbling: true,
        renderCell: (params) => {
          //console.log(params,"render cell")
          return (
          <>
            {params?.row?.confirmationStatus===""? <Button
            onClick={(data) => {
              rowDataHandler(params.row);
            }}
          >
            Edit
          </Button>:""}
          {reportLable==="Cancel_Item_List"? <Button
            onClick={(data) => {
              rowDataHandler(params.row);
            }}
          >
            Edit
          </Button>:""}
          </>
           
          );
        },

      };
    } else if (element === "Image") {
      fieldRes = {
        field: "Image",
        headerName: "Image",
        sortable: false,
        // width: 100,
        innerHeight: 500,
        flex: 1,

        renderCell: (params) => {
          return (
            <SingleImgCreator
              itemCode={
                params.row.itemCode ? params.row.itemCode : "not item codev"
              }
              link="https://tanishqdigitalnpim.titan.in/NpimImages/"
            />
          );
        },
      };
    }else if(element==="confirmationStatus"){
      fieldRes = {
        field: "confirmationStatus",
        headerName: "confirmationStatus",
        sortable: false,
        // width: 100,
        flex: 1,
        disableClickEventBubbling: true,
        renderCell: (params) => {
          //console.log(params,"render cell")
          return (
          <>
          {params?.row?.confirmationStatus===""?"":<p style={{color:"green"}}>Success</p>}
          </>)

      }
    }}
     else {
      fieldRes = {
        field: element,
        flex: 1,
        sortable: false,
        // width: 150,
        // headerName: element.toUpperCase(),
      };
    }
    return fieldRes;
  });
  const handelSearch = (e) => {
    setSearchValue(e.target.value);
  };
  console.log(rows, "rowsrows");
  const Datarows =
    reportLable === "Item_Wise_Report"
      ? rows?.filter((eachRow) =>
          eachRow?.itemCode?.includes(searchValue.toUpperCase())
        )
      : rows;
  return (
    <>
      <Container maxWidth="xl">
        <Typography align="center" variant="h5" color="secondary">
          {reportLable}
        </Typography>
        <Suspense fallback={<Typography>Data is loading </Typography>}>
          <DataGrid
            rows={Datarows}
            columns={coloum}
            autoHeight={true}
            // autoPageSize={true}
            // pageSize={100}
            // pageSize={10}
            // paginationMode="server"
            // disableColumnSelector
            rowsPerPageOptions={[50]}
            pagination
            pageSize={50}
            // rowCount={100}
            // paginationMode="server"
            // onPageChange={(newPage) => setPage(newPage)}
            // loading={loading}
            components={{
              Toolbar: CustomToolbar,
            }}
            componentsProps={{
              toolbar: { handelSearch: handelSearch, reportLable: reportLable, rows:rows,popupopen:popupopen,handelYes:handelYes,handelClose:handelClose,handelOpen:handelOpen },
            }}
          />
        </Suspense>
      </Container>
    </>
  );
};

export default LazyLoadindDataGrid;
