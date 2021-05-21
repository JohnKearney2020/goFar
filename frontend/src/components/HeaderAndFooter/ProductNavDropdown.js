import React, { useEffect, useRef } from 'react';
import { Container, Col, Row } from 'react-bootstrap';

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
                'Tents', 'Footprints', 
                'Sleeping Bags',
              ]}
            />
          </Col>
          <Col md={6} lg={3}>
            <ProductDropdownCard productsClickHandler={productsClickHandler} title='Women' gender='women' navCategories={[
              'Leggings', 'Pants',
              'Shirts', 'Tees', 
              'Graphic Tees'
              ]}
            />
          </Col>
          <Col md={6} lg={3}>
            <ProductDropdownCard productsClickHandler={productsClickHandler} title='Men' gender='men' navCategories={[
              'Jackets', 'Shirts', 
              'Tees', 'Graphic Tees'
              ]}
            />
          </Col>
          <Col md={6} lg={3}>
            <ProductDropdownCard productsClickHandler={productsClickHandler} title='Gear' navCategories={[
              'Technical Backpacks', 
              ]}
            />
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default ProductNavDropdown;
