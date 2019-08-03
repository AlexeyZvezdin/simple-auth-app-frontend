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
  }
  render() {
    return (
      <ProfileBox>
        <ProfileHeader>Profile</ProfileHeader>
        <ProfileInfoBox {...this.props} />
      </ProfileBox>
    );
  }
}

export default class PrivateRoute extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    id: false
  };

  componentDidMount() {
    const token = Cookies.get("token");
    // Тут менял

    axios.post("http://localhost:4000/verify", { token: token }).then(res => {
      console.log(res.data.id, " valid token");
      this.setState({ id: res.data.id });
    });
  }

  render() {
    const { id } = this.state;
    console.log(id, " id token");
    return (
      <Route
        render={props =>
          id ? (
            <Profile {...props} />
          ) : (
            <Redirect
              to={{
                pathname: "/",
                state: { from: props.location }
              }}
            />
          )
        }
      />
    );
  }
}
