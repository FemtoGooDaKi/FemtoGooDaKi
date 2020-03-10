//Yoss
import React from "react";
import "./LoginPage.css";
import logo from "./Logo.svg";
import { connect } from "react-redux";
import { setLoginFlag } from "../../actions";
import { Redirect } from 'react-router-dom'
import axios from 'axios';
import qs from 'qs';

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      redirect: null,
      showError: false,
    };
  }

  handleBackButton = () => {
    this.setState({redirect : '/'})
  };

  showError = () => {
    this.setState({showError: true});
  }

  handleLoginButton = () => {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    console.log('username', username);
    console.log('password', password);
    const data = {
      username: username,
      password: password
    }
    axios.post('http://localhost:5000/login', qs.stringify(data))
    .then(response => {
      console.log(response);
      setLoginFlag(true);
      this.setState({redirect : '/mycourse'})
    })
    .catch(error => {
      console.log(error);
      this.setState({showError: true});
    });
  }

  render() {
    const {showError} = this.state;
    if (this.state.redirect) {
       return <Redirect to={this.state.redirect} />
    }
    else {
      return (
        <div className="login-page-container">
          <div>
            <img src={logo} alt="" />
          </div>
          <div>
            <h1 className="header">Log In to your account!</h1>
            <input
              id="username"
              name="username"
              placeholder="Username"
            />
            <input
              id="password"
              name="password"
              placeholder="Password"
              type="password"
            />
            <div>
              <button className="backButton" onClick={this.handleBackButton}>
                BACK
              </button>
              <button className="loginButton" onClick={this.handleLoginButton}>
                LOG IN
              </button>
            </div>
            {showError && <div>Wrong Username/Password!</div>}
          </div>
        </div>
      );
    }
  }
}

const mapStateToProps = state => ({
  login: state.login
});

const mapDispatchToProps = dispatch => ({
  setLoginFlag: (flag) => dispatch(setLoginFlag(flag))
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);