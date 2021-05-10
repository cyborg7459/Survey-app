import React from 'react';
import { connect } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';

import './font-sizes.css';
import Header from './components/header/header-component';
import Homepage from './pages/homepage/hompage';
import LoginPage from './pages/login/login-page';
import RegisterPage from './pages/register/registerpage';
import Main from './pages/mainpage/main';
import SurveyPage from './pages/surveypage/survey-page';
import ResultPage from './pages/resultpage/resultpage';
import NewSurveyPage from './pages/newsurveypage/new-survey-page';
import ErrorPage from './pages/errorpage/errorpage-component';

class App extends React.Component {
  render() {
    return (
      <div className='app'>
        <Header />
        <Switch>
          <Route exact path="/" render = {() => !this.props.user.currentUser ? (<Homepage/>) : (<Redirect to='/surveys'/>)}/>
          <Route exact path='/login' render = {() => !this.props.user.currentUser ? (<LoginPage/>) : (<Redirect to='/surveys'/>)} />
          <Route exact path='/register' render = {() => !this.props.user.currentUser ? (<RegisterPage/>) : (<Redirect to='/surveys'/>)} />
          <Route exact path = '/surveys' render = {() => this.props.user.currentUser ? (<Main/>) : (<Redirect to='/login'/>)} />
          <Route exact path = '/surveys/addnew' render = {() => this.props.user.currentUser ? (<NewSurveyPage/>) : (<Redirect to='/login'/>)} />
          <Route exact path = '/survey/:id' render = {() => this.props.user.currentUser ? (<SurveyPage/>) : (<Redirect to='/login'/>)} />
          <Route exact path = '/survey/:id/results' render = {() => this.props.user.currentUser ? (<ResultPage />) : (<Redirect to='/login'/>)} />
          <Route exact path = '/error' component = {ErrorPage} />
          <Route component={ErrorPage}/>
        </Switch>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  user : state.users
});

export default connect(mapStateToProps)(App);
