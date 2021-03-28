import React from 'react';

import './survey-card-styles.scss';

class SurveyCard extends React.Component {
    render() {
        return (
            <div className="survey-card">
                <div className="size17 main-heading">{this.props.survey.title}</div>
                <p className='text-muted mb-3 mt-0'>by {this.props.survey.byUser}</p>
                <p className='size11'>{this.props.survey.description}</p>
                <p className='text-muted'>{this.props.survey.responses} people took part in this survey</p>
                <div className="btn btn-block">Fill survey</div>
            </div>
        )
    }
}

export default SurveyCard;