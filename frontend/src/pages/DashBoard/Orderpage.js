import React, { useState } from "react";
import { Button } from "@mui/material";
import useStyles from "../../styles";

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

export default function OrderPage(props) {
  const classes = useStyles();
  
     console.log(window.location.pathname)
  const OrderID=window.location.pathname.split("/")[2];
  const [CartItems,setCart]=useState([{
    ProductID:1,
    ProductName:"abcd",
    Qnty:3,
    CostPerItem:4,
    TotalCost:12
}]);

  

  return ( 

<>
        {OrderID}
        <TableContainer>
    <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Product ID</TableCell>
            <TableCell align="right">Product Name</TableCell>
            <TableCell align="right">Quantity</TableCell>
            <TableCell align="right">Cost Per Item</TableCell>
            <TableCell align="right">Total Cost</TableCell>
           
          </TableRow>
        </TableHead>
        <TableBody>
          {CartItems.map((row) => (
            <TableRow
              key={row.ProductID}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.ProductID} 
              </TableCell>
              <TableCell align="right">{row.ProductName}</TableCell>
              <TableCell align="right">{row.Qnty}</TableCell>
              <TableCell align="right">{row.CostPerItem}</TableCell>
              <TableCell align="right">{row.TotalCost}</TableCell>
              
            </TableRow>
          ))}
        </TableBody>
      </Table>
      </TableContainer>
      <Button variant="contained" onClick={()=>window.history.back()}  >
              Back
            </Button>
            </>
      
  );
}
