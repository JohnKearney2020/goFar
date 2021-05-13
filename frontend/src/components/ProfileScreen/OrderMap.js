import React, { useRef, useEffect } from 'react';

import './OrderMap.css';

const OrderMap = ({ address, zoom }) => {
  const mapRef = useRef();
  const { line1, line2, city, state, zipCode } = address;

  const addressForMap = `${line1} ${line2 ? line2 : ''} ${city}, ${state} ${zipCode}`;

  useEffect(() => {
    const geocoder = new window.google.maps.Geocoder();

    const map = new window.google.maps.Map(mapRef.current, {
      zoom: zoom
    });
  
    geocoder.geocode( { 'address': addressForMap}, function(results, status) {
      if (status == 'OK') {
        map.setCenter(results[0].geometry.location);
        var marker = new window.google.maps.Marker({
            map: map,
            position: results[0].geometry.location
        });
      } else {
        alert('Geocode was not successful for the following reason: ' + status);
      }
    });

    return () => {
      
    }
  }, [zoom]);

  return (
    <div ref={mapRef} className='map'>
      
    </div>
  )
}

export default OrderMap;
