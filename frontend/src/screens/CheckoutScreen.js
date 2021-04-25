import React, { useState, useEffect } from 'react';
import { Card, Accordion, Row, Button } from 'react-bootstrap';
import { useAccordionToggle } from 'react-bootstrap/AccordionToggle';
import { getUserDetails } from '../actions/userActions';
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

  //Set up local state
  const [checkoutActiveKey, setCheckoutActiveKey] = useState("0");
  const [disableBillingInformation, setDisableBillingInformation] = useState(false);
  const [disableShippingInformation, setDisableShippingInformation] = useState(true);
  const [disablePaymentInformation, setDisablePaymentInformation] = useState(true);
  const [disableReviewAndSubmit, setDisableReviewAndSubmit] = useState(true);

  useEffect(() => {
    if(userInfo){
      if(cart.length === 0){
        history.push('/');
      }
    }
  }, [userInfo, cart, history]);

  useEffect(() => {
    console.log('in CheckoutScreen useEffect')
    dispatch(getUserDetails('profile'));
    return () => {
      
    }
  }, [dispatch])

  const submitCheckoutHandler = () => {
    console.log('clicked submit!')
  }

  const CustomToggle = ({ children, nextActiveKey, disabledCheck, buttonPosition }) => {
    const checkoutNextStepHandler = useAccordionToggle(nextActiveKey, () => {
      setCheckoutActiveKey(nextActiveKey);
      switch (nextActiveKey) {
        case '0':
          setDisableBillingInformation(false);
          setDisableShippingInformation(true);
          break;
        case '1':
          setDisableBillingInformation(true);
          setDisableShippingInformation(false);
          setDisablePaymentInformation(true);
          break;
        case '2':
          setDisableShippingInformation(true);
          setDisablePaymentInformation(false);
          setDisableReviewAndSubmit(true);
          break;
        case '3':
          setDisablePaymentInformation(true);
          setDisableReviewAndSubmit(false);
          break;
        default:
          break;
        }
      },
    );
  
    return (
      <>
        <Button
          type="button"
          variant='outline-primary'
          onClick={checkoutNextStepHandler}
          disabled={disabledCheck}
          className={(buttonPosition === 'left') && 'mr-2'}
        >
          {children}
        </Button>
      </>
    );
  }

  
  return (
    <>
      <OffsetPageHeader leftHeaderText='Checkout' rightHeaderText='Checkout' hrBoolean={false}/>
      <Accordion activeKey={checkoutActiveKey}>
        {/* Billing Information */}
        <Card>
          <Card.Header>
            <Row className='justify-content-end align-items-center w-100 mx-0'>
              {/* <h5 className='mr-auto align-self-center w-100 h-100'>Billing Information</h5> */}
              <h5 className='mb-0 mr-auto'>Billing Information</h5>
              {!disableBillingInformation && 
                <CustomToggle nextActiveKey="1" disabledCheck={disableBillingInformation} buttonPosition='right'>
                  Continue
                </CustomToggle>
              }
            </Row>
          </Card.Header>
          <Accordion.Collapse eventKey="0">
            <Card.Body>
              <BillingInformation />
            </Card.Body>
          </Accordion.Collapse>
        </Card>
        {/* Shipping Information */}
        <Card>
          <Card.Header>
            <Row className='justify-content-end align-items-center w-100 mx-0'>
              <h5 className='mb-0 mr-auto'>Shipping Information</h5>
              {!disableShippingInformation &&
                <>
                  <CustomToggle nextActiveKey="0" disabledCheck={disableShippingInformation} buttonPosition='left'>
                    Go Back
                  </CustomToggle>
                  <CustomToggle nextActiveKey="2" disabledCheck={disableShippingInformation} buttonPosition='right'>
                    Continue
                  </CustomToggle>
                </>
              }
            </Row>
          </Card.Header>
          <Accordion.Collapse eventKey="1">
            <Card.Body>
              <ShippingInformation />
            </Card.Body>
          </Accordion.Collapse>
        </Card>
        {/* Payment Information */}
        <Card>
          <Card.Header>
            <Row className='justify-content-end align-items-center w-100 mx-0'>
              <h5 className='mb-0 mr-auto'>Payment Information</h5>
              {!disablePaymentInformation &&
                <>
                  <CustomToggle nextActiveKey="1" disabledCheck={disablePaymentInformation} buttonPosition='left'>
                        Go Back
                  </CustomToggle>
                  <CustomToggle nextActiveKey="3" disabledCheck={disablePaymentInformation} buttonPosition='right'>
                        Continue
                  </CustomToggle>
                </>
              }
            </Row>
          </Card.Header>
          <Accordion.Collapse eventKey="2">
            <Card.Body>
              <PaymentInformation />
            </Card.Body>
          </Accordion.Collapse>
        </Card>
        {/* Review and submit order */}
        <Card>
            <Card.Header>
              <Row className='justify-content-end align-items-center w-100 mx-0'>
                <h5 className='mb-0 mr-auto'>Review and Submit order</h5>
                {!disableReviewAndSubmit &&
                <>
                  <CustomToggle nextActiveKey="2" disabledCheck={disableReviewAndSubmit} buttonPosition='left'>
                        Go Back
                  </CustomToggle>
                  <Button value="" disabled={disableReviewAndSubmit} onClick={submitCheckoutHandler}>
                        Submit Order
                  </Button>
                </>
              }
              </Row>
            </Card.Header>
          <Accordion.Collapse eventKey="3">
            <Card.Body>
              <ReviewAndSubmitOrder />
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
    </>
  )
}

export default CheckoutScreen;