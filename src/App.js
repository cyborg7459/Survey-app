import React from 'react';
import './font-sizes.css';

import Header from './components/header/header-component';

class App extends React.Component {
  render() {
    return (
      <div className='app'>
        <Header />
      </div>
    )
  }
}

export default App;
