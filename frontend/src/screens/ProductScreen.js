import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Image, ListGroup, Card, Button } from 'react-bootstrap';
import Rating from '../components/ProductRating';
import ProductColors from '../components/ProductColors';
import ProductRating from '../components/ProductRating';
import { findDefaultPriceRange, findSalePriceRange } from '../utilityFunctions/priceRanges';
import products from '../products2';

const ProductScreen = ({ match }) => {
  
  const product = products.find((p)=> p._id === match.params.id);

  const [selectedColor, setSelectedColor] = useState(product.colors[0].colorName);
  const [primaryImage, setPrimaryImage] = useState(product.images[0].source);

  //On component load...
  // useEffect(() => {
  //   setSelectedColor(product.colors[0].colorName);
  //   setPrimaryImage(product.images[0].source);
  // }, [product.colors, product.images]);

  const colorSelectHandler = (colorClicked) => {
    //Find the image that corresponds to the color clicked
    setSelectedColor(colorClicked);
    for(let eachImage of product.images) {
      if(eachImage.color === colorClicked  && eachImage.isPrimaryImage === true){
        setPrimaryImage(eachImage.source);
        break;
      }
    }
  }

  return (
    <>
      <Row>
        {/* Primary Product Image - Left side of page */}
        <Col md={6}>
          <Image src={primaryImage} alt={product.name} fluid/>
        </Col>
        {/* Product Name / Sizes / Colors - Right side of page */}
        <Col md={6}>
          <Card border="light"> {/* light removes the border */}
            <ListGroup variant='flush'>
              <ListGroup.Item className='border-0 pb-0'>
                {product.subBrand ?? <h6>{product.subBrand}</h6>}                
              </ListGroup.Item>
              <ListGroup.Item className='border-0'>
                <h4>{product.name}</h4>
              </ListGroup.Item>
            </ListGroup>
            {/* Prices and Reviews */}
            <ListGroup>
              <ProductRating value={product.rating} text={`${product.numReviews} reviews`}/>
            </ListGroup>
            {/* Size Categories */}
            {/* <ListGroup horizontal defaultActiveKey='0' className='px-2 d-flex justify-content-start'> */}
            <ListGroup horizontal defaultActiveKey='0' className='px-2'>
              {product.sizes.map((eachSize,idx) =>
                // <ListGroup.Item action variant='light' className='text-center'>
                <ListGroup.Item action eventKey={idx} className='text-center'>
                  {eachSize.sizeCategoryName}
                </ListGroup.Item>
              )}
            </ListGroup>
            <ListGroup>
              <ListGroup.Item className='border-0'>Color: {<span className='font-weight-bold'>{selectedColor}</span>}</ListGroup.Item>
              {/* Product Colors */}
              <ListGroup.Item className='border-0'>
                <ProductColors images={product.colors} colorSelectHandler={colorSelectHandler} selectedColor={selectedColor}/>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>{/* End of Product Name / Sizes / Colors */}

      </Row>
    </>
  )
}

export default ProductScreen;
