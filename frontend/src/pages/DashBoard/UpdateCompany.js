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

function UpdateCompany(props: UpdateProps) {
  const [companyName, setCompanyName] = useState(props.match.params.name);
  const [companyDescription, setCompanyDescription] = useState("");
  console.log(companyName)
  const classes = useStyles();
  const [errorMessage, setErrorMessage] = useState("");

  const updateCompany = (e) => {
    e.preventDefault();
    if (companyName == "" || companyDescription == "")
      alert("All the fields have to be filled");
    else {
      Axios.put(`http://localhost:5000/editCompany/${companyName}`, {
        companyName: companyName,
        companyDescription: companyDescription,
        
      })
        .then((response) => {
          console.log(response.data);
          console.log(companyName);
        })
        .catch((err) => console.log(err));
    }
  };

  useEffect(() => {
    Axios.get(`http://localhost:5000/getCompany/${companyName}`).then(
      (resp) => {
        console.log(resp.data)
        const body = resp.data[0];
        console.log(body);
        setCompanyName(body.companyName);
        setCompanyDescription(body.companyDescription);
      }
    );
  }, []);

  const reset = (e) => {
    e.preventDefault();
    setCompanyDescription("");
    setCompanyName("");
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
          id="companyName"
          value={companyName}
          label="Company Name"
          variant="outlined"
          margin="dense"
          fullWidth
          onChange={(e) => {
            setCompanyName(e.target.value);
          }}
        />

        <TextField
          id="companyDescription"
          value={companyDescription}
          label="Description"
          className={classes.formcomps}
          multiline
          rows={4}
          fullWidth
          margin="dense"
          onChange={(e) => {
            setCompanyDescription(e.target.value);
          }}
        />
        <Stack className={classes.buttonstack} direction="row" spacing={2}>
          <Button variant="contained" onClick={updateCompany}>
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

export default withRouter(UpdateCompany);
