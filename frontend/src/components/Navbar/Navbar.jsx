import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faGraduationCap, faBook, faDesktop } from '@fortawesome/free-solid-svg-icons'
import './Navbar.css';

/*
Props
- signedIn: Bool
- handleSearch: (String) -> Void

- handleSignIn: () -> Void
- handleSignUp: () -> Void

- handleHatButton: () -> Void
- handleBookButton: () -> Void
- handleScreenButton: () -> Void
^^^ Rename these functions at line 56, 59, 62
*/

/*
<Navbar
    signedIn={true}
    handleSearch={(keyword) => {console.log(keyword)}}
    handleSignIn={() => {console.log('sign in')}}
    handleSignUp={() => {console.log('sign up')}}
    handleHatButton={() => {console.log('hat')}}
    handleBookButton={() => {console.log('book')}}
    handleScreenButton={() => {console.log('screen')}}
/>
*/

export class Navbar extends Component {
    handleInputKeyDown = (e) => {
        if (e.keyCode !== 13) return;
        this.props.handleSearch(e.target.value);
    }

    render() {
        return (
            <div className={'navbar-container' + (this.props.signedIn ? ' signed-in' : '')}>
                <div>
                    <span className={'navbar-title' + (this.props.signedIn ? ' signed-in' : '')}>
                        F
                    </span>
                    <div className='navbar-textfield-container'>
                        <FontAwesomeIcon icon={faSearch}/>
                        <input
                        type='text'
                        className={this.props.signedIn ? ' signed-in' : ''}
                        onKeyDown={this.handleInputKeyDown}
                        />
                    </div>
                </div>
                {this.props.signedIn &&
                    <div className='navbar-menu-icon-container'>
                        <span onClick={this.props.handleHatButton}> {/* TODO: Rename this function */}
                            <FontAwesomeIcon icon={faGraduationCap}/>
                        </span>
                        <span onClick={this.props.handleBookButton}> {/* TODO: Rename this function */}
                            <FontAwesomeIcon icon={faBook}/>
                        </span>
                        <span onClick={this.props.handleScreenButton}> {/* TODO: Rename this function */}
                            <FontAwesomeIcon icon={faDesktop}/>
                        </span>
                    </div>
                }
                {!this.props.signedIn &&
                    <div className='navbar-sign-in-button-container'>
                        <span onClick={this.props.handleSignUp}>
                            Sign Up
                        </span>
                        <span onClick={this.props.handleSignIn}>
                            Sign In
                        </span>
                    </div>
                }
            </div>
        );
    }
}