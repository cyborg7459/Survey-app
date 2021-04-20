import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Row, Col } from 'react-bootstrap';

import Loader from '../../components/loader/loader.component';
import { firestore } from '../../firebase/firebase.utils';
import QuestionCard from '../../components/question-card/question-card-component';
import { addFilledSurvey } from '../../redux/users/user-actions';

class SurveyPage extends React.Component {

    state = {
        isLoading : true,
        loaderText : 'Preparing the survey',
        surveyDetails : {},
        surveyResponses : {}
    }

    componentDidMount() {
        this.fetchSurvey(this.props.match.params.id);
        this.setState({
            surveyID : this.props.match.params.id
        })
    }

    setSurveyResponse = (questionID, answerID) => {
        let surveyResponses = this.state.surveyResponses;
        surveyResponses[questionID] = answerID;
        this.setState({
            surveyResponses
        });
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
            optionsSnapshot.docs.forEach(option => {
                const optionDetails = option.data();
                optionDetails.id = option.id;
                options.push(optionDetails);
            })
            curQuestion.options = options;
            questionsArray.push(curQuestion);
        })
        return questionsArray;
    }

    handleFormSubmit = async() => {
        const surveyResponses = this.state.surveyResponses;
        const len1 = Object.values(surveyResponses).length;
        const len2 = Object.values(this.state.surveyQuestions).length;
        if(len1 !== len2)
            return alert("Kindly respond to all questions in the survey");
        const questions = Object.keys(surveyResponses);
        const responses = Object.values(surveyResponses);
        this.setState({
            loaderText : 'Submitting response, please wait',
            isLoading : true
        })
        for(let i = 0; i < questions.length; i++) {
            const qID = questions[i];
            const rID = responses[i];
            await this.updateDatabase(qID, rID);
        } 
        await this.updateUser();
        await this.updateSurvey();
        this.props.history.push(`${this.props.match.url}/results`);
    }

    updateDatabase = async (qID, rID) => {
        const optionRef = firestore.collection('surveys').doc(this.state.surveyID).collection('questions').doc(qID).collection('options').doc(rID);
        const optionSnap = await optionRef.get();
        const cur_val = optionSnap.data().votes;
        await optionRef.update({votes : cur_val+1});
    }

    updateUser = async () => {
        this.props.addFilledSurveyToUser(this.state.surveyID);
        const userRef = firestore.collection('users').doc(this.props.user.currentUser.id);
        const userSnap = await userRef.get();
        const userData = userSnap.data();
        await userRef.update({
            surveysFilled: [...userData.surveysFilled, this.state.surveyID]
        })
    }

    updateSurvey = async () => {
        const surveyRef = firestore.collection('surveys').doc(this.state.surveyID);
        const surveySnap = await surveyRef.get();
        const cur_resp = surveySnap.data().responses;
        await surveyRef.update({responses : cur_resp + 1});
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
                <div className="page-container">
                    <div className="page-inner">
                        <div className="size28 d-flex align-items-center main-heading">{this.state.surveyDetails.title} | <span className='ml-4 size13'>by {this.state.surveyDetails.byUser}</span></div>
                        <Row>
                            {
                                this.state.surveyQuestions.map(surveyQuestion => {
                                    return (
                                        <Col lg = {6}>
                                            <QuestionCard setSurveyResponse = {this.setSurveyResponse} key = {surveyQuestion.id} question = {surveyQuestion}></QuestionCard>
                                        </Col> 
                                    )
                                })
                            }
                        </Row>              
                        <button style={{marginBottom : "100px"}} onClick = {this.handleFormSubmit} className='btn btn-block size14 mt-5'>Submit Response</button>
                    </div>
                </div>
            )
        }
        
    }
}

const mapStateToProps = state => ({
    user : state.users
})

const mapDispatchToProps = disatch => ({
    addFilledSurveyToUser : id => disatch(addFilledSurvey(id))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SurveyPage));