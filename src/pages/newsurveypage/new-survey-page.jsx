import React from 'react';
import NewQuestionCard from '../../components/new-question-card/new-question-card';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { firestore } from '../../firebase/firebase.utils';
import Loader from '../../components/loader/loader.component';

class NewSurveyPage extends React.Component {

    state = {
        questionCount : 1,
        questions : [],
        isLoading : false
    }

    addQuestionToState = question => {
        this.setState({
            questions : [...this.state.questions, question]
        })
    };

    increaseQuestionCount = () => {
        this.setState({
            questionCount : this.state.questionCount + 1
        });
    }

    handleFormSubmit = async () => { 
        const title = document.getElementById('surveyName').value.trim();
        const description = document.getElementById('surveyDesc').value.trim();
        const questions = this.state.questions;
        if(!title) 
            return alert("Please enter a title for the survey");
        else if(!description) 
            return alert("Please add a description for the survey");
        else if(questions.length === 0)
            return alert("There must be at least one question in the survey"); 
        this.setState({
            isLoading : true
        });
        const survey = {
            byUser : this.props.user.name,
            responses : 0,
            title,
            description,
        }
        await this.generateSurveyInDatabase(survey, questions);
        this.props.history.push('/');
    }

    generateSurveyInDatabase = async (survey, questions) => {
        const surveyCollectionRef = firestore.collection('surveys');
        const newSurveyRef = surveyCollectionRef.doc();
        await newSurveyRef.set(survey);
        const questionsRef = surveyCollectionRef.doc(newSurveyRef.id).collection('questions');
        questions.forEach(async question => {
            const newQuestionRef = questionsRef.doc();
            await newQuestionRef.set({
                title : question.title
            });
            const optionsRef = questionsRef.doc(newQuestionRef.id).collection('options');
            question.options.forEach(async option => {
                const newOptionRef = optionsRef.doc();
                await newOptionRef.set({
                    optionVal : option,
                    votes : 0
                })
            })
        })
    }

    render() {
        
        const questionCards = [];
        for(let i = 0; i < this.state.questionCount; i++) {
            questionCards.push(
                <NewQuestionCard 
                    key={i} 
                    cardID={`card-${i}`} 
                    addQuestionToState = {this.addQuestionToState}
                />
            )
        }

        return (
            <div className="page-container">
                {
                    this.state.isLoading ? <Loader text = "Publishing your survey !!! Hang in tight" /> : null
                }
                <div className="page-inner">
                    <h1 className='main-heading'>Create your own survey</h1>
                    <h1 className='mb-5 size13'>Learn the world's views on topics that matter to you</h1>
                    <input 
                        required = "true"
                        type = "text"
                        id = "surveyName"
                        className = "input mb-5 size25 py-3 px-0"
                        placeholder = "Enter a title for your survey ..."
                        style = {{
                            backgroundColor : "#f9f9f9",
                            borderBottom : "none"
                        }}
                    />
                    <h1 className='size20 mb-2'>Survey Description</h1>
                    <textarea 
                        required = "true"
                        id = "surveyDesc"
                        className = "input"
                        style = {{
                            width : "100%",
                            border : "none",
                            boxShadow : "1px 2px 5px rgba(0,0,0,0.3)",
                            marginBottom : "50px",
                            borderRadius : "10px",
                            padding : "25px"
                        }}  
                        rows="5" 
                        placeholder = "Give a short description about your survey"
                    />
                    <h1 className='size20' style={{marginBottom : "-20px"}}>Survey Questions</h1>
                    {questionCards}
                    <button onClick={this.increaseQuestionCount} className='btn btn-block mt-5'>Add another question</button>
                    <button onClick={this.handleFormSubmit} className='mb-5 btn btn-block mt-3'>Publish survey</button>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    user : state.users.currentUser
});

export default withRouter(connect(mapStateToProps)(NewSurveyPage));