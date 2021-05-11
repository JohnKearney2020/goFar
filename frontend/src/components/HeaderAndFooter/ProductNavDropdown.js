import React, { useEffect, useRef } from 'react';
import { Container, Col, ListGroup, Card, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import './ProductNavDropdown.css';
import ProductDropdownCard from './ProductDropdownCard';

const ProductNavDropdown = ({ show, productsClickHandler }) => {
  const node = useRef();

  useEffect(() => {

    const handleClickOutside = (e) => {
      console.log("clicking anywhere");
      if (node.current.contains(e.target)) {
        // inside click
        return;
      }
      // outside click
      productsClickHandler();
    };

    if (show) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [show, productsClickHandler]);

  
  return (
    <div ref={node} id='bigNavDropDown' className={`p-2 ${show && 'productNavFadeIn'}`}>
      <hr />
      <Container>
        <Row>
          <Col md={6} lg={3}>
            <ProductDropdownCard productsClickHandler={productsClickHandler} title='Camping' navCategories={['Tents', 'Footprints', 'Sleeping Bags']}/>
          </Col>
          <Col md={6} lg={3}>
            <ProductDropdownCard productsClickHandler={productsClickHandler} title='Women' navCategories={['Leggings', 'Pants']}/>
          </Col>
          <Col md={6} lg={3}>
            <ProductDropdownCard productsClickHandler={productsClickHandler} title='Men' navCategories={['Jackets', 'Shirts', 'Tees', 'Graphic Tees']}/>
          </Col>
          <Col md={6} lg={3}>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default ProductNavDropdown;
