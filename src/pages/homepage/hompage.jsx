import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import './homepage-style.scss';
import coverimg from '../../gallery/img.svg';
import { logUserOut } from '../../redux/users/user-actions';
import { firestore } from '../../firebase/firebase.utils';
import Loader from '../../components/loader/loader.component';

class Homepage extends React.Component {

    state = {
        isLoading: true
    }

    async componentDidMount() {
        if(this.props.user.currentUser) {
            const id = this.props.user.currentUser.id;
            const userRef = firestore.collection('users').doc(id);
            const userSnap = await userRef.get();
            if(userSnap.exists) {
                if(!userSnap.data().isLoggedIn) {
                    this.props.logout();
                    this.setState({
                        isLoading: false
                    })
                }
                else {
                    this.setState({
                        isLoading: false
                    })
                }
            } 
            else {
                this.setState({
                    isLoading: false
                })
            }
        }
        else {
            this.setState({
                isLoading: false
            })
        }

    }

    render() {
        return (
            <div id="homepage-container" className='full-screen'>
                {
                    this.state.isLoading ? <Loader text = "Starting up" /> : null
                }
                <div className="custom-shape-divider-bottom-1620380295" >
                    <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                        <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" className="shape-fill"></path>
                    </svg>
                </div>
                <div id="homepage-inner">
                    <img src={coverimg} id="main-img" alt="imgs" />       
                    <div id="heading">
                        <h1 id="back-heading">WHAT'S YOUR</h1>
                        <h1 id="front-heading">Opinion</h1>
                    </div>
                    <p id="heading-text">
                        Participate in surveys ranging a variety of topics from sports to politics to education to science. Compare your views with the general ones.
                        Or create your own survey and share among your friends
                    </p>
                    <button onClick={() => {
                        this.props.history.push('/auth');
                    }} className="btn" id="get-started-btn">
                        Get started
                    </button>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    user: state.users
})

const mapDispatchToProps = dispatch => ({
    logout: () => dispatch(logUserOut())
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Homepage));