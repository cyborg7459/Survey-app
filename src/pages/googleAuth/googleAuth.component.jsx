import React from 'react';
import { withRouter } from "react-router";
import { connect } from 'react-redux'; 

import { provider, firestore } from '../../firebase/firebase.utils';
import firebase from '../../firebase/firebase.utils';
import { setUser } from '../../redux/users/user-actions';

class GoogleAuth extends React.Component {

    googleAuth = async () => {
        firebase.auth().signInWithPopup(provider).then(async (res) => {
            const uid = res.user.uid;
            const userRef = firestore.collection('users').where('uid', '==', uid);
            const userSnap = await userRef.get();
            if(!userSnap.empty) {
                alert("Old user");
                const user = userSnap.docs[0].data();
                console.log(user);
                this.props.setUser(user);
            }
            else {
                alert("New user");
                const user = {
                    email : res.user.email,
                    name : res.user.displayName,
                    uid : res.user.uid,
                    surveysFilled : [],
                    surveysOwned : []
                }
                this.addUserToDatabase(user);
            }
        })
    }

    addUserToDatabase = (user) => {
        const userRef = firestore.collection('users');
        const newUser = userRef.doc();
        user.id = newUser.id;
        newUser.set(user);
        this.props.setUser(user);
    }

    render() {
        return (
            <div className='pt-5'>
                <button onClick={this.googleAuth} className='mt-5 btn ml-5'>Register with Google</button>
                <button onClick={this.login} className='btn mt-5 ml-5'>Sign in with Google</button>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    setUser : user => dispatch(setUser(user))
});

export default withRouter(connect(null, mapDispatchToProps)(GoogleAuth));