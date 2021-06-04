import { CHECKOUT_BILLING_ADDRESS, CHECKOUT_SHIPPING_ADDRESS, CHECKOUT_PAYMENT_METHOD, CHECKOUT_RESET } from '../constants/checkoutConstants';
import { CHECKOUT_SUBTOTAL, CHECKOUT_SHIPPING_COST, CHECKOUT_ITEM_TALLY, CHECKOUT_CART_TOTAL } from '../constants/checkoutConstants';
import { ORDER_LOADING_TRUE, ORDER_LOADING_FALSE } from '../constants/checkoutConstants';

// CHECKOUT_SUBTOTAL, CHECKOUT_SHIPPING_COST, CHECKOUT_ITEM_TALLY
export const orderLoadingReducer = ( state = {loading: false}, action ) => {
  switch(action.type) {
    case ORDER_LOADING_TRUE:
      return { loading: true };
    case ORDER_LOADING_FALSE:
      return { loading: false };
    default: 
      return state;
  } 
}

const defaultCheckoutData = {
  billingAddress: {
    addressObject: {}
  },
  shippingAddress: {
    addressObject: {}
  },
  paymentMethod: '',
  subTotal: 0,
  shippingCost: '',
  itemTally: 0,
  cartTotal: 0
}

// CHECKOUT_SUBTOTAL, CHECKOUT_SHIPPING_COST, CHECKOUT_ITEM_TALLY
export const checkoutDataReducer = ( state = defaultCheckoutData, action ) => {
  switch(action.type) {
    case CHECKOUT_BILLING_ADDRESS:
      return { ...state, billingAddress: action.payload };
    case CHECKOUT_SHIPPING_ADDRESS:
      return { ...state, shippingAddress: action.payload };
    case CHECKOUT_PAYMENT_METHOD:
      return { ...state, paymentMethod: action.payload };
    case CHECKOUT_SUBTOTAL:
      return { ...state, subTotal: action.payload };
    case CHECKOUT_SHIPPING_COST:
      return { ...state, shippingCost: action.payload };
    case CHECKOUT_ITEM_TALLY:
      return { ...state, itemTally: action.payload };
    case CHECKOUT_CART_TOTAL:
      return { ...state, cartTotal: action.payload };
    case CHECKOUT_RESET:
      return {
        billingAddress: {
          addressObject: {}
        },
        shippingAddress: {
          addressObject: {}
        },
        paymentMethod: '',
        subTotal: 0,
        shippingCost: '',
        itemTally: 0,
        cartTotal: 0
      };
    default: 
      return state;
  } 
}
