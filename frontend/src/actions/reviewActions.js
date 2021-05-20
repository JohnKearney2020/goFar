import axios from 'axios';

import { REVIEWS_REQUEST, REVIEWS_SUCCESS, REVIEWS_FAIL,  REVIEWS_RESET } from '../constants/reviewConstants';

export const listProductReviews = (productID, pageNumber = '') => async (dispatch) => {
  
  console.log('In listProductReviews Action')
  // set headers to json
  const config = {
    headers: {
      'Content-Type': 'application/json',
      // Authorization: `Bearer ${userInfo.token}` //Our middleware is expectinga token
    }
  }
  try {
    dispatch({ type: REVIEWS_REQUEST });
    // /api/products?keyword=${keyword}&gender=${gender}&pageNumber=${pageNumber}
    const { data } = await axios.get(`/api/reviews?productID=${productID}&pageNumber=${pageNumber}`, config); //fetch review data
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