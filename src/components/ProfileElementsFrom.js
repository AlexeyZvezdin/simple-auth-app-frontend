import React from "react";
import styled from "styled-components";
import axios from "axios";
import ProfileField from "./ProfileElementsField";

const ProfileBox = styled.div`
  padding-top: 1px;
  margin: 10px auto;
  min-width: 712.5px;
  min-height: 877.5px;
  width: 712.5px;
  height: 877.5px;
  background: #f8e2e2;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.45);
  border-radius: 7px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
  font-family: PT Mono;
  font-style: normal;
  font-weight: normal;
`;

const ProfileHeader = styled.h2`
  font-size: 27px;
  line-height: 20px;
  text-align: center;
  margin-top: 48px;
  color: #727171;
  font-weight: normal;
`;

const NestingBox = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 72px 90px;
`;

const NestingBoxLong = styled.div`
  display: flex;
  justify-content: center;
  margin: 72px 90px;
`;

const NestingBoxLongButtons = styled(NestingBoxLong)`
  justify-content: space-between;
  margin: 72px auto;
  width: 360px;
`;

const ProfileDataBox = styled.div`
  min-height: 78px;
`;

const ProfileFieldHint = styled.div`
  font-size: 14px;
  line-height: 10px;
  padding-bottom: 5px;
  color: #c0bbbb;
`;

const ProfileButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 138px;
  height: 60px;
  color: #eeeeee;
  background: ${props =>
    props.back
      ? "#3F51B5"
      : props.submit
      ? "#85FC7B"
      : props.cancel
      ? "#FA6E6E"
      : "#440d0f"};
  border-radius: 6px;

  font-size: 22px;
  line-height: 10px;

  :hover {
    cursor: pointer;
  }

  :active {
    box-shadow: 0px 0px 14px 0px rgba(0, 0, 0, 0.75);
  }
`;

export { ProfileBox, ProfileHeader };

export default class ProfileInfoBox extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    // disabled должен работать глобальнее
    disabled: true,
    isEditing: false,
    fields: {
      name: this.props.name,
      surname: this.props.surname,
      country: this.props.country,
      city: this.props.city
    },
    impFields: {
      password: "",
      email: ""
    }
  };

  handleEdit = () => {
    this.setState({
      disabled: !this.state.disabled,
      isEditing: !this.state.isEditing
    });
  };

  handleBack = () => {
    this.props.history.push("/");
  };

  handleCancel = () => {
    this.setState({
      isEditing: false,
      disabled: true
    });
  };

  render() {
    return (
      <form>
        <NestingBox>
          <ProfileDataBox>
            <ProfileFieldHint>Name</ProfileFieldHint>
            <ProfileField
              type="text"
              name="name"
              disabled={this.state.disabled ? "disabled" : ""}
              defVal={this.state.fields.name}
              inputChange={this.props.onInputFieldChange}
            />
          </ProfileDataBox>
          <ProfileDataBox>
            <ProfileFieldHint>Surname</ProfileFieldHint>
            <ProfileField
              type="text"
              name="surname"
              disabled={this.state.disabled ? "disabled" : ""}
              defVal={this.state.fields.surname}
              inputChange={this.props.onInputFieldChange}
            />
          </ProfileDataBox>
        </NestingBox>
        <NestingBox>
          <ProfileDataBox>
            <ProfileFieldHint>Country</ProfileFieldHint>
            <ProfileField
              type="text"
              name="country"
              defVal={this.state.fields.country}
              disabled={this.state.disabled ? "disabled" : ""}
              inputChange={this.props.onInputFieldChange}
            />
          </ProfileDataBox>
          <ProfileDataBox>
            <ProfileFieldHint>City</ProfileFieldHint>
            <ProfileField
              type="text"
              name="city"
              defVal={this.state.fields.city}
              disabled={this.state.disabled ? "disabled" : ""}
              inputChange={this.props.onInputFieldChange}
            />
          </ProfileDataBox>
        </NestingBox>
        <NestingBoxLong>
          <ProfileDataBox>
            <ProfileFieldHint>Email</ProfileFieldHint>
            <ProfileField
              type="email"
              name="profile_email"
              disabled={this.state.disabled ? "disabled" : ""}
              long
              filled
              value="Email And Password"
              onClick={() => console.log("Click from Profile field Email")}
            />
          </ProfileDataBox>
        </NestingBoxLong>
        <NestingBoxLong>
          <ProfileDataBox>
            <ProfileFieldHint>Password</ProfileFieldHint>
            <ProfileField
              type="password"
              name="profile_password"
              disabled={this.state.disabled ? "disabled" : ""}
              long
              filled
              value="Email And Password"
              onClick={() => console.log("Click from Profile field Email")}
            />
          </ProfileDataBox>
        </NestingBoxLong>
        <NestingBoxLongButtons>
          {this.state.isEditing === false ? (
            <React.Fragment>
              <ProfileButton onClick={this.handleEdit}>Edit</ProfileButton>
              <ProfileButton back onClick={this.handleBack}>
                Back
              </ProfileButton>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <ProfileButton onClick={this.handleEdit} submit>
                Submit
              </ProfileButton>
              <ProfileButton cancel onClick={this.handleCancel}>
                Cancel
              </ProfileButton>
            </React.Fragment>
          )}
        </NestingBoxLongButtons>
      </form>
    );
  }
}
