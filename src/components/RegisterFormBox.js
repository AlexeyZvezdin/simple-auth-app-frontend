import React from "react";
import styled from "styled-components";
import isEmail from "validator/lib/isEmail";
import Register from "./Register";
import { BackBox } from "./elements";
import axios from "axios";

export default class RegisterFormBox extends React.Component {
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
    _saveStatus: "",
    _signInButtonActive: false,
    _comparePasswords: false,
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
      return;
    }

    if (pass === null || pass.length < 2) {
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
      return;
    }

    if (email === null || email.length < 3) {
      // console.log("NYET ETO DEFAULT");
      // console.log(this.state);
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
      let val = await this.setHintClassName(false);
      this.dispatchEmailClassName(val);
      return;
    }
  };

  onSubmit = async e => {
    e.preventDefault();
    // тут бинарка на маунт анимации загрузки
    // register true и всё можно два запроса обработать
    if ((await this.CheckFields()) === true) {
      const user = {
        email: this.state.fields.email,
        password: this.state.fields.password,
        register: true
      };
      // здесь пропись в бд и респонс с успехом
      return await axios
        .post("http://localhost:4000/", {
          email: user.email,
          password: user.password,
          register: user.register
        })
        .then(res => {
          console.log(res, " THIS IS RES FROM AXIOS REGISTER");
          if (res.data === "registered") {
            // Write an element beneath to response on login undefined

            this.setState({
              _loginIsUndefined: true,

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
            console.log(res.data, " ВЫ УСПЕШНО ЗАРЕГЕСТРИРОВАНЫ \n");
            // После этого диспатч в топ и редирект, сокрытие кнопок и форм
            this.props.handleOnClick();
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
          <Register
            {...this.props}
            _loginIsUndefined={this.state._loginIsUndefined}
            comparePasswords={this.comparePasswords}
            changeEmail={this.onChangeEmail}
            emailClassName={this.state.SignInEmailColor}
            passwordClassName={this.state.SignInPasswordColor}
            changePass={this.onChangePass}
            buttonActive={this.state._signInButtonActive}
            onSubmit={this.onSubmit}
          />
        </BackBox>
      </React.Fragment>
    );
  }

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

  comparePasswords = async e => {
    let comparedPassword = e.target.value;
    if (this.state.fields.password === comparedPassword) {
      await this.setState({
        _comparePasswords: true
      });
      this.CheckFields();
    }
  };

  CheckFields = () => {
    if (
      this.state.checks.email &&
      this.state.checks.password &&
      this.state._comparePasswords
    ) {
      this.setState({
        _signInButtonActive: true,
        _saveStatus: "READY"
      });
      return true;
    }
  };
}
