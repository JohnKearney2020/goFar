import React, { useState, useEffect, useRef } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { listProductDetails } from '../actions/productActions';
import { PRODUCT_DETAILS_RESET } from '../constants/productConstants';
import { Row, Col } from 'react-bootstrap';

import ProductDetailsCarousel from '../components/ProductComponents/ProductDetailsCarousel';
import Message from '../components/Message';
import Loader from '../components/Loader';



const ProductScreenTest2 = ({ match }) => {

  const dispatch = useDispatch();
  const productDetails = useSelector(state => state.productDetails);
  const { loading, error, product, loaded } = productDetails;
  const colorFromUrl = match.params.color;
  


  useEffect(() => {
    dispatch(listProductDetails(match.params.id));
    return () => {
      console.log('in cleanup function of ProductScreenTest2.js');
      dispatch({ type: PRODUCT_DETAILS_RESET });
    }
  }, [dispatch]);


  return (
    <>
      { loading ? ( <Loader /> ) : error ? ( <Message variant='danger'>{error}</Message> ) :
        <>
          <h3>In productScreenTest2</h3>
          <h1>{product.name}</h1>
          <Row>
            <Col md={6}>
              <ProductDetailsCarousel 
              // primaryImage={primaryImage} 
              // productName={product.name}
              // defaultImages={product.defaultPictures}
              // defaultVideo={product.defaultVideo}
              // carouselClickHandler={carouselClickHandler}
              // colorImagesForCarousel={colorImagesForCarousel}
              colorFromURL={colorFromUrl}
              // productDefaultImages={product.defaultImages}
              // productDefaultVideo={product.defaultVideo}
              />
            </Col>
            <Col md={6}>
              
            </Col>
          </Row>
          <h3>in ProductScreenTest2</h3>
        </>

      }
    </>
  )
}

export default ProductScreenTest2;
