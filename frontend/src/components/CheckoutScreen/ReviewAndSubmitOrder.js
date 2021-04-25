import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Row, Form, Button, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { compose } from 'redux';

import Message from '../Message';
import { changeCheckoutStep } from '../../actions/checkoutActions';
import './BillingInformation.css';

const ReviewAndSubmitOrder = () => {

  const dispatch = useDispatch();

  const nextStepHandler = (e) => {
    console.log(`e.target.value: ${e.target.value}`)
    console.log('typeof e.target.value:', typeof e.target.value)
    dispatch(changeCheckoutStep(e.target.value));
  }

  const submitOrderHandler = () => {
    console.log('clicked submit order!')

  }

  // useEffect(() => {
  //   console.log('in addresses use effect')
  //   // if(addresses.length >= 1 && haveArrangedAddresses.current === false){
  //   if(addresses.length >= 1 ){
  //     console.log('we have addresses')
  //     console.log(addresses)
  //     const primaryAddress = [addresses[addresses.findIndex(i => i.isPrimary === true)]];
  //     const otherAddresses = addresses.filter(eachAddress => eachAddress.isPrimary === false);
  //     setAddressesToDisplay(primaryAddress.concat(otherAddresses));
  //     haveArrangedAddresses.current = true;
  //   } else { //if the user has no addresses
  //     setAddressesToDisplay([]);
  //   }
  //   return () => {
      
  //   }
  // }, [user, addresses])

  // useEffect(() => {
  //   if(user.name){
  //     if(addresses.length === 0){
  //       setShowNoAddressMessage(true);
  //     }
  //   }
  // }, [user.name, addresses])

  return (
    <Row className='d-flex justify-content-between w-100 m-0'>
      <Button 
        variant='primary' 
        value="-1"
        onClick={nextStepHandler} 
      >
        Go Back
      </Button>
      <Button variant='primary' className='mt-2' value="1" onClick={submitOrderHandler}>
        Submit Order
      </Button>
    </Row>
  )
}

export default ReviewAndSubmitOrder;