import React from "react";
import SignInFormBox from "./SignInFormBox";
import RegisterFormBox from "./RegisterFormBox";
import MainAppBar from "./MainAppBar";

export default class Header extends React.Component {
  state = {
    showSignInPopUp: false,
    showRegisterPopUp: false
  };

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

  render() {
    return (
      <React.Fragment>
        {this.state.showSignInPopUp === true ? (
          <SignInFormBox handleOnClick={this.handleSignInOnClick} />
        ) : (
          ""
        )}
        {this.state.showRegisterPopUp === true ? (
          <RegisterFormBox handleOnClick={this.handleRegisterOnClick} />
        ) : (
          ""
        )}
        <MainAppBar
          handleSignInOnClick={this.handleSignInOnClick}
          handleRegisterOnClick={this.handleRegisterOnClick}
        />
      </React.Fragment>
    );
  }
}
