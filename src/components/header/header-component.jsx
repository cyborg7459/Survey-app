import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import './header-style.scss';
import {firestore} from '../../firebase/firebase.utils';
import { logUserOut } from '../../redux/users/user-actions';
import { logUserOutState } from '../../redux/auth/authActions';
import Loader from '../loader/loader.component';

class Header extends React.Component {

    state = {
        isLoading : false
    }

    componentDidMount() {
        this.setState({
            isLoading : false
        })
    }
    
    logOutUser = async () => {
        this.setState({
            isLoading : true
        })
        const userRef = firestore.collection('users').doc(this.props.users.currentUser.id);
        await userRef.update({isLoggedIn : false});
        await this.props.logOutState();
        await this.props.logOut();
        this.setState({
            isLoading : false
        })
    }

    render() {
        return (
            <div id="header-container">
                {
                    this.state.isLoading ? <Loader text = "Signing you out" /> : null
                }
                <div id="header">
                    <span onClick={() => {
                        this.props.history.push('/surveys');
                    }} style={{cursor : 'pointer'}} className='size20'>What's your opinion ?</span>
                    {
                        this.props.users.currentUser ? 
                        <span className='size13'> Signed in as <strong>{this.props.users.currentUser.name.split(' ')[0]}</strong> &nbsp; &nbsp; <span onClick={this.logOutUser} style={{cursor: 'pointer'}}>Sign out</span> </span> 
                        : 
                        <span className='size13' style={{cursor : 'pointer'}} onClick={() => {this.props.history.push('/login')}}>Login</span>
                    }
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    users : state.users
});

const mapDispatchToProps = dispatch => ({
    logOut : () => dispatch(logUserOut()),
    logOutState : () => dispatch(logUserOutState())
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));