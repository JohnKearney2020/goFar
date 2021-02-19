import React from 'react';
import { ListGroup } from 'react-bootstrap';

const QuantityAlert = ({ qtyInStock }) => {
  return (
    <ListGroup className=''>
      <ListGroup.Item className='border-0 pb-0'>
        <span className='text-danger'>{qtyInStock} LEFT in stock</span>
      </ListGroup.Item>
    </ListGroup>
  )
}

export default QuantityAlert;
