//Yoss
import React from "react";
import "./MyCoursePage.css";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { enrollmentService } from "../../services/ServiceManager";
import { Card } from "../../components/Card/Card";
/*
<CoursePage
    imgUrl: string;
    name: string
    description: string
    onStartCourse = (name) => any
/>
*/

class MyCoursePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: "",
      courses: [],
    };
  }

  componentDidMount = () => {
    this.getMyCourse();
  };

  getMyCourse = () => {
    //Get Description
    const username = localStorage.getItem("auth-user");
    enrollmentService.getEnrollCourse(username, (data, error) => {
      if (error) {
        console.log(error);
        return;
      }
      this.setState({ courses: data.courses });
    });
  };

  joinCourse = (courseId) => {
    this.setState({ redirect: `/course/${courseId}/learn` });
  };

  expandedElement = (knowledge_set) => {
    if (knowledge_set.length > 0) {
      return knowledge_set.map((knowledge) => {
        return <p style={{ fontSize: "30px" }}>{knowledge.subject}</p>;
      });
    }
  };

  render() {
    if (this.state.redirect !== "") {
      return <Redirect to={this.state.redirect} />;
    } else {
      return (
        <div className="my-course-page-container">
          <p className="header">My Course</p>
          <div>
            {this.state.courses.map((course) => {
              return (
                <div style={{ marginBottom: "20px" }}>
                  <Card
                    title={course.courseName}
                    subtitle={course.description}
                    expandedElement={this.expandedElement(course.knowledge_set)}
                    buttonElement={
                      <button
                        className="continueCourse"
                        onClick={() => this.joinCourse(course.id)}
                      >
                        Continue
                      </button>
                    }
                  />
                </div>
              );
            })}
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

export default connect(mapStateToProps)(MyCoursePage);
