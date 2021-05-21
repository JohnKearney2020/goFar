import React from 'react';
import { Row, Button } from 'react-bootstrap';

import ProductRating from './ProductRating';

import './AddReviewRow.css';

const showReviewModalHandler = () => {
  console.log('clicked write a review')
}

const AddReviewRow = () => {
  return (
    <Row id='addReviewRow' className='justify-content-between align-items-center mb-5 px-2'>
      <Button className='my-2 mx-3' onClick={showReviewModalHandler}>Write a Review</Button>
      <ProductRating useTotalRating={true} />
    </Row>
  )
}

export default AddReviewRow;
