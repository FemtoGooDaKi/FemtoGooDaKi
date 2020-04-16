import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Input, Popover } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGraduationCap, faDesktop } from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";
import {
  SearchOutlined,
  FileAddFilled,
  ExportOutlined
} from "@ant-design/icons";
import { setSearchKeyword, setLoginFlag, setUsername } from "../../actions";
import "./Navbar.scss";

class Navbar extends Component {
  constructor(props) {
    super(props);
    if (localStorage.getItem("auth") !== null) {
      props.setLoginFlag(true);
    }
  }

  handleInputKeyDown = e => {
    if (e.keyCode !== 13) return;
    const keyword = e.target.value;
    this.props.setSearchKeyword(keyword);
    this.props.history.push("/search");
  };

  handleCareerButton = () => {
    this.props.history.push("/career");
  };

  handleAddCourseButton = () => {
    this.props.history.push("/addcourse");
  };

  handleMyCourseButton = () => {
    this.props.history.push("/mycourse");
  };

  handleSignInButton = () => {
    this.props.history.push("/login");
  };

  handleSignUpButton = () => {
    this.props.history.push("/register");
  };

  handleLogo = () => {
    this.props.history.push("/");
  };

  handleLogout = () => {
    localStorage.removeItem('auth');
    localStorage.removeItem('auth-user');
    this.props.setLoginFlag(false);
    this.props.setUsername('');
    this.props.history.push("/");
  }

  render() {
    const { login } = this.props;
    return (
      <div className={"navbar-container" + (login ? " signed-in" : "")}>
        <div>
          <span
            className={"navbar-title" + (login ? " signed-in" : "")}
            onClick={this.handleLogo}
          >
            F
          </span>
          <Input
            size="large"
            placeholder="Search for online courses"
            prefix={<SearchOutlined />}
            onKeyDown={this.handleInputKeyDown}
            className="navbar-textfield-container"
          />
        </div>
        {login && (
          <div className="navbar-menu-icon-container">
            <Popover placement="bottom" content="Career">
              <span onClick={this.handleCareerButton}>
                <FontAwesomeIcon icon={faGraduationCap} />
              </span>
            </Popover>
            <Popover placement="bottom" content="Add new course">
              <span onClick={this.handleAddCourseButton}>
                <FileAddFilled />
              </span>
            </Popover>
            <Popover placement="bottom" content="My Course">
              <span onClick={this.handleMyCourseButton}>
                <FontAwesomeIcon icon={faDesktop} />
              </span>
            </Popover>
            <Popover placement="bottom" content="logout">
              <span onClick={this.handleLogout}>
                <ExportOutlined />
              </span>
            </Popover>
          </div>
        )}
        {!login && (
          <div className="navbar-sign-in-button-container">
            <span onClick={this.handleSignUpButton}>Register</span>
            <span onClick={this.handleSignInButton}>Log In</span>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    searchKeyword: state.searchKeyword,
    login: state.login
  };
};

const mapDispatchToProps = dispatch => ({
  setLoginFlag: flag => dispatch(setLoginFlag(flag)),
  setSearchKeyword: keyword => dispatch(setSearchKeyword(keyword)),
  setUsername: username => dispatch(setUsername(username))
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Navbar));
