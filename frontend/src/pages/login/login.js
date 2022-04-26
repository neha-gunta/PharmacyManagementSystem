import React, { useState } from "react";
import Box from "@mui/material/Box";
import Axios from "axios";
import "./login.css";
import img from "../../bg.jpeg"
import { Paper } from "@mui/material";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const styles = {
    paperContainer: {
      backgroundImage: `url(${"./bg.jpeg"})`,
    },
  };
  const login = (e) => {
    e.preventDefault();
    Axios.post("http://localhost:5000/login", {
      username: username,
      password: password,
    }).then((response) => {
      console.log(response.data);
    });
  };
  return (
    <div className="page-wrapper">
    <div className="title-wrapper">
    <Typography component="h1" variant="h5" >
            Pharmacy Management
          </Typography></div>
    <div className="wrappertwo">
      
      <div className="login-wrapper">
        <Box
          sx={{
            marginRight: "10%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={login} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoFocus
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
          </Box>
        </Box>
        
      </div>
      <img src={img} alt="img" />
    </div>
    </div>
  );
}
