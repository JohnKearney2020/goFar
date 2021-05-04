import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Row, Button, Col, ListGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { withRouter } from 'react-router-dom'; //Since this component does not have access to the history prop

import CartRow from '../CartScreen/CartRow';
import { checkoutSubTotal, checkoutItemTally, checkoutShippingCost, checkoutCartTotal } from '../../actions/checkoutActions';
import Loader from '../Loader';
import Message from '../Message';
import CustomPayPalButton from '../CheckoutScreen/CustomPayPalButton';


const ReviewAndSubmitOrder = ({ history }) => {

  const dispatch = useDispatch();

  // Get data from the Global State
  const userInfo = useSelector(state => state.userLogin.userInfo);
  const { cart } = userInfo;

  const billingAddress = useSelector(state => state.checkoutData.billingAddress);
  const { addressObject:billingAddressObj } = billingAddress;

  const shippingAddress = useSelector(state => state.checkoutData.shippingAddress);
  const { addressObject:shippingAddressObj } = shippingAddress;

  const checkoutData = useSelector(state => state.checkoutData);
  const { subTotal, shippingCost, itemTally, cartTotal } = checkoutData;

  const paymentMethod = useSelector(state => state.checkoutData.paymentMethod);

  //Set up local state
  const [sdkReady, setSdkReady] = useState(false); //for paypal

  useEffect(() => {
    let unmounted = false;
    console.log('in top level useEffect')
    console.log('history in Review and submit order:')
    console.log(history)
    if(userInfo){
      console.log('in level below that')
      if(cart.length > 0){
        console.log('in final level')
        // Find how many items are in the cart
        dispatch(checkoutItemTally(cart.reduce((acc, item) => acc + (item.savedForLater ? 0 : item.quantity), 0)))
        // Find the subtotal of the cart
        let tempCartSubTotal = Number(cart.reduce((acc,item) => acc + (item.savedForLater ? 0 : item.quantity) * item.price, 0).toFixed(2));
        dispatch(checkoutSubTotal(tempCartSubTotal));
        // Figure out cost of shipping. Free shipping at $49 or more. otherwise $7.99 flat rate
        let tempCartShipping = tempCartSubTotal > 49 ? 0 : 7.99;
        dispatch(checkoutShippingCost(tempCartShipping))
        // Calculate the total cost of the cart - items + shipping
        let cartTotal = (Number(tempCartSubTotal) + Number(tempCartShipping));
        dispatch(checkoutCartTotal(cartTotal));

        // PayPal
        const addPayPalScript = async () => {
          const { data: clientID } = await axios.get('/api/config/paypal');
          console.log(clientID);
          const script = document.createElement('script');
          script.type = 'text/javascript';
          script.src = `https://www.paypal.com/sdk/js?client-id=${clientID}&disable-funding=credit,card`
          
          script.async = true;
          if(!unmounted && window.paypal){ //Only mount the script if this component is mounted and don't mount the script if the script is already there
            setSdkReady(true);
          } else if(!unmounted && !window.paypal){
            console.log('mounting script')
            script.onload = () => {
              setSdkReady(true);
            }
            document.body.appendChild(script);
          }
        }
        addPayPalScript();
      }
    }
    return () => { unmounted = true };
  }, [userInfo, cart, history, dispatch]);

  const cartEditHandler = () => {
    history.push('/cart');
  }

  const successPaymentHandler = (paymentResult) => {
    console.log(paymentResult);
    console.log('Payment was successful!')
  }

  return (
    <>
      {/* Addresses */}
      <Row>
        {/* ============================================== */}
        {/*               Billing Address                  */}
        {/* ============================================== */}
        <Col md={6}>
          <Card border='light'>
            <ListGroup variant='flush'>
              <ListGroup.Item className='border-0'>
                <h4>Billing Address</h4>
              </ListGroup.Item>
              {billingAddressObj.addressName &&
                <ListGroup.Item className='border-0 py-0'>
                  <h6 className='mb-1 ml-2'>{billingAddressObj.addressName}</h6>
                </ListGroup.Item>
              }
              <ListGroup.Item className='border-0 py-0'>
                <h6 className='mb-1 ml-2'>{billingAddressObj.line1}</h6>
              </ListGroup.Item>
              {billingAddressObj.line2 &&
                <ListGroup.Item className='border-0 py-0'> 
                <h6 className='mb-1 ml-2'>{billingAddressObj.line2}</h6>
                </ListGroup.Item>
              }
              <ListGroup.Item className='border-0 py-0'>
                <h6 className='mb-1 ml-2'>{billingAddressObj.city}, {billingAddressObj.state} {billingAddressObj.zipCode}</h6>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
        {/* ============================================== */}
        {/*               Shipping Address                 */}
        {/* ============================================== */}
        <Col md={6}>
          <Card border='light'>
            <ListGroup variant='flush'>
                <ListGroup.Item className='border-0'>
                  <h4>Shipping Address</h4>
                </ListGroup.Item>
                {shippingAddressObj.addressName &&
                  <ListGroup.Item className='border-0 py-0'>
                    <h6 className='mb-1 ml-2'>{shippingAddressObj.addressName}</h6>
                  </ListGroup.Item>
                }
                <ListGroup.Item className='border-0 py-0'>
                  <h6 className='mb-1 ml-2'>{shippingAddressObj.line1}</h6>
                </ListGroup.Item>
                {shippingAddressObj.line2 &&
                  <ListGroup.Item className='border-0 py-0'> 
                  <h6 className='mb-1 ml-2'>{shippingAddressObj.line2}</h6>
                  </ListGroup.Item>
                }
                <ListGroup.Item className='border-0 py-0'>
                  <h6 className='mb-1 ml-2'>{shippingAddressObj.city}, {shippingAddressObj.state} {shippingAddressObj.zipCode}</h6>
                </ListGroup.Item>
              </ListGroup>
          </Card>
        </Col>
      </Row>
      {/* ============================================== */}
      {/*       Payment Method and Cart Totals Row       */}
      {/* ============================================== */}
      <Row className='mt-3'>
        {/* ============================================== */}
        {/*                Payment Method                  */}
        {/* ============================================== */}
        <Col md={6}>
          <Card border='light'>
            <ListGroup variant='flush'>
              <ListGroup.Item className='border-0'>
                <h4>Payment Method</h4>
              </ListGroup.Item>
              <ListGroup.Item className='border-0 py-0'>
                <h6 className='mb-1 ml-2'>{paymentMethod}</h6>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
        {/* ============================================== */}
        {/*                Cart Totals                     */}
        {/* ============================================== */}
        <Col md={6}>
          <Card border='light'>
            <ListGroup variant='flush'>
              <ListGroup.Item className='border-0'>
              <h4>{`Subtotal (${itemTally} items):`}</h4>
                <ListGroup variant='flush'>
                  <ListGroup.Item className='border-0 py-0'>
                    Item Subtotal: <span className='font-weight-bold'>${subTotal}</span>
                  </ListGroup.Item>
                  <ListGroup.Item className='pt-0 pb-1'>
                    Shipping: <span className='font-weight-bold'>{shippingCost === 0 ? 'FREE' : '$7.99'}</span>
                  </ListGroup.Item>
                  <ListGroup.Item className='border-0'>
                    Total Before Tax: <span className='font-weight-bold'>${cartTotal}</span>
                  </ListGroup.Item>
                </ListGroup>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
      {/* ============================================== */}
      {/*          Edit Cart and PayPal Buttons          */}
      {/* ============================================== */}
      <Row className='justify-content-end px-3 mb-3 mt-3'>
        {/* ============================================== */}
        {/*              Checkout Instructions             */}
        {/* ============================================== */}
        <Col md={6}>
          <Card border='light'>
            <ListGroup variant='flush'>
              <ListGroup.Item className='border-0'>
                <h4>Checkout Instructions:</h4>
              </ListGroup.Item>
              <ListGroup.Item className='border-0 py-0 mx-2'>
                <Message variant='success'>
                  <p className='lead my-0'>You can conduct a mock transaction thanks to PayPal's sandbox mode! Don't worry - no real money is used.</p>
                </Message>,
              </ListGroup.Item>
              <ListGroup.Item className='border-0 py-0 mx-2'>
                <Message variant='info'>
                  <p className='mb-2'>Use this account info PayPal</p>
                  <p className='my-0 ml-2'>Email: <span className='font-weight-bold'>gofar@example.com</span></p>
                  <p className='my-0 ml-2'>Password: <span className='font-weight-bold'>gofarpass</span></p>
                </Message>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
        {/* ============================================== */}
        {/*                PayPal Button                   */}
        {/* ============================================== */}
        <Col md={6}>
          <Card border='light'>
            <ListGroup variant='flush'>
              <ListGroup.Item className='border-0'>
                <h4>Checkout with PayPal:</h4>
              </ListGroup.Item>
              <ListGroup.Item className='border-0 py-0 mx-2'>
                {sdkReady && <CustomPayPalButton history={history}/>}
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
      {/* ============================================== */}
      {/*                Edit Cart Button                */}
      {/* ============================================== */}
      <Row className='justify-content-end px-4 mb-3 mt-3 w-100'>
        <Button variant='danger' className='d-none d-md-flex justify-content-center align-items-center mr-1' onClick={cartEditHandler}>
          <FontAwesomeIcon icon={faPen} size="2x" fixedWidth /> <span className='ml-1'>Edit Cart</span>
        </Button>
        <Button variant='danger' size='sm' className='d-flex d-md-none justify-content-center align-items-center' onClick={cartEditHandler}>
          <FontAwesomeIcon icon={faPen} size="2x" fixedWidth /> <span className='ml-1'>Edit Cart</span>
        </Button>
      </Row>
      {/* ============================================== */}
      {/*                Products in Cart                */}
      {/* ============================================== */}
      <Row> {/* Cart Items */}
        <Col className='' md={12}> {/* Left Side of Screen */}
          <ListGroup variant='flush'>
          {/*===================*/}
          {/*    Table Header   */}
          {/*===================*/}
            <ListGroup.Item className='d-none d-md-block'>
              <Row className='align-items-center justify-content-center shadow mb-3' style={{"backgroundColor":"rgba(0,0,0,.03)"}}>
                <Col md={5} className='text-center'>
                  <span className='font-weight-bold'>Product</span>
                </Col>
                <Col md={1} className='text-center'>
                  <span className='font-weight-bold'>Color</span>
                </Col>
                <Col md={2} className='text-center'>
                  <span className='font-weight-bold'>Size</span>
                </Col>
                <Col md={1} className='text-center'>
                  <span className='font-weight-bold'>Qty</span>              
                </Col>
                <Col md={2} className='text-center'>
                  <span className='font-weight-bold'>Current Price</span>
                </Col>
                <Col md={1} className='text-center'>
                  {/* placeholder for missing delete icon */}
                </Col>
              </Row> 
            </ListGroup.Item>
            {/*===================*/}
            {/* Items in Cart     */}
            {/*===================*/}
            {cart.map((eachProduct) => (
              eachProduct.savedForLater === false &&
              <CartRow key={`${eachProduct.productID}${eachProduct.name}${eachProduct.color}${eachProduct.size}${eachProduct.sizeCategory}`}
                productID={eachProduct.productID}
                name={eachProduct.name}
                color={eachProduct.color}
                size={eachProduct.size}
                sizeCategory={eachProduct.sizeCategory}
                price={eachProduct.price}
                qty={eachProduct.quantity}
                image={eachProduct.image}
                savedForLater={eachProduct.savedForLater}
                hideButtons={true}
              />
            ))}
          </ListGroup>
        </Col> {/* End of Left Side of Screen */}
      </Row>
    </>
  )
}

// export default ReviewAndSubmitOrder;
export default withRouter(ReviewAndSubmitOrder);