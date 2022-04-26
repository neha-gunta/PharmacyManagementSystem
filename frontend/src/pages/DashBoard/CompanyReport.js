import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import { Link, Paper } from "@mui/material";
import ListItemText from "@mui/material/ListItemText";
import useStyles from "../../styles";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Axios from "axios";

const drawerWidth = 200;

export default function CompanyReport() {
  const classes = useStyles();

  const [companies, setCompanies] = useState([]);

    useEffect(() => {
        getCompanies()
    }, []);

    const getCompanies = () => {
        Axios.get("http://localhost:5000/getCompany")
        .then((response) => {
          console.log(response.data);
          setCompanies(response.data);
        })
    };

    function deleteCompany(Name){
        Axios.delete("http://localhost:5000/deleteCompany/"+Name)
        .then((response)=>{
          console.log(Name);
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
        Company Report
      </Typography>
      <TableContainer>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Company Name</TableCell>
              <TableCell align="center">Description</TableCell>
              
              <TableCell align="center">Action</TableCell>
            </TableRow>
            {companies.map((company) => (
              <TableRow
                key={company.companyID}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="center">{company.companyName}</TableCell>
                <TableCell align="center">
                  {company.companyDescription}
                </TableCell>
                <TableCell align="center">
                  <Button id={company.companyName} onClick={() => {deleteCompany(company.companyName)}}>
                    Delete
                  </Button>
                  <Button id={company.companyID}>
                    Edit
                  </Button>
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
