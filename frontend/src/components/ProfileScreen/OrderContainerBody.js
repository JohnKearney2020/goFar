import React from 'react';
import { Card, Row, Col, ListGroup } from 'react-bootstrap';

import OrdersItemsRows from './OrdersItemsRows';
import OrderMap from './OrderMap';
import Message from '../Message';

const OrderContainerBody = ({ order }) => {
  //Destructure the order
  const { billingAddress:billingAddressObj, shippingAddress:shippingAddressObj, shippingAddressString, shippingAddressLatLng, paymentMethod, itemTally, subTotal, cartTotal, shippingCost, items, shipped } = order;

  return (
    <>
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
      <Row className='my-3'>
        {/* ============================================== */}
        {/*          Payment Method & Shipping             */}
        {/* ============================================== */}
        <Col md={6}>
          <Row>
            <Col sm={12}>
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
            <Col>
              <Card border='light'>
                <ListGroup variant='flush'>
                  <ListGroup.Item className='border-0'>
                    <h4>Shipping Status</h4>
                  </ListGroup.Item>
                  <ListGroup.Item className='border-0 py-0'>
                    {/* <h6 className='mb-1 ml-2'>{paymentMethod}</h6> */}
                    {shipped ? <Message variant='success'>Shipped!</Message> : <Message variant='danger'>Not Yet Shipped - Order In Process</Message>}
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
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
                    Order Total: <span className='font-weight-bold'>${cartTotal}</span>
                  </ListGroup.Item>
                </ListGroup>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
      {/* ============================================== */}
      {/*                     Map                        */}
      {/* ============================================== */}
      <Row className='mapRow mx-0 mb-5 px-5'>
        <OrderMap shippingAddressString={shippingAddressString} zoom={8} latLng={shippingAddressLatLng}/>
      </Row>
      {/* <hr className='my-4'/> */}
      {/* ============================================== */}
      {/*                  Item Rows                     */}
      {/* ============================================== */}
      <OrdersItemsRows items={items}/>
    </>
  )
}

export default OrderContainerBody;
