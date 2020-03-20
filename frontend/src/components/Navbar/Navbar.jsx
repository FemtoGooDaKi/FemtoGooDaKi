import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faGraduationCap, faBook, faDesktop } from '@fortawesome/free-solid-svg-icons'
import { connect } from "react-redux";
import { setSearchKeyword } from "../../actions";
import './Navbar.css';

class Navbar extends Component {
    handleInputKeyDown = (e) => {
        if (e.keyCode !== 13) return;
        const keyword = e.target.value;
        this.setState({ keyword: keyword });
        this.props.history.push('/search');
    }

    handleCareerButton = () => {
        this.props.history.push('/career');
    }

    handleAddCourseButton = () => {
        this.props.history.push('/addcourse');
    }

    handleMyCourseButton = () => {
        this.props.history.push('/mycourse');
    }

    handleSignInButton = () => {

    }

    handleSignUpButton = () => {

    }

    render() {
        return (
            <div className={'navbar-container' + (this.isLoggedIn ? ' signed-in' : '')}>
                <div>
                    <span className={'navbar-title' + (this.isLoggedIn ? ' signed-in' : '')}>
                        F
                    </span>
                    <div className='navbar-textfield-container'>
                        <FontAwesomeIcon icon={faSearch}/>
                        <input
                        type='text'
                        className={this.isLoggedIn ? ' signed-in' : ''}
                        onKeyDown={this.handleInputKeyDown}
                        />
                    </div>
                </div>
                {this.isLoggedIn &&
                    <div className='navbar-menu-icon-container'>
                        <span onClick={this.handleCareerButton}>
                            <FontAwesomeIcon icon={faGraduationCap}/>
                        </span>
                        <span onClick={this.handleAddCourseButton}>
                            <FontAwesomeIcon icon={faBook}/>
                        </span>
                        <span onClick={this.handleMyCourseButton}>
                            <FontAwesomeIcon icon={faDesktop}/>
                        </span>
                    </div>
                }
                {!this.isLoggedIn &&
                    <div className='navbar-sign-in-button-container'>
                        <span onClick={this.handleSignUpButton}>
                            Sign Up
                        </span>
                        <span onClick={this.handleSignInButton}>
                            Sign In
                        </span>
                    </div>
                }
            </div>
        );
    }
}

const mapStateToProps = state => ({
    searchKeyword: state.keyword,
    login: state.isLoggedIn,
});

const mapDispatchToProps = dispatch => ({
    setSearchKeyword: (keyword) => dispatch(setSearchKeyword(keyword))
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Navbar));