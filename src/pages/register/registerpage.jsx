import React from 'react';
import { connect } from 'react-redux';
import validator from 'email-validator';

import Loader from '../../components/loader/loader.component';
import { auth, firestore } from '../../firebase/firebase.utils';
import { setUser } from '../../redux/users/user-actions';

class RegisterPage extends React.Component {
    state = {
        isLoading : false
    }

    signUp = () => {
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const pass = document.getElementById('pass').value;
        const passconf = document.getElementById('passconf').value;
        if(!name) return alert("Please enter name");
        if(!email) return alert("Please enter email ID");
        const valid = validator.validate(email);
        if(!valid) return alert("Please enter a valid email ID");
        if(!pass) return alert("Please enter password");
        if(!passconf) return alert("Please confimr your password");
        if(pass !== passconf) return alert("Password and confirm password don't match");
        const newUser = {
            name, email, pass
        }
        this.setState({
            isLoading : true
        })
        this.registerUser(newUser);
    }

    registerUser = async user => {
        try {
            const newUser = await auth.createUserWithEmailAndPassword(user.email, user.pass);
            user.uid = newUser.user.uid;
            delete user["pass"];
            this.addUserToDatabase(user);
        } catch(err) {
            this.setState({
                isLoading : false
            })
            return alert(err.message);
        }
    }

    addUserToDatabase = async user => {
        try {
            const userRef = firestore.collection('users');
            const userToAdd = userRef.doc();
            userToAdd.set(user);
            this.setState({
                isLoading : false
            })
            this.props.setUser(user);
            this.props.history.push('/');
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
                    this.state.isLoading ? <Loader text="Signing you up"/> : null
                }
                <div className="login-form">
                    <h3>Welcome !!!</h3>
                    <p>Create an account with us and get started</p>
                    <input id="name" className='input' type="text" placeholder="Enter your name"/>
                    <input required id="email" className='input' type="email" placeholder="Enter email ID" />
                    <input id="pass" className='input' type="password" placeholder="Enter password"/>
                    <input id="passconf" className='input' type="password" placeholder="Confirm password"/>
                    <div onClick={this.signUp} className="btn btn-block mb-2">Register with us</div>
                    <span onClick={() => {
                        this.props.history.push('/login');
                    }} style={{ cursor : 'pointer'}} >Already have an account? Click here to login</span>
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    setUser : user => dispatch(setUser(user))
});

export default connect(null,mapDispatchToProps)(RegisterPage);