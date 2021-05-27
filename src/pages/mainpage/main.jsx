import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Loader from '../../components/loader/loader.component'
import { firestore } from '../../firebase/firebase.utils';
import SurveyCard from '../../components/surveycard/survey-card-component';
import { setSurveys, filterSurveysByTopic, resetFilters, sortSurveys } from '../../redux/surveys/surveys-actions';
import FilterDialogue from '../../components/filterDialogue/filter-dialogue-component';

class Main extends React.Component {

    state = {
        isLoading : true,
        showFilterDialogue : false
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
        this.hideFilterDialogue();
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
        return (
            <div className="page-container">
                {
                    this.state.isLoading ? <Loader text='Fetching surveys'/> : null
                }
                {
                    this.state.showFilterDialogue ? <FilterDialogue hide={this.hideFilterDialogue} filter={this.filterSurveys} /> : null
                }
                <div className="page-inner">
                    <div className="mb-5 d-flex justify-content-between align-items-center">
                        <h1 className='main-heading'>Active surveys</h1>
                        <button onClick = {() => {
                            this.props.history.push('/surveys/addnew')
                        }} className='mb-4 btn'>Create your own survey</button>
                    </div>
                    
                    <Row id="sorting-links" className='mb-4'>
                        <Col sm={6}>
                            <p className='mb-0'>Sort by name : 
                                <span style={{cursor: "pointer"}} className='mx-2' onClick={() => {
                                    this.props.sortSurveys({key: "title", inc: true});
                                }}>
                                    <i class="ml-1 fas fa-sort-alpha-down"></i>
                                </span> 
                                <span style={{cursor: "pointer"}} onClick={() => {
                                    this.props.sortSurveys({key: "title", inc: false});
                                }}>
                                    <i class="ml-1 fas fa-sort-alpha-down-alt"></i>
                                </span> 
                            </p>
                            <p>Sort by responses : 
                                <span style={{cursor: "pointer"}} className='mx-2' onClick={() => {
                                    this.props.sortSurveys({key: "responses", inc: true});
                                }}>
                                    <i class="ml-1 fas fa-sort-numeric-down"></i>
                                </span> 
                                <span style={{cursor: "pointer"}} onClick={() => {
                                    this.props.sortSurveys({key: "responses", inc: false});
                                }}>
                                    <i class="ml-1 fas fa-sort-numeric-down-alt"></i>
                                </span>
                            </p>
                        </Col>
                        <Col sm={6} className='text-sm-right'>
                            <p className='mb-0' onClick={this.displayFilterDialogue} style={{cursor : "pointer"}}><i className="fas mr-2 fa-filter"></i>Filter by topic</p>
                            <p onClick={this.props.resetFilters} style={{cursor: "pointer"}}><i className="fas mr-2 fa-sync"></i>Reset filters</p>
                        </Col>
                    </Row>
                       
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

const mapStateToProps = state => ({
    surveys : state.surveys
});

const mapDispatchToProps = dispatch => ({
    setSurveysToState : surveys => dispatch(setSurveys(surveys)),
    filterSurveysByTopic : topic => dispatch(filterSurveysByTopic(topic)),
    resetFilters : () => dispatch(resetFilters()),
    sortSurveys : params => dispatch(sortSurveys(params))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));