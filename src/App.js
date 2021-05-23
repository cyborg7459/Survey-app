import React from 'react';
import { connect } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';

import './font-sizes.css';
import Header from './components/header/header-component';
import Homepage from './pages/homepage/hompage';
import Main from './pages/mainpage/main';
import SurveyPage from './pages/surveypage/survey-page';
import ResultPage from './pages/resultpage/resultpage';
import NewSurveyPage from './pages/newsurveypage/new-survey-page';
import ErrorPage from './pages/errorpage/errorpage-component';
import GoogleAuth from './pages/googleAuth/googleAuth.component';
import ProfilePage from './pages/profilepage/profilepage';

class App extends React.Component {
  render() {
    return (
      <div className='app'>
        <Header />
        <Switch>
          <Route exact path="/" render = {() => !this.props.user.currentUser ? (<Homepage/>) : (<Redirect to='/surveys'/>)}/>
          <Route exact path='/auth' render = {() => this.props.user.currentUser ? (<Redirect to = '/surveys' />) : (<GoogleAuth />)} />
          <Route exact path = '/surveys' render = {() => (<Redirect to = '/surveys/active' />)}></Route>
          <Route exact path = '/surveys/active' render = {() => this.props.user.currentUser ? (<Main active={true}/>) : (<Redirect to='/auth'/>)} />
          <Route exact path = '/surveys/archived' render = {() => this.props.user.currentUser ? (<Main active={false}/>) : (<Redirect to='/auth'/>)} />
          <Route exact path = '/surveys/addnew' render = {() => this.props.user.currentUser ? (<NewSurveyPage/>) : (<Redirect to='/auth'/>)} />
          <Route exact path = '/survey/:id' render = {() => this.props.user.currentUser ? (<SurveyPage/>) : (<Redirect to='/auth'/>)} />
          <Route exact path = '/survey/:id/results' render = {() => this.props.user.currentUser ? (<ResultPage />) : (<Redirect to='/auth'/>)} />
          <Route exact path = '/profile' render = {() => this.props.user.currentUser ? (<ProfilePage />) : (<Redirect to='/auth' />)} />
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
