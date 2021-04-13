import React from 'react';

import './question-card-style.scss';

class QuestionCard extends React.Component {
    render() {
        return (
            <div className="question-card">
                <h3 className='text-center m-0 mb-3'>{this.props.question.title}</h3>
                {
                    this.props.question.options.map(option => {
                        return (
                            <div className="size13 btn option" key={option.id} id = {option.id}>
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