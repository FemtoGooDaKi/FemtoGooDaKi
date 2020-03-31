import React, { Component } from 'react';
import './CourseNavigation.scss';

/*
interface ICourseNavigationProps {
	name: string;
	subject: [Subject]
	onClick = (knowledgeName) => any
}
*/

export class CourseNavigation extends Component {
    render() {
        return (
            <div className='coursenav-container'>
                <div className='coursenav-name'>{this.props.name}</div>
                <div className='coursenav-separator'></div>
                {this.props.subject.map((subject) => 
                    <CourseNavigationSubject
                    subject={subject}
                    handleKnowledgeClick={this.props.onClick}
                    />
                )}
            </div>
        );
    }
}

class CourseNavigationSubject extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showKnowledge: false,
        };
        console.log(props.subject.knowledge)
    }

    toggleKnowledge = () => {
        this.setState({
            showKnowledge: !this.state.showKnowledge,
        });
    }

    render() {
        return (
            <div>
                <div className='coursenav-subject-container'>
                    <div
                    className='coursenav-subject-name'
                    onClick={this.toggleKnowledge}
                    >
                        {this.props.subject.name}
                    </div>
                    {this.state.showKnowledge &&
                        this.props.subject.knowledge.map((knowledge) => 
                            <div className='coursenav-subject-knowledge'
                            onClick={() => { this.props.handleKnowledgeClick(knowledge.name) }}
                            >
                                {knowledge.name}
                            </div>
                        )
                    }
                </div>
                <div className='coursenav-separator'></div>
            </div>
        );
    }
}