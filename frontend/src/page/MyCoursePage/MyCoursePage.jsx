//Yoss
import React from 'react';
import './MyCoursePage.css'
import RandomPicture from '../../components/RandomPicture/RandomPicture'
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import {enrollmentService} from '../../services/ServiceManager'
import {Card} from '../../components/Card/Card'
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
      redirect: '',
      courses : [],
    };
  }

  componentDidMount = () => {
    //   this.setState({
    //     knowledge : [{id : 0,knowledgeName:"Lesson 1",description : "How To Make Omelette"},{id : 1,knowledgeName:"Lesson 2",description : "How To Ride Bycicle"},{id : 2,knowledgeName:"Lesson 3",description : "How To Clear Terminal"}]
    //   })
       this.getMyCourse()
  }

  getMyCourse = () => {
      //Get Description
      const username = this.props.username;
      enrollmentService.getEnrollCourse("chain",(data,error) => {
            if(error){
              console.log(error)
              return;
            }
            this.setState({courses : data.courses})
      });
  }

  joinCourse = (courseId) => {
    this.setState({redirect : `/course/${courseId}/learn`})
  }

  expandedElement = (knowledge_set) => {
      if(knowledge_set.length > 0){
        return knowledge_set.map((knowledge) => {
                  return <p style = {{fontSize : "30px"}}>{knowledge.subject}</p>
           })
      }
     
  }

  render() {
    if(this.state.redirect != ''){
      return <Redirect to={this.state.redirect} />;
    }
    else {
      return (
        <div className='course-page-container'>
          <p className='header'>My Course</p>
          <div>
            {this.state.courses.map((course) => {
               return (
                <div style = {{marginBottom : '10px'}}>
                <Card
                    title={course.courseName}
                    subtitle={course.description}
                    imgUrl={"https://image.freepik.com/free-photo/modern-glass-desk-interior-with-computer-devices-3d-rendering_117023-333.jpg"}
                    expandedElement={this.expandedElement(course.knowledge_set)}
                    buttonElement = {<button className = 'joinCourse' onClick = {() => this.joinCourse(course.id)}> Join </button>}
                  />
                  </div>
               )
            })}
          </div>
        </div>
      );
    }
  }
}

const mapStateToProps = state => ({
  username: state.username,
  userId : state.userId
});

export default connect(mapStateToProps)(MyCoursePage);
