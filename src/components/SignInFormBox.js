import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { withRouter } from 'react-router';
// import Cookies from 'js-cookie'; - used it before auth header
import SignIn from './SignIn';
import { BackBox } from './elements';
import { sign_in, sign_out } from './redux/actions/index';

class SignInFormBox extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    // in case of loading
    loading: false,
    // in case of server respone is negative
    creadentialsIsUndefined: false
  };

  onSubmit = e => {
    e.preventDefault();
    let emailV = e.target.email.value;
    let passV = e.target.password.value;
    let checkboxV = e.target.checkbox.value;

    this.setState({ ...state, loading: true });

    return axios
      .post('http://localhost:4000/submit', {
        email: emailV,
        password: passV,
        validateStatus: function(status) {
          return status >= 200 && status < 300; // default
        }
      })
      .then(res => {
        console.log(res, ' THIS IS RES FROM AXIOS');
        console.log(res.status);
        console.log(res.statusText);
        console.log(res.headers);
        console.log(res.config);
        if (res.data === 'invalid') {
          // Write an element beneath to response on login undefined
          this.setState({
            creadentialsIsUndefined: true,
            loading: false
          });
          return;
        } else {
          this.props.handleOnClick();
          this.props.sign_in();
          this.props.history.push('/profile');
          return res.data;
        }
      })
      .catch(err => {
        console.log('\n ERROR FROM SIGN IN FORMBOX CATCH ', err.message);
      });
  };

  render() {
    console.log(this.props, ' SUP PRIS');
    return (
      <React.Fragment>
        <BackBox>
          {/* if state.loading ? Waiting... */}
          <SignIn
            handleOnClick={this.props.handleOnClick}
            loginIsUndefined={this.state.creadentialsIsUndefined}
            onSubmit={this.onSubmit}
          />
        </BackBox>
      </React.Fragment>
    );
  }
}

export default withRouter(connect(null, { sign_in, sign_out })(SignInFormBox));
