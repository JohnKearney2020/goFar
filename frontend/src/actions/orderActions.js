import axios from 'axios';

import { USER_ORDER_LIST_REQUEST, USER_ORDER_LIST_SUCCESS, USER_ORDER_LIST_FAIL } from '../constants/orderConstants';

export const listUserOrders = (pageNumber = '') => async (dispatch, getState) => {
  
  const { userLogin: { userInfo } } = getState();
  // set headers to json
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${userInfo.token}` //Our middleware is expectinga token
    }
  }

  try {
    dispatch({ type: USER_ORDER_LIST_REQUEST });
    const { data } = await axios.get(`/api/orders?pageNumber=${pageNumber}`, config); //fetch product data
    dispatch({ //if that fetch is successful
      type: USER_ORDER_LIST_SUCCESS,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: USER_ORDER_LIST_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message
    })
  }
}