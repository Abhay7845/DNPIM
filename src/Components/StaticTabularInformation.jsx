import { Typography } from "@material-ui/core";
import {
  makeStyles,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Divider,
} from "@material-ui/core";
import React from "react";

const useStyles = makeStyles({
  root: {
    paddingTop: "0%",
  },
  table: {
    minWidth: 1,
    margin: "0%",
    marginBottom: "1%",
    padding: "0%",
    backgroundColor: "#c4c4c0",
    fontFamily: "Raleway,sans-serif",
  },

  tableHeader: {},
  tableCell: {
    border: "solid",
    borderColor: "white",
    letterSpacing: "2px",
    fontSize: "13px",
    fontWeight: 500,
    lineHeight: "normal",
  },
  tableCellConsumer: {
    border: "solid",
    borderColor: "white",
    letterSpacing: "2px",
    fontSize: "13px",
    fontWeight: 500,
    lineHeight: "normal",
    cursor: "pointer",
    "&:focus,&:active": {
      color: "#000000",
      fontWeight: 800,
    },
  },
});
function createData(ri1, ri2, ri3, ri4, ri5) {
  return { ri1, ri2, ri3, ri4, ri5 };
}
const rows = [
  createData("r21", "r22", "r23", "r24", "r25"),
  createData("r31", "r32", "r33", "r34", "r35"),
];
console.log(rows, "rows");
const StaticTabularInformation = (props) => {
  const classes = useStyles();
  console.log(props, "static table proprs");
  const { consumerBase } = props;
  return (
    <>
      <div className={classes.root}>
        <Paper>
          <Table
            className={classes.table}
            size="small"
            aria-label="a dense table"
          >
            <TableHead className={classes.tableHeader}>
              <TableRow>
                <TableCell
                  className={classes.tableCell}
                  component="th"
                  scope="row"
                  align="left"
                  onClick={
                    consumerBase
                      ? () => {
                          console.log("row1");
                        }
                      : ""
                  }
                >
                  {consumerBase ? "ROW11" : "SI2_GH"}
                </TableCell>
                <TableCell className={classes.tableCell} align="left">
                  {consumerBase ? "ROW12" : "VS_GH"}
                </TableCell>
                <TableCell className={classes.tableCell} align="left">
                  {consumerBase ? "ROW13" : "VVS1"}
                </TableCell>
                <TableCell className={classes.tableCell} align="left">
                  {consumerBase ? "ROW14" : "I2_GH"}
                </TableCell>
                <TableCell className={classes.tableCell} align="left">
                  {consumerBase ? "ROW11" : "SI2_IJ"}
                </TableCell>
              </TableRow>
            </TableHead>
            {consumerBase ? (
              <TableBody>
                {rows.map((row) => (
                  <TableRow
                    className={classes.tableCell}
                    component="td"
                    scope="row"
                    align="left"
                  >
                    <TableCell className={classes.tableCell} align="left">
                      {row.ri1}
                    </TableCell>
                    <TableCell className={classes.tableCell} align="left">
                      {row.ri2}
                    </TableCell>
                    <TableCell className={classes.tableCell} align="left">
                      {row.ri3}
                    </TableCell>
                    <TableCell className={classes.tableCell} align="left">
                      {row.ri4}
                    </TableCell>
                    <TableCell className={classes.tableCell} align="left">
                      {row.ri5}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            ) : (
              <TableBody>
                <TableRow key={props.si2Gh}>
                  <TableCell
                    className={classes.tableCell}
                    component="td"
                    scope="row"
                    align="left"
                  >
                    {props.si2Gh}
                  </TableCell>
                  <TableCell className={classes.tableCell} align="left">
                    {props.vsGh}
                  </TableCell>
                  <TableCell className={classes.tableCell} align="left">
                    {props.vvs1}
                  </TableCell>
                  <TableCell className={classes.tableCell} align="left">
                    {props.i2Gh}
                  </TableCell>
                  <TableCell className={classes.tableCell} align="left">
                    {props.si2Ij}
                  </TableCell>
                </TableRow>
              </TableBody>
            )}
          </Table>
        </Paper>
      </div>
    </>
  );
};

export const StaticTabularConsumerBase = () => {
  const classes = useStyles();
  return (
    <>
      <div className={classes.root}>
        <Paper>
          <Table
            className={classes.table}
            size="small"
            aria-label="a dense table"
          >
            <TableHead className={classes.tableHeader}>
              <TableRow>
                <TableCell
                  className={classes.tableCell}
                  component="th"
                  scope="row"
                  align="left"
                  onClick={() => {
                    alert("Row11");
                  }}
                >
                  ROW11
                </TableCell>
                <TableCell
                  onClick={() => {
                    alert("Row12");
                  }}
                  className={classes.tableCellConsumer}
                  align="left"
                >
                  ROW12{" "}
                </TableCell>
                <TableCell
                  onClick={() => {
                    alert("Row13");
                  }}
                  className={classes.tableCellConsumer}
                  align="left"
                >
                  ROW13{" "}
                </TableCell>
                <TableCell
                  onClick={() => {
                    alert("Row14");
                  }}
                  className={classes.tableCellConsumer}
                  align="left"
                >
                  ROW14
                </TableCell>
                <TableCell
                  onClick={() => {
                    alert("Row15");
                  }}
                  className={classes.tableCellConsumer}
                  align="left"
                >
                  ROW15
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  className={classes.tableCellConsumer}
                  component="td"
                  scope="row"
                  align="left"
                  key={row.ri1}
                >
                  <TableCell
                    onClick={() => {
                      alert(row.ri1);
                    }}
                    className={classes.tableCellConsumer}
                    align="left"
                  >
                    {row.ri1}
                  </TableCell>
                  <TableCell
                    onClick={() => {
                      alert(row.ri2);
                    }}
                    className={classes.tableCellConsumer}
                    align="left"
                  >
                    {row.ri2}
                  </TableCell>
                  <TableCell
                    onClick={() => {
                      alert(row.ri3);
                    }}
                    className={classes.tableCellConsumer}
                    align="left"
                  >
                    {row.ri3}
                  </TableCell>
                  <TableCell
                    onClick={() => {
                      alert(row.ri4);
                    }}
                    className={classes.tableCellConsumer}
                    align="left"
                  >
                    {row.ri4}
                  </TableCell>
                  <TableCell
                    onClick={() => {
                      alert(row.ri5);
                    }}
                    className={classes.tableCellConsumer}
                    align="left"
                  >
                    {row.ri5}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </div>
    </>
  );
};
export default StaticTabularInformation;
