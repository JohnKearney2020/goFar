import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Header from './components/HeaderAndFooter/Header';
import Footer from './components/HeaderAndFooter/Footer';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen';
import WishListScreen from './screens/WishListScreen';
import CartScreen from './screens/CartScreen';
import TestScreen from './screens/TestScreen';
import CheckoutScreen from './screens/CheckoutScreen';


const App = () => {
  return (
    <Router>
      <Header />
      <main className='pt-3'>
        <Container>
          <Route path='/login' component={LoginScreen} />
          <Route path='/register' component={RegisterScreen} />
          <Route path='/profile' component={ProfileScreen} />
          <Route path='/wishlist' component={WishListScreen} />
          <Route path='/test' component={TestScreen} />
          <Route path='/checkout' component={CheckoutScreen} />
          <Route path='/cart' component={CartScreen} />
          <Route path='/product/:id/:color' component={ProductScreen} />
          <Route path='/search/:keyword' component={HomeScreen} />
          <Route path='/' component={HomeScreen} exact/>
        </Container>
      </main>
      <Footer />
      <ToastContainer />
    </Router>
  )
}

export default App;