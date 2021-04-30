import React from 'react';
import axios from 'axios';
import { PayPalButton } from "react-paypal-button-v2";
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetails } from '../../actions/userActions';
import { toast } from 'react-toastify';

import { USER_LOGIN_SUCCESS } from '../../constants/userConstants';

const CustomPayPalButton = () => {
  
  const dispatch = useDispatch();

  // Get data from the Global State
  const userInfo = useSelector(state => state.userLogin.userInfo);
  const { cart, _id:userID, token } = userInfo;

  const billingAddress = useSelector(state => state.checkoutData.billingAddress);
  const { addressObject:billingAddressObj } = billingAddress;

  const shippingAddress = useSelector(state => state.checkoutData.shippingAddress);
  const { addressObject:shippingAddressObj } = shippingAddress;

  const checkoutData = useSelector(state => state.checkoutData);
  const { subTotal, shippingCost, itemTally, cartTotal } = checkoutData;

  const paymentMethod = useSelector(state => state.checkoutData.paymentMethod);

  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  }

  const addOrderToUser = async (data) => {
    try {
      // Create the order object we will send to the backend
      //Pull the items from our cart that are not 'saved for later'
      let orderItems = cart.filter(eachItem => eachItem.savedForLater === false);
      let order = {
        user: userID,
        paymentMethodID: data.orderID, //this comes from PayPal, or another method if we add it
        items: orderItems,
        subTotal,
        shippingCost,
        cartTotal,
        itemTally,
        paymentMethod,
        billingAddress: billingAddressObj,
        shippingAddress: shippingAddressObj,
        shipped: false
      }
      const { data:data2 } = await axios.post('/api/users/orders', {
        order
      }, config);
    } catch (error) {
      console.log('there was an error')
      console.log(error)
      console.log(error.message)
      console.log(error.response.data.message)
      // error.response.data.message : error.message
      // toast.error(`Could not add ${productName} to your cart. Try again later.`, { position: "top-right", autoClose: 3500 });
    } 
  }

  const updateUserCart = async () => {
    // Filter our the 'Saved For Later' items from the cart. Those will be saved. Everything else in the cart will be removed
    const cartAfterOrder = cart.filter(eachItem => eachItem.savedForLater === true);
    console.log('cartAfterOrder:')
    console.log(cartAfterOrder)
    try {
      const { data } = await axios.put('/api/users/cart/updatewholecart', { cart:cartAfterOrder }, config);
      dispatch({
        type: USER_LOGIN_SUCCESS,
        payload: data
      });
      localStorage.setItem('userInfo', JSON.stringify(data));
      console.log('cart updated successfully')
    } catch (error) {
      console.log('there was an error updating the cart with up to date values')
      console.log(error)
      toast.error(`Could not update your cart after placing the order. You can manually remove leftover items in it.`, { position: "top-right", autoClose: 5000 });
    }
  }

  const updateInventory = async () => {
    // Filter our the 'Saved For Later' items from the cart. Those will be saved. Everything else in the cart will be removed
    // const cartAfterOrder = cart.filter(eachItem => eachItem.savedForLater === true);
    // console.log('cartAfterOrder:')
    // console.log(cartAfterOrder)
    try {
      const { data:data2 } = await axios.put('/api/users/orders/inventoryupdate', { cart }, config);
      console.log('Got feedback from backend!')
      console.log(data2)
      // dispatch({
      //   type: USER_LOGIN_SUCCESS,
      //   payload: data
      // });
      // localStorage.setItem('userInfo', JSON.stringify(data));
      // console.log('cart updated successfully')
    } catch (error) {
      console.log('there was an error updating the item inventory')
      console.log(error)
      // toast.error(`Could not update your cart after placing the order. You can manually remove leftover items in it.`, { position: "top-right", autoClose: 5000 });
      console.log(error.message)
      console.log(error.response.data.message)
    }
  }

  const payPalButtonClickHandler = () => {
    console.log('user clicked the PayPal button!')
  }

  return (
    <PayPalButton 
      createOrder={(data, actions) => {
        return actions.order.create({
          application_context: {
            shipping_preference: 'SET_PROVIDED_ADDRESS',
          },
          purchase_units: [{
            amount: {
              currency_code: "USD",
              value: cartTotal
            },
            shipping: {
              address: {
                address_line_1: shippingAddressObj.line1,
                address_line_2: shippingAddressObj.line2,
                admin_area_1: shippingAddressObj.state,
                admin_area_2: shippingAddressObj.city,
                postal_code: shippingAddressObj.zipCode,
                country_code: "US"
              }
            },
            billing: {
              address: {
                address_line_1: shippingAddressObj.line1,
                address_line_2: shippingAddressObj.line2,
                admin_area_1: shippingAddressObj.state,
                admin_area_2: shippingAddressObj.city,
                postal_code: shippingAddressObj.zipCode,
                country_code: "US"
              }
            } 
          }]
        });
      }}
      // If the paypal transaction goes well
      onApprove={(data, actions) => {
        // Capture the funds from the transaction
        return actions.order.capture().then(function(details) {
          // Show a success message to your buyer

          //Update the inventory in our database:
          updateInventory();
          // Create an order and add it to the User's data in our database
          // addOrderToUser(data);

          // Update the User's Cart - Remove everything that was just sold
          // updateUserCart();
          // dispatch(getUserDetails('profile'));
          // return fetch("/paypal-transaction-complete", {
          //   method: "post",
          //   body: JSON.stringify({
          //     orderID: data.orderID
          //   })
          // });
        });
      }}
      onClick={payPalButtonClickHandler}
    />
      
  )
}

export default CustomPayPalButton;