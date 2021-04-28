import React, { useState, useEffect, useLayoutEffect } from 'react';
import { Card, Accordion, Row, Button } from 'react-bootstrap';
import { useAccordionToggle } from 'react-bootstrap/AccordionToggle';
import { getUserDetails } from '../actions/userActions';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';

import OffsetPageHeader from '../components/OffsetPageHeader';
import BillingInformation from '../components/CheckoutScreen/BillingInformation';
import ShippingInformation from '../components/CheckoutScreen/ShippingInformation';
import PaymentInformation from '../components/CheckoutScreen/PaymentInformation';
import ReviewAndSubmitOrder from '../components/CheckoutScreen/ReviewAndSubmitOrder.js';
import { CHECKOUT_RESET } from '../constants/checkoutConstants';
import Loader from '../components/Loader';


const CheckoutScreen = ({ history }) => {

  const dispatch = useDispatch();

  // Get Data from the global state
  const userInfo = useSelector(state => state.userLogin.userInfo);
  const { cart } = userInfo;

  const userDetails = useSelector(state => state.userDetails);
  const { loading } = userDetails;

  const billingAddress = useSelector(state => state.checkoutData.billingAddress);
  const { addressObject:billingAddressObj } = billingAddress;

  const shippingAddress = useSelector(state => state.checkoutData.shippingAddress);
  const { addressObject:shippingAddressObj } = shippingAddress;

  const paymentMethod = useSelector(state => state.checkoutData.paymentMethod);

  //Set up local state
  const [checkoutActiveKey, setCheckoutActiveKey] = useState("0");
  const [disableBillingInformation, setDisableBillingInformation] = useState(false);
  const [disableShippingInformation, setDisableShippingInformation] = useState(true);
  const [disablePaymentInformation, setDisablePaymentInformation] = useState(true);
  const [disableReviewAndSubmit, setDisableReviewAndSubmit] = useState(true);

  useEffect(() => {
    if(userInfo){
      if(cart.length === 0){ history.push('/') };
    }
  }, [userInfo, cart, history]);

  useEffect(() => {
    console.log('in CheckoutScreen useEffect')
    dispatch(getUserDetails('profile'));
  }, [dispatch])

  //This should clear our checkout data if the user navigates away from the checkout screen
  useLayoutEffect(() => () => {
    dispatch({type: CHECKOUT_RESET});
  }, [dispatch]);

  const submitCheckoutHandler = () => {
    console.log('clicked submit!')
  }

  const cartEditHandler = () => {
    history.push('/cart');
  }

  const billingAddressCheck = () => {// Check to make sure an address was chosen. If it wasn't, don't let the user proceed
    return billingAddressObj.line1 ?  true : false;
  }

  const shippingAddressCheck = () => {// Check to make sure an address was chosen. If it wasn't, don't let the user proceed
    return shippingAddressObj.line1 ?  true : false;
  }

  const paymentMethodCheck = () => {// Check to make sure an address was chosen. If it wasn't, don't let the user proceed
    return paymentMethod ?  true : false;
  }

  const CustomToggle = ({ children, nextActiveKey, disabledCheck, buttonPosition, verificationFunction, optionalOnClick }) => {
    const checkoutNextStepHandler = useAccordionToggle(nextActiveKey, () => {
      // Verify we are good to move on to the next step in the checkout process
      if(verificationFunction) { 
        if(!verificationFunction()) {return}
      };
      // If we need to add anything to the global state do it here
      if(optionalOnClick) { optionalOnClick() };
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
          className={`${(buttonPosition === 'left') && 'mr-2'} d-none d-md-flex`}
        >
          {children}
        </Button>
        <Button
          type="button"
          variant='outline-primary'
          onClick={checkoutNextStepHandler}
          disabled={disabledCheck}
          className={`${(buttonPosition === 'left') && 'mr-2'} d-xs-flex d-md-none`}
          size='sm'
        >
          {children}
        </Button>
      </>
    );
  }

  return (
    <>
      <OffsetPageHeader leftHeaderText='Checkout' rightHeaderText='Checkout' hrBoolean={false}/>
      {loading ? <Loader /> :
        <>
          <Accordion activeKey={checkoutActiveKey} className='mb-4'>
            {/* Billing Information */}
            <Card>
              <Card.Header>
                <Row className='justify-content-end align-items-center w-100 mx-0'>
                  <h5 className='mb-2 mb-md-0 mr-auto'>Billing Information</h5>
                  {!disableBillingInformation && 
                    <CustomToggle nextActiveKey="1" disabledCheck={disableBillingInformation} buttonPosition='right'
                    verificationFunction={billingAddressCheck}>
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
                  <h5 className='mb-2 mb-md-0 mr-auto'>Shipping Information</h5>
                  {!disableShippingInformation &&
                    <>
                      <CustomToggle nextActiveKey="0" disabledCheck={disableShippingInformation} buttonPosition='left'>
                        Go Back
                      </CustomToggle>
                      <CustomToggle nextActiveKey="2" disabledCheck={disableShippingInformation} buttonPosition='right'
                      verificationFunction={shippingAddressCheck}>
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
                  <h5 className='mb-2 mb-md-0 mr-auto'>Payment Information</h5>
                  {!disablePaymentInformation &&
                    <>
                      <CustomToggle nextActiveKey="1" disabledCheck={disablePaymentInformation} buttonPosition='left'>
                            Go Back
                      </CustomToggle>
                      <CustomToggle nextActiveKey="3" disabledCheck={disablePaymentInformation} buttonPosition='right'
                      verificationFunction={paymentMethodCheck}>
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
                  <h5 className='mb-2 mb-md-0 mr-auto'>Review and Submit</h5>
                    {!disableReviewAndSubmit &&
                      <>
                        <CustomToggle nextActiveKey="2" disabledCheck={disableReviewAndSubmit} buttonPosition='left'>
                              Go Back
                        </CustomToggle>                          
                      </>
                    }                  
                </Row>
              </Card.Header>
              <Accordion.Collapse eventKey="3">
                <Card.Body>
                  <ReviewAndSubmitOrder history={history}/>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          </Accordion>
          <Row className='justify-content-end px-3 mb-5'>
            <Button variant='danger' className='d-none d-md-flex justify-content-center align-items-center' onClick={cartEditHandler}>
              <FontAwesomeIcon icon={faPen} size="2x" fixedWidth /> <span className='ml-1'>Edit Cart</span>
            </Button>
            <Button variant='danger' size='sm' className='d-flex d-md-none justify-content-center align-items-center' onClick={cartEditHandler}>
              <FontAwesomeIcon icon={faPen} size="2x" fixedWidth /> <span className='ml-1'>Edit Cart</span>
            </Button>
          </Row>
        </>
      }
    </>
  )
}

export default CheckoutScreen;