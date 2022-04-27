import React, { useState, useEffect } from "react";
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

export default function CategoryReport() {
  const classes = useStyles();

  const [categories, setCategories] = useState([]);

    useEffect(() => {
        getCategories();
    }, []);

    const getCategories = () => {
        Axios.get("http://localhost:5000/getCategory")
        .then((response) => {
          console.log(response.data);
          setCategories(response.data);
        })
    };

    function deleteCategory(Name){
      Axios.delete("http://localhost:5000/deleteCategory/"+Name)
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
        Category Report
      </Typography>
      <TableContainer>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Category Name</TableCell>
              <TableCell align="center">Description</TableCell>
              
              <TableCell align="center">Action</TableCell>
            </TableRow>
            {categories.map((category) => (
              <TableRow
                key={category.categoryID}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="center">{category.categoryName}</TableCell>
                <TableCell align="center">
                  {category.categoryDescription}
                </TableCell>
                <TableCell align="center">
                  <Button id={category.categoryDescription} onClick={() => {deleteCategory(category.categoryName)}}>
                    Delete
                  </Button>
                  <Button id={category.categoryID} href={`/UpdateCategory/${category.categoryName}`}>
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
