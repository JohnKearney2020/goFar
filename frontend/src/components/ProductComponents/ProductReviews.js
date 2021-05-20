import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Accordion, Card, Button, Row, Col, ListGroup } from 'react-bootstrap';
// import Accordion from 'react-bootstrap/Accordion'
// import { useAccordionToggle } from 'react-bootstrap/AccordionToggle';

import { listProductReviews } from '../../actions/reviewActions';
import { formatDateDayMonthYear } from '../../utilityFunctions/formatDayMonthYear';
import ProductRating from './ProductRating';



const ProductReviews = ({ productID }) => {
  
  const dispatch = useDispatch();

  //Set up the global state
  const productReviews = useSelector(state => state.productReviews);
  const { loading, loaded, reviews, page, pages, totalRating, totalReviews } = productReviews;


  useEffect(() => {
    console.log('in ProductReviews useEffect')
    dispatch(listProductReviews(productID, page, totalRating));
  }, [dispatch, productID, page])

  const firstReviews = (
    <>
      {reviews.map((review) => (
        // <h4 key={idx}>{eachReview.heading}</h4>
        <div key={review._id}>
          <Row className='w-100 mx-0'>
            <Col md={2}>
              <ListGroup variant='flush'>
                <ListGroup.Item className='border-0'>
                  <ProductRating rating={review.rating}/>
                </ListGroup.Item>
                <ListGroup.Item>
                  <h6 className='font-weight-bold mb-0'>{review.userName}</h6>
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={10}>
              <ListGroup variant='flush' className='w-100 h-100'>
                <ListGroup.Item key={`${review._id}`} className=''>
                  <div>
                    <h5 className='font-weight-bold mb-1'>{review.heading}</h5>
                  </div>
                  <div>
                    <h6 className='mb-0'>{formatDateDayMonthYear(review.createdAt)}</h6>
                  </div>
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
          <Row className='mb-4 mx-0'>
            <Col md={2}>
              {/* placeholder - intentionally left blank */}
            </Col>
            <Col md={10}>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <p className='lead'>{review.comment}</p>
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </div>
      ))}
    </>
  )

  return (
    <>
      {firstReviews}
    </>
  )
}

export default ProductReviews;


// {/* <Accordion defaultActiveKey='0' className='w-100'>
// {/* <Card className='border-0'> */}
// <Card>
//   {/* <Card.Header className='text-center'> */}
//     <Accordion.Toggle as={Button} variant='link' eventKey='0'>
//       <h3 className='text-center w-100'>Reviews</h3>
//     </Accordion.Toggle>
//   {/* </Card.Header> */}
//   <Accordion.Collapse eventKey='0'>
//     <Card.Body>
//       {firstReviewsArray.map((eachReview, idx) => (
//         <h4 key={idx}>{eachReview}</h4>
//       ))}
//     </Card.Body>
//   </Accordion.Collapse>
// </Card>
// </Accordion>     */}
