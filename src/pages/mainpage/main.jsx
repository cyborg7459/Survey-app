import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';

import Loader from '../../components/loader/loader.component'
import { firestore } from '../../firebase/firebase.utils';
import SurveyCard from '../../components/survey-card/survey-card-component';
import { setSurveys } from '../../redux/surveys/surveys-actions';

class Main extends React.Component {

    state = {
        isLoading : true
    }

    componentDidMount() {
        this.getSurveys();
    }

    getSurveys = async () => {
        const surveyRef = firestore.collection('surveys').orderBy('responses', 'desc');
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
                <div className="page-inner">
                    <h1 className='mb-5 main-heading'>Active surveys</h1>
                    <Row className="surveys-container">
                        {
                            this.props.surveys.surveys.map(survey => {
                                return (
                                    <Col xl={4} md={6}>
                                        <SurveyCard key={survey.id} id={survey.id} survey={survey}/>
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
    setSurveysToState : surveys => dispatch(setSurveys(surveys))
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);