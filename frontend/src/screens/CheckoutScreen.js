import React, { useState, useEffect } from 'react';
import { Card, Accordion, Row, Button } from 'react-bootstrap';
import { useAccordionToggle } from 'react-bootstrap/AccordionToggle';
import { getUserDetails } from '../actions/userActions';
import { useDispatch, useSelector } from 'react-redux';

import OffsetPageHeader from '../components/OffsetPageHeader';
import BillingInformation from '../components/CheckoutScreen/BillingInformation';
import ShippingInformation from '../components/CheckoutScreen/ShippingInformation';
import PaymentInformation from '../components/CheckoutScreen/PaymentInformation';
import ReviewAndSubmitOrder from '../components/CheckoutScreen/ReviewAndSubmitOrder.js';
import Loader from '../components/Loader';


const CheckoutScreen = ({ history }) => {

  const dispatch = useDispatch();

  // Get Data from the global state
  const userInfo = useSelector(state => state.userLogin.userInfo);
  const { cart } = userInfo;

  const userDetails = useSelector(state => state.userDetails);
  const { loading, error, user } = userDetails;
  const addresses = user.addresses;

  //Set up local state
  const [checkoutActiveKey, setCheckoutActiveKey] = useState("0");
  const [disableBillingInformation, setDisableBillingInformation] = useState(false);
  const [disableShippingInformation, setDisableShippingInformation] = useState(true);
  const [disablePaymentInformation, setDisablePaymentInformation] = useState(true);
  const [disableReviewAndSubmit, setDisableReviewAndSubmit] = useState(true);
  const [addressesToDisplay, setAddressesToDisplay] = useState([]);

  //Local State holding data needed to complete order
  const [billingAddress, setBillingAddress] = useState('');
  const [shippingAddress, setShippingAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('PayPal');
  const [cartSubTotal, setCartSubTotal] = useState(0);
  const [cartItemTally, setCartItemTally] = useState(0);
  const [shippingTotal, setShippingTotal] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);

    // If there are no addresses on file
  const [showNoAddressMessage, setShowNoAddressMessage] = useState(false);
  const noAddressMessage = 'No addresses found. Add an address to proceed with your order.'

  useEffect(() => {
    if(userInfo){
      if(cart.length === 0){
        history.push('/');
      }
      if(cart.length > 0){
        // Find how many items are in the cart
        setCartItemTally(cart.reduce((acc, item) => acc + (item.savedForLater ? 0 : item.quantity), 0));
        // Find the subtotal of the cart
        let tempCartSubTotal = cart.reduce((acc,item) => acc + (item.savedForLater ? 0 : item.quantity) * item.price, 0).toFixed(2);
        setCartSubTotal(tempCartSubTotal);
        // Figure out cost of shipping. Free shipping at $49 or more. otherwise $7.99 flat rate
        let tempCartShipping = tempCartSubTotal > 49 ? 0 : 7.99;
        setShippingTotal(tempCartShipping);
        console.log('typeof tempCartSubTotal: ', typeof tempCartSubTotal)
        // tempCartSubTotal > 49 ? setShippingTotal(0) : setShippingTotal(7.99);
        let cartTotal = (Number(tempCartSubTotal) + Number(tempCartShipping));
        setCartTotal(cartTotal);
      }

    }
  }, [userInfo, cart, history]);

  useEffect(() => {
    console.log('in CheckoutScreen useEffect')
    dispatch(getUserDetails('profile'));
    return () => {
      
    }
  }, [dispatch])

  useEffect(() => {
    if(addresses.length > 0){
      setShowNoAddressMessage(false);
      console.log('we have addresses')
      console.log(addresses)
      const primaryAddress = [addresses[addresses.findIndex(i => i.isPrimary === true)]];
      // If we have a primary address, go ahead and set it as the billing address in local state
      const primAddressAsString = `
        ${primaryAddress[0].addressName && primaryAddress[0].addressName + ','} 
        ${primaryAddress[0].line1},
        ${primaryAddress[0].line2 && primaryAddress[0].line2 + ','}
        ${primaryAddress[0].city},
        ${primaryAddress[0].state},
        ${primaryAddress[0].zipCode}
        ${primaryAddress[0].isPrimary === true ? ('- ' + '( Primary )') : ''}`
      setBillingAddress(primAddressAsString);
      const otherAddresses = addresses.filter(eachAddress => eachAddress.isPrimary === false);
      setAddressesToDisplay(primaryAddress.concat(otherAddresses));
      // haveArrangedAddresses.current = true;
    } else if(addresses.length === 0) { //if the user has no addresses
      setAddressesToDisplay([]);
      setShowNoAddressMessage(true);
    }
    return () => {

    }
  }, [addresses])

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
      {loading ? <Loader /> :
        <>
          <Accordion activeKey={checkoutActiveKey} className='mb-5'>
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
                  <BillingInformation setBillingAddress={setBillingAddress} billingAddress={billingAddress} addressesToDisplay={addressesToDisplay} noAddressMessage={noAddressMessage} showNoAddressMessage={showNoAddressMessage}/>
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
                  <ShippingInformation addressesToDisplay={addressesToDisplay} billingAddress={billingAddress} setShippingAddress={setShippingAddress} shippingAddress={shippingAddress}/>
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
                  <PaymentInformation paymentMethod={paymentMethod} setPaymentMethod={setPaymentMethod}/>
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
                  <ReviewAndSubmitOrder cartSubTotal={cartSubTotal} shippingTotal={shippingTotal} cartItemTally={cartItemTally} cartTotal={cartTotal} billingAddress={billingAddress} shippingAddress={shippingAddress}/>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          </Accordion>
        </>
      }
      {/* <h4>billingAddress:</h4>
      <h5>{billingAddress}</h5>
      <h4>shippingAddress:</h4>
      <h5>{shippingAddress}</h5>
      <h4>paymentMethod:</h4>
      <h5>{paymentMethod}</h5> */}
      <h4>shipping total:</h4>
      <h5>{shippingTotal}</h5>
    </>
  )
}

export default CheckoutScreen;