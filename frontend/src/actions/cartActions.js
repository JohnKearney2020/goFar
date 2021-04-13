import axios from 'axios';
import { CART_PRODUCT_DETAILS_REQUEST, CART_PRODUCT_DETAILS_SUCCESS, CART_PRODUCT_DETAILS_FAIL, CART_PRODUCT_DETAILS_RESET } from '../constants/cartConstants';


// The get state parameter is needed b/c we will need a JWT from the state for this
export const getCartProductDetails = (arrayOfProductIDs) => async (dispatch, getState) => {
  console.log('in cartProductDetails userAction, arrayOfProductIDs:')
  console.log(arrayOfProductIDs)
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