import React from 'react';
import { Switch, Route } from 'react-router-dom';

import './font-sizes.css';
import Header from './components/header/header-component';
import Homepage from './pages/homepage/hompage';
import LoginPage from './pages/login/login-page';
import RegisterPage from './pages/register/registerpage';

class App extends React.Component {
  render() {
    return (
      <div className='app'>
        <Header />
        <Switch>
          <Route exact path="/" component={Homepage}/>
          <Route exact path='/login' component={LoginPage} />
          <Route exact path='/register' component={RegisterPage} />
        </Switch>
      </div>
    )
  }
}

export default App;
