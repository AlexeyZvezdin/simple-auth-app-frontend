import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import 'normalize.css';
import './less/app.less';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';
import Header from './components/Header';
import { Main } from './components/Main';
import Footer from './components/Footer';
import { connect } from 'react-redux';

import Profile from './components/Profile';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    console.log(error, errorInfo);
  }

  render() {
    return (
      <Router>
        <Header />
        <Switch>
          <Route exact path="/" render={props => <Main {...this.props} />} />
          <PrivateRoute {...this.props}>
            <Profile sample="sample" />
          </PrivateRoute>
        </Switch>
        <Footer />
      </Router>
    );
  }
}

function PrivateRoute({ children, location, signed }) {
  console.log(children, ' CHILRED PRIVATE');
  console.log(location, ' location PRIVATE props');
  console.log(signed, ' children PRIVATE props');
  return (
    <Route
      render={({ location }) =>
        signed ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/',
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}

const mapState = ({ signed }) => ({ signed: signed });

export default connect(mapState)(App);
