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
        this.props.setSearchKeyword(keyword);
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
        this.props.history.push('/login');
    }

    handleSignUpButton = () => {
        // register page stub
        this.props.history.push('/register');
    }

    render() {
        const {login} = this.props;
        return (
            <div className={'navbar-container' + (login ? ' signed-in' : '')}>
                <div>
                    <span className={'navbar-title' + (login ? ' signed-in' : '')}>
                        F
                    </span>
                    <div className='navbar-textfield-container'>
                        <FontAwesomeIcon icon={faSearch}/>
                        <input
                        type='text'
                        className={login ? ' signed-in' : ''}
                        onKeyDown={this.handleInputKeyDown}
                        />
                    </div>
                </div>
                {login &&
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
                {!login &&
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

const mapStateToProps = state => {
    return {
        searchKeyword: state.searchKeyword,
        login: state.login,
    }
};

const mapDispatchToProps = dispatch => ({
    setSearchKeyword: (keyword) => dispatch(setSearchKeyword(keyword))
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Navbar));