import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';

import Header from './components/HeaderAndFooter/Header';
import Footer from './components/HeaderAndFooter/Footer';
import HomeScreen from './screens/HomeScreen';
// import ProductScreen from './screens/ProductScreen';
// import ProductScreenTest from './screens/ProductScreenTest';
import ProductScreenTest2 from './screens/ProductScreenTest2';
// import ProductScreenTest3 from './screens/ProductScreenTest3';

const App = () => {
  return (
    <Router>
      <Header />
      <main className='pt-3 pb-5'>
        <Container>
            <Route path='/' component={HomeScreen} exact/>
            {/* <Route path='/product/:id' component={ProductScreen} /> */}
            {/* <Route path='/product/:id/:color' component={ProductScreen} /> */}
            <Route path='/product/:id/:color' component={ProductScreenTest2} />
            {/* <Route path='/product/:id/:color' component={ProductScreenTest3} /> */}
            {/* <Route path='/product/:id/:color' component={ProductScreenTest} /> */}
            {/* <Route path='/product/?id=:id' component={ProductScreen} /> */}
            {/* <Route path='/api/product/?id=:id&color=:color' component={ProductScreen} /> */}
        </Container>
      </main>
      <Footer />
    </Router>
  )
}

export default App;