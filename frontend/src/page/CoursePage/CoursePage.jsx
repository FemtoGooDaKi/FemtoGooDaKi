//Yoss
import React from 'react';
import './CoursePage.css'
import img from './arduino.png'; 

/*
<CoursePage
    imgUrl: string;
    name: string
    description: string
    onStartCourse = (name) => any
/>
*/

export default class CoursePage extends React.Component {
  render() {
    const imgUrl = this.props.imgUrl
    const name = this.props.name
    const description = this.props.description
    const onStartCourse = this.props.onStartCourse
    return (
      <div className='course-page-container'>
         <div className='startCourse'>
            <div>
                <img src={imgUrl} alt=""/>
            </div>
            <div>
                <p className='header'>{name}</p>
                <p className='header'>Course </p>
                <button className="startCourseButton" style = {{marginTop : 20}} onClick={onStartCourse(name)}>Start Course</button>  
            </div>
        </div>
        <div className = "description">
            <p style = {{fontSize : "2.5em" , marginBottom : 10}}>Description</p>
            <p style = {{marginLeft : 100 , fontSize : "1.5em"}}>{description}</p>
        </div>
      </div>
    );
  }
}
