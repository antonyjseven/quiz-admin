import React, { useState, useCallback } from "react";
import firebase from "firebase/app";
import { useHistory } from "react-router-dom";
import {
  Avatar,
  Button,
  TextField,
  Link,
  Box,
  Typography,
  Container,
  CircularProgress,
  CssBaseline
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";

import { useStyles } from "./styles";

const Copyright = () => {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://telegram.me/antonyjseven">
        Antony
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
};

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const classes = useStyles();
  const history = useHistory();

  const emailChangeHandler = useCallback((e) => {
    setError("");
    setEmail(e.target.value);
  }, []);

  const passwordChangeHandler = useCallback((e) => {
    setError("");
    setPassword(e.target.value);
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();
    setLoading(true);
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => history.push("/dashboard"))
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Quizz Dashboard
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            error={error}
            color={error ? "secondary" : "primary"}
            onChange={emailChangeHandler}
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            helperText={error}
            error={error}
            color={error ? "secondary" : "primary"}
            autoComplete="current-password"
            onChange={passwordChangeHandler}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={submitHandler}
            disabled={loading}
          >
            {loading ? <CircularProgress size={28} /> : "Login"}
          </Button>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
};

export default Login;
