//storing code here to show How I handled the geocoding
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
  shippingAddressLatLng: {
    latLng: null
  },
  shipped: false,
};

if(window.google){ //If the Google Maps Script has already been loaded and added to the body
  console.log('TRYING TO GEOCODE!!!')
  const geocoder = new window.google.maps.Geocoder();
  //Deconstruct the shipping address object
  const { line1, line2, city, state, zipCode } = shippingAddressObj;
  // Create the address string we will feed to Google Maps, which will turn it into lat long coordinates
  // const addressForMap = `${line1} ${line2 ? line2 : ''} ${city}, ${state} ${zipCode}`;
  const addressForMap = 1;
  //
  geocoder.geocode( { 'address': addressForMap}, async function(results, status) {
    console.log('Google Maps Geocode Status: ')
    console.log(status)
    if (status === 'OK') {
      console.log('Lat Lng for that address:')
      console.log(results[0].geometry.location)
      // map.setCenter(results[0].geometry.location);
      // var marker = new window.google.maps.Marker({
      //     map: map,
      //     position: results[0].geometry.location
      // });
      order.shippingAddressLatLng.latLng = results[0].geometry.location;
      await axios.post('/api/orders', {
        order
      }, config);
      toast.success(`Order Placed Successfully!`, { position: "bottom-center", autoClose: 4000 });
      dispatch({ type: ORDER_LOADING_FALSE });
      // redirect users to the orders page
      history.push('/profile/orders')
    } else {
      // alert('Geocode was not successful for the following reason: ' + status);
      // alert('Geocode was not successful for the following reason: ' + status);
      const { data:data2 } = await axios.post('/api/orders', {
        order
      }, config);
      toast.success(`Order Placed Successfully!`, { position: "bottom-center", autoClose: 4000 });
      dispatch({ type: ORDER_LOADING_FALSE });
      // redirect users to the orders page
      history.push('/profile/orders')
      console.log('Failed to geocode the given address...')
    }
  });
} else { //If, for some reason the google maps API didn't load we can try to place an order still
  await axios.post('/api/orders', {
    order
  }, config);
  toast.success(`Order Placed Successfully!`, { position: "bottom-center", autoClose: 4000 });
  dispatch({ type: ORDER_LOADING_FALSE });
  // redirect users to the orders page
  history.push('/profile/orders')
}
} catch (error) {
console.log('there was an error')
console.log(error)
console.log(error.message)
console.log(error.response.data.message && error.response.data.message)
toast.error(`Could not update your cart after placing the order. You can manually remove leftover items in it.`, { position: "bottom-center", autoClose: 5000 });
dispatch({ type: ORDER_LOADING_FALSE });
}