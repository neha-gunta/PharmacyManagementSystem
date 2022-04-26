import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import { Button, Link, Paper } from "@mui/material";
import ListItemText from "@mui/material/ListItemText";
import useStyles from "../../styles";
import { TextField } from "@mui/material";
import { Stack } from "@mui/material";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';


import Axios from "axios";

const drawerWidth = 200;

export default function StartSell() {
  const classes = useStyles();
  const[isValid,setisValid]=useState(true)
  const [custName, setCustName] = useState("");
  const [custNumber, setCustNumber] = useState("");
  const[itemName,setItemName]=useState("");
  const [qnty,setQnty]=useState("");
  const [CartItems,setCart]=useState([{
      ProductID:1,
      ProductName:"abcd",
      Qnty:3,
      CostPerItem:4,
      TotalCost:12
  }]);
 
    const  ProductName="abcdee"
    const OrderID=10
     
     const CostPerItem=4
     
  
  const addToCart=(e)=>{
      e.preventDefault();
      setCart([...CartItems,{
          ProductID:2,
          ProductName,
          Qnty:qnty,
          CostPerItem,
          TotalCost:CostPerItem*qnty
      }])
  }
  useEffect(()=>console.log("hello"),[isValid])
  const continueButton=()=>{
    if (custName=="" || custNumber=="") alert("Customer Name and Phone Number cannot be empty");
    else if(custNumber.length!=10) alert("Invalid Phone Number")
    else setisValid(true)
  }
  const deleteFromCart=(e)=>{
      e.preventDefault();
      setCart(CartItems.filter((item)=>item.ProductID!=e.target.id))
  }

  const reset = (e) => {
    e.preventDefault();
    setCustNumber("");
    setCustName("");
    setItemName("");
    setQnty("");
    isValid=false;
  };

  return (
    
<>
        <Paper
          elevation={16}
          className={classes.paper}
          style={{
            padding: 4,
            margin: 2,
          }}
        >
          <Typography variant="h5" marginLeft={1} marginTop = {2} marginBottom={2} textAlign="initial">
            Customer Details
          </Typography>
        <div style={{display:"flex",flexDirection:"row",alignItems:"stretch"}}>
        
          <TextField
            className={classes.formcomps}
            id="compName"
            value={custName}
            label="Customer Name"
            variant="outlined"
            margin="dense"
            
            sx={{margin:"10px",width:"350px"}}
            onChange={(e) => {
              setCustName(e.target.value);
            }}
          />

          <TextField
            id="compDesc"
            value={custNumber}
            label="Phone Number"
            className={classes.formcomps}
            sx={{margin:"10px",width:"350px"}}
            
            
            margin="dense"
            onChange={(e) => {
              setCustNumber(e.target.value);
            }}
          /></div>

        

          <Stack className={classes.buttonstack} direction="row" spacing={2}>
            <Button variant="contained" onClick={continueButton}>
              Continue
            </Button>
            <Button variant="contained" onClick={reset}>
              Reset
            </Button>
          </Stack>


        </Paper>
        <div style={{display:`${isValid?"compact":"none"}`}}>
        <Paper
          elevation={16}
          className={classes.paper}
          style={{
            padding: 8,
            margin: 2,
          }}
        >
            <Typography variant="h5" marginLeft={1} marginTop = {2} marginBottom={2} textAlign="initial">
            Product Details
          </Typography>

        <div style={{display:"flex",flexDirection:"row"}}>

        <TextField
        className={classes.formcomps}
        id="compName"
        value={itemName}
        label="Product Name"
        variant="outlined"
        margin="dense"
        sx={{margin:"10px"}}
        onChange={(e) => {
            setItemName(e.target.value);
        }}
        />

        <TextField
        id="compDesc"
        value={qnty}
        label="Quantity"
        className={classes.formcomps}
        sx={{margin:"10px"}}
        margin="dense"
        onChange={(e) => {
            setQnty(e.target.value);
        }}
        /></div>

          <Stack className={classes.buttonstack} direction="row" spacing={2}>
            <Button variant="contained" onClick={addToCart}>
              Add to cart
            </Button>
            <Button variant="contained" onClick={reset}>
              Reset
            </Button>
          </Stack>

        </Paper>
        <Paper
          elevation={16}
          
          style={{
            padding: 8,
            margin: 2,
          }}
        >
            <TableContainer>
    <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Product ID</TableCell>
            <TableCell align="right">Product Name</TableCell>
            <TableCell align="right">Quantity</TableCell>
            <TableCell align="right">Cost Per Item</TableCell>
            <TableCell align="right">Total Cost</TableCell>
            <TableCell align="right">Action</TableCell>
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
              <TableCell align="right"><Button id={row.ProductID} onClick={deleteFromCart}>Delete</Button></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      </TableContainer>
     
            <Button variant="contained" href={`/OrderReport/${OrderID}`}  >
              Place Order
            </Button>
            
          
      </Paper></div></>
      
  );
}
