import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';

import './header-popup-styles.scss';
import { logUserOut } from '../../redux/users/user-actions';

const HeaderPopup = props => {
    return (
        <div id="header-menu">
            <div onClick = {() => {
                props.hide();
                props.history.push(`/profile/${props.user.currentUser.id}`);
            }}><i className="fas mr-3 fa-user"></i>My Profile</div>
            <div onClick={() => {
                props.hide();
                props.logout();
            }}><i className="fas mr-3 fa-sign-out-alt"></i>Logout</div>
        </div>
    )
}

const mapStateToProps = state => ({
    user : state.users
})

const mapDispatchToProps = dispatch => ({
    logout : () => dispatch(logUserOut())
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HeaderPopup));