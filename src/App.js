import React from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import "normalize.css";
import "./less/app.less";
import { BrowserRouter as Router, Route } from "react-router-dom";
import SignInFormBox from "./components/SignInFormBox";
import MainAppBar from "./components/MainAppBar";
import RegisterFormBox from "./components/RegisterFormBox";
import PrivateRoute from "./components/Profile";
import Header from "./components/Header";
import { Main } from "./components/Main";
import Footer from "./components/Footer";

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  onSignOut = () => {
    console.log("sign out");
  };

  render() {
    return (
      <Router>
        <Header />
        <Route exact path="/" render={props => <Main {...props} />} />
        <Route
          exact
          path="/profile"
          render={props => <PrivateRoute {...props} />}
        />
        <Footer />
      </Router>
    );
  }
}

export default App;
