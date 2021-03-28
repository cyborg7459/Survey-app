import React from 'react';
import { withRouter } from 'react-router-dom';

import './survey-styles.scss';
import Loader from '../../components/loader/loader.component';
import { firestore } from '../../firebase/firebase.utils';

class SurveyPage extends React.Component {

    state = {
        isLoading : true,
        survey : {}
    }

    componentDidMount() {
        this.fetchSurvey(this.props.match.params.id);
    }

    fetchSurvey =  async id => {
        const surveyRef = firestore.collection('surveys').doc(id);
        const surveySnapshot = await surveyRef.get();
        this.setState({
            survey : surveySnapshot.data(),
            isLoading : false
        })
    }

    render() {
        return (
            <div className="survey-page-container">
                {
                    this.state.isLoading ? <Loader text = 'Preparing the survey' /> : null
                }
                <div className="survey-page-inner">
                    <div className="size28 d-flex align-items-center main-heading">{this.state.survey.title} | <span className='ml-4 size13'>by {this.state.survey.byUser}</span></div>
                    {
                        this.state.survey.questions ? 
                            this.state.survey.questions.map(question => {
                                return (
                                    <h1>{question.statement}</h1>
                                )
                            })
                        : null
                    }
                </div>
            </div>
        )
    }
}

export default withRouter(SurveyPage);