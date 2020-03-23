import React from "react";
import {Card} from "../../components/Card";
import { withRouter } from 'react-router-dom';
import { connect } from "react-redux";
import "./SearchResultPage.css";

class SearchResultPage extends React.Component {
  handleJoin = (e) => {
    e.preventDefault();
    console.log(e);
  }
  render() {
    const joinButton = <div className="search-result-join" onClick={e => this.handleJoin(e)}>Join</div>
    return (
      <div className="search-result-page">
        <div className="search-result-title">Search Result</div>
        <Card
          className="search-result-course"
          buttonElement={joinButton}
          title={"Lighthouse Course"}
          subtitle={"How to lighthouse your friends"}
          imgUrl={
            "https://image.freepik.com/free-photo/modern-glass-desk-interior-with-computer-devices-3d-rendering_117023-333.jpg"
          }
          expandedElement={
            <div>
              <div>XXX</div>
              <div>XXX</div>
              <div>XXX</div>
              <div>XXX</div>
              <div>XXX</div>
              <div>XXX</div>
              <div>XXX</div>
              <div>XXX</div>
              <div>XXX</div>
              <div>XXX</div>
              <div>XXX</div>
              <div>XXX</div>
            </div>
          }
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
      searchKeyword: state.searchKeyword,
      login: state.login,
  }
};

export default connect(mapStateToProps)(withRouter(SearchResultPage));