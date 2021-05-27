import React from 'react';

import './filter-styles.scss';

class FilterDialogue extends React.Component {

    setFilter = () => {
        document.querySelectorAll('.filter-topic').forEach(radio => {
            if(radio.checked)
                this.props.filter(radio.getAttribute('value'));
        })
    }

    render() {
        return (
            <div className="black-overlay">
                <div id="filter-dialgue">
                    <div id="heading" className='mb-4'>
                        <h3 className='my-0'>Select topic</h3>
                        <span onClick={this.props.hide} style={{cursor: "pointer"}} className='size20'>&times;</span>
                    </div>
                    <div id="filter-topics">
                        <input name='topic' value="sports" className='filter-topic mr-3' type="radio" /> Sports
                        <br />
                        <input name='topic' value="education" className='filter-topic mr-3' type="radio" /> Education
                        <br />
                        <input name='topic' value="politics" className='filter-topic mr-3' type="radio" /> Politics
                        <br />
                        <input name='topic' value="movies" className='filter-topic mr-3' type="radio" /> Movies
                        <br />
                        <input name='topic' value="business" className='filter-topic mr-3' type="radio" /> Business
                        <br />
                        <input name='topic' value="science" className='filter-topic mr-3' type="radio" /> Science
                        <br />
                        <input name='topic' value="curAffairs" className='filter-topic mr-3' type="radio" /> Current Affairs
                        <br />
                        <input name='topic' value="health" className='filter-topic mr-3' type="radio" /> Health
                        <br />
                        <input name='topic' value="music" className='filter-topic mr-3' type="radio" /> Music
                        <br />
                        <input name='topic' value="worldNews" className='filter-topic mr-3' type="radio" /> World News
                        <br />
                        <input name='topic' value="others" className='filter-topic mr-3' type="radio" /> Other
                        <br />
                    </div>
                    <div onClick={this.setFilter} style={{width : "100%", margin: "0px"}} className='btn-outline btn-blue mt-4'>Apply Filter</div>
                </div>
            </div>
        )
    }
}

export default FilterDialogue;