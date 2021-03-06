import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';

import Header from './components/HeaderAndFooter/Header';
import Footer from './components/HeaderAndFooter/Footer';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';


const App = () => {
  return (
    <Router>
      <Header />
      <main className='pt-3'>
        <Container>
          <Route path='/login' component={LoginScreen} />
          <Route path='/register' component={RegisterScreen} />
          <Route path='/product/:id/:color' component={ProductScreen} />
          <Route path='/' component={HomeScreen} exact/>
        </Container>
      </main>
      <Footer />
    </Router>
  )
}

export default App;