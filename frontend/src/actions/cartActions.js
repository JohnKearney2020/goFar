import axios from 'axios';
import { CART_PRODUCT_DETAILS_REQUEST, CART_PRODUCT_DETAILS_SUCCESS, CART_PRODUCT_DETAILS_FAIL } from '../constants/cartConstants';
import { CART_QTY_MESSAGE_REQUEST, CART_QTY_MESSAGE_SUCCESS, CART_QTY_MESSAGE_FAIL } from '../constants/cartConstants';
import { CART_MOVED_MESSAGE_REQUEST, CART_MOVED_MESSAGE_SUCCESS, CART_MOVED_MESSAGE_FAIL } from '../constants/cartConstants';

// The get state parameter is needed b/c we will need a JWT from the state for this
export const getCartProductDetails = (arrayOfProductIDs) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CART_PRODUCT_DETAILS_REQUEST
    });

    const { userLogin: { userInfo } } = getState();

    const config = { // set headers to json
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}` //this goes to the 'api/users/profile' route which is a protected route. Our middleware is expecting a token
      }
    }
    // attempt to get wishlist product details
    const { data } = await axios.post(`/api/users/cart`, arrayOfProductIDs, config );
    dispatch({
      type: CART_PRODUCT_DETAILS_SUCCESS,
      payload: data
    })

  } catch (error) {
    dispatch({
      type: CART_PRODUCT_DETAILS_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message
    })
  }
}

// The get state parameter is needed b/c we will need a JWT from the state for this
export const addCartQtyMessage = (arrayOfChangedItems) => async (dispatch) => {
  // const {productID, productName, color, qty, size, sizeCategory, price, savedForLater} = arrayOfChangedItems;
  // console.log('in qty message action')
  // console.log(arrayOfChangedItems)
  try {
    dispatch({
      type: CART_QTY_MESSAGE_REQUEST
    });
    dispatch({
      type: CART_QTY_MESSAGE_SUCCESS,
      payload: arrayOfChangedItems
    })
  } catch (error) {
    dispatch({
      type: CART_QTY_MESSAGE_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message
    })
  }
}

// The get state parameter is needed b/c we will need a JWT from the state for this
export const addCartMovedMessage = (arrayOfMovedItems) => async (dispatch) => {
  // const {productID, productName, color, qty, size, sizeCategory, price, savedForLater} = arrayOfChangedItems;
  // console.log('in moved message action')
  // console.log(arrayOfMovedItems)
  try {
    dispatch({
      type: CART_MOVED_MESSAGE_REQUEST
    });
    dispatch({
      type: CART_MOVED_MESSAGE_SUCCESS,
      payload: arrayOfMovedItems
    })
  } catch (error) {
    dispatch({
      type: CART_MOVED_MESSAGE_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message
    })
  }
}