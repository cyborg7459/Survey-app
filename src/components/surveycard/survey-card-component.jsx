import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import './survey-card-styles.scss';
import { firestore } from '../../firebase/firebase.utils';

import business from '../../gallery/business.png';
import curAffairs from '../../gallery/curAffairs.png';
import education from '../../gallery/education.png';
import health from '../../gallery/health.png';
import movies from '../../gallery/movies.png';
import music from '../../gallery/music.png';
import others from '../../gallery/others.png';
import politics from '../../gallery/politics.png';
import science from '../../gallery/science.png';
import sports from '../../gallery/sports.png';
import worldNews from '../../gallery/worldNews.png';

class SurveyCard extends React.Component {

    toggleSurveyArchivedStatus = async () => {
        const surveyRef = firestore.collection('surveys').doc(this.props.id);
        const surveySnap = await surveyRef.get();
        await surveyRef.update({archived : !surveySnap.data().archived});
    }

    render() {

        const cardDetails = {
            "business" : {
                image : business,
                topicName : "Business"
            },
            "curAffairs" : {
                image : curAffairs,
                topicName : "Current Affairs"
            },
            "education" : {
                image : education,
                topicName : "Education"
            },
            "health" : {
                image : health,
                topicName : "Health"
            },
            "movies" : {
                image : movies,
                topicName : "Movies"
            },
            "music" : {
                image : music,
                topicName : "Music"
            },
            "politics" : {
                image : politics,
                topicName : "Politics"
            },
            "science" : {
                image : science,
                topicName : "Science"
            },
            "sports" : {
                image : sports,
                topicName : "Sports"
            },
            "worldNews" : {
                image : worldNews,
                topicName : "World News"
            },
            "others" : {
                image : others,
                topicName : "others"
            }
        }

        const isFilled = this.props.user.surveysFilled.includes(this.props.id);
        const isOwned = this.props.user.surveysOwned.includes(this.props.id);

        let customButton;
        if(this.props.match.path.split('/')[2] === 'archived') {
            customButton = (
                <div onClick={this.toggleSurveyArchivedStatus} className='btn-outline btn-green' style={{
                    backgroundColor: "green",
                    padding: "7px 10px"
                }}>
                    Reopen survey
                </div> 
            )
        }
        else {
            customButton = (
                <div onClick={this.toggleSurveyArchivedStatus} className='btn-outline btn-red' style={{
                    backgroundColor: "#a62c07",
                    padding: "7px 10px"
                }}>
                    Move to archives
                </div> 
            )
        }

        let mainButton;
        if(this.props.match.path.split('/')[2] === 'archived' || isFilled || isOwned) {
            mainButton = (
                <div onClick = {() => {
                    this.props.history.push(`/survey/${this.props.id}/results`)
                }} style={{backgroundColor : "black", padding: "7px 10px"}} className="btn-outline btn-black">View survey results</div>
            )
        }
        else {
            mainButton = (
                <div onClick = {() => {
                    this.props.history.push(`/survey/${this.props.id}`)
                }} className="btn-outline btn-blue" style={{padding: "7px 10px"}}>Fill survey</div>
            )
        }

        return (
            <div className="survey-card-outer">
                <div className={`${this.props.align}-align survey-card`}>
                    <div className="card-content">
                        <div className="size17 main-heading">{this.props.survey.title}</div>
                        <p onClick={()=>{
                            this.props.history.push(`/profile/${this.props.survey.ownerID}`)
                        }} style={{cursor: "pointer"}} className='text-muted mb-1 mt-0'>by {this.props.survey.byUser}</p>
                        <p>Topic : {cardDetails[this.props.survey.topic].topicName}</p>
                        <p className='size11'>{this.props.survey.description}</p>
                        {
                            (isFilled || isOwned) ? null : <p className='text-muted mb-0'>{this.props.survey.responses} people took part in this survey</p>
                        }
                        {
                            isFilled ? <p className='text-muted size11'>You have already filled this survey</p> : null
                        }
                        {
                            isOwned ? <p className='text-muted size11'>You own this survey</p> : null
                        }
                    </div>
                    <img alt="img" src={cardDetails[this.props.survey.topic].image} />
                </div>
                <hr className='my-3 mx-2'/>
                <div id="button-region" className = {`${this.props.align}-align`}>
                    {
                        mainButton
                    }
                    {
                        isOwned ? customButton : null
                    }
                </div>      
            </div>

        )
    }
}

const mapStateToProps = state => ({
    user : state.users.currentUser
});

export default withRouter(connect(mapStateToProps)(SurveyCard));