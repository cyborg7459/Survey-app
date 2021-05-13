import React from 'react';
import { withRouter } from "react-router";
import { connect } from 'react-redux'; 

import { provider, firestore } from '../../firebase/firebase.utils';
import firebase from '../../firebase/firebase.utils';
import { setUser } from '../../redux/users/user-actions';

class GoogleAuth extends React.Component {

    register = () => {
        firebase.auth().signInWithPopup(provider).then((res) => {
            const user = {
                email : res.user.email,
                name : res.user.displayName,
                uid : res.user.uid,
                surveysFilled : [],
                surveysOwned : []
            }
            this.addUserToDatabase(user);
        }).catch(err => {
            const errCode = err.code;
            const msg = err.message;
            const obj = {
                status : errCode,
                message : msg
            }
            console.log(obj);
        })
    }

    addUserToDatabase = (user) => {
        const userRef = firestore.collection('users');
        const newUser = userRef.doc();
        user.id = newUser.id;
        newUser.set(user);
        this.props.setUser(user);
    }

    // login = () => {
    //     firebase.auth().signInWithPopup(provider).then((res) => {
    //         const user = {

    //         }
    //     }).catch(err => {
    //         const errCode = err.code;
    //         const msg = err.message;
    //         const obj = {
    //             status : errCode,
    //             message : msg
    //         }
    //         console.log(obj);
    //     })
    // }

    render() {
        return (
            <div className='pt-5'>
                <button onClick={this.register} className='mt-5 btn ml-5'>Register with Google</button>
                <button onClick={this.login} className='btn mt-5 ml-5'>Sign in with Google</button>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    setUser : user => dispatch(setUser(user))
});

export default withRouter(connect(null, mapDispatchToProps)(GoogleAuth));