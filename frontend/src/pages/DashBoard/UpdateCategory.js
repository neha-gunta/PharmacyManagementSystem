import React, { useState,useEffect } from "react";
import Typography from "@mui/material/Typography";
import { Button, Link, Paper } from "@mui/material";
import useStyles from "../../styles";
import { TextField } from "@mui/material";
import { Stack } from "@mui/material";
import Axios from "axios";
import { withRouter, RouteComponentProps } from "react-router-dom";
import DashBoard from "./DashBoard";
const drawerWidth = 200;

function UpdateCategory(props: UpdateProps) {
  const [categoryName, setCategoryName] = useState(props.match.params.name);
  const [categoryDescription, setCategoryDescription] = useState("");
  console.log(categoryName)
  const classes = useStyles();
  const [errorMessage, setErrorMessage] = useState("");

  const updateCategory = (e) => {
    e.preventDefault();
    if (categoryName == "" || categoryDescription == "")
      alert("All the fields have to be filled");
    else {
      Axios.put(`http://localhost:5000/editCategory/${categoryName}`, {
        categoryName: categoryName,
        categoryDescription: categoryDescription,
        
      })
        .then((response) => {
          console.log(response.data);
          console.log(categoryName);
        })
        .catch((err) => console.log(err));
    }
  };

  useEffect(() => {
    Axios.get(`http://localhost:5000/getCategory/${categoryName}`).then(
      (resp) => {
        console.log(resp.data)
        const body = resp.data[0];
        console.log(body);
        setCategoryName(body.categoryName);
        setCategoryDescription(body.categoryDescription);
      }
    );
  }, []);

  const reset = (e) => {
    e.preventDefault();
    setCategoryDescription("");
    setCategoryName("");
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
        <Typography
          variant="h5"
          marginLeft={1}
          marginTop={2}
          marginBottom={2}
          textAlign="initial"
        >
          Update a Company
        </Typography>

        <TextField
          className={classes.formcomps}
          id="categoryName"
          value={categoryName}
          label="Category Name"
          variant="outlined"
          margin="dense"
          fullWidth
          onChange={(e) => {
            setCategoryName(e.target.value);
          }}
        />

        <TextField
          id="categoryDescription"
          value={categoryDescription}
          label="Description"
          className={classes.formcomps}
          multiline
          rows={4}
          fullWidth
          margin="dense"
          onChange={(e) => {
            setCategoryDescription(e.target.value);
          }}
        />
        <Stack className={classes.buttonstack} direction="row" spacing={2}>
          <Button variant="contained" onClick={updateCategory}>
            Add
          </Button>
          <Button variant="contained" onClick={reset}>
            Reset
          </Button>
          <Typography color={"red"}>{errorMessage}</Typography>
        </Stack>
      </Paper>
  );
}

interface updateEmProps extends RouteComponentProps {
  myField: string;
}

export default withRouter(UpdateCategory);
