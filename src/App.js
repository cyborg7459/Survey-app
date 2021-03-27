import React from 'react';
import { Switch, Route } from 'react-router-dom';

import './font-sizes.css';
import Header from './components/header/header-component';
import Homepage from './pages/homepage/hompage';

class App extends React.Component {
  render() {
    return (
      <div className='app'>
        <Header />
        <Switch>
          <Route exact path="/" component={Homepage}/>
        </Switch>
      </div>
    )
  }
}

export default App;
