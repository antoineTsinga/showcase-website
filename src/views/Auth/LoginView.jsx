import React, { useState } from "react";

import { Box, Button, Grid, TextField, Typography } from "@mui/material";

import { Link } from "react-router-dom";
import logo from "../../assets/images/logo.png";

export default function LoginView({ handleLogin }) {
  const [data, setData] = useState({ username: "", password: "" });

  function handleChange(e) {
    e.preventDefault();
    setData({ ...data, [e.target.name]: e.target.value });
  }

  return (
    <div
      className="form-login"
      style={{
        width: "90%",
        maxWidth: "485px",
        textAlign: "center",
        margin: "50px",
        padding: "64px",
        height: "589px",
        fontFamily: "$font",
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
      }}
    >
      <form>
        <Box>
          <Box
            component="img"
            sx={{
              height: "105px",
              width: "194px",
              marginBottom: 5,
            }}
            alt="Logo Studeat"
            src={logo}
          />
          <Typography
            variant="h4"
            gutterBottom={true}
            style={{ fontFamily: "$font" }}
          >
            Connectez-vous
          </Typography>
          <Grid
            sx={{
              display: "grid",
              gridTemplateRows: "repeat(3, 1fr)",
            }}
          >
            <TextField
              required
              helperText=" "
              id="outlined-required"
              label="E-mail"
              value={data.username}
              onChange={handleChange}
              name="username"
            />
            <TextField
              required
              helperText=" "
              id="outlined-password-input"
              label="Password"
              type="password"
              autoComplete="current-password"
              value={data.password}
              onChange={handleChange}
              name="password"
            />
            <Button
              helperText=" "
              className="btn-primary"
              variant="contained"
              sx={{
                marginBottom: 2,
                bgcolor: "var(--color-secondary) !important",
              }}
              style={{ fontFamily: "$font", height: "50px" }}
              onClick={() => handleLogin(data)}
            >
              Connexion
            </Button>
          </Grid>
        </Box>
      </form>
      <div>
        <Link to="/forgot-password">
          <Typography style={{ fontFamily: "$font" }}>
            Mot de passe oublié ?
          </Typography>
        </Link>

        <p>
          <Typography style={{ fontFamily: "$font" }}>
            Vous n'avez pas encore de compte ?{" "}
            <Link to="/registration">Inscrivez-vous</Link>
          </Typography>
        </p>
      </div>
    </div>
  );
}
