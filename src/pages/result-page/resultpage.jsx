import React from 'react';
import { withRouter } from 'react-router-dom';

import ResultCard from '../../components/result-card/result-card';
import Loader from '../../components/loader/loader.component';
import { firestore } from '../../firebase/firebase.utils';

class ResultPage extends React.Component {

    state = {
        isLoading : true,
        data : []
    }

    async componentDidMount() {
        const surveyData = await this.getSurveyData();
        this.setState({
            data : surveyData
        }, () => {
            setTimeout(() => {
                this.setState({
                isLoading : false
            }) }, 500);
        });
    }

    getSurveyData = async () => {
        const surveyID = this.props.match.params.id;
        const surveyRef = firestore.collection('surveys').doc(surveyID);
        const surveySnap = await surveyRef.get();
        if(!surveySnap.exists) {
            return this.props.history.push('/error');
        }
        const questionsRef = surveyRef.collection('questions');
        let questions = [];
        const questionsSnap = await questionsRef.get();
        questionsSnap.docs.map(async question => {
            let curQuestion = {};
            curQuestion.title = question.data().title;
            const optionsSnap = await questionsRef.doc(question.id).collection('options').get();
            let options = [];
            optionsSnap.docs.map(option => {
                options.push(option.data());
            })
            curQuestion.options = options;
            questions.push(curQuestion);
        })
        let data = surveySnap.data();
        data.questions = questions;
        return data;
    }

    render() {
        
        if(this.state.isLoading) {
            return (
                <Loader text = "Fetching survey results"/>
            )
        }

        else {
            return (
                <div className="page-container">
                    <div className="page-inner">
                        <h1 className='main-heading'>Results | {this.state.data.title}</h1>
                        <h5 className='text-muted'>by {this.state.data.byUser}</h5>
                        <h5>{this.state.data.responses} people filled this survey</h5>
                        {
                            this.state.data.questions.map((dataPoint,idx) => {
                                console.log("HEllo");
                                return (
                                    <ResultCard key={idx} data={dataPoint}/>
                                )
                            })
                        }
                    </div>
                </div>
            )
        }
        
    }
}

export default withRouter(ResultPage);