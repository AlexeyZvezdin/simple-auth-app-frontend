import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import SignIn from "./SignIn";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    position: "relative"
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  }
}));

function ButtonAppBar(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            My AweSome Site
          </Typography>
          <Button color="inherit" onClick={props.handleRegisterOnClick}>
            Register
          </Button>
          <Button color="inherit" onClick={props.handleSignInOnClick}>
            Login
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default class MainAppBar extends React.Component {
  render() {
    return (
      <ButtonAppBar
        handleSignInOnClick={this.props.handleSignInOnClick}
        handleRegisterOnClick={this.props.handleRegisterOnClick}
      />
    );
  }
}
