import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Row, Button, Col, ListGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';

import CartRow from '../CartScreen/CartRow';
import { checkoutSubTotal, checkoutItemTally, checkoutShippingCost, checkoutCartTotal } from '../../actions/checkoutActions'


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


  useEffect(() => {
    if(userInfo){
      if(cart.length > 0){
        // Find how many items are in the cart
        dispatch(checkoutItemTally(cart.reduce((acc, item) => acc + (item.savedForLater ? 0 : item.quantity), 0)))
        // Find the subtotal of the cart
        let tempCartSubTotal = Number(cart.reduce((acc,item) => acc + (item.savedForLater ? 0 : item.quantity) * item.price, 0).toFixed(2));
        console.log('typeof tempCartSubTotal: ', typeof tempCartSubTotal)
        dispatch(checkoutSubTotal(tempCartSubTotal));
        // Figure out cost of shipping. Free shipping at $49 or more. otherwise $7.99 flat rate
        let tempCartShipping = tempCartSubTotal > 49 ? 0 : 7.99;
        dispatch(checkoutShippingCost(tempCartShipping))
        // Calculate the total cost of the cart - items + shipping
        let cartTotal = (Number(tempCartSubTotal) + Number(tempCartShipping));
        dispatch(checkoutCartTotal(cartTotal))
      }
    }
  }, [userInfo, cart, history, dispatch]);

  const cartEditHandler = () => {
    history.push('/cart');
  }

  return (
    <>
      {/* Addresses */}
      <Row>
        <Col md={6}>
          <Card border='light'>
            {/* Billilng Address */}
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
        <Col md={6}>
          <Card border='light'>
            {/* Shipping Address */}
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
      {/* Payment Method and Cart Totals Row*/}
      <Row>
        {/* Payment Method */}
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
        {/* Cart Totals */}
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
      {/* Edit Cart Button */}
      <Row className='justify-content-end px-3 mb-3'>
        <Button variant='danger' className='d-none d-md-flex justify-content-center align-items-center mr-1' onClick={cartEditHandler}>
          <FontAwesomeIcon icon={faPen} size="2x" fixedWidth /> <span className='ml-1'>Edit Cart</span>
        </Button>
        <Button variant='danger' size='sm' className='d-flex d-md-none justify-content-center align-items-center' onClick={cartEditHandler}>
          <FontAwesomeIcon icon={faPen} size="2x" fixedWidth /> <span className='ml-1'>Edit Cart</span>
        </Button>
      </Row>
      {/* Products in Cart */}
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
                // dateAdded={eachProduct.createdAt}
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

export default ReviewAndSubmitOrder;