import React from 'react';
import { Pagination } from 'react-bootstrap';
import { listProductReviews } from '../../actions/reviewActions';
import { useDispatch, useSelector } from 'react-redux';

const ReviewPagination = ({ productID }) => {

  const dispatch = useDispatch();

  const productReviews = useSelector(state => state.productReviews);
  const { loading, loaded, reviews, page, pages, totalRating, totalReviews } = productReviews;
  
  const changePageHandler = (e) => {
    // setPage(Number(e.target.dataset.pagenumber));
    // listProductReviews(productID, pageNumber, totalRating)
    dispatch(listProductReviews(productID, e.target.dataset.pagenumber, totalRating));
  }

  return pages > 1 && (
    <Pagination className='justify-content-center'>
      {[...Array(pages).keys()].map(pageNum => (
          <Pagination.Item key={pageNum + 1} active={pageNum + 1 === page} onClick={changePageHandler} data-pagenumber={pageNum + 1}>
            {pageNum + 1}
          </Pagination.Item>
      ))}
    </Pagination>
  )
}

export default ReviewPagination;
