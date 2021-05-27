import React from 'react';

import './question-card-style.scss';

class QuestionCard extends React.Component {

    sendResponseToState = e => {
        this.selectOption(e);
        const questionID = this.props.question.id;
        const optionID = e.target.id;
        this.props.setSurveyResponse(questionID, optionID);
    }

    selectOption = (e) => {
        let options = document.querySelectorAll(`.option-${this.props.question.id}`);
        options.forEach(option => {
            option.classList.remove('selected');
        })
        e.target.classList.add('selected');
    }

    render() {
        return (
            <div className="question-card">
                <h3 className='text-center m-0 mb-3'>{this.props.question.title}</h3>
                {
                    this.props.question.options.map(option => {
                        return (
                            <div onClick={(e) => {
                                this.sendResponseToState(e)
                            }} className={`size13 option option-${this.props.question.id}`} key={option.id} id = {option.id}>
                                {option.optionVal}
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}

export default QuestionCard;