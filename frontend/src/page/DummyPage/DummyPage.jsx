import React, { Component } from "react";
import { connect } from "react-redux";
import { setLoginFlag } from "../../actions";
import "./DummyPage.css";

class DummyPage extends Component {
  render() {
    const { login, setLoginFlag } = this.props;
    return (
      <div>
        Dummy Page
        {login ? "LOGIN" : "LOGOUT"}
        <button
          onClick={() => {
            setLoginFlag(!login);
          }}
        ></button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  login: state.login,
});

const mapDispatchToProps = (dispatch) => ({
  setLoginFlag: (flag) => dispatch(setLoginFlag(flag)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DummyPage);
