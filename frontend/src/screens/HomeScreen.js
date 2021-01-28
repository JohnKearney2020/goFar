import React from 'react';
import { Col, Row } from 'react-bootstrap';
import products from '../products.js';
import ProductCard from '../components/ProductCard';

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
    </>
  )
}

export default HomeScreen;
