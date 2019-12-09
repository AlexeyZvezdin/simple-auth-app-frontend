import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    position: 'relative'
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
  console.log('ButtonAppBar BAR ', props);
  let renderContext = () => {
    switch (props.signed) {
      case null: {
        return 'Loading';
      }
      case false: {
        return (
          <React.Fragment>
            <Button color="inherit" onClick={props.handleRegisterOnClick}>
              Register
            </Button>
            <Button color="inherit" onClick={props.handleSignInOnClick}>
              Login
            </Button>
          </React.Fragment>
        );
      }
      case true: {
        let { pathname } = window.location;
        console.log(pathname);
        return (
          <React.Fragment>
            {
              (pathname = '/' ? (
                <Button color="inherit">
                  <Link to="/profile">Profile</Link>
                </Button>
              ) : (
                (pathname = '/profile' ? (
                  <Button color="inherit">
                    <Link to="/">Main</Link>
                  </Button>
                ) : (
                  'be'
                ))
              ))
            }
            <Button color="inherit">Logout</Button>
          </React.Fragment>
        );
      }
      default: {
        return [<div>Default return</div>];
      }
    }
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            My AweSome Site
          </Typography>
          {renderContext()}
        </Toolbar>
      </AppBar>
    </div>
  );
}

const mapStateToProps = ({ signed }) => ({ signed });

const MainAppBarWithProps = connect(mapStateToProps, null)(ButtonAppBar);

export default MainAppBarWithProps;
