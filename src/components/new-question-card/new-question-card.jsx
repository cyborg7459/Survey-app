import React from 'react';

import './new-question-card-styles.scss';

class NewQuestionCard extends React.Component {

    state = {
        optCount : 1
    }

    
    setOptCount = () => {
        const count = document.getElementById('opt-count').value;
        this.setState({
            optCount : count
        })
    }

    render() {

        let optionsGroup = [];
        for(let i = 1; i <= this.state.optCount; i++) {
            optionsGroup.push(
                <input className='input' placeholder={`Enter option ${i}`}/>
            )
        }

        return (
            <div className="new-question-card">
                <input className='input input-borderless size19' type="text" placeholder="Type your question here"/>
                <div className='d-flex align-items-center px-3'>
                    <label className='pt-2 mr-4 size12'>Select number of options : </label>
                    <input min="1" id='opt-count' onChange={this.setOptCount} style={{width : "70px"}} type="number" className='input input-borderless' placeholder="Select number of options" defaultValue="1"/>
                </div>
                <div className="options-group">
                    {optionsGroup}
                </div>
            </div>
        )
    }
}

export default NewQuestionCard;