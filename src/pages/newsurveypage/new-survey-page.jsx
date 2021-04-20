import React from 'react';
import NewQuestionCard from '../../components/new-question-card/new-question-card';

class NewSurveyPage extends React.Component {

    state = {
        questionCount : 1,
        questions : []
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
                    <button className='mb-5 btn btn-block mt-3'>Publish survey</button>
                </div>
            </div>
        )
    }
}

export default NewSurveyPage;