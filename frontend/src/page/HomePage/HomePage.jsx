import React from "react";
import "./HomePage.scss";
import globe from "./earth-globe.svg";
import clock from "./clock.svg";
import hat from "./mortarboard.svg";
import library from "./library.jpg";
import { Spin } from "antd";
import { Link } from "react-router-dom";

export default class HomePage extends React.Component {
  render() {
    return (
      <div className="home-page">
        <div className="home-jumbotron">
          <div className="home-welcome">Welcome to FemtoGooDaKi</div>
          <div className="home-description">
            A place where you can learn anything
          </div>
          <div className="home-action-wrapper">
          <Link to="/register">
            <div className="home-action">Get started</div>
          </Link>
        </div>
          <img src={library} alt="error loading" />
        </div>

        <div className="home-functions">
          <div className="home-function">
            <img src={globe} className="home-function-icon" alt={<Spin />} />
            <div className="home-function-description"> Anywhere </div>
          </div>
          <div className="home-function">
            <img src={clock} className="home-function-icon" alt={<Spin />} />
            <div className="home-function-description"> Anytime </div>
          </div>
          <div className="home-function">
            <img src={hat} className="home-function-icon" alt={<Spin />} />
            <div className="home-function-description"> Anyone </div>
          </div>
        </div>

        {/* <div className="home-action-wrapper">
          <Link to="/register">
            <div className="home-action">Get started</div>
          </Link>
        </div> */}
      </div>
    );
  }
}
