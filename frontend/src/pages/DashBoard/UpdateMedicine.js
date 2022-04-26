import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import { Button, Link, Paper } from "@mui/material";
import useStyles from "../../styles";
import { TextField } from "@mui/material";
import { Stack } from "@mui/material";
import Axios from "axios";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import DashBoard from "./DashBoard";
import { withRouter, RouteComponentProps } from "react-router-dom";
 
function UpdateMedicine(props: UpdateProps) {
  const [id, setId] = useState(props.match.params.id);
  console.log(props.match.params.id, id);
  //props.match.params.id
  const classes = useStyles();
  
  const [desc, setDesc] = useState("");
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [category, setCategory] = useState("");
  const [companies,setCompanies]=useState([]);
  const[categories,setCategories]=useState(["e"]);
  
  
  const addmedicine = (e) => {
    e.preventDefault();
    if(title=="" || desc=="") alert("All the fields have to be filled") 
    else{ 
    Axios.put(`http://localhost:5000/editMedicine/${id}`, {
      medicineName:title, 
     medicineDescription:desc,
     companyName:company,
      categoryName:category}).then((response) => {
      console.log(response.data);
    }).catch((err)=>console.log(err));}
  };
  
  ///editMedicine/:id
  useEffect(()=>{
    Axios.get(`http://localhost:5000/getMedicine/${id}`).then((resp)=>{
    //   console.log(resp.data[0])
      const body=resp.data[0]
  console.log(body)
      setTitle(body.medicineName)
      setDesc(body.medicineDescription)
      setCompany(body.companyName)
      setCategory(body.categoryName)
    })
    Axios.get("http://localhost:5000/getCategory").then((resp)=>{
      
      setCategories(resp.data);
      
    }).catch((err)=>console.log(err))
    Axios.get("http://localhost:5000/getCompany").then((resp)=>{
      
      setCompanies(resp.data);
      
    })
  },[])
 
  const reset = (e) => {
    e.preventDefault();
    setTitle("");
    setCompany("");
    setDesc("");
    setCategory("");
  };
 
  return (
      <DashBoard>
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
        Update a Medicine
      </Typography>
 
      <FormControl sx={{ m: 0, minWidth: "100%" }}>
        <InputLabel id="label">Select Category</InputLabel>
        <Select
          labelId="category"
          id="category"
          value={category}
          fullWidth
          onChange={(e) => {
            setCategory(e.target.value);
          }}
        >
          
          {categories.map((x)=>{
            return( 
            <MenuItem value={`${x.categoryName}`}>{ `${x.categoryName}`}</MenuItem>)
          })}
          
          
        </Select>
      </FormControl>
 
      <FormControl sx={{ m: 0, minWidth: "100%" }}>
        <InputLabel id="label">Select Company</InputLabel>
        <Select
          labelId="label"
          id="company"
          value={company}
          fullWidth
          label="Select Company"
          onChange={(e) => {
            setCompany(e.target.value);
          }}
        >
          {companies.map((x)=>{
            return( 
            <MenuItem value={`${x.companyName}`}>{ `${x.companyName}`}</MenuItem>)
          })}
        </Select>
      </FormControl>
 
      <TextField
        id="title"
        value={title}
        label="Product Title"
        className={classes.formcomps}
        fullWidth
        margin="dense"
        onChange={(e) => {
          setTitle(e.target.value);
        }}
      />
 
      <TextField
        id="desc"
        value={desc}
        label="Description"
        className={classes.formcomps}
        fullWidth
        margin="dense"
        onChange={(e) => {
          setDesc(e.target.value);
        }}
      />
 
      <Stack className={classes.buttonstack} direction="row" spacing={2}>
        <Button variant="contained" onClick={addmedicine}>
          Add
        </Button>
        <Button variant="contained" onClick={reset}>
          Reset
        </Button>
      </Stack>
    </Paper>
    </DashBoard>
  );
}

interface updateEmProps extends RouteComponentProps {
  myField: string;
}

export default withRouter(UpdateMedicine);