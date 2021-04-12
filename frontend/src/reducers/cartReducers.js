import { CART_PRODUCT_DETAILS_REQUEST, CART_PRODUCT_DETAILS_SUCCESS, CART_PRODUCT_DETAILS_FAIL, CART_PRODUCT_DETAILS_RESET } from '../constants/cartConstants';


export const cartDetailsReducer = ( state = { cartProducts: [] }, action ) => {
  switch(action.type) {
    case CART_PRODUCT_DETAILS_REQUEST:
      return { loading: true };
    case CART_PRODUCT_DETAILS_SUCCESS:
      return { loading: false, success: true, cartProducts: action.payload };
    case CART_PRODUCT_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    case CART_PRODUCT_DETAILS_RESET:
      return { cartProducts: [] };
    default: 
      return state;
  } 
}