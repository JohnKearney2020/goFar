import axios from 'axios';

import { REVIEWS_REQUEST, REVIEWS_SUCCESS, REVIEWS_FAIL } from '../constants/reviewConstants';
import { ADD_REVIEW_LOADING_TRUE, ADD_REVIEW_LOADING_FALSE, ADD_REVIEW_FAIL } from '../constants/reviewConstants';

export const addProductReview = (review, pageNumber = '', totalRating = -1 ) => async (dispatch, getState) => {

  const { userLogin: { userInfo } } = getState();
  // set headers to json
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${userInfo.token}`
    }
  }

  try {
    dispatch({ type: ADD_REVIEW_LOADING_TRUE });
    const { data } = await axios.post(`/api/reviews`, { review }, config)
    dispatch({ type: ADD_REVIEW_LOADING_FALSE }); //We've set up the reducer to also hide the modal here
    // We need to fetch review data for this product ID again since we just added a review
    // If we don't do this, the user won't see their new review until they refresh the page
    dispatch({ type: REVIEWS_REQUEST });
    const { data:newestReviews } = await axios.get(`/api/reviews?productID=${review.productID}&pageNumber=${pageNumber}&totalRating=${totalRating}`, config); //fetch review data
    dispatch({ //if that fetch is successful
      type: REVIEWS_SUCCESS,
      payload: newestReviews
    })
  } catch (error) {
    dispatch({
      type: ADD_REVIEW_FAIL, //We've set up the reducer to also hide the modal here
      payload: error.response && error.response.data.message ? error.response.data.message : error.message
    })
  }
}

export const listProductReviews = (productID, pageNumber = '', totalRating = -1) => async (dispatch) => {
  // set headers to json
  const config = {
    headers: {
      'Content-Type': 'application/json',
    }
  }
  try {
    dispatch({ type: REVIEWS_REQUEST });
    // /api/products?keyword=${keyword}&gender=${gender}&pageNumber=${pageNumber}
    const { data } = await axios.get(`/api/reviews?productID=${productID}&pageNumber=${pageNumber}&totalRating=${totalRating}`, config); //fetch review data
    dispatch({ //if that fetch is successful
      type: REVIEWS_SUCCESS,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: REVIEWS_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message
    })
  }
}