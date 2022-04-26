import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import { Button, Paper } from "@mui/material";
import useStyles from "../../styles";
import { TextField } from "@mui/material";
import { Stack } from "@mui/material";
import Axios from "axios";


export default function AddCategory() {
  const classes = useStyles();
  const [catName, setCatName] = useState("");
  const [catDesc, setCatDesc] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const addCategory = (e) => {
    if(catName.length)
    e.preventDefault();
    Axios.post("http://localhost:5000/insertCategory", {
      categoryName: catName,
      categoryDescription: catDesc,
    }).then((response) => {
      if(response.data!="result"){
        setErrorMessage(response.data);
        console.log(errorMessage);
      }
      else setErrorMessage("Category added!");
    });
  };

  const reset = (e) => {
    e.preventDefault();
    setCatDesc("");
    setCatName("");
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
            Add a Category
          </Typography>
          <TextField
            className={classes.formcomps}
            id="catName"
            value={catName}
            label="Category Name"
            variant="outlined"
            margin="dense"
            fullWidth
            onChange={(e) => {
              setCatName(e.target.value);
            }}
          />

          <TextField
            id="catDesc"
            value={catDesc}
            label="Description"
            className={classes.formcomps}
            multiline
            rows={4}
            fullWidth
            margin="dense"
            onChange={(e) => {
              setCatDesc(e.target.value);
            }}
          />
          <Stack className={classes.buttonstack} direction="row" spacing={2}>
            <Button variant="contained" onClick={addCategory}>
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
