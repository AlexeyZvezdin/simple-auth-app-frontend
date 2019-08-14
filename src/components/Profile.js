import React, { Component, useState } from "react";
import { Route, Redirect } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import styled from "styled-components";
import ProfileInfoBox, {
  ProfileBox,
  ProfileHeader
} from "./ProfileElementsFrom";

// Убрать стайлд потом

class Profile extends Component {
  constructor(props) {
    super(props);

    this.id = this.props.isIdRecieved;
  }

  state = {
    name: "",
    city: "",
    country: "",
    surname: "",
    email: "",
    loading: true
  };

  onInputFieldChange = (name, value) => {
    console.log("state : ", this.state);
    this.setState({
      [name]: value
    });
  };

  componentDidMount() {
    axios
      .get("http://localhost:4000/profile", {
        params: {
          id: this.id
        }
      })
      .then(res => {
        let { name, surname, city, country } = res.data;
        // console.log(res.data, " THIS IS RES GET PROFILE FRONT");
        this.setState({
          name: name || "",
          surname: surname || "",
          city: city || "",
          country: country || "",
          loading: false
        });
      });
  }

  render() {
    return this.state.loading ? (
      <p>LOADING</p>
    ) : (
      <Route
        extact
        path="/profile"
        render={() =>
          !this.props._isloading && this.props.isIdRecieved ? (
            <ProfileBox>
              <ProfileHeader>Profile {this.state.name}</ProfileHeader>
              <ProfileInfoBox
                onInputFieldChange={this.onInputFieldChange}
                {...this.props}
                {...this.state}
              />
            </ProfileBox>
          ) : (
            <Redirect
              to={{
                pathname: "/",
                state: { from: this.props.location }
              }}
            />
          )
        }
      />
    );
  }
}

export default class PrivateRoute extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    isIdRecieved: false,
    _isloading: true
  };

  componentDidMount() {
    const token = Cookies.get("token");
    // Тут менял

    return axios
      .post("http://localhost:4000/verify", { token: token })
      .then(res => {
        console.log(res.data.id, " valid token");
        this.setState({ isIdRecieved: res.data.id, _isloading: false });
      })
      .finally(() => {
        this.setState({ _isloading: false });
      });
  }

  render() {
    return this.state._isloading === true ? (
      <p> LOADING </p>
    ) : (
      <Profile {...this.props} {...this.state} />
    );
  }
}
