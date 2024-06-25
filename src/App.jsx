import { useState } from 'react'

import './App.css'
import { useModes } from './contexts/context.jsx'
import Navbar from './components/Navbar/Navbar.jsx'
import styled from 'styled-components';
import Grid from './components/Grid/Grid.jsx';

function App() {
  console.log(useModes())

  return (
    <Container>
      <Navbar />
      <Grid />
    </Container>
  );
}

export default App

const Container = styled.div`
  min-height: 100vh;
  min-width: 100vw;
`
