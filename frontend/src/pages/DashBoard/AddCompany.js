import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import { Button, Link, Paper } from "@mui/material";
import useStyles from "../../styles";
import { TextField } from "@mui/material";
import { Stack } from "@mui/material";
import Axios from "axios";

const drawerWidth = 200;

export default function AddCompany() {
  const classes = useStyles();
  const [compName, setCompName] = useState("");
  const [compDesc, setCompDesc] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const addCompany = (e) => {
    e.preventDefault();
    Axios.post("http://localhost:5000/insertCompany", {
      companyName: compName,
      companyDescription: compDesc,
    }).then((response) => {
      if(response.data!="result"){
        setErrorMessage(response.data);
        console.log(errorMessage);
      }
      else setErrorMessage("Company added!");
    });
  };

  const reset = (e) => {
    e.preventDefault();
    setCompDesc("");
    setCompName("");
    setErrorMessage("");
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
          <Typography variant="h5" marginLeft={1} marginTop = {2} marginBottom={2} textAlign="initial">
            Add a Company
          </Typography>

          <TextField
            className={classes.formcomps}
            id="compName"
            value={compName}
            label="Company Name"
            variant="outlined"
            margin="dense"
            fullWidth
            onChange={(e) => {
              setCompName(e.target.value);
            }}
          />

          <TextField
            id="compDesc"
            value={compDesc}
            label="Description"
            className={classes.formcomps}
            multiline
            rows={4}
            fullWidth
            margin="dense"
            onChange={(e) => {
              setCompDesc(e.target.value);
            }}
          />
          <Stack className={classes.buttonstack} direction="row" spacing={2}>
            <Button variant="contained" onClick={addCompany}>
              Add
            </Button>
            <Button variant="contained" onClick={reset}>
              Reset
            </Button>
            <Typography color={"red"}>
              {errorMessage}
            </Typography>
          </Stack>
        </Paper>
     
  );
}
