import React from 'react';

import './question-card-style.csss';

class QuestionCard extends React.Component {
    render() {
        return (
            <div className="question-card">
                <h1>{this.props.question.title}</h1>
            </div>
        )
    }
}

export default QuestionCard;