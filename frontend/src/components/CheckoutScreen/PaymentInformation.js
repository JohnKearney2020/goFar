import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Row, Form, Button, Col } from 'react-bootstrap';

import { checkoutPaymentMethod } from '../../actions/checkoutActions';

const PaymentInformation = () => {

  // const paymentOptions = ['PayPal or Credit Card', 'Test'];

  const dispatch = useDispatch();

  const paymentMethod = useSelector(state => state.checkoutData.paymentMethod);


  useEffect(() => {
    if(!paymentMethod){ //Populate the global state with the first payment method
      dispatch(checkoutPaymentMethod('PayPal'));
    }
  }, [dispatch, paymentMethod])

  const paymentMethodHandler = (paymentMethod) => {
    dispatch(checkoutPaymentMethod(paymentMethod));
  }

  return (
    <Form>
      <Form.Group>
        <Form.Label as='legend'>Select Payment Method...</Form.Label>
        <Col>
          <Form.Check 
            type='radio' 
            label='PayPal or Credit Card' 
            id='PayPal' 
            name='PayPal' 
            value='PayPal'
            checked
            onChange={(e) => { paymentMethodHandler(e.target.value) }}
          ></Form.Check>
        </Col>
      </Form.Group>
    </Form>
  )
}

export default PaymentInformation;