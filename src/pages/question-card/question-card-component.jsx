import React from 'react';

import './question-card-style.scss';

class QuestionCard extends React.Component {
    render() {
        return (
            <div className="question-card">
                <h4 className='m-0'>{this.props.question.title}</h4>
            </div>
        )
    }
}

export default QuestionCard;