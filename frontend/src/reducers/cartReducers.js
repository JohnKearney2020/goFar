import { CART_PRODUCT_DETAILS_REQUEST, CART_PRODUCT_DETAILS_SUCCESS, CART_PRODUCT_DETAILS_FAIL, CART_PRODUCT_DETAILS_RESET } from '../constants/cartConstants';
import { CART_QTY_MESSAGE_REQUEST, CART_QTY_MESSAGE_SUCCESS, CART_QTY_MESSAGE_FAIL, CART_QTY_MESSAGE_RESET } from '../constants/cartConstants';
import { CART_MOVED_MESSAGE_REQUEST, CART_MOVED_MESSAGE_SUCCESS, CART_MOVED_MESSAGE_FAIL, CART_MOVED_MESSAGE_RESET } from '../constants/cartConstants';
import { SET_UPDATING_CART, RESET_UPDATING_CART } from '../constants/cartConstants';


//This is used when we update the quantities in a user's cart. We do this in CartScreen.js. For example, it they put 10 of an item into
//their cart at one point, but now there are only 5 in stock, we update their cart quantity to 5 and let them know we update the 
//quantity of that specific item
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

//This is used when we update the quantities in a user's cart. We do this in CartScreen.js. For example, it they put 10 of an item into
//their cart at one point, but now there are 0 in stock, we update their cart quantity to 0, change the key 'savedForLater' to true for
//that item, which will move it to the 'Saved for Later' section of their cart, and then we let them know we did all of that for that
//specific item
export const cartMovedMessageReducer = ( state = { cartMovedMessage: [] }, action ) => {
  switch(action.type) {
    case CART_MOVED_MESSAGE_REQUEST:
      return { ...state, loading: true };
    case CART_MOVED_MESSAGE_SUCCESS:
      return { loading: false, success: true, cartMovedMessage: action.payload };
    case CART_MOVED_MESSAGE_FAIL:
      return { loading: false, error: action.payload };
    case CART_MOVED_MESSAGE_RESET:
      return { cartMovedMessage: [] };
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

export const updateCartFromCartReducer = ( state = {  loading: false }, action ) => {
  switch(action.type) {
    case SET_UPDATING_CART:
      return { loading: true };
    case RESET_UPDATING_CART:
      return { loading: false };
    default: 
      return state;
  } 
}