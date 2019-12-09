import React, { Component, useState } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import styled from 'styled-components';
import ProfileInfoBox, {
  ProfileBox,
  ProfileHeader
} from './ProfileElementsFrom';

export default class _Profile extends Component {
  state = {
    name: '',
    city: '',
    country: '',
    surname: '',
    email: '',
    loading: true
  };

  onInputFieldChange = (name, value) => {
    console.log('state : ', this.state);
    this.setState({
      [name]: value
    });
  };

  componentDidMount() {
    axios
      .get('http://localhost:4000/profile', {
        params: {
          id: this.id
        }
      })
      .then(res => {
        let { name, surname, city, country } = res.data;
        // console.log(res.data, " THIS IS RES GET PROFILE FRONT");
        this.setState({
          name: name || '',
          surname: surname || '',
          city: city || '',
          country: country || '',
          loading: false
        });
      })
      .catch(err => {
        console.log(' THIS IS PROFILE AXIOS REQ ERROR: ', err.message);
      });
  }

  render() {
    return this.state.loading ? (
      <p>LOADING RPFILE DATA</p>
    ) : (
      <ProfileBox>
        <ProfileHeader>Profile {this.state.name}</ProfileHeader>
        <ProfileInfoBox
          onInputFieldChange={this.onInputFieldChange}
          {...this.state}
        />
      </ProfileBox>
    );
  }
}
