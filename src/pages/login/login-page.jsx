import React from 'react';
import {  withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import validator from 'email-validator';

import './login-style.scss';
import Loader from '../../components/loader/loader.component';
import { auth, firestore } from '../../firebase/firebase.utils';
import { setUser } from '../../redux/users/user-actions';

class LoginPage extends React.Component {

    state = {
        isLoading : false
    }

    LogIn = () => {
        const email = document.getElementById('email').value;
        const pass = document.getElementById('pass').value;
        if(!email) return alert("Enter email ID");
        if(!pass) return alert("Enter password");
        const bool = validator.validate(email);
        if(!bool) return alert("Please enter valid Email");
        this.setState({
            isLoading : true
        })
        this.loginUser(email, pass);
    }

    loginUser = async (email, password) => {
        try {
            const user = await auth.signInWithEmailAndPassword(email, password);
            const userRef = firestore.collection('users');
            const reqUserRef = userRef.where('uid', '==', user.user.uid);
            const reqUserSnapshot = await reqUserRef.get();
            console.log(reqUserSnapshot.docs[0].id);
            const loggedInUser = reqUserSnapshot.docs[0].data();
            this.props.setUser(loggedInUser);
            this.props.history.push('/');
            this.setState({
                isLoading : false
            })
        }
        catch(err) {
            this.setState({
                isLoading : false
            })
            return alert(err.message);
        }
    }

    render() {
        return (
            <div className="loginpage">
                {
                    this.state.isLoading ? <Loader text = "Logging you in" /> : null
                }
                <div className="login-form">
                    <h3>Sign in to your account</h3>
                    <p>Get access to all the surveys and questionnaires available</p>
                    <input className='input' type="text" placeholder="Enter email ID" id="email"/>
                    <input className='input' type="password" placeholder="Enter password" id="pass"/>
                    <div onClick={this.LogIn} className="btn btn-block mb-2">Login</div>
                    <span onClick={() => {
                        this.props.history.push('/register');
                    }} style={{ cursor : 'pointer'}} >New here? Click here to register</span>
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    setUser : user => dispatch(setUser(user))
});

export default withRouter(connect(null, mapDispatchToProps)(LoginPage));