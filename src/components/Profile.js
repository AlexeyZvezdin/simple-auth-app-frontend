import React, { Component } from "react";
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

export default function PrivateRoute(props) {
  const token = Cookies.get("token");
  // Тут менял
  let isValidToken = false;
  if (!token) {
    axios.post("http://localhost:4000/verify", token).then(res => {
      console.log(res, " THIS IS RESPONSE FROM VERIFY IN PROFILE");
      isValidToken = res.body;
    });
  }
  console.log("ISValidRToek: ", isValidToken);
  return (
    <Route
      render={props =>
        !isValidToken ? (
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
