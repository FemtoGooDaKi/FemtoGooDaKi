import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { Input, DatePicker, message } from "antd";
import {
  UserOutlined,
  LockOutlined,
  IdcardOutlined,
  AuditOutlined
} from "@ant-design/icons";
import "antd/dist/antd.css";
import "./RegisterPage.css";
import bg from "./bg.jpg";

import { userService } from "../../services/ServiceManager";

export default class RegisterPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      firstName: "",
      lastName: "",
      job: "",
      birthDate: ""
    };
  }

  handleInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleDateChange = (date, dateString) => {
    this.setState({ birthDate: dateString });
  };

  handleRegisterButton = () => {
    this.isFormValid()
      ? this.performRegister()
      : message.error("Please fill in all fields");
  };

  handleCancelButton = () => {
    this.setState({ redirect: "/" });
  };

  isFormValid = () => {
    const {
      username,
      password,
      firstName,
      lastName,
      job,
      birthDate
    } = this.state;
    return (
      username?.length > 0 &&
      password?.length > 0 &&
      firstName?.length > 0 &&
      lastName?.length > 0 &&
      job?.length > 0 &&
      birthDate?.length > 0
    );
  };

  performRegister = () => {
    this.loadingMessage = message.loading("Please wait...", 0);
    userService.register(this.state, error => {
      setTimeout(this.loadingMessage, 0);
      if (!error) {
        message.success("Registered successfully");
        setTimeout(() => this.setState({ redirect: "/" }), 2000);
      } else {
        message.error("An error occurred. Please try again later.");
      }
    });
  };

  render() {
    const iconStyle = { color: "rgba(0,0,0,.25)" };
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    } else {
      return (
        <div
          className="register-page-container"
          style={{ backgroundImage: `url(${bg})` }}
        >
          <div className="register-page-form">
            <div className="register-page-title">Create new account</div>
            <div className="register-page-form-container">
              <div className="register-page-form-section">
                <RegisterFormInput
                  name="username"
                  title="Username"
                  icon={<UserOutlined style={iconStyle} />}
                  onChange={this.handleInputChange}
                />
                <RegisterFormInput
                  name="password"
                  title="Password"
                  icon={<LockOutlined style={iconStyle} />}
                  onChange={this.handleInputChange}
                />
              </div>
              <hr
                style={{ border: "0.5px solid #dedede", marginTop: "20px" }}
              ></hr>
              <div className="register-page-form-section">
                <RegisterFormInput
                  name="firstName"
                  title="First name"
                  icon={<IdcardOutlined style={iconStyle} />}
                  onChange={this.handleInputChange}
                />
                <RegisterFormInput
                  name="lastName"
                  title="Last name"
                  icon={<IdcardOutlined style={iconStyle} />}
                  onChange={this.handleInputChange}
                />
                <RegisterFormInput
                  name="job"
                  title="Job"
                  icon={<AuditOutlined style={iconStyle} />}
                  onChange={this.handleInputChange}
                />
                <RegisterFormDatePicker
                  title="Birthdate"
                  onChange={this.handleDateChange}
                />
              </div>
              <button
                className="register-page-button"
                onClick={this.handleRegisterButton}
              >
                REGISTER
              </button>
              <button className="register-page-cancel-button">
                <span onClick={this.handleCancelButton}>CANCEL</span>
              </button>
            </div>
          </div>
        </div>
      );
    }
  }
}

class RegisterFormInput extends Component {
  render() {
    return (
      <div>
        <div style={{ paddingRight: "12px", marginBottom: "2px" }}>
          {this.props.title}
        </div>
        <Input
          name={this.props.name}
          placeholder={this.props.title}
          prefix={this.props.icon}
          type={this.props.name === "password" ? "password" : "text"}
          onChange={this.props.onChange}
        />
      </div>
    );
  }
}

class RegisterFormDatePicker extends Component {
  render() {
    return (
      <div>
        <div style={{ paddingRight: "12px", marginBottom: "2px" }}>
          {this.props.title}
        </div>
        <DatePicker onChange={this.props.onChange} style={{ width: "100%" }} />
      </div>
    );
  }
}
