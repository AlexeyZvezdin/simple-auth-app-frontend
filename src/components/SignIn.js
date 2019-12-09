import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

// Elements
import { CloseButton } from './elements.js';
// helper function
import validatePass from '../components/helpers/validatePass.js';
import validateEmail from '../components/helpers/validateEmail';

const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.grey
    }
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

export default function SignIn(props) {
  const classes = useStyles();
  // validation
  console.log(props, ' SUPER PROPS');
  const [state, setState] = useState({
    // @prettier-ignore
    fields: { password: null, email: null },
    checks: { password: null, email: null },
    rememberMeCheckBox: false
  });

  const [serverState, setServerState] = useState({
    loading: false,
    loginIsUndefined: false
  });

  // "null" || props.class
  const [visualState, setVisualState] = useState({
    // @prettier-ignore
    SignInEmailClass: 'null',
    SignInPasswordClass: 'null'
  });

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
    });
  };

  const changePass = e => {
    validatePass(e.target.value).then(res => {
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
    });
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
          Sign in
        </Typography>
        <form className={classes.form} onSubmit={props.onSubmit} noValidate>
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
          <FormControlLabel
            control={
              <Checkbox
                name="checkbox"
                value={state.rememberMeCheckBox}
                color="primary"
                onChange={() =>
                  setState({
                    ...state,
                    rememberMeCheckBox: true
                  })
                }
              />
            }
            label="Remember me"
          />
          {serverState.loginIsUndefined === true ? (
            <span style={{ color: 'red' }}>
              {' '}
              <br />
              No such Email or Password!
            </span>
          ) : (
            ''
          )}

          {serverState.loading ? (
            <p style={{ color: 'blue', margin: '0 auto', fontSize: '1.3em' }}>
              Loading...
            </p>
          ) : (
            ''
          )}

          {state.checks.email && state.checks.password ? (
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
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
              Sign In
            </Button>
          )}
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link
                href="#"
                variant="body2"
                onClick={() => props.handleOnClick('redirect')}
              >
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5} />
    </Container>
  );
}
