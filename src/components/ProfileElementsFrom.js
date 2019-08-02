import React from "react";
import styled from "styled-components";

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

const ProfileField = styled.input`
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
    disabled: true,
    isEditing: false,
    fields: {
      name: "",
      surname: "",
      country: "",
      city: ""
    },
    impFields: {
      password: "",
      email: ""
    }
  };

  componentDidMount() {
    console.log("I've Mounted");
  }

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
              name="profile_name"
              disabled={this.state.disabled ? "disabled" : ""}
              onClick={() => console.log("Click from Profile field Name")}
            />
          </ProfileDataBox>
          <ProfileDataBox>
            <ProfileFieldHint>Surname</ProfileFieldHint>
            <ProfileField
              type="text"
              name="profile_surname"
              disabled={this.state.disabled ? "disabled" : ""}
              onClick={() => console.log("Click from Profile field Surname")}
            />
          </ProfileDataBox>
        </NestingBox>
        <NestingBox>
          <ProfileDataBox>
            <ProfileFieldHint>Country</ProfileFieldHint>
            <ProfileField
              type="text"
              name="country_name"
              disabled={this.state.disabled ? "disabled" : ""}
              onClick={() => console.log("Click from Profile field Country")}
            />
          </ProfileDataBox>
          <ProfileDataBox>
            <ProfileFieldHint>City</ProfileFieldHint>
            <ProfileField
              type="text"
              name="city_surname"
              disabled={this.state.disabled ? "disabled" : ""}
              onClick={() => console.log("Click from Profile field City")}
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
