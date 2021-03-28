import React from 'react';
import { connect } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';

import './font-sizes.css';
import Header from './components/header/header-component';
import Homepage from './pages/homepage/hompage';
import LoginPage from './pages/login/login-page';
import RegisterPage from './pages/register/registerpage';
import Main from './pages/mainpage/main';

class App extends React.Component {
  render() {
    return (
      <div className='app'>
        <Header />
        <Switch>
          <Route exact path="/" render = {() => !this.props.user.currentUser ? (<Homepage/>) : (<Redirect to='/surveys'/>)}/>
          <Route exact path='/login' render = {() => !this.props.user.currentUser ? (<LoginPage/>) : (<Redirect to='/surveys'/>)} />
          <Route exact path='/register' render = {() => !this.props.user.currentUser ? (<RegisterPage/>) : (<Redirect to='/surveys'/>)} />
          <Route exact path = '/surveys' render = {() => this.props.user.currentUser ? (<Main/>) : (<Redirect to='/'/>)} />
        </Switch>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  user : state.users
});

export default connect(mapStateToProps)(App);
