//Yoss
import React from 'react';
import './CoursePage.css'
import RandomPicture from '../../components/RandomPicture/RandomPicture'
import { Redirect } from "react-router-dom";
import {courseService,enrollmentService} from '../../services/ServiceManager'
import {Card} from '../../components/Card/Card'
import Navbar from '../../components/Navbar/Navbar'
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
      redirect: '',
      knowledges : [],
      job : '',
      author :'',
      courseName : 'Arduino IOT .',
      description : 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
      createDate : '',
    };
  }

  componentDidMount = () => {
      this.setState({
        knowledge : [{id : 0,knowledgeName:"Lesson 1",description : "How To Make Omelette"},{id : 1,knowledgeName:"Lesson 2",description : "How To Ride Bycicle"},{id : 2,knowledgeName:"Lesson 3",description : "How To Clear Terminal"}]
      })
      this.getCourseDescription()
  }

  getCourseDescription = () => {
      //Get Description
      const id =  this.props.match.params.id
      courseService.getCourseDetail(id,(detail,error) => {
          if(error){
            return; 
          }
          this.setState({
                  knowledges : detail.knowledge_set,
                  job : detail.job,
                  author : detail.author,
                  courseName : detail.courseName,
                  description : detail.description,
                  createDate : detail.createDate
             })
          console.log(detail)
      })
  }

  handleStartButton = () => {
      //Callapi Enroll
      const enrollData = {"username":this.props.username,"courseId":this.props.match.params.id}
      enrollmentService.enrollCourse(enrollData,(data,error) => {
          if(error){
            console.log(error)
            return ;
          }
          this.setState({redirect : `/course/${this.props.match.params.id}/learn`})
      })
      
  }

  render() {
    console.log(this.state.knowledges)
    if(this.state.redirect != ''){
      return <Redirect to={this.state.redirect} />;
    }
    else {
      return (
        <div>
          <Navbar/>
        <div className='course-page-container'>
          <div className='startCourse'>
              <div>
                  <RandomPicture/>
              </div>
              <div>
                  <p className='header'>{this.state.courseName}</p>
                  <p className='header'>Course </p>
                  <button className="startCourseButton" onClick={this.handleStartButton}>Start Course</button>  
              </div>
          </div>
          <div className = "description">
              <p style = {{fontSize : "2em" , marginBottom : 10}}>Description</p>
              <p style = {{marginLeft : 100 , fontSize : "1.3em"}}>{this.state.description}</p>
          </div>
          <div>
             {this.state.knowledges.map( (knowledge) => 
               <Card
                title={knowledge.subject}
                subtitle={knowledge.content}
                imgUrl={"https://image.freepik.com/free-photo/modern-glass-desk-interior-with-computer-devices-3d-rendering_117023-333.jpg"}
                expandedElement={<div><div>XXX</div><div>XXX</div><div>XXX</div><div>XXX</div><div>XXX</div><div>XXX</div><div>XXX</div><div>XXX</div><div>XXX</div><div>XXX</div><div>XXX</div><div>XXX</div></div>}
              />
            )} 
          </div>
          
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

export default connect(mapStateToProps)(CoursePage);