import React from 'react';
import { Alert, ListGroup } from 'react-bootstrap';

import './CartMessage.css';

const CartMessage = ({ variant, itemsChanged, outOfStock }) => {
  return (
    <Alert variant={variant}>
      {!outOfStock && <p className='lead'>The items below in your cart are no longer available in the quantity you originally requested. We've updated your cart with the largest quantity we could give you based on current stock. Checkout soon so you don't miss out!</p>}
      {outOfStock && <p className='lead'>The items below are no longer available. We've automatically saved them for later for you.</p>}
      <hr />
      <ListGroup>
        {itemsChanged.map((eachItem, Idx) => (
          <ListGroup.Item key={Idx} 
            className={`p-0 w-100 ${variant === 'info' ? `cartMessageListItemInfo` : `cartMessageListItemDanger`}`}>
            <span>
              <span className='font-weight-bold'>{eachItem.name} - </span>
              <span>{eachItem.color} / </span>
              <span>{eachItem.size} / </span>
              <span>{eachItem.sizeCategory}, </span>
              Old Qty: <span className='font-weight-bold'>{eachItem.oldQty}</span>,
              New Qty: <span className='font-weight-bold'>{eachItem.newQty}</span>
            </span>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Alert>
  )
}

CartMessage.defaultProps = {
  variant: 'info'
}

export default CartMessage;