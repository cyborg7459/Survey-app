import React from 'react';
import {  withRouter } from 'react-router-dom';

class RegisterPage extends React.Component {
    render() {
        return (
            <div className="loginpage">
                <div className="login-form">
                    <h3>Welcome !!!</h3>
                    <p>Create an account with us and get started</p>
                    <input className='input' type="text" placeholder="Enter your name" name="" id=""/>
                    <input className='input' type="text" placeholder="Enter email ID" name="" id=""/>
                    <input className='input' type="password" placeholder="Enter password" name="" id=""/>
                    <input className='input' type="password" placeholder="Confirm password" name="" id=""/>
                    <div className="btn btn-block mb-2">Register with us</div>
                    <span onClick={() => {
                        this.props.history.push('/login');
                    }} style={{ cursor : 'pointer'}} >Already have an account? Click here to login</span>
                </div>
            </div>
        )
    }
}

export default withRouter(RegisterPage);