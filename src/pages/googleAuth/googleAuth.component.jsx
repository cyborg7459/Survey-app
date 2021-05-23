import React from 'react';
import { withRouter } from "react-router";
import { connect } from 'react-redux'; 
import { Row, Col } from 'react-bootstrap';

import './googleAuth-styles.scss';
import { provider, firestore } from '../../firebase/firebase.utils';
import firebase from '../../firebase/firebase.utils';
import { setUser } from '../../redux/users/user-actions';
import loginImg from '../../gallery/login.svg';
import googleIcon from '../../gallery/google.png';
import Loader from '../../components/loader/loader.component';

class GoogleAuth extends React.Component {

    state = {
        isLoading : false
    }

    googleAuth = async () => {
        firebase.auth().signInWithPopup(provider).then(async (res) => {
            this.setState({
                isLoading : true
            })
            const uid = res.user.uid;
            const userRef = firestore.collection('users').where('uid', '==', uid);
            const userSnap = await userRef.get();
            if(!userSnap.empty) {
                const user = userSnap.docs[0].data();
                this.props.setUser(user);
            }
            else {
                const user = {
                    email : res.user.email,
                    name : res.user.displayName,
                    uid : res.user.uid,
                    surveysFilled : [],
                    surveysOwned : []
                }
                this.addUserToDatabase(user);
            }
            this.props.history.push('/');
        }).catch(err => {
            alert(err.message);
            this.setState({
                isLoading : false
            })
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
            <div className='full-screen'>
                {
                    this.state.isLoading ? <Loader text='Signing you in'/> : null
                }
                <div id="home-link" onClick={() => this.props.history.push('/')}>
                    <i class="mr-3 fas fa-home"></i>
                    Back to home
                </div>
                <Row id='auth-inner'>
                    <Col className='px-0' md={6} lg={7} id='sidebar'>
                        <div className="overlay">
                            
                            <h1 className='size35'>A place to gather public opinion</h1>
                            <p className="lead">
                                "What's your opinion" provides you the perfect platform to create or take part in surveys about anything and everything. From sports to science, and from politics to entertainment, you'll get it all here
                                <br/>
                                <br/>
                                Witness easy-to-create surveys with a clean & beatiful graphical representation of the results.
                            </p>
                            {/* <button onClick={() => {
                                this.props.history.push('/');
                            }} className='btn'>Back to homepage</button> */}
                        </div>
                    </Col>
                    <Col md={6} lg={5} id='signin-form'>
                        <img className='mb-5' src={loginImg} alt="login" />
                        <div onClick={this.googleAuth} className='size12' id="button"> 
                            <img src={googleIcon} alt="google-icon" />
                            Sign in with Google
                        </div>
                    </Col>
                </Row>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    setUser : user => dispatch(setUser(user))
});

export default withRouter(connect(null, mapDispatchToProps)(GoogleAuth));