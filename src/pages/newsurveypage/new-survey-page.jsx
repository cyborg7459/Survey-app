import React from 'react';
import NewQuestionCard from '../../components/newquestioncard/new-question-card';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { firestore } from '../../firebase/firebase.utils';
import Loader from '../../components/loader/loader.component';
import { addOwnedSurvey } from '../../redux/users/user-actions';

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
        const selectedIndex = document.getElementById('survey-topic').selectedIndex;
        const selectedTopic = document.getElementById('survey-topic').options[selectedIndex].value;

        if(!title) 
            return alert("Please enter a title for the survey");
        else if(selectedIndex === 0)
            return alert("Please select a topic for the survey");
        else if(!description) 
            return alert("Please add a description for the survey");
        else if(questions.length === 0)
            return alert("There must be at least one question in the survey"); 
        this.setState({
            isLoading : true
        });
        const survey = {
            byUser : this.props.user.name,
            ownerID : this.props.user.id,
            responses : 0,
            archived : false,
            title,
            description,
            topic : selectedTopic
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
        await this.updateUser(newSurveyRef.id);
    }

    updateUser = async (surveyID) => {
        this.props.addOwnedSurvey(surveyID);
        const userRef = firestore.collection('users').doc(this.props.user.id);
        const userSnap = await userRef.get();
        const userData = userSnap.data();
        await userRef.update({
            surveysOwned: [...userData.surveysOwned, surveyID]
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
                    <h1 className='mb-4 size14'>Learn the world's views on topics that matter to you</h1>
                    <input 
                        required = {true}
                        type = "text"
                        id = "surveyName"
                        className = "input mb-1 size17 py-3 px-0"
                        placeholder = "Enter a title for your survey ..."
                        style = {{
                            borderBottom : "none"
                        }}
                    />

                    <select className='input mb-5 px-0' name="survey-topic" id="survey-topic">
                        <option className='text-muted' value={null}>Select a topic for the survey ...</option>
                        <option value="sports">Sports</option>
                        <option value="education">Education</option>
                        <option value="politics">Politics</option>
                        <option value="movies">Movies</option>
                        <option value="business">Business</option>
                        <option value="science">Science</option>
                        <option value="curAffairs">Current Affairs</option>
                        <option value="health">Health</option>
                        <option value="music">Music</option>
                        <option value="worldNews">World News</option>
                        <option value="others">Other</option>
                    </select>

                    <h1 style={{fontWeight: "400"}} className='size13 mb-2'>Survey Description</h1>
                    <textarea 
                        required = {true}
                        id = "surveyDesc"
                        className = "input"
                        style = {{
                            width : "100%",
                            border : "none",
                            boxShadow : "1px 2px 8px rgba(0,0,0,0.15)",
                            marginBottom : "50px",
                            borderRadius : "10px",
                            padding : "25px"
                        }}  
                        rows="5" 
                        placeholder = "Give a short description about your survey"
                    />
                    
                    <h1  className='size13' style={{fontWeight: "400", marginBottom : "-20px"}}>Survey Questions</h1>
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

const mapDispatchToProps = dispatch => ({
    addOwnedSurvey : id => dispatch(addOwnedSurvey(id))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NewSurveyPage));