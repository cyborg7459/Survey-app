import React from 'react';
import { withRouter } from 'react-router-dom';

import './survey-styles.scss';
import Loader from '../../components/loader/loader.component';
import { firestore } from '../../firebase/firebase.utils';

class SurveyPage extends React.Component {

    state = {
        isLoading : true,
        surveyDetails : {},
        surveyQuestions : []
    }

    componentDidMount() {
        this.fetchSurvey(this.props.match.params.id);
        this.setState({
            surveyID : this.props.match.params.id
        })
    }

    fetchSurvey =  async id => {
        const surveyRef = firestore.collection('surveys').doc(id);
        const surveySnapshot = await surveyRef.get();
        const questionsRef = surveyRef.collection('questions');
        const questionsSnapshot = await questionsRef.get();
        let questions = [];
        questionsSnapshot.docs.map(question => {
            questions.push(question.id);
        })
        this.setState({
            surveyDetails : surveySnapshot.data(),
            surveyQuestions : questions,
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
                    <div className="size28 d-flex align-items-center main-heading">{this.state.surveyDetails.title} | <span className='ml-4 size13'>by {this.state.surveyDetails.byUser}</span></div>
                </div>
            </div>
        )
    }
}

export default withRouter(SurveyPage);