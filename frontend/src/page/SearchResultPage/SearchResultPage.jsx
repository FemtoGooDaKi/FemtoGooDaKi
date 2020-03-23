import React from "react";
import { Card } from "../../components/Card";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";
import "./SearchResultPage.css";

class SearchResultPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { searchResult: {} };
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/search", {
        params: {
          keyword: this.props.searchKeyword
        }
      })
      .then(response => {
        this.setState({ searchResult: response.data });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  handleJoin = (e) => {
    e.preventDefault();
    this.props.history.push(`/course/${e.target.id}`);
  };

  render() {
    const { searchResult } = this.state;
    const course = searchResult.data;

    let courseList;
    if (course) {
      courseList = course.map(c => {
        const joinButton = (
          <div
            id={c.id}
            className="search-result-join"
            onClick={(e) => this.handleJoin(e)}
          >
            Join
          </div>
        );
        return (
          <Card
            key={c.id}
            className="search-result-course"
            buttonElement={joinButton}
            title={c.courseName}
            subtitle={c.subtitle}
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
        );
      });
    }

    return (
      <div className="search-result-page">
        <div className="search-result-title">Search Result</div>
        {courseList}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    searchKeyword: state.searchKeyword,
  };
};

export default connect(mapStateToProps)(withRouter(SearchResultPage));
