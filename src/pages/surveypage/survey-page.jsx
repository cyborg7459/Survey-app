import React from 'react';
import { withRouter } from 'react-router-dom';

import './survey-styles.scss';
import Loader from '../../components/loader/loader.component';
import { firestore } from '../../firebase/firebase.utils';
import QuestionCard from '../question-card/question-card-component';

class SurveyPage extends React.Component {

    state = {
        isLoading : true,
        loaderText : 'Preparing the survey',
        surveyDetails : {}
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
        this.setState({
            surveyDetails : surveySnapshot.data(),
            loaderText : 'Fetching questions'
        })
        const questions = this.buildQuestionsArray(questionsRef , questionsSnapshot.docs);
        setTimeout(() => {
            this.setState({
                surveyQuestions : questions,
                isLoading : false
            })
        }, 1000)
    }

    buildQuestionsArray = (questionsRef, questions) => {
        let questionsArray = [];
        questions.map(async question => {
            let curQuestion = question.data();
            curQuestion.id = question.id;
            const optionsRef = questionsRef.doc(question.id).collection('options');
            const optionsSnapshot = await optionsRef.get();
            let options = [];
            optionsSnapshot.docs.map(option => {
                const optionDetails = option.data();
                optionDetails.id = option.id;
                options.push(optionDetails);
            })
            curQuestion.options = options;
            questionsArray.push(curQuestion);
        })
        return questionsArray;
    }

    render() {
        if(this.state.isLoading) {
            return (
                <div className="survey-page-container">
                    {
                        this.state.isLoading ? <Loader text = {this.state.loaderText} /> : null
                    }
                </div>
            )
        }
        else {
            return (
                <div className="survey-page-container">
                    <div className="survey-page-inner">
                        <div className="size28 d-flex align-items-center main-heading">{this.state.surveyDetails.title} | <span className='ml-4 size13'>by {this.state.surveyDetails.byUser}</span></div>
                        {
                            this.state.surveyQuestions.map(surveyQuestion => {
                                return (
                                    <QuestionCard key = {surveyQuestion.id} question = {surveyQuestion}></QuestionCard>
                                )
                            })
                        }
                    </div>
                </div>
            )
        }
        
    }
}

export default withRouter(SurveyPage);