import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Loader from '../../components/loader/loader.component'
import { firestore } from '../../firebase/firebase.utils';
import SurveyCard from '../../components/surveycard/survey-card-component';
import { setSurveys, filterSurveysByTopic, resetFilters, sortSurveys, filterAttempted } from '../../redux/surveys/surveys-actions';
import FilterDialogue from '../../components/filterDialogue/filter-dialogue-component';

class Main extends React.Component {

    state = {
        isLoading : true,
        showFilterDialogue : false,
        filterTopic : null,
        filterTopic1 : null
    }

    async componentDidMount() {
        await this.getSurveys();
    }

    displayFilterDialogue = () => {
        this.setState({
            showFilterDialogue: true
        })
    }

    hideFilterDialogue = () => {
        this.setState({
            showFilterDialogue: false
        })
    }

    filterSurveys = topic => {
        this.props.filterSurveysByTopic(topic);
        this.setState({
            filterTopic : topic
        })
        this.hideFilterDialogue();
    }

    filterSurveysOnAttemptStatus = bool => {
        this.props.filterByAttemptStatus({
            user : this.props.user.currentUser,
            attempted : bool,
            topic : this.state.filterTopic
        })
        let msg = '';
        if(bool) msg += 'Attempted/Owned';
        else msg += 'Unattempted';
        this.setState({
            filterTopic1 : msg
        })
    }

    getSurveys = async () => {
        let surveyRef;
        if(this.props.active)
            surveyRef = firestore.collection('surveys').where('archived', "==", false).orderBy('responses', 'desc');
        else 
            surveyRef = firestore.collection('surveys').where('archived', "==", true).orderBy('responses', 'desc');
        surveyRef.onSnapshot(snapshot => {
            let surveys = [];
            snapshot.docs.forEach(survey => {
                let surveyData = {id : survey.id, ...survey.data()}
                surveys.push(surveyData);
            })
            this.props.setSurveysToState(surveys);
            this.setState({
                isLoading : false
            })
        })
    }

    render() {

        const topics = {
            "business" :  "Business",
            "curAffairs" : "Current Affairs",
            "education" : "Education",
            "health" : "Health",
            "movies" : "Movies",
            "music" : "Music",
            "politics" : "Politics",
            "science" : "Science",
            "sports" : "Sports",
            "worldNews" : "World News",
            "others" : "Others"
        }

        let filterMessage = '';
        if(this.state.filterTopic && this.state.filterTopic1)
            filterMessage = 'Filters Applied : ' + topics[this.state.filterTopic] + ', ' + this.state.filterTopic1;
        else if(this.state.filterTopic1)
            filterMessage = 'Filters Applied : ' + this.state.filterTopic1;
        else if(this.state.filterTopic)
            filterMessage = 'Filters Applied : ' + topics[this.state.filterTopic];

        if(this.state.isLoading) {
            return (
                <div className="page-containee">
                    <Loader text='Fetching surveys'/> 
                </div>
            )
        }
        else {
            return (
                <div className="page-container">
                    {
                        this.state.showFilterDialogue ? <FilterDialogue hide={this.hideFilterDialogue} filter={this.filterSurveys} /> : null
                    }
                    <div className="page-inner">
                        <div className="mb-0 d-flex justify-content-between align-items-center">
                            <h1 className='main-heading size30'>Active surveys</h1>
                            <button onClick = {() => {
                                this.props.history.push('/surveys/addnew')
                            }} className='mb-4 btn'>Create your own</button>
                        </div>
                        <hr className='mb-4 mt-0' />
                        <Row id="sorting-links" className='mb-1'>
                            <Col className='d-flex flex-column justify-content-end' sm={6}>
                                <p className='mb-1'>Sort by name : 
                                    <span style={{cursor: "pointer"}} className='mx-2' onClick={() => {
                                        this.props.sortSurveys({key: "title", inc: true});
                                    }}>
                                        <i className="ml-1 fas fa-sort-alpha-down"></i>
                                    </span> 
                                    <span style={{cursor: "pointer"}} onClick={() => {
                                        this.props.sortSurveys({key: "title", inc: false});
                                    }}>
                                        <i className="ml-1 fas fa-sort-alpha-down-alt"></i>
                                    </span> 
                                </p>
                                <p className='mb-1'>Sort by responses : 
                                    <span style={{cursor: "pointer"}} className='mx-2' onClick={() => {
                                        this.props.sortSurveys({key: "responses", inc: true});
                                    }}>
                                        <i className="ml-1 fas fa-sort-numeric-down"></i>
                                    </span> 
                                    <span style={{cursor: "pointer"}} onClick={() => {
                                        this.props.sortSurveys({key: "responses", inc: false});
                                    }}>
                                        <i className="ml-1 fas fa-sort-numeric-down-alt"></i>
                                    </span>
                                </p>
                                <p style={{cursor : "pointer"}} onClick = {
                                    () => {
                                        this.filterSurveysOnAttemptStatus(false);
                                    }
                                }>Display unattempted surveys<i className="fas mx-2 fa-filter"></i></p>
                            </Col>
    
                            <Col sm={6} className='text-sm-right'>
                                <p className='mb-1' onClick={this.displayFilterDialogue} style={{cursor : "pointer"}}><i className="fas mr-2 fa-filter"></i>Filter by topic</p>
                                <p className='mb-1' onClick={() => {
                                    this.props.resetFilters();
                                    this.setState({
                                        filterTopic : null,
                                        filterTopic1 : null
                                    })
                                }} style={{cursor: "pointer"}}><i className="fas mr-2 fa-sync"></i>Reset filters</p>
                                <p className='mb-1' style={{cursor : "pointer"}} onClick = {
                                    () => {
                                        this.filterSurveysOnAttemptStatus(true);
                                    }
                                }><i className="fas mr-2 fa-clipboard-check"></i>Display filled/owned surveys</p>
                            </Col>
                        </Row>
                        {
                            <div className='text-danger mb-3 text-right'>{filterMessage}</div>
                        }
                        {
                            (this.props.surveys.surveysToDisplay.length === 0) ? <h1 className='text-center mt-5 size20'>Sorry, no surveys to display at the moment</h1> : null
                        }
                        <Row className="surveys-container">
                            {
                                this.props.surveys.surveysToDisplay.map((survey, idx) => {
                                    return (
                                        <Col key={survey.id} sm={12}>
                                            <SurveyCard align={ idx%2===0 ? 'right' : 'left'} key={survey.id} id={survey.id} survey={survey}/>
                                        </Col>
                                    )
                                })
                            }
                        </Row>
                    </div>
                </div>
            )
        }   
    }
}

const mapStateToProps = state => ({
    surveys : state.surveys,
    user : state.users
});

const mapDispatchToProps = dispatch => ({
    setSurveysToState : surveys => dispatch(setSurveys(surveys)),
    filterSurveysByTopic : topic => dispatch(filterSurveysByTopic(topic)),
    resetFilters : () => dispatch(resetFilters()),
    sortSurveys : params => dispatch(sortSurveys(params)),
    filterByAttemptStatus : params => dispatch(filterAttempted(params))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));