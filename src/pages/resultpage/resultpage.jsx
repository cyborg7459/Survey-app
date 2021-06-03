import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import ResultCard from '../../components/resultcard/result-card';
import Loader from '../../components/loader/loader.component';
import { firestore } from '../../firebase/firebase.utils';

class ResultPage extends React.Component {

    state = {
        isLoading : true,
        data : {},
        ownerID : null, 
        surveyID : null,
        loaderMessage : "Fetching survey results"
    }

    async componentDidMount() {
        const surveyData = await this.getSurveyData();
        this.setState({
            ...this.state,
            data : {...this.state.data, ...surveyData}
        }, () => {
            setTimeout(() => {
                this.setState({
                    isLoading : false
                })
            }, 1000);
        });
    }

    deleteSurvey = async () => {
        this.setState({
            loaderMessage : "Deleting survey",
            isLoading : true
        })
        const surveyRef = firestore.collection('surveys').doc(this.state.surveyID);
        await surveyRef.delete();
        this.setState({
            loaderMessage : "Fetching survey results",
            isLoading : false
        })
        this.props.history.push('/surveys');
    }

    getSurveyData = async () => {
        const surveyID = this.props.match.params.id;
        const surveyRef = firestore.collection('surveys').doc(surveyID);
        const surveySnap = await surveyRef.get();
        if(!surveySnap.exists) {
            return this.props.history.push('/error');
        }
        this.setState({
            ownerID : surveySnap.data().ownerID,
            surveyID : surveyRef.id
        })
        const questionsRef = surveyRef.collection('questions');
        let questions = [];
        const questionsSnap = await questionsRef.get();
        questionsSnap.docs.map(async question => {
            let curQuestion = {};
            curQuestion.title = question.data().title;
            const optionsSnap = await questionsRef.doc(question.id).collection('options').get();
            let options = [];
            optionsSnap.docs.forEach(option => {
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
                <Loader text = {this.state.loaderMessage}/>
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
                            this.state.ownerID === this.props.user.currentUser.id 
                            ? 
                            <div onClick={this.deleteSurvey} style={{marginLeft : "0px", width : "300px", marginTop : "25px"}} className='btn-red btn-outline'>Delete survey</div>
                            : null
                        }
                        {
                            this.state.data.questions.map((dataPoint,idx) => {
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

const mapStateToProps = state => ({
    user : state.users
})

export default withRouter(connect(mapStateToProps)(ResultPage));