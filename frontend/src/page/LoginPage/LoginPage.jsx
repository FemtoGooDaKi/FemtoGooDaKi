//Yoss
import React from "react";
import "./LoginPage.css";
import logo from "./Logo.svg";
import { connect } from "react-redux";
import { setLoginFlag } from "../../actions";
import { Redirect } from 'react-router-dom'

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      redirect: null
    };
  }

  handleInputChange = e => {
    //doSomeThings
  };

  handleBackButton = () => {
    alert("Pressed");
  };

  handleLoginButton = () => {
     setLoginFlag(true);
     this.setState({redirect : '/mycourse'})
  }

  render() {
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
              name="username"
              placeholder="Username"
              onChange={e => this.handleInputChange(e)}
            />
            <input
              name="password"
              placeholder="Password"
              onChange={e => this.handleInputChange(e)}
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