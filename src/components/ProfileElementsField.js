import React from "react";
import styled from "styled-components";
import axios from "axios";

const ProfileInputField = styled.input`
  width: ${props => (props.long ? "360px" : "202.5px")};
  height: 60px;
  background: ${props => (props.filled || !props.disabled ? "" : "#c4c4c4")};
  border-radius: 6px;
  border: ${props =>
    props.filled || !props.disabled ? "1px solid #440d0f" : "none"};
  outline: none;
  font-family: ${props => (props.filled ? "PT Mono" : "")};
  font-size: 26px;
  box-sizing: border-box;
  padding-left: ${props => (props.long ? "18px" : "12px")};
  color: #c0bbbb;
`;

class ProfileField extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    value: this.props.defVal
  };

  componentDidUpdate(update) {
    // console.log(update, " THIS IS UPDATE");
  }

  handleChange = e => {
    const name = this.props.name;
    console.log(" NAME : ", this.props.name);
    let value = e.target.value;
    this.setState({ value });

    this.props.inputChange(name, value);
  };

  render() {
    // console.log(this.props, " state ");
    // this.props нужны для стилей
    return (
      <ProfileInputField
        onChange={this.handleChange}
        value={this.state.value}
        {...this.props}
      />
    );
  }
}

export default ProfileField;
