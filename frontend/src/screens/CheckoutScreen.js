import React, { useState, useEffect, useRef, useContext } from 'react';
import { Card, Accordion, Row, Col, Button } from 'react-bootstrap';
import { useAccordionToggle } from 'react-bootstrap/AccordionToggle';
import { getUserDetails, updateUserProfile } from '../actions/userActions';
import { useDispatch, useSelector } from 'react-redux';

import OffsetPageHeader from '../components/OffsetPageHeader';
import BillingInformation from '../components/CheckoutScreen/BillingInformation';
import ShippingInformation from '../components/CheckoutScreen/ShippingInformation';
import PaymentInformation from '../components/CheckoutScreen/PaymentInformation';
import ReviewAndSubmitOrder from '../components/CheckoutScreen/PaymentInformation';


const CheckoutScreen = ({ history }) => {

  const dispatch = useDispatch();

  const userInfo = useSelector(state => state.userLogin.userInfo);
  const { cart } = userInfo;

  const checkoutActiveKey = useSelector(state => state.checkoutSteps.checkoutActiveKey);
  console.log(`checkoutActiveKey: ${checkoutActiveKey}`)
  console.log('type of checkoutActiveKey:')
  console.log(typeof checkoutActiveKey)
  // const { cart } = userInfo;

  //Set up local state


  useEffect(() => {
    if(userInfo){
      if(cart.length === 0){
        history.push('/');
      }
    }
    if(checkoutActiveKey){ //If we've loaded this from the global state
      // useAccordionToggle(checkoutActiveKey);
      console.log(`checkoutActiveKey: ${checkoutActiveKey}`)
    }
    return () => {
      
    }
  }, [userInfo, cart, checkoutActiveKey]);

  useEffect(() => {
    console.log('in CheckoutScreen useEffect')
    dispatch(getUserDetails('profile'));
    return () => {
      
    }
  }, [dispatch])

  function CustomToggle({ children, eventKey }) {
    const decoratedOnClick = useAccordionToggle(eventKey, () =>
      console.log('totally custom!'),
    );
  
    return (
      <>
        {/* <BillingInformation /> */}
        <Button
          type="button"
          // style={{ backgroundColor: 'pink' }}
          onClick={decoratedOnClick}
        >
          {children}
        </Button>
      </>

    );
  }

  
  return (
    <>
      <OffsetPageHeader leftHeaderText='Checkout' rightHeaderText='Checkout' hrBoolean={false}/>
      {/* <h4 className='my-4'>Choose an Address</h4> */}
      {/* <Accordion defaultActiveKey="0" activeKey={checkoutActiveKey}> */}
      <Accordion defaultActiveKey="0">
        {/* Billing Information */}
        <Card>
          {/* <Accordion.Toggle as={Card.Header} eventKey="0"> */}
            <Card.Header>
              <Row className='justify-content-between align-items-center w-100 mx-0'>
                <h5 className='m-0'>Billing Information</h5>
                <CustomToggle eventKey="0">
                  Continue
                </CustomToggle>
              </Row>
            </Card.Header>
          {/* </Accordion.Toggle> */}
          <Accordion.Collapse eventKey="0">
            <Card.Body>
              <BillingInformation />
            </Card.Body>
          </Accordion.Collapse>
        </Card>
        {/* Shipping Information */}
        <Card>
          {/* <Accordion.Toggle as={Card.Header} eventKey="1"> */}
          <Card.Header>
            <h5 className='m-0'>Shipping Information</h5>
          </Card.Header>
          {/* </Accordion.Toggle> */}
          <Accordion.Collapse eventKey="1">
            <Card.Body>
              <ShippingInformation />
            </Card.Body>
          </Accordion.Collapse>
        </Card>
        {/* Payment Information */}
        {/* <Card>
          <Accordion.Toggle as={Card.Header} eventKey="2">
            <h5 className='m-0'>Payment Information</h5>
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="2">
            <Card.Body>
              <PaymentInformation />
            </Card.Body>
          </Accordion.Collapse>
        </Card> */}
        {/* Review and submit order */}
        {/* <Card>
          <Accordion.Toggle as={Card.Header} eventKey="3">
            <h5 className='m-0'>Review and Submit order</h5>
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="3">
            <Card.Body>
              <ReviewAndSubmitOrder />
            </Card.Body>
          </Accordion.Collapse>
        </Card> */}
      </Accordion>
    </>
  )
}

export default CheckoutScreen;