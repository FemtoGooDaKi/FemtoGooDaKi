import React from "react";
import { Card } from "../../components/Card";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";
import "./SearchResultPage.scss";

class SearchResultPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { searchResult: {} };
  }

  componentDidMount() {
    this.fetchData(this.props.searchKeyword);
  }

  componentDidUpdate(prevProps) {
    if (this.props.searchKeyword !== prevProps.searchKeyword) {
      this.fetchData(this.props.searchKeyword);
    }
  }

  fetchData(keyword) {
    //Example of Sending header
    // const data = {
    //   username: 'kevin'
    // }
    // const options = {
    //   method: "GET",
    //   headers: { "content-type": "application/json", "Authorization": localStorage.getItem('auth') },
    //   data: JSON.stringify(data),
    //   url: "https://femtogudaki-backend-user-op3ovi357a-an.a.run.app/user/kevin/"
    // };
    // axios(options)
    //   .then(response => {
    //     console.log(response)
    //   })
    //   .catch(error => {
    //     console.log(error);
    //   });
    axios
      .get("http://localhost:5001/search", {
        params: {
          keyword: keyword
        }
      })
      .then(response => {
        console.log(response.data);
        this.setState({ searchResult: response.data });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  handleJoin = e => {
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
            onClick={e => this.handleJoin(e)}
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
    searchKeyword: state.searchKeyword
  };
};

export default connect(mapStateToProps)(withRouter(SearchResultPage));
