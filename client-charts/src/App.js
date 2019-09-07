import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Charts from './Charts';

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <Charts></Charts>
    );
  }
}

export default App;
