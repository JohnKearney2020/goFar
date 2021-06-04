import React, { useEffect, useLayoutEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, ListGroup } from 'react-bootstrap';

import { listProductReviews } from '../../../actions/reviewActions';
import { formatDateDayMonthYear } from '../../../utilityFunctions/formatDayMonthYear';
import ProductRating from '../ProductRating';
import ReviewPagination from './ReviewPagination';
import { REVIEWS_RESET } from '../../../constants/reviewConstants';

const ProductReviews = ({ productID }) => {
  
  const dispatch = useDispatch();

  const haveFetchedReviews = useRef(false);

  //Set up the global state
  const productReviews = useSelector(state => state.productReviews);
  const { reviews, page, totalRating } = productReviews;

  useEffect(() => {
    if(haveFetchedReviews.current === false){
      dispatch(listProductReviews(productID, page, totalRating));
      haveFetchedReviews.current = true;
    }
  }, [dispatch, productID, page, totalRating])

  //This should clear the reviews out of the global state when users navigate away from this page
  useLayoutEffect(() => () => {
    dispatch({type: REVIEWS_RESET});
  }, [dispatch]);

  return (
    <>
      {reviews.map((review) => (
        <div key={review._id}>
          <Row className='w-100 mx-0'>
            <Col md={3}>
              <ListGroup variant='flush'>
                <ListGroup.Item className='border-0'>
                  <ProductRating rating={review.rating}/>
                </ListGroup.Item>
                <ListGroup.Item className='border-0'>
                  <h6 className='font-weight-bold mb-0'>{review.userName}</h6>
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={9}>
              <ListGroup variant='flush' className='w-100 h-100'>
                <ListGroup.Item key={`${review._id}`} className=''>
                  <div>
                    <h5 className='font-weight-bold mb-1'>{review.title}</h5>
                  </div>
                  <div>
                    <h6 className='mb-1'>{formatDateDayMonthYear(review.createdAt)}</h6>
                  </div> 
                  {review.verified && 
                    // <div className="text-muted">
                    //   Verified Purchase
                    // </div>
                    <h6 className='mb-0 text-muted'>Verified Purchase</h6>
                  }
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
          <Row className='mb-4 mx-0'>
            <Col md={3}>
              {/* placeholder - intentionally left blank */}
            </Col>
            <Col md={9}>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <p className='lead'>{review.review}</p>
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
          <hr className='w-60'/>
        </div>
      ))}
      <ReviewPagination productID={productID} />
    </>
  )
}

export default ProductReviews;