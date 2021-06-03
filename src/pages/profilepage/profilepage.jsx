import React from 'react';
import Loader from '../../components/loader/loader.component';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux'; 

import './profilepage-styles.scss';
import {firestore} from '../../firebase/firebase.utils';
import profileIcon from '../../gallery/profile.png'
import SurveyCard from '../../components/surveycard/survey-card-component';
import EditProfileDialogue from '../../components/editProfile/editProfile-component';

class ProfilePage extends React.Component {

    state = {
        isLoading : true,
        surveys : [],
        isEditing : false
    }

    async componentDidMount() {
        const userID = this.props.match.params.id;
        const userRef = firestore.collection('users').doc(userID);

        userRef.onSnapshot(user => {
            this.setState({
                userDetails : user.data()
            })
        })

        const surveysRef = firestore.collection('surveys').where('ownerID', '==', userID);
        const surveysSnap = await (await surveysRef.get()).docs;
        let surveys = surveysSnap.map(snap => {
            return {
                ...snap.data(),
                id : snap.id
            }
        });
        surveys = surveys.filter(survey => {
            return !survey.archived
        })

        this.setState({
            isLoading : false,
            surveys
        })
    }

    showEditDialogue = () => {
        this.setState({
            isEditing : true
        })
    }

    hideEditDialogue = () => {
        this.setState({
            isEditing : false
        })
    }

    render() {

        let surveyCards = [];

        this.state.surveys.forEach(survey => {
            const card = (
                <SurveyCard key={survey.id} id={survey.id} survey={survey}/>
            )
            surveyCards.push(card);
        })

        if(!this.state.userDetails) {
            return (
                <div className="page-container">
                    {
                        this.state.isLoading ? <Loader text="Fetching user data" /> : null
                    }
                </div>
            )
        }

        else {
            return (
                <div className="page-container">
                    {
                        this.state.isEditing ? 
                        <EditProfileDialogue show={this.showEditDialogue} hide={this.hideEditDialogue} user={this.props.user.currentUser}/> 
                        : null
                    }
                    <div className="page-inner">
                        <div id="top-section">
                            <div>
                                {
                                    this.state.userDetails.imageUrl ?
                                    <img src={this.state.userDetails.imageUrl} alt="user" />
                                    :
                                    <img src={profileIcon} alt="user" />
                                }
                            </div>
                            <div>
                                <h1 className='size30'>{this.state.userDetails.name}</h1>
                                    <h5>{this.state.userDetails.email}</h5>
                                    <p className='mb-0 mt-3'> Surveys owned : {this.state.userDetails.surveysOwned.length} </p>
                                    <p> Surveys filled : {this.state.userDetails.surveysFilled.length} </p>
                                    {
                                        this.state.userDetails.isLoggedIn ? 
                                        (
                                            <div className='d-flex align-items-center'>
                                                <div id='online-circle'></div>
                                                Online now
                                            </div>
                                        )
                                        : null
                                    }
                                    {
                                        this.props.match.params.id === this.props.user.currentUser.id 
                                        ? (
                                            <span onClick={this.showEditDialogue} style={{cursor : "pointer"}} id='imgEdit' className='mt-1'>
                                                <i className="far mr-3 fa-edit"></i>
                                                Edit profile
                                            </span>
                                        ) : null
                                    }
                            </div>
                        </div>
                        {
                            surveyCards.length > 0 ? 
                            (
                                <div className='mt-5' id="surveys-section">
                                    <h3>Surveys owned by {this.state.userDetails.name} </h3>
                                    <hr className='mb-5' />
                                    {surveyCards}
                                </div>
                            )
                            :
                            (
                                <p className='mt-5 text-center size15'>
                                    {this.state.userDetails.name} does not own any surveys 
                                </p>
                            )
                        }
                        
                    </div>
                </div>
            )
        }
    }
}

const mapStateToProps = state => ({
    user : state.users
})

export default withRouter(connect(mapStateToProps)(ProfilePage));