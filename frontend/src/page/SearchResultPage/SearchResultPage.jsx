import React from "react";
import { Card } from "../../components/Card";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { courseService } from "../../services/ServiceManager";
import RandomPicture from "../../components/RandomPicture/RandomPicture";
import "./SearchResultPage.scss";

class SearchResultPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { searchResult: [] };
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
    courseService.searchCourse(keyword, (result, error) => {
      if (error) {
        console.log(error);
        return;
      }
      this.setState({ searchResult: result.results });
    });
  }

  handleJoin = (e) => {
    e.preventDefault();
    this.props.history.push(`/course/${e.target.id}`);
  };

  render() {
    const { searchResult } = this.state;
    let courseList = <div className="search-not-found"> No course found </div>;
    if (searchResult.length > 0) {
      courseList = searchResult.map((c) => {
        const joinButton = (
          <div
            id={c.id}
            className="search-result-join"
            onClick={(e) => this.handleJoin(e)}
          >
            Join
          </div>
        );
        console.log(c.knowledge_set);
        const knowledgeList = c.knowledge_set
          .sort((a, b) => (a.subject > b.subject ? 1 : -1))
          .map((k, id) => {
            console.log("k", k);
            return (
              <div className="knowledge-card" key={"k" + k.id}>
                <div className="knowledge-picture">
                  <RandomPicture />
                </div>
                <span>{k.subject}</span>
              </div>
            );
          });
        return (
          <Card
            key={c.id}
            className="search-result-course"
            buttonElement={joinButton}
            title={c.courseName}
            subtitle={c.subtitle}
            expandedElement={knowledgeList}
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

const mapStateToProps = (state) => {
  return {
    searchKeyword: state.searchKeyword,
  };
};

export default connect(mapStateToProps)(withRouter(SearchResultPage));
