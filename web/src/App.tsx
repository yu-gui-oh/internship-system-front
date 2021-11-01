import React from 'react';
import './App.css';

import Routes from './routes';

import StandardContainer from './components/StandardContainer';

import { BrowserRouter as Router } from 'react-router-dom';

function App() {
  return (
        <Router>
          <StandardContainer />
          <Routes />
        </Router>
  );
}

export default App;
