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

    this.id = this.props.id;
  }

  state = {
    name: null,
    city: null,
    country: null,
    surname: null,
    email: null
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
        console.log(res.data, " THIS IS RES GET PROFILE FRONT");
        this.setState({
          name: name,
          surname: surname,
          city: city,
          country: country
        });
      });
  }

  render() {
    return (
      <ProfileBox>
        <ProfileHeader>Profile</ProfileHeader>
        <ProfileInfoBox {...this.props} {...this.state} />
      </ProfileBox>
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

    axios.post("http://localhost:4000/verify", { token: token }).then(res => {
      console.log(res.data.id, " valid token");
      this.setState({ isIdRecieved: res.data.id, _isloading: false });
    });
  }

  render() {
    console.log(this.state.isIdRecieved, " id token");
    console.log(this.props.location);
    return (
      <Route
        extact
        path="/profile"
        render={() =>
          this.state._isloading ? (
            ""
          ) : !this.state._isloading && this.state.isIdRecieved ? (
            <Profile {...this.props} id={this.state.isIdRecieved} />
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
