import React from 'react';
import { PayPalButton } from "react-paypal-button-v2";
import { useDispatch, useSelector } from 'react-redux';

const CustomPayPalButton = () => {

  const shippingAddress = useSelector(state => state.checkoutData.shippingAddress);
  const { addressObject:shippingAddressObj } = shippingAddress;

  const checkoutData = useSelector(state => state.checkoutData);
  const { subTotal, shippingCost, itemTally, cartTotal } = checkoutData;


  return (
    <PayPalButton 
      createOrder={(data, actions) => {
        return actions.order.create({
          application_context: {
            shipping_preference: 'SET_PROVIDED_ADDRESS',
          },
          // payer: {
          //   name: {
          //     full_name: "Test Name"
          //   }
          // },
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
            } 
          }]
          // application_context: {
          //   shipping_preference: "NO_SHIPPING" // default is "GET_FROM_FILE"
          // }
        });
      }}
      onApprove={(data, actions) => {
        // Capture the funds from the transaction
        return actions.order.capture().then(function(details) {
          // Show a success message to your buyer
          alert("Transaction completed by " + details.payer.name.given_name);

          // OPTIONAL: Call your server to save the transaction
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

