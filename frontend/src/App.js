import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';

import Header from './components/Header';
import Footer from './components/Footer';
import HomeScreen from './screens/HomeScreen';

const App = () => {
  return (
    <Router>
      <Header />
      <main className='pt-3 pb-5'>
        <Container>
            <Route path='/' component={HomeScreen} exact/>
        </Container>
      </main>
      <Footer />
    </Router>
  )
}

export default App;