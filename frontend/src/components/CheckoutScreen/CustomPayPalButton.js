import React from 'react';
import axios from 'axios';
import { PayPalButton } from "react-paypal-button-v2";
import { useDispatch, useSelector } from 'react-redux';

const CustomPayPalButton = () => {

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
          // alert("Transaction completed by " + details.payer.name.given_name);

          // OPTIONAL: Call your server to save the transaction
          const addOrderToUser = async () => {
            try {
              // Set up our config for our backend
              const config = {
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${token}`
                }
              }
              console.log('config');
              console.log(config)
              // Create the order object we will send to the backend
              //Pull the items from our cart that are not 'saved for later'
              let orderItems = cart.filter(eachItem => eachItem.savedForLater === false);
              console.log('data.orderID', data.orderID)
              console.log('typeof data.orderID: ',typeof data.orderID)
              // order
              let order = {
                user: userID,
                paymentMethodID: data.orderID, //this comes from PayPal, or another method if we add it
                items: orderItems,
                // subTotal: subTotal,
                subTotal,
                // shippingCost: shippingCost,
                shippingCost,
                // cartTotal: cartTotal
                cartTotal,
                itemTally,
                paymentMethod,
                billingAddress: billingAddressObj,
                // billingAddress: '',
                shippingAddress: shippingAddressObj,
                // shippingAddress: '',
                shipped: false
              }
              console.log('order before sending to backend:')
              console.log(order)
              const { data:data2 } = await axios.post('/api/users/orders', {
                order
              }, config);
              console.log('data2:')
              console.log(data2)
              // We've set up the backend to send us back the updated user information once the user's cart is updated. We need to 
              // dispatch the user login again to update the user's cart in the global state
              // dispatch({
              //   type: USER_LOGIN_SUCCESS,
              //   payload: data2
              // });
              // localStorage.setItem('userInfo', JSON.stringify(data));
            } catch (error) {
              console.log('there was an error')
              console.log(error)
              console.log(error.message)
              console.log(error.response.data.message)

              // error.response.data.message : error.message
              // toast.error(`Could not add ${productName} to your cart. Try again later.`, { position: "top-right", autoClose: 3500 });
            } 
          }
          addOrderToUser();

          // return fetch("/paypal-transaction-complete", {
          //   method: "post",
          //   body: JSON.stringify({
          //     orderID: data.orderID
          //   })
          // });
        });
      }}
    />
      
  )
}

export default CustomPayPalButton;


// user: {
//   type: mongoose.Schema.Types.ObjectId,
//   required: true,
//   ref: 'User'
// },
// paymentMethodID: {
//   type: String,
//   required: true
// },
// items: [],
// subTotal: {
//   type: Number,
//   required: true
// },
// shippingCost: {
//   type: Number,
//   required: true
// },
// cartTotal: {
//   type: Number,
//   required: true
// },
// itemTally: {
//   type: Number,
//   required: true
// },
// paymentMethod: {
//   type: String,
//   required: true
// },
// billingAddress: {
//   type: Object,
//   required: true
// },
// shippingAddress: {
//   type: Object,
//   required: true
// },
// shipped: {
//   type: Boolean,
//   required: true,
//   default: false
// }