import React, { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import { addProductReview } from '../../actions/reviewActions';
import { ADD_REVIEW_RESET  } from '../../constants/reviewConstants';
import './ReviewModal.css';

const ReviewModal = ({ productID }) => {

  const dispatch = useDispatch();
  // Get values from the global state
  const addReview = useSelector(state => state.addReview);
  const { loading, showReviewModal } = addReview;

  const productName = useSelector(state => state.productDetails.product.name);

  // Set up local state
  const[title, setTitle] = useState('');
  const[review, setReview] = useState('');
  const[rating, setRating] = useState(0);

  const [titleMessage, setTitleMessage] = useState(null);
  const [reviewMessage, setReviewMessage] = useState(null);
  const [ratingMessage, setRatingMessage] = useState(null);

  const closeReviewModalHandler = () => {
    dispatch({type: ADD_REVIEW_RESET }); //Hide the review modal
  }

  const titleTextHandler = (value) => {
    if(value.length <= 70){
      setTitle(value);
      if(titleMessage) { setTitleMessage(null) };
    }
  }

  const starRatingHandler = (value) => {
    if(value > 0){ setRatingMessage(null) }
    setRating(value);
  }

  const reviewTextHandler = (value) => {
    if(value.length <= 1000){
      setReview(value);
      if(reviewMessage) { setReviewMessage(null) };
    }
  }

  const addNewReviewHandler = async (e) => {
    e.preventDefault();
    console.log('clicked add review')
    let anyErrors = false;

    //Clear any existing error messages first
    if(titleMessage) { setTitleMessage(null) }
    if(reviewMessage) { setReviewMessage(null) }

    //Check for blank fields next
    if(title === ''){ 
      console.log('title is blank...')
      setTitleMessage('Your review must have a title...');
      anyErrors = true;
    }
    if(review === ''){ 
      console.log('review is blank...')
      setReviewMessage('Your review cannot be blank...');
      anyErrors = true;
    }
    if(rating === 0){ 
      console.log('rating is blank...')
      setRatingMessage('Choose a rating...');
      anyErrors = true;
    }

    if(anyErrors) { 
      console.log('found errors')
      return 
    } //stop here if the user did not fill out the form correctly
    // Create the review object we will pass to the backend
    const reviewForDatabase = {
      productID,
      productName,
      rating: Number(rating),
      title,
      review
    }
    dispatch(addProductReview(reviewForDatabase))
  }

  return (
    <Modal 
      show={showReviewModal} 
      onHide={closeReviewModalHandler} 
      centered
      animation={false}
    >
      <Modal.Header closeButton className='align-items-center'><h5 className='mb-0'>Add a Review</h5></Modal.Header>
      <Modal.Body>
        <Form onSubmit={addNewReviewHandler}>
          <Form.Group controlId='reviewTitle'>
            <Form.Label>Title</Form.Label>
            <Form.Control 
              type='text'
              placeholder='Add a title for your review...'
              value={title}
              onChange={(e) => titleTextHandler(e.target.value)}
              className={titleMessage === null ? '' : 'is-invalid'}
              aria-describedby='titleHelpBlock'
            >
            </Form.Control>
            <Form.Text className={`ml-2 ${(Number(70) - title.length) === 0 ? 'textWarning' : ''}`} id="titleHelpBlock" muted>
              {`Required - ${(Number(70) - title.length)}/70 Characters Remaining`}
            </Form.Text>
            { titleMessage && <div className="invalid-feedback">{titleMessage}</div> }
          </Form.Group>
          <Form.Group controlId='reviewRating'>
            <Form.Label>Rating</Form.Label>
              <Form.Control as='select' className={ratingMessage === null ? '' : 'is-invalid'} value={rating} onChange={(e) => starRatingHandler(e.target.value)}>
                <option value='0'>Select...</option>
                <option value='1'>1 - Poor</option>
                <option value='2'>2 - Fair</option>
                <option value='3'>3 - Good</option>
                <option value='4'>4 - Very Good</option>
                <option value='5'>5 - Excellent</option>
              </Form.Control>
            <Form.Text className={`ml-2`} id="ratingHelpBlock" muted>
              Required
            </Form.Text>
            { ratingMessage && <div className="invalid-feedback">{ratingMessage}</div> }
          </Form.Group>
          <Form.Group controlId='reviewText'>
            <Form.Label>Review</Form.Label>
            <Form.Control 
              as='textarea'
              placeholder='Tell us what you think about this product.'
              value={review}
              onChange={(e) => reviewTextHandler(e.target.value)}
              rows={6}
              className={reviewMessage === null ? '' : 'is-invalid'}
              aria-describedby='reviewHelpBlock'
            >
            </Form.Control>
            <Form.Text className={`ml-2 ${(Number(1000) - review.length) === 0 ? 'textWarning' : ''}`} id="reviewHelpBlock" muted>
              {`Required - ${(Number(1000) - review.length)}/1000 Characters Remaining`}
            </Form.Text>
            { reviewMessage && <div className="invalid-feedback">{reviewMessage}</div> }
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
          <Button variant="secondary" onClick={closeReviewModalHandler}>
            Cancel
          </Button>
          <Button type='submit' variant="primary" disabled={loading} onClick={addNewReviewHandler}>
            {loading ? 'Adding Review...' : 'Add Review'}
          </Button>
        </Modal.Footer>
    </Modal>
  )
}

export default ReviewModal;
