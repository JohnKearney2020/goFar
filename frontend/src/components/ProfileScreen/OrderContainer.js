import React from 'react';
import { Accordion, Card, Col, Row } from 'react-bootstrap';
import OrderContainerBody from './OrderContainerBody';

import { formatDateDayMonthYear } from '../../utilityFunctions/formatDayMonthYear';
import { addDecimals } from '../../utilityFunctions/addDecimals';

const OrderContainer = ({ order, idx }) => {
  const {_id:orderID, createdAt:date, itemTally, cartTotal } = order;

  const truncateOrderNumber = (orderNumber) => {
    return orderNumber.slice(0,10) + '...';
  }

  const dateToDisplay = formatDateDayMonthYear(date);
  const orderNumForHeader = truncateOrderNumber(orderID);

  return (
    <Card>
      <Accordion.Toggle as={Card.Header} eventKey={idx + 1}>
        <Row className='justify-content-between align-items-center w-100 mx-0'>
          <Col md={4} className='text-center'>
            <h5 className='mb-sm-1 mb-md-0 order-h5-responsive'>{orderNumForHeader}</h5>
          </Col>
          <Col md={4} className='text-center'>
            <h5 className='mb-sm-1 mb-md-0 order-h5-responsive'>${addDecimals(cartTotal)} - {itemTally} items</h5>
          </Col>
          <Col md={4} className='text-center'>
            <h5 className='m-0'>{dateToDisplay}</h5>
          </Col>
        </Row>
      </Accordion.Toggle>
      <Accordion.Collapse eventKey={idx + 1}>
        <Card.Body>
          <OrderContainerBody order={order} />
        </Card.Body>
      </Accordion.Collapse>
    </Card>
  )
}

export default OrderContainer;
