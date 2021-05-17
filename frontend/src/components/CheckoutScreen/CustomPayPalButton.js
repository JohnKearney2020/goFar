import React from 'react';
import axios from 'axios';
import { PayPalButton } from "react-paypal-button-v2";
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import { USER_LOGIN_SUCCESS } from '../../constants/userConstants';
import { ORDER_LOADING_TRUE, ORDER_LOADING_FALSE } from '../../constants/checkoutConstants';
import { addGoogleMapsScript } from '../../utilityFunctions/googleMapsScript';
import Backdrop from '../../components/Modals/Backdrop';

const CustomPayPalButton = ({ history }) => {
  
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

  const orderLoading = useSelector(state => state.orderLoading.loading);

  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  }

  const updateInventory = async () => {
    // This is the first of our functions to run after the user completes the PayPal transaction
    try {
      const { data:data2 } = await axios.put('/api/users/orders/inventoryupdate', { cart }, config);
    } catch (error) {
      console.log('there was an error updating the item inventory')
      console.log(error)
      console.log(error.message)
      console.log(error.response.data.message && error.response.data.message)
      dispatch({ type: ORDER_LOADING_FALSE });
    }
  }

  const updateUserData = async (data) => {
    // This is the second of our functions to run after the user completes the PayPal transaction
    try {
      console.log('in updateUserData')
      //============================================================================================
      //            Get the latLng coordinates for the user's shipping address
      //============================================================================================
      // //Mount the Google Maps script if it isn't already
      // if(!window.google){
      //   await addGoogleMapsScript();
      // };
      if(window.google){ //If the Google Maps Script has already been loaded and added to the body
        console.log('TRYING TO GEOCODE!!!')
        const geocoder = new window.google.maps.Geocoder();
        //Deconstruct the shipping address object
        const { line1, line2, city, state, zipCode } = shippingAddressObj;
        // Create the address string we will feed to Google Maps, which will turn it into lat long coordinates
        const addressForMap = `${line1} ${line2 ? line2 : ''} ${city}, ${state} ${zipCode}`;
        //
        geocoder.geocode( { 'address': addressForMap}, function(results, status) {
          if (status === 'OK') {
            console.log('Lat Lng for that address:')
            console.log(results[0].geometry.location)
            // map.setCenter(results[0].geometry.location);
            // var marker = new window.google.maps.Marker({
            //     map: map,
            //     position: results[0].geometry.location
            // });
          } else {
            // alert('Geocode was not successful for the following reason: ' + status);
            // alert('Geocode was not successful for the following reason: ' + status);
            console.log('Failed to geocode the given address...')
          }
        });
      }

      //Pull the items from our cart that are not 'saved for later'
      let orderItems = cart.filter(eachItem => eachItem.savedForLater === false);

      // Create the order object we will send to the backend
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
      };
      const { data:data2 } = await axios.put('/api/users/orders', {
        order, cart
      }, config);
      // dispatch({
      //   type: USER_LOGIN_SUCCESS,
      //   payload: data2
      // });
      // localStorage.setItem('userInfo', JSON.stringify(data2));
      toast.success(`Order Placed Successfully!`, { position: "bottom-center", autoClose: 4000 });
      dispatch({ type: ORDER_LOADING_FALSE });
      // redirect users to the orders page
      history.push('/profile/orders')
    } catch (error) {
      console.log('there was an error')
      console.log(error)
      console.log(error.message)
      console.log(error.response.data.message && error.response.data.message)
      toast.error(`Could not update your cart after placing the order. You can manually remove leftover items in it.`, { position: "bottom-center", autoClose: 5000 });
      dispatch({ type: ORDER_LOADING_FALSE });
    } 
  }

  const payPalButtonClickHandler = () => {
    if(!window.google){ //If we haven't loaded the Google Maps API script yet
      addGoogleMapsScript('From payPalButtonClickHandler');
    };
    dispatch({ type: ORDER_LOADING_TRUE });
  }

  return (
    <>
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
        // onApprove={(data, actions) => {
        //   // Capture the funds from the transaction
        //   return actions.order.capture().then(function(details) {
        //     //Mount the Google Maps script if it isn't already
        //     if(!window.google){
        //       addGoogleMapsScript();
        //     };
        //   }).then(function(details) {
        //     //Update the inventory in our database:
        //     updateInventory();
        //     // Update the User's Cart - Remove everything that was just sold
        //     // Create an order and add it to the User's data in our database
        //     updateUserData(data);
        //   });
        // }}
        onApprove={(data, actions) => {
          // Capture the funds from the transaction
          return actions.order.capture().then( async function(details) {
            //Mount the Google Maps script if it isn't already
            // if(!window.google){
            //   console.log('AWAIT TEST 1')
            //   await addGoogleMapsScript();
            // };
          }).then(function(details) {
            // console.log('AWAIT TEST 2')
            //Update the inventory in our database:
            updateInventory();
            // Update the User's Cart - Remove everything that was just sold
            // Create an order and add it to the User's data in our database
            updateUserData(data);
          });
        }}
        onError={(err) => {
          dispatch({ type: ORDER_LOADING_FALSE });
          toast.error(`We could not complete your transaction through PayPal. Try again later.`, { position: "bottom-center", autoClose: 4000 });
        }}
        onCancel={() => {
          dispatch({ type: ORDER_LOADING_FALSE });
        }}
        onClick={payPalButtonClickHandler}
      />
      { orderLoading && <Backdrop />}
    </>
  )
}

export default CustomPayPalButton;