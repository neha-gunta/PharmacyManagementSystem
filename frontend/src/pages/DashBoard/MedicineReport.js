import React, { useState, useEffect } from "react";
import { withRouter, RouteComponentProps } from "react-router";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import { Paper } from "@mui/material";
import ListItemText from "@mui/material/ListItemText";
import useStyles from "../../styles";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Axios from "axios";
import { Link } from "react-router-dom";

const drawerWidth = 200;

function MedicineReport(props: MyComponent) {
  const classes = useStyles();

  const [reports, setReports] = useState([]);

    useEffect(() => {
        getReport()
    }, []);

    const getReport = () => {
        Axios.get("http://localhost:5000/getAllMedicine")
        .then((response) => {
          console.log(response.data);
          setReports(response.data);
        })
    };

    function deleteMedicine(id){
      Axios.delete("http://localhost:5000/deleteMedicine/"+id)
      .then((response)=>{
        console.log(id);
        window.location.reload(false);
      })
    };

  return (
    <Paper
      elevation={16}
      className={classes.paper}
      style={{
        padding: 8,
        margin: 2,
      }}
    >
      <Typography
        variant="h5"
        marginLeft={1}
        marginTop={2}
        marginBottom={2}
        textAlign="initial"
      >
        Medicine Report
      </Typography>
      <TableContainer>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Medicine ID</TableCell>
              <TableCell align="center">Medicine Name</TableCell>
              <TableCell align="center">Medicine Decription</TableCell>
              <TableCell align="center">Category</TableCell>
              <TableCell align="center">Company</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
            {reports.map((report) => (
              <TableRow
                key={report.reportID}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="center">{report.medicineID}</TableCell>
                <TableCell align="center">{report.medicineName}</TableCell>
                <TableCell align="center">{report.medicineDescription}</TableCell>
                <TableCell align="center">{report.categoryName}</TableCell>
                <TableCell align="center">{report.companyName}</TableCell>
                <TableCell align="center">
                  <Button id={report.medicineID} onClick={() => {deleteMedicine(report.medicineID)}}>
                    Delete
                  </Button>
                  <Link to={`/UpdateMedicine/${report.medicineID}`}><Button id={report.medicineID}>
                    Edit
                  </Button></Link>
                </TableCell>
              </TableRow>
            ))}
          </TableHead>
          <TableBody>
            
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}

interface MyComponent extends RouteComponentProps {
  myField: string;
}

export default withRouter(MedicineReport);