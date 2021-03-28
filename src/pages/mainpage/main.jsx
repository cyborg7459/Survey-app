import React from 'react';
import { Row, Col } from 'react-bootstrap';

import './main-styles.scss';
import { firestore } from '../../firebase/firebase.utils';
import SurveyCard from '../../components/survey-card/survey-card-component';

class Main extends React.Component {

    componentDidMount() {
        this.getSurveys();
    }

    getSurveys = async () => {
        const surveyRef = firestore.collection('surveys');
        const surveySanpshot = await surveyRef.get();
        return surveySanpshot.docs;
    }

    render() {
        return (
            <div className="main-page-container">
                <div className="main-page-inner">
                    <h1 className='main-heading'>Active surveys</h1>
                    <Row className="surveys-container">
                        {
                            this.getSurveys().map(survey => {
                                return (
                                    <SurveyCard />
                                )
                            })
                        }
                    </Row>
                </div>
            </div>
        )
    }
}

export default Main;