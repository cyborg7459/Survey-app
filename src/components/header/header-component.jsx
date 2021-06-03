import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import './header-style.scss';
import {firestore} from '../../firebase/firebase.utils';
import { logUserOut } from '../../redux/users/user-actions';
import Loader from '../loader/loader.component';
import userImg from '../../gallery/profile.png';
import HeaderPopup from '../headerPopup/header-popup-component';

class Header extends React.Component {

    state = {
        isLoading : false,
        showMenu : true
    }

    componentDidMount() {
        this.setState({
            isLoading : false,
            showMenu : false
        })
    }

    hideMenu = () => {
        this.setState({
            showMenu : false
        })
    }
    
    logOutUser = async () => {
        this.setState({
            isLoading : true
        })
        const userRef = firestore.collection('users').doc(this.props.users.currentUser.id);
        await userRef.update({isLoggedIn : false});
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
                    {
                        this.state.showMenu ? <HeaderPopup logout={this.logOutUser} hide={this.hideMenu} /> : null
                    }
                    <h1 onClick={() => {
                        this.props.history.push('/surveys');
                    }} style={{cursor : 'pointer'}}>What's your opinion ?</h1>
                    {
                        this.props.users.currentUser ? 
                        <span onClick={() => {
                            this.setState({
                                showMenu: !this.state.showMenu
                            })
                        }} style={{cursor : 'pointer'}}>
                            <strong>
                                {this.props.users.currentUser.name.split(' ')[0]}
                                {
                                    this.props.users.currentUser.imageUrl ? 
                                    <img src={this.props.users.currentUser.imageUrl} alt="user" />
                                    : <img src={userImg} alt="user" />
                                }
                                
                            </strong>
                        </span> 
                        : 
                        <span className='size13' style={{cursor : 'pointer'}} onClick={() => {this.props.history.push('/login')}}>
                            Login    
                        </span>
                    }
                </div>
                <hr />
            </div>
        )
    }
}

const mapStateToProps = state => ({
    users : state.users
});

const mapDispatchToProps = dispatch => ({
    logOut : () => dispatch(logUserOut())
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));