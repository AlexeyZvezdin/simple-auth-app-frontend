import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { CloseButton } from "./elements";

import validatePass from "../components/helpers/validatePass.js";
import validateEmail from "../components/helpers/validateEmail";

const useStyles = makeStyles(theme => ({
  "@global": {
    body: {
      backgroundColor: theme.palette.common.grey
    }
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

export default function Register(props) {
  const classes = useStyles();

  const [state, setState] = useState({
    // @prettier-ignore
    fields: { password: null, email: null },
    checks: { password: null, email: null },
    rememberMeCheckBox: false,
    passEquality: null
  });

  const [serverState, setServerState] = useState({
    loading: false,
    loginAlreadyExists: false
  });

  const [visualState, setVisualState] = useState({
    // @prettier-ignore
    SignInEmailClass: "null",
    SignInPasswordClass: "null"
  });

  const comparePasswords = e => {
    let confirmPass = e.target.value;

    if (
      state.checks.password === true &&
      confirmPass === state.fields.password
    ) {
      setState({
        ...state,
        passEquality: true
      });
    } else {
      setState({
        ...state,
        passEquality: false
      });
    }
  };

  const changeEmail = e => {
    validateEmail(e.target.value).then(res => {
      setState({
        ...state,
        checks: {
          ...state.checks,
          email: res.Check
        },
        fields: {
          ...state.fields,
          email: res.Email
        }
      });
      setVisualState({
        ...visualState,
        SignInEmailClass: res.SignInEmailClass
      });
      console.log(state);
    });
  };

  const changePass = e => {
    validatePass(e.target.value)
      .then(res => {
        setState({
          ...state,
          checks: {
            ...state.checks,
            password: res.Check
          },
          fields: {
            ...state.fields,
            password: res.Password
          }
        });
        setVisualState({
          ...visualState,
          SignInPasswordClass: res.SignInPasswordClass
        });
      })
      .then(() => console.log(state));
    // then check both fields and show button
  };

  return (
    <Container component="main" maxWidth="xs" className="signInAnimation">
      <CssBaseline />
      <div className={classes.paper}>
        <CloseButton onClick={props.handleOnClick} />
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Register
        </Typography>
        <form className={classes.form} noValidate onSubmit={props.onSubmit}>
          <TextField
            className={visualState.SignInEmailClass}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={e => changeEmail(e)}
          />
          <TextField
            className={visualState.SignInPasswordClass}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={e => changePass(e)}
          />
          <TextField
            className={
              state.passEquality === true ? visualState.SignInPasswordClass : ""
            }
            onChange={e => comparePasswords(e)}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password_check"
            label="Enter password again"
            type="password"
            id="password_check"
            autoComplete="current-password"
          />
          {/* disabled={props.buttonActive?: disabled} */}
          {state.passEquality === true && state.checks.email === true ? (
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign Up
            </Button>
          ) : (
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              disabled
            >
              Sign Up
            </Button>
          )}
          {serverState.loginAlreadyExists ? (
            <p style={{ color: "red", fontSize: "1.4em" }}>
              This user already registered!
            </p>
          ) : (
            ""
          )}
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item />
          </Grid>
        </form>
      </div>
      <Box mt={5} />
    </Container>
  );
}
