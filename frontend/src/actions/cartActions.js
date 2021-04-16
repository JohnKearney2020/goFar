import axios from 'axios';
import { CART_PRODUCT_DETAILS_REQUEST, CART_PRODUCT_DETAILS_SUCCESS, CART_PRODUCT_DETAILS_FAIL, CART_PRODUCT_DETAILS_RESET } from '../constants/cartConstants';
import { CART_QTY_MESSAGE_REQUEST, CART_QTY_MESSAGE_SUCCESS, CART_QTY_MESSAGE_FAIL, CART_QTY_MESSAGE_RESET } from '../constants/cartConstants';
import { USER_LOGIN_SUCCESS } from '../constants/userConstants';


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
export const setCartQtyMessage = (arrayOfChangedItems) => async (dispatch, getState) => {
  const {productID, productName, color, qty, size, sizeCategory, price, savedForLater} = arrayOfChangedItems;
  try {
    dispatch({
      type: CART_QTY_MESSAGE_REQUEST
    });

    const { userLogin: { userInfo } } = getState();

    const config = { // set headers to json
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}` //this goes to the 'api/users/profile' route which is a protected route. Our middleware is expecting a token
      }
    }
    // attempt to get wishlist product details
    // const { data } = await axios.post(`/api/users/cart`, arrayOfProductIDs, config );

    const { data } = await axios.put('/api/users/cart/cartitem', {
      productID, 
      name: productName,
      newQty: qty,
      color,
      size,
      sizeCategory,
      price,
      savedForLater: savedForLater
    }, config);
    // console.log(data)
    dispatch({
      type: CART_QTY_MESSAGE_SUCCESS,
      payload: data
    })
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data
    });
    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: CART_QTY_MESSAGE_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message
    })
  }
}