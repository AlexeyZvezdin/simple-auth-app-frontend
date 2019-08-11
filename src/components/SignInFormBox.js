import React from "react";
import { connect } from "react-redux";
import isEmail from "validator/lib/isEmail";
import SignIn from "./SignIn";
import { BackBox } from "./elements";
import { loggingSignIn } from "./redux/actions/index";
import axios from "axios";
import { withRouter } from "react-router";
import Cookies from "js-cookie";

class SignInFormBox extends React.Component {
  constructor(props) {
    super(props);
    // console.log(props, "1 props");
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

  onChangePass = async e => {
    let pass = e.target.value;

    if (pass.length > 6) {
      let checkMail = this.state.checks.email;
      let fieldMail = this.state.fields.email;
      await this.setState({
        fields: {
          password: pass,
          email: fieldMail
        },
        checks: {
          password: true,
          email: checkMail
        }
      });
      let val = await this.setHintClassName(true);
      this.dispatchPassClassName(val);
      this.CheckFields();
      // console.log("Pass is true", this.state);
      if (this.state._loginIsUndefined === true) {
        return this.setState({ _loginIsUndefined: false });
      }
      return;
    }

    if (pass === null || pass.length < 2) {
      // console.log(this.state, " ETO DEFAULT pass");
      let val = await this.setHintClassName(null);
      this.dispatchPassClassName(val);
      return;
    }

    if (pass.length > 2 && pass.length <= 6) {
      let checkMail = this.state.checks.email;
      let fieldMail = this.state.fields.email;
      await this.setState({
        fields: {
          password: pass,
          email: fieldMail
        },
        checks: {
          password: false,
          email: checkMail
        }
      });
      let val = await this.setHintClassName(false);
      this.dispatchPassClassName(val);
      // console.log("Pass is false", this.state);
      return;
    }
  };

  onChangeEmail = async e => {
    let email = e.target.value;
    if (isEmail(email) === true) {
      let checkPass = this.state.checks.password;
      let fieldPass = this.state.fields.password;
      await this.setState({
        fields: {
          password: fieldPass,
          email: email
        },
        checks: {
          password: checkPass,
          email: true
        }
      });
      let val = await this.setHintClassName(true);
      this.dispatchEmailClassName(val);
      this.CheckFields();
      if (this.state._loginIsUndefined === true) {
        return this.setState({ _loginIsUndefined: false });
      }
      return;
    }

    if (email === null || email.length < 3) {
      let val = await this.setHintClassName(null);
      this.dispatchEmailClassName(val);
      return;
    }

    if (isEmail(email) === false) {
      let checkPass = this.state.checks.password;
      let fieldPass = this.state.fields.password;
      await this.setState({
        fields: {
          password: fieldPass,
          email: email
        },
        checks: {
          password: checkPass,
          email: false
        }
      });
      // console.log("NYET ETO NE TAK");
      // console.log(this.state);
      let val = await this.setHintClassName(false);
      this.dispatchEmailClassName(val);
      return;
    }
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
            changeEmail={this.onChangeEmail}
            emailClassName={this.state.SignInEmailColor}
            passwordClassName={this.state.SignInPasswordColor}
            changePass={this.onChangePass}
            buttonActive={this.state._signInButtonActive}
            CheckboxRemember={this.CheckboxRemember}
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

  dispatchEmailClassName = async val => {
    await this.setState({
      SignInEmailColor: val
    });
  };

  dispatchPassClassName = async val => {
    await this.setState({
      SignInPasswordColor: val
    });
  };

  setHintClassName = val => {
    switch (val) {
      case true:
        return "SignInGreenTextField";
      case false:
        return "SignInRedTextField";
      case null:
        return "";
      default:
        return "";
    }
  };

  CheckboxRemember = async () => {
    await this.setState({
      _rememberMeCheckBox: !this.state._rememberMeCheckBox
    });
    console.log(this.state._rememberMeCheckBox, ": RememberMeCheckBox\n");
  };
}

export default withRouter(connect()(SignInFormBox));
