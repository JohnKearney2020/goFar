import React from 'react';
import { Row, Col, ListGroup } from 'react-bootstrap';
import CartRow from '../../components/CartScreen/CartRow';

const OrdersItemsRows = ({ items }) => {
  //=============================================
  //               Products in Cart              
  //=============================================
  return (
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
                <span className='font-weight-bold'>Price</span>
              </Col>
              <Col md={1} className='text-center'>
                {/* placeholder for missing delete icon */}
              </Col>
            </Row> 
          </ListGroup.Item>
          {/*===================*/}
          {/* Items in Cart     */}
          {/*===================*/}
          {items.map((eachItem) => (
            <CartRow key={`${eachItem.productID}${eachItem.name}${eachItem.color}${eachItem.size}${eachItem.sizeCategory}`}
              productID={eachItem.productID}
              name={eachItem.name}
              color={eachItem.color}
              size={eachItem.size}
              sizeCategory={eachItem.sizeCategory}
              price={eachItem.price}
              qty={eachItem.quantity}
              image={eachItem.image}
              savedForLater={eachItem.savedForLater}
              hideButtons={true}
            />
          ))}
        </ListGroup>
      </Col> {/* End of Left Side of Screen */}
    </Row>
  )
}

export default OrdersItemsRows;
