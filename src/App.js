import React from "react";
import { connect } from "react-redux";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import "normalize.css";
import "./less/app.less";
import { BrowserRouter as Router, Route } from "react-router-dom";
import SignInFormBox from "./components/SignInFormBox";
import MainAppBar from "./components/MainAppBar";
import RegisterFormBox from "./components/RegisterFormBox";
import PrivateRoute from "./components/Profile";
// import Dialog from "./components/Dialog";
import { Main } from "./components/Main";
import Footer from "./components/Footer";

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    showSignInPopUp: false,
    showRegisterPopUp: false,
    isSignIn: false
  };

  componentDidMount() {}

  handleSignInOnClick = redirect => {
    if (redirect === "redirect") {
      this.setState({
        showSignInPopUp: false,
        showRegisterPopUp: true
      });
      return;
    }

    this.setState({
      showSignInPopUp: !this.state.showSignInPopUp,
      showRegisterPopUp: false
    });
  };

  handleRegisterOnClick = () => {
    this.setState({
      showSignInPopUp: false,
      showRegisterPopUp: !this.state.showRegisterPopUp
    });
    console.log(" SUCCESSFULL UP TO APP COMPONENT");
    return;
  };

  onSignOut = () => {
    console.log("sign out");
  };

  onSignIn = () => {
    console.log("sign in");
  };

  render() {
    return (
      <Router>
        {this.state.isSignIn ? (
          // Версия зарегестрированного АппБара
          // Это на самом деле всё что мне нужно вроде как доделать, в нем 2 профиля
          <MainAppBar onSignOut={this.onSignOut} />
        ) : (
          <MainAppBar
            handleSignInOnClick={this.handleSignInOnClick}
            handleRegisterOnClick={this.handleRegisterOnClick}
          />
        )}
        {this.state.showSignInPopUp === true ? (
          <SignInFormBox
            handleOnClick={this.handleSignInOnClick}
            onSignIn={this.onSignIn}
          />
        ) : (
          ""
        )}
        {this.state.showRegisterPopUp === true ? (
          <RegisterFormBox handleOnClick={this.handleRegisterOnClick} />
        ) : (
          ""
        )}
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
