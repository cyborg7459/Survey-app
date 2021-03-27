import './header-style.scss';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import {logUserOut} from '../../redux/users/user-actions';

const Header = (props) => {
    const users = props.users;
    return (
        <div id="header-container">
            <div id="header">
                <span onClick={() => {
                    props.history.push('/');
                }} style={{cursor : 'pointer'}} className='size20'>What's your opinion ?</span>
                {
                    users.currentUser ? 
                    <span className='size13'> Signed in as <strong>{users.currentUser.name.split(' ')[0]}</strong> &nbsp; &nbsp; <span onClick={() => props.logOut()} style={{cursor: 'pointer'}}>Sign out</span> </span> 
                    : 
                    <span className='size13' style={{cursor : 'pointer'}} onClick={() => {props.history.push('/login')}}>Login</span>
                }
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    users : state.users
});

const mapDispatchToProps = dispatch => ({
    logOut : () => dispatch(logUserOut())
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));