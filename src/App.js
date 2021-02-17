import React from 'react';
import Container from '@material-ui/core/Container';

import NavBar from './components/NavBar';
import Router from './Router';

import './App.css';

function App() {
  return (
    <Container>
      <NavBar />
      <Router />
    </Container>
  );
}

export default App;
