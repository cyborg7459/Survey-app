import React from 'react';
import {  withRouter } from 'react-router-dom';
import './login-style.scss';

class LoginPage extends React.Component {
    render() {
        return (
            <div className="loginpage">
                <div className="login-form">
                    <h3>Sign in to your account</h3>
                    <p>Get access to all the surveys and questionnaires available</p>
                    <input className='input' type="text" placeholder="Enter email ID" name="" id=""/>
                    <input className='input' type="password" placeholder="Enter password" name="" id=""/>
                    <div className="btn btn-block mb-2">Login</div>
                    <span onClick={() => {
                        this.props.history.push('/register');
                    }} style={{ cursor : 'pointer'}} >New here? Click here to register</span>
                </div>
            </div>
        )
    }
}

export default withRouter(LoginPage);