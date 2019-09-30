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
    fields: {
      password: null,
      email: null
    },
    checks: {
      password: "",
      email: ""
    },
    _loading: false,
    _rememberMeCheckBox: false,
    _signInButtonActive: false,
    _loginIsUndefined: false,
    SignInEmailColor: "null",
    SignInPasswordColor: "null"
  };

  onSubmit = async e => {
    e.preventDefault();
    // console.log(e.target.password.value);
    // тут бинарка на маунт анимации загрузки
    if ((await this.CheckFields()) === true) {
      const user = {
        email: this.state.fields.email,
        password: this.state.fields.password
      };
      this.setState({
        _loading: true
      });

      return await axios
        .post("http://localhost:4000/", {
          email: user.email,
          password: user.password
        })
        .then(res => {
          // console.log(res, " THIS IS RES FROM AXIOS");
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
            this.dispatchEmailClassName("SignInRedTextField");
            this.dispatchPassClassName("SignInRedTextField");
            this.CheckFields();
            return;
          } else {
            Cookies.set("token", res.data, { expires: 7 });
            console.log(
              Cookies.get("token"),
              " THIS SHOULD BE A COOKIES GET \n"
            );
            this.props.handleOnClick();
            console.log(this.props);
            this.props.sign_in();
            this.props.history.push("/profile");
            return res.data;
          }
        });
    } else {
      console.log("reg is false");
      return;
    }
  };

  render() {
    return (
      <React.Fragment>
        <BackBox>
          <SignIn
            {...this.props}
            _loginIsUndefined={this.state._loginIsUndefined}
            buttonActive={this.state._signInButtonActive}
            onSubmit={this.onSubmit}
            _loading={this.state._loading}
          />
        </BackBox>
      </React.Fragment>
    );
  }

  CheckFields = () => {
    if (this.state.checks.email && this.state.checks.password) {
      this.setState({
        _signInButtonActive: true
      });
      return true;
    } else {
      this.setState({
        _signInButtonActive: false
      });
      return false;
    }
  };
}

export default withRouter(
  connect(
    null,
    { sign_in, sign_out }
  )(SignInFormBox)
);
