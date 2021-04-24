import { CHECKOUT_STEP_CHANGE, CHECKOUT_STEP_RESET } from '../constants/checkoutConstants';

// export const CHECKOUT_STEP_CHANGE = 'CHECKOUT_STEP_REQUEST';
// export const CHECKOUT_STEP_RESET = 'CHECKOUT_STEP_REQUEST_RESET';


export const checkoutStepReducer = ( state = { checkoutActiveKey: "0" }, action ) => {
  switch(action.type) {
    case CHECKOUT_STEP_CHANGE:
      return { checkoutActiveKey: action.payload };
    case CHECKOUT_STEP_RESET:
      return { checkoutActiveKey: "0" };
    default: 
      return state;
  } 
}