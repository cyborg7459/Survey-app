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
                <NewQuestionCard key={i} cardID={`card-${i}`}/>
            )
        }

        return (
            <div className="page-container">
                <div className="page-inner">
                    <h1 className='main-heading'>Create your own survey</h1>
                    <h1 className='mb-5 size13'>Learn the world's views on topics that matter to you</h1>
                    {questionCards}
                    <button onClick={this.increaseQuestionCount} className='btn btn-block mt-5'>Add another question</button>
                    <button className='mb-5 btn btn-block mt-3'>Publish survey</button>
                </div>
            </div>
        )
    }
}

export default NewSurveyPage;