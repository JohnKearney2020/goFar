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
      <hr id='productNavHR' className='mb-4'/>
      <Container>
        <Row>
          <Col md={6} lg={3}>
            <ProductDropdownCard productsClickHandler={productsClickHandler} title='Camping' navCategories={
              [
                {catName: 'Tents', gender: ''}, 
                {catName: 'Footprints', gender: ''}, 
                {catName: 'Sleeping Bags', gender: ''}
              ]}
            />
          </Col>
          <Col md={6} lg={3}>
            <ProductDropdownCard productsClickHandler={productsClickHandler} title='Women' navCategories={[
              {catName: 'Leggings', gender: 'women'}, 
              {catName: 'Pants', gender: 'women'},
              {catName: 'Shirts', gender: 'women'},
              {catName: 'Tees', gender: 'women'},
              {catName: 'Graphic Tees', gender: 'women'},
              ]}
            />
          </Col>
          <Col md={6} lg={3}>
            <ProductDropdownCard productsClickHandler={productsClickHandler} title='Men' navCategories={[
              {catName: 'Jackets', gender: 'men'}, 
              {catName: 'Shirts', gender: 'men'}, 
              {catName: 'Tees', gender: 'men'}, 
              {catName: 'Graphic Tees', gender: 'men'}]}/>
          </Col>
          <Col md={6} lg={3}>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default ProductNavDropdown;
