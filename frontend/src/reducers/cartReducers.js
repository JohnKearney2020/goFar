import { CART_PRODUCT_DETAILS_REQUEST, CART_PRODUCT_DETAILS_SUCCESS, CART_PRODUCT_DETAILS_FAIL, CART_PRODUCT_DETAILS_RESET } from '../constants/cartConstants';
import { CART_QTY_MESSAGE_REQUEST, CART_QTY_MESSAGE_SUCCESS, CART_QTY_MESSAGE_FAIL, CART_QTY_MESSAGE_RESET } from '../constants/cartConstants';

export const cartQtyMessageReducer = ( state = { cartQtyMessage: [] }, action ) => {
  switch(action.type) {
    case CART_QTY_MESSAGE_REQUEST:
      return { ...state, loading: true };
    case CART_QTY_MESSAGE_SUCCESS:
      return { loading: false, success: true, cartQtyMessage: action.payload };
    case CART_QTY_MESSAGE_FAIL:
      return { loading: false, error: action.payload };
    case CART_QTY_MESSAGE_RESET:
      return { cartQtyMessage: [] };
    default: 
      return state;
  } 
}

export const cartDetailsReducer = ( state = { cartProducts: [] }, action ) => {
  switch(action.type) {
    case CART_PRODUCT_DETAILS_REQUEST:
      return { ...state, loading: true };
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