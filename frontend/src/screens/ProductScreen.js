import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Image, ListGroup, Card, Button } from 'react-bootstrap';
import Rating from '../components/ProductRating';
import products from '../products2';

const ProductScreen = ({ match }) => {
  const product = products.find((p)=> p._id === match.params.id);
  console.log(product)
  return (
    <>
      <Row>
        <Col md={6}>
          <Image src={product.images[0].source} fluid/>
        </Col>
        <Col md={6}>
          <p></p>
        </Col>
      </Row>
    </>
  )
}

export default ProductScreen;
