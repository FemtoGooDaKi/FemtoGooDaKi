//Yoss
import React from 'react';
import './LoginPage.css'
import logo from './Logo.svg'; 
export default class LoginPage extends React.Component {
  constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
        };
    }

  handleInputChange = e => {
    //doSomeThings
  };
 
  handleBackButton = () => {
      alert('Pressed')
  }

  render() {
    return (
      <div className='login-page-container'>
         <div>
            <img src={logo} alt=""/>
         </div>
         <div>
           <h1 className='header'>Log In to your account!</h1>
            <input
              name='username'
              placeholder="Username"
              onChange={(e) => this.handleInputChange(e)}
            />
            <input
              name='password'
              placeholder="Password"
              onChange={(e) => this.handleInputChange(e)}
              type = 'password'
            />
            <div>
                <button className='backButton' onClick={this.handleBackButton}>BACK</button>
                <button className='loginButton' onClick={this.handleLoginButton}>LOG IN</button>
            </div>
        </div>
      </div>
    );
  }
}
