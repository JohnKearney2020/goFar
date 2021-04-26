import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Row, Form, Button, Col } from 'react-bootstrap';


const PaymentInformation = ({ paymentMethod, setPaymentMethod }) => {

  return (
    <Form>
      <Form.Group>
        <Form.Label as='legend'>Select Payment Method</Form.Label>
        <Col>
          <Form.Check 
            type='radio' 
            label='PayPal or Credit Card' 
            id='PayPal' 
            name='paymentMethod' 
            value={paymentMethod} 
            checked
            onChange={(e) => { setPaymentMethod(e.target.value) }}
          ></Form.Check>
        </Col>
      </Form.Group>
    </Form>
  )
}

export default PaymentInformation;