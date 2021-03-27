import './header-style.scss';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

const Header = (props) => {
    const users = props.users;
    return (
        <div id="header-container">
            <div id="header">
                <span onClick={() => {
                    props.history.push('/');
                }} style={{cursor : 'pointer'}} className='size20'>What's your opinion ?</span>
                {
                    users.currentUser ? <span> {users.currentUser.name} </span> : null
                }
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    users : state.users
});

export default withRouter(connect(mapStateToProps)(Header));