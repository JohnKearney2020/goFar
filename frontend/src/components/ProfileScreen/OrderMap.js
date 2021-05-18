import React, { useRef, useEffect } from 'react';
import {  useSelector } from 'react-redux';
import './OrderMap.css';

const OrderMap = ({ shippingAddressString, zoom, latLng }) => {
  const mapRef = useRef();
  // const { line1, line2, city, state, zipCode } = address;

  // const addressForMap = `${line1} ${line2 ? line2 : ''} ${city}, ${state} ${zipCode}`;

  // Get the mapLoadedScript status from the global state
  const mapScriptLoaded = useSelector(state => state.mapLoadedScript.loaded);
  // const { cart } = userInfo;

  useEffect(() => {
    // if(window.google){ //If the Google Maps Script has already been loaded and added to the body
    if(mapScriptLoaded && window.google){ //If the Google Maps Script has already been loaded and added to the body
      const map = new window.google.maps.Map(mapRef.current, {
        zoom: zoom
      });
    
      map.setCenter(latLng);
      var marker = new window.google.maps.Marker({
        map: map,
        position: latLng
      });
    }
    return () => {
      
    }
  }, [zoom, mapScriptLoaded]);

  return (
    <div ref={mapRef} className='map'>
      
    </div>
  )
}

export default OrderMap;
