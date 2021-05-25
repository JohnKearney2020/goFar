import React from 'react';
import { Row, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import ProductRating from '../ProductRating';
import ReviewModal from '../../Modals/ReviewModal';
import { ADD_REVIEW_SHOWMODAL_TRUE  } from '../../../constants/reviewConstants';
import './AddReviewRow.css';

const AddReviewRow = ({ productID }) => {

  const dispatch = useDispatch();
  // Get values from global state
  const addReview = useSelector(state => state.addReview);
  const { showReviewModal } = addReview;
  const userInfo = useSelector(state => state.userLogin.userInfo);
  const { loggedIn } = userInfo;

  const showReviewModalHandler = () => {
    dispatch({type: ADD_REVIEW_SHOWMODAL_TRUE }); //Show the review modal
  }
  
  return (
    <>
      <Row id='addReviewRow' className='justify-content-between align-items-center mb-5 px-2'>
        <Button className='my-2 mx-3' disabled={!loggedIn} onClick={showReviewModalHandler}>
          {loggedIn ? 'Write A Review' : 'Login to Write a Review'}
        </Button>
        <ProductRating useTotalRating={true} />
      </Row>
      {showReviewModal && 
        <ReviewModal 
          productID={productID}
        />
      }
    </>
  )
}

export default AddReviewRow;
