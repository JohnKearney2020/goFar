//============================================================================================================
// If i choose to abandon lat/lng on the from end, revert to 03d30e5 on main branch for this file
//============================================================================================================

import React from 'react';
import axios from 'axios';
import { PayPalButton } from "react-paypal-button-v2";
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import { USER_LOGIN_SUCCESS } from '../../constants/userConstants';
import { ORDER_LOADING_TRUE, ORDER_LOADING_FALSE } from '../../constants/checkoutConstants';
import { addGoogleMapsScript } from '../../utilityFunctions/googleMapsScript';
import { MAP_LOADED_SCRIPT_TRUE, MAP_LOADED_SCRIPT_FALSE } from '../../constants/mapConstants';
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
      const { data:data2 } = await axios.put('/api/orders/inventoryupdate', { cart }, config);
    } catch (error) {
      console.log('there was an error updating the item inventory')
      console.log(error)
      console.log(error.message)
      console.log(error.response.data.message && error.response.data.message)
      dispatch({ type: ORDER_LOADING_FALSE });
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
      toast.error(`Could not update your cart after placing the order. You can manually remove leftover items in it.`, { position: "bottom-center", autoClose: 5000 });
    }
  }

  const createOrder = async (data) => {
    // This is the second of our functions to run after the user completes the PayPal transaction
    try {
      console.log('in createOrder')
      //============================================================================================
      //            Get the latLng coordinates for the user's shipping address
      //============================================================================================
      //Pull the items from our cart that are not 'saved for later'
      let orderItems = cart.filter(eachItem => eachItem.savedForLater === false);
      const { line1, line2, city, state, zipCode } = shippingAddressObj;
      const addressForMap = `${line1} ${line2 ? line2 : ''} ${city}, ${state} ${zipCode}`;
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
        shippingAddressLatLng: '',
        shippingAddressString: addressForMap,
        shipped: false,
      };

      // if(window.google){ //If the Google Maps Script has already been loaded and added to the body
        // console.log('TRYING TO GEOCODE!!!')
        // const geocoder = new window.google.maps.Geocoder();
        //Deconstruct the shipping address object
        // const { line1, line2, city, state, zipCode } = shippingAddressObj;
        // Create the address string we will feed to Google Maps, which will turn it into lat long coordinates
        // const addressForMap = `${line1} ${line2 ? line2 : ''} ${city}, ${state} ${zipCode}`;
        // const addressForMap = "1";
        //
        // geocoder.geocode( { 'address': addressForMap}, async function(results, status) {
        //   console.log('Google Maps Geocode Status: ')
        //   console.log(status)
        //   if (status === 'OK') {
        //     // console.log('Lat Lng for that address:')
        //     // console.log(results[0].geometry.location)
        //     // map.setCenter(results[0].geometry.location);
        //     // var marker = new window.google.maps.Marker({
        //     //     map: map,
        //     //     position: results[0].geometry.location
        //     // });
        //     order.shippingAddressLatLng.latLng = results[0].geometry.location;
        //     await axios.post('/api/orders', {
        //       order
        //     }, config);
        //     toast.success(`Order Placed Successfully!`, { position: "bottom-center", autoClose: 4000 });
        //     dispatch({ type: ORDER_LOADING_FALSE });
        //     // redirect users to the orders page
        //     history.push('/profile/orders')
        //   } else {
        //     const { data:data2 } = await axios.post('/api/orders', {
        //       order
        //     }, config);
        //     toast.success(`Order Placed Successfully!`, { position: "bottom-center", autoClose: 4000 });
        //     dispatch({ type: ORDER_LOADING_FALSE });
        //     // redirect users to the orders page
        //     history.push('/profile/orders')
        //     console.log('Failed to geocode the given address...')
        //   }
        // });
      // } else { //If, for some reason the google maps API didn't load we can try to place an order still
        await axios.post('/api/orders', {
          order
        }, config);
        toast.success(`Order Placed Successfully!`, { position: "bottom-center", autoClose: 4000 });
        dispatch({ type: ORDER_LOADING_FALSE });
        // redirect users to the orders page
        history.push('/profile/orders')
      // }
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
      addGoogleMapsScript('From payPalButtonClickHandler', dispatch, {type: MAP_LOADED_SCRIPT_TRUE});
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
        onApprove={(data, actions) => {
          // Capture the funds from the transaction
          return actions.order.capture().then( async function(details) {
            //Update the inventory in our database:
            updateInventory();
            // Update the User's Cart - Remove everything that was just sold
            updateUserCart();
            // Create an order and add it to our database
            createOrder(data);
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