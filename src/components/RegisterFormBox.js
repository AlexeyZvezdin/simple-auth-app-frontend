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
    loading: false,
    saveStatus: "",
    alreadyExists: null
  };

  onSubmit = async e => {
    e.preventDefault();
    // тут бинарка на маунт анимации загрузки
    // здесь пропись в бд и респонс с успехом
    return await axios
      .post("http://localhost:4000/submit", {
        email: e.target.email.value,
        password: e.target.password.value,
        register: true
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
  };

  render() {
    return (
      <React.Fragment>
        <BackBox>
          <Register
            {...this.props}
            loginIsUndefined={this.state._loginIsUndefined}
            onSubmit={this.onSubmit}
          />
        </BackBox>
      </React.Fragment>
    );
  }
}
