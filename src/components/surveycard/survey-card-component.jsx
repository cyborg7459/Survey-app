import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import './survey-card-styles.scss';

class SurveyCard extends React.Component {
    render() {

        const isFilled = this.props.user.surveysFilled.includes(this.props.id);
        const isOwned = this.props.user.surveysOwned.includes(this.props.id);

        return (
            <div className="survey-card">
                <div className="size17 main-heading">{this.props.survey.title}</div>
                <p className='text-muted mb-3 mt-0'>by {this.props.survey.byUser}</p>
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
                {
                    (isFilled || isOwned) 
                    ? 
                        <div onClick = {() => {
                            this.props.history.push(`/survey/${this.props.id}/results`)
                        }} style={{backgroundColor : "black", padding: "7px 10px"}} className="btn btn-block">View survey results</div>
                    : 
                        <div onClick = {() => {
                            this.props.history.push(`/survey/${this.props.id}`)
                        }} className="btn btn-block" style={{padding: "7px 10px"}}>Fill survey</div>
                }
                {
                    isOwned ? 
                    <div className='btn btn-block' style={{
                        backgroundColor: "#a62c07",
                        padding: "7px 10px"
                    }}>
                        Close survey
                    </div> 
                    : null
                }
                
            </div>
        )
    }
}

const mapStateToProps = state => ({
    user : state.users.currentUser
});

export default withRouter(connect(mapStateToProps)(SurveyCard));