import React from "react";
import { connect } from "react-redux";
import isEmail from "validator/lib/isEmail";
import SignIn from "./SignIn";
import { BackBox } from "./elements";
import axios from "axios";
import { withRouter } from "react-router";
import Cookies from "js-cookie";
import { sign_in, sign_out, loggingSignIn } from "./redux/actions/index";

class SignInFormBox extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    loading: false,
    loginIsUndefined: false
  };

  onSubmit = e => {
    e.preventDefault();
    let emailV = e.target.email.value;
    let passV = e.target.password.value;
    let checkboxV = e.target.checkbox.value;
    return axios
      .post("http://localhost:4000/submit", {
        email: emailV,
        password: passV
      })
      .then(res => {
        console.log(res, " THIS IS RES FROM AXIOS");
        if (res.data === "invalid") {
          // Write an element beneath to response on login undefined

          this.setState({
            _loginIsUndefined: true,
            _loading: false,
            checks: {
              password: null,
              email: null
            }
          });
          return;
        } else {
          this.props.handleOnClick();
          this.props.sign_in();
          this.props.history.push("/profile");
          return res.data;
        }
      });
  };

  render() {
    return (
      <React.Fragment>
        <BackBox>
          <SignIn
            {...this.props}
            loginIsUndefined={this.state._loginIsUndefined}
            onSubmit={this.onSubmit}
            loading={this.state._loading}
          />
        </BackBox>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const loading = false;
  const loginIsUndefined = false;

  return {
    ownProps,
    loading,
    loginIsUndefined
  };
};

export default withRouter(
  connect(mapStateToProps, { sign_in, sign_out })(SignInFormBox)
);
