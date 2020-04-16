import React, { Component } from "react";
import { CourseNavigation } from '../../components/CourseNavigation';
import Navbar from '../../components/Navbar/Navbar';
import { Row, Col, message } from "antd";
import "./LearnPage.scss";
import "antd/dist/antd.css";

import { courseService } from "../../services/ServiceManager";

export default class LearnPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      courseId: props.match.params.id,
    }
  }

  componentDidMount = () => {
    this.getCourseDetail();
  }

  getCourseDetail = () => {
    courseService.getCourseDetail(this.state.courseId, (course, error) => {
      if (course) {
        console.log(course);
        this.setState({course: course});
      } else {
        console.log(error);
        message.error("Unable to load the course. Please check your connection and try again.");
      }
    })
  }

  handleSelectKnowledge = (knowledge) => {
    this.setState({selectedKnowLedge: knowledge});
  }

  render() {
    return (
      <React.Fragment>
        <Navbar/>
        <Row className="learn-page-container">
          <Col span={5}>
            <CourseNavigation
            name={this.state.course?.courseName ?? ""}
            knowledges={this.state.course?.knowledge_set ?? []}
            onClick={this.handleSelectKnowledge}
            />
          </Col>
          <Col span={19}>
            <LearnPageContent
            knowledge={this.state.selectedKnowLedge}
            />
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}

class LearnPageContent extends Component {
  render() {
    if (!this.props.knowledge) return <div></div>
    
    return (
      <div className="learn-page-content-container">
        <div className="learn-page-content-description">
          {this.props.knowledge.content}
        </div>
      </div>
    );
  }
}