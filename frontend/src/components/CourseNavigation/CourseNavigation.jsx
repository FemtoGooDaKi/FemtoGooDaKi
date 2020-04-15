import React, { Component } from 'react';
import './CourseNavigation.scss';

/*
interface ICourseNavigationProps {
    name = String
    knowledges = [{subject: String, ...}]
	onClick = (knowledge) => any
}
*/

export class CourseNavigation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedSubject: null,
        };
    }

    selectKnowledge = (knowledge) => {
        this.setState({ selectedSubject: knowledge.subject });
        this.props.onClick(knowledge);
    }

    render() {
        return (
            <div className='coursenav-container'>
                <div className='coursenav-name'>{this.props.name}</div>
                <div className='coursenav-separator'></div>
                {this.props.knowledges.map((knowledge, index) => 
                    <CourseNavigationKnowledge
                    key={index}
                    knowledge={knowledge}
                    selected={this.state.selectedSubject === knowledge.subject}
                    onClick={() => this.selectKnowledge(knowledge)}
                    />
                )}
            </div>
        );
    }
}

class CourseNavigationKnowledge extends Component {
    render() {
        return (
            <div>
                <div
                className='coursenav-subject-container'
                style={{ backgroundColor: this.props.selected ? 'rgba(211, 211, 211, 0.25)' : 'transparent' }}
                >
                    <div
                    className='coursenav-subject-name'
                    onClick={this.props.onClick}
                    >
                        <span>{this.props.knowledge.subject}</span>
                    </div>
                </div>
                <div className='coursenav-separator'></div>
            </div>
        );
    }
}