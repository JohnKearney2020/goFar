import React from 'react';
import { Col, Row } from 'react-bootstrap';
// import products from '../products.js';
import products from '../products2.js';
import ProductCard from '../components/ProductCard';

import './HomeScreen.css';

const HomeScreen = () => {
  return (
    <>
      <h1>Latest Products</h1>
      <Row>
        {products.map(product => (
          <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
            <ProductCard product={product}/>
          </Col>
        ))}
      </Row>
      {/* <h6 id="testPrice" className='text-danger font-weight-bold'>$79.99 - $99.99</h6> */}
    </>
  )
}

export default HomeScreen;
