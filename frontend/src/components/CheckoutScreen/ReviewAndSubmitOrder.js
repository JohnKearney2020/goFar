import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Row, Form, Button, Col, ListGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { compose } from 'redux';

import CartRow from '../CartScreen/CartRow';
import Message from '../Message';

const ReviewAndSubmitOrder = ({ cartSubTotal, shippingTotal, cartItemTally, cartTotal, billingAddress, shippingAddress }) => {

  const dispatch = useDispatch();
  const haveFetchedCartData = useRef(false);

  // Get data from the Global State
  const userInfo = useSelector(state => state.userLogin.userInfo);
  const { cart } = userInfo;

  const submitOrderHandler = () => {
    console.log('clicked submit order!')

  }

  return (
    <>
      {/* Addresses */}
      <Row>
        <Col md={6}>
          <Card border='light'>
            <ListGroup variant='flush'>
              <ListGroup.Item className='border-0'>
                <h4>Billing Address</h4>
              </ListGroup.Item>
              <ListGroup.Item>
                {/* <h6 className='ml-2'>{billingAddress}</h6> */}
                {billingAddress}
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
        <Col md={6}>
          <Card border='light'>
            <ListGroup variant='flush'>
              <ListGroup.Item className='border-0'>
                <h4>Shipping Address</h4>
              </ListGroup.Item>
              <ListGroup.Item className='border-0'>
                {shippingAddress}
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
      {/* Payment Method */}
      <Row>
        <Col md={6}>
          <Card border='light'>
            <ListGroup variant='flush'>
              <ListGroup.Item className='border-0'>
                <h4>Payment Method</h4>
              </ListGroup.Item>
              <ListGroup.Item className='border-0 py-0'>
                {/* <span className='ml-2'>PayPal</span> */}
                <h6 className='ml-2'>PayPal</h6>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
        <Col md={6}>
          <Card border='light'>
            <ListGroup variant='flush'>
              <ListGroup.Item className='border-0'>
              <h4>{`Subtotal (${cartItemTally} items):`}</h4>
                <ListGroup variant='flush'>
                  <ListGroup.Item className='border-0 py-0'>
                    {/* <p className='m-0 lead font-weight-bold'>${cartSubTotal}</p> */}
                    {/* <h6>Item Subtotal: ${cartSubTotal}</h6> */}
                    Item Subtotal: <span className='font-weight-bold'>${cartSubTotal}</span>
                  </ListGroup.Item>
                  <ListGroup.Item className='pt-0 pb-1'>
                    Shipping: <span className='font-weight-bold'>{shippingTotal === 0 ? 'FREE' : '$7.99'}</span>
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
                  {/* <span className='font-weight-bold'>Delete</span>  */}
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