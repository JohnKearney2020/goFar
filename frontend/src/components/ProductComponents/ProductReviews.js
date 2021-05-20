import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Accordion, Card, Button } from 'react-bootstrap';
// import Accordion from 'react-bootstrap/Accordion'
// import { useAccordionToggle } from 'react-bootstrap/AccordionToggle';

import { listProductReviews } from '../../actions/reviewActions';


const ProductReviews = ({ productID }) => {
  
  const dispatch = useDispatch();

  //Set up the global state
  const productReviews = useSelector(state => state.productReviews);
  const { loading, reviews, page, pages } = productReviews;


  useEffect(() => {
    console.log('in ProductReviews useEffect')
    // if(!loading){
      dispatch(listProductReviews(productID, page));
    // }
  // }, [dispatch, productID, page])
  }, [dispatch, productID, page])

  const firstReviews = (
    <>
      {/* { reviews &&  */}
        {reviews.map((eachReview, idx) => (
          <h4 key={idx}>{eachReview.heading}</h4>
        ))}
      {/* } */}
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
