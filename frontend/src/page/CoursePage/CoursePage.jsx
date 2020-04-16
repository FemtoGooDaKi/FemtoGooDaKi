//Yoss
import React from "react";
import "./CoursePage.css";
import RandomPicture from "../../components/RandomPicture/RandomPicture";
import { Redirect } from "react-router-dom";
import {
  courseService,
  enrollmentService,
} from "../../services/ServiceManager";
import Navbar from "../../components/Navbar/Navbar";
import { connect } from "react-redux";
/*
<CoursePage
    imgUrl: string;
    name: string
    description: string
    onStartCourse = (name) => any
/>
*/
class CoursePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: "",
      knowledges: [],
      job: "",
      author: "",
      courseName: "",
      description: "",
      createDate: "",
    };
  }

  componentDidMount = () => {
    this.getCourseDescription();
  };

  getCourseDescription = () => {
    //Get Description
    const id = this.props.match.params.id;
    courseService.getCourseDetail(id, (detail, error) => {
      if (error) {
        return;
      }
      this.setState({
        knowledges: detail.knowledge_set,
        job: detail.job,
        author: detail.author,
        courseName: detail.courseName,
        description: detail.description,
        createDate: detail.createDate,
      });
      console.log(detail);
    });
  };

  handleStartButton = () => {
    //Call api Enroll
    const enrollData = {
      username: this.props.username || localStorage.getItem("auth-user"),
      courseId: this.props.match.params.id,
    };
    console.log(enrollData)
    enrollmentService.enrollCourse(enrollData, (data, error) => {
      if (error) {
        console.log(error);
        return;
      }
      console.log("enrollSuccess")
      this.setState({
        redirect: `/course/${this.props.match.params.id}/learn`,
      });
    });
  };

  render() {
    if (this.state.redirect !== "") {
      return <Redirect to={this.state.redirect} />;
    } else {
      return (
        <div>
          <Navbar />
          <div className="course-page-container">
            <div className="startCourse">
              <div className='course-page-picture'>
                <RandomPicture />
              </div>
              <div>
                <p className="header">{this.state.courseName}</p>
                <p className="header">Course </p>
                <button
                  className="startCourseButton"
                  onClick={this.handleStartButton}
                >
                  Start Course
                </button>
              </div>
            </div>
            <div className="description">
              <p style={{ fontSize: "2em", marginBottom: "10px" }}>Course description</p>
              <p style={{ marginLeft: 100, fontSize: "1.3em" }}>
                {this.state.description}
              </p>
            </div>
            {/* <p style={{ fontSize: "2em", marginTop: "40px" }}>Knowledges</p>
            <div>
              {this.state.knowledges.map((knowledge) => (
                <div>{knowledge.subject}</div>
              ))}
            </div> */}
          </div>
        </div>
      );
    }
  }
}

const mapStateToProps = (state) => ({
  username: state.username,
  userId: state.userId,
});

export default connect(mapStateToProps)(CoursePage);
