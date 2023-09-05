import {
  Box,
  Button,
  Card,
  Container,
  Divider,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { http } from "../../lib/http";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { truncate } from "fs/promises";

const Login = ({ setToken }: { setToken: any }) => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const response = await http.post("/auth/local", {
        identifier: username,
        password: password,
      });

      setToken(response.data.jwt);
    } catch (error) {
      console.log(error);
    }
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  return (
    <>
      <Grid
        container
        spacing={2}
        component='form'
        noValidate
        autoComplete='off'
        onSubmit={handleSubmit}
      >
        <Grid item xs={12}>
          <Typography variant='h5' sx={{ fontWeight: "bold" }} align='center'>
            Welcome
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <TextField
            label='Username'
            variant='outlined'
            type='text'
            onChange={(e) => setUserName(e.target.value)}
            fullWidth={true}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth={true} variant='outlined'>
            <InputLabel>Password</InputLabel>
            <OutlinedInput
              onChange={(e) => setPassword(e.target.value)}
              type={showPassword ? "text" : "password"}
              endAdornment={
                <InputAdornment position='end'>
                  <IconButton
                    aria-label='toggle password visibility'
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge='end'
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label='Password'
            />
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <Button type='submit' variant='contained' fullWidth={true}>
            Log in
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Divider>
            <Typography variant='body1'>Forgot password</Typography>
          </Divider>
        </Grid>
      </Grid>
    </>
  );
};

export default Login;
