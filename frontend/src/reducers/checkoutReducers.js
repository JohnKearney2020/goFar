import { CHECKOUT_BILLING_ADDRESS, CHECKOUT_SHIPPING_ADDRESS, CHECKOUT_PAYMENT_METHOD, CHECKOUT_RESET } from '../constants/checkoutConstants';

const defaultCheckoutData = {
  billingAddress: {
    addressObject: {}
  },
  shippingAddress: {
    addressObject: {}
  },
  paymentMethod: ''
}

export const checkoutDataReducer = ( state = defaultCheckoutData, action ) => {
  switch(action.type) {
    case CHECKOUT_BILLING_ADDRESS:
      return { ...state, billingAddress: action.payload };
    case CHECKOUT_SHIPPING_ADDRESS:
      return { ...state, shippingAddress: action.payload };
    case CHECKOUT_PAYMENT_METHOD:
      return { ...state, paymentMethod: action.payload };
    case CHECKOUT_RESET:
      return {
        billingAddress: {
          addressObject: {}
        },
        shippingAddress: {
          addressObject: {}
        },
        paymentMethod: ''
      };
    default: 
      return state;
  } 
}
