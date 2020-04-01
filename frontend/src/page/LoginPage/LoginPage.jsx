//Yoss
import React from "react";
import "./LoginPage.scss";
import { connect } from "react-redux";
import { setLoginFlag, setUsername } from "../../actions";
import { Redirect } from "react-router-dom";
import { Input, Card } from "antd";
import { userService } from "../../services/ServiceManager";
import bg1 from "./bg2.jpg";
import { notification } from "antd";

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      redirect: null,
      showError: false
    };
  }

  openLoginError = () => {
    notification["error"]({
      message: "Unable to log in",
      description:
        "Username or password does not match any account on our platform. Can you please try again?"
    });
  };

  handleBackButton = () => {
    this.setState({ redirect: "/" });
  };

  showError = () => {
    this.setState({ showError: true });
  };

  handleLoginButton = () => {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const data = {
      username: username,
      password: password
    };
    userService.login(data, (authToken, error) => {
      if (error) {
        console.log(error);
        this.setState({ showError: true });
        this.openLoginError();
        return;
      }
      this.props.setUsername(username);
      this.props.setLoginFlag(true);
      localStorage.setItem("auth", authToken);
      this.setState({ redirect: "/mycourse" });
    });
  };

  render() {
    const { showError } = this.state;
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    } else {
      return (
        <div
          style={{ backgroundImage: `url(${bg1})` }}
          className="login-page-container"
        >
          <Card className="login-page-form-card">
            <div className="login-page-form">
              <h1 className="login-header">Log in to your account</h1>
              <div className="login-inputs">
                <div className="input-username">
                  Username
                  <Input id="username" size="large" placeholder="username" />
                </div>
                <div>
                  Password
                  <Input
                    type="password"
                    size="large"
                    id="password"
                    placeholder="password"
                  />
                </div>
              </div>
              <div className="login-buttons">
                <button className="backButton" onClick={this.handleBackButton}>
                  BACK
                </button>
                <button
                  className="loginButton"
                  onClick={this.handleLoginButton}
                >
                  LOG IN
                </button>
              </div>
              {showError && <div>Wrong Username/Password!</div>}
            </div>
          </Card>
        </div>
      );
    }
  }
}

const mapStateToProps = state => ({
  login: state.login
});

const mapDispatchToProps = dispatch => ({
  setLoginFlag: flag => dispatch(setLoginFlag(flag)),
  setUsername: username => dispatch(setUsername(username))
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
