import { CHECKOUT_BILLING_ADDRESS, CHECKOUT_SHIPPING_ADDRESS, CHECKOUT_PAYMENT_METHOD } from '../constants/checkoutConstants';
import { CHECKOUT_SUBTOTAL, CHECKOUT_SHIPPING_COST, CHECKOUT_ITEM_TALLY, CHECKOUT_CART_TOTAL } from '../constants/checkoutConstants';

export const checkoutCartTotal = (cartTotal) => async (dispatch) => {
  try {
    dispatch({
      type: CHECKOUT_CART_TOTAL,
      payload: cartTotal
    });
  } catch (error) {
    console.log('there was an error');
    console.log(error);
  }
}

export const checkoutShippingCost = (shippingCost) => async (dispatch) => {
  try {
    dispatch({
      type: CHECKOUT_SHIPPING_COST,
      payload: shippingCost
    });
  } catch (error) {
    console.log('there was an error');
    console.log(error);
  }
}

export const checkoutItemTally = (itemTally) => async (dispatch) => {
  try {
    dispatch({
      type: CHECKOUT_ITEM_TALLY,
      payload: itemTally
    });
  } catch (error) {
    console.log('there was an error');
    console.log(error);
  }
}

export const checkoutSubTotal = (cartSubTotal) => async (dispatch) => {
  try {
    dispatch({
      type: CHECKOUT_SUBTOTAL,
      payload: cartSubTotal
    });
  } catch (error) {
    console.log('there was an error');
    console.log(error);
  }
}

export const checkoutBillingAddress = (object) => async (dispatch) => {
  try {
    dispatch({
      type: CHECKOUT_BILLING_ADDRESS,
      payload: {
        addressObject: object
      }
    });
  } catch (error) {
    console.log('there was an error');
    console.log(error);
  }
}

export const checkoutShippingAddress = (object) => async (dispatch) => {
  try {
    dispatch({
      type: CHECKOUT_SHIPPING_ADDRESS,
      payload: {
        addressObject: object
      }
    });
  } catch (error) {
    console.log('there was an error');
    console.log(error);
  }
}

export const checkoutPaymentMethod = (string) => async (dispatch) => {
  try {
    dispatch({
      type: CHECKOUT_PAYMENT_METHOD,
      payload: string
    });
  } catch (error) {
    console.log('there was an error');
    console.log(error);
  }
}