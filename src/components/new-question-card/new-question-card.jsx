import React from 'react';

import './new-question-card-styles.scss';

class NewQuestionCard extends React.Component {

    state = {
        optCount : 2,
        isFormReadOnly : false
    }

    
    setOptCount = () => {
        const count = document.getElementById('opt-count').value;
        this.setState({
            optCount : count
        })
    }

    addQuestion = () => { 
        const qCard = document.getElementById(this.props.cardID);
        const questionTitle = qCard.firstChild.value.trim();
        if(questionTitle === "") 
            return alert("A question must have a title");
        const options = document.querySelectorAll(`#${this.props.cardID} .option`);
        let optionsArray = [];
        options.forEach(option => {
            const optVal = option.value.trim();
            if(optVal) optionsArray.push(optVal);
        })
        if(optionsArray.length < 2)
            return alert("A question must have at least 2 valid options");
        const question = {
            title : questionTitle,
            options : optionsArray
        }
        this.renderFormReadonly();
        this.props.addQuestionToState(question);
    }

    renderFormReadonly = () => {
        document.querySelector(`#${this.props.cardID} .btn`).remove();
        document.querySelector(`#${this.props.cardID}`).firstChild.nextSibling.remove();
        this.setState({
            isFormReadOnly : true
        })
    }

    render() {

        let optionsGroup = [];
        for(let i = 1; i <= this.state.optCount; i++) {
            optionsGroup.push(
                <input 
                    readOnly={this.state.isFormReadOnly} 
                    className={`${this.state.isFormReadOnly ? `opt-final` : null} input option`} 
                    placeholder={`Enter option ${i}`}
                />
            )
        }

        return (
            <div id={this.props.cardID} className="new-question-card">
                <input 
                    readOnly={this.state.isFormReadOnly} 
                    className='input my-0 input-borderless size19' 
                    type="text" 
                    placeholder="Type your question here"
                />
                <div className='d-flex align-items-center px-3'>
                    <label className='pt-2 mr-4 size12'>Select number of options : </label>
                    <input 
                        readOnly={this.state.isFormReadOnly} 
                        min="2" 
                        id='opt-count' 
                        onChange={this.setOptCount} 
                        style={{width : "70px"}} 
                        type="number" 
                        className='input input-borderless' 
                        placeholder="Select number of options" 
                        defaultValue="2"
                    />
                </div>
                <div className="options-group">
                    {optionsGroup}
                </div>
                <div onClick={this.addQuestion} className='d-flex justify-content-end'>
                    <button style={{width : "200px"}} className='mr-5 mt-4 mb-3 btn'>Add question</button>
                </div>
            </div>
        )
    }
}

export default NewQuestionCard;