import React from 'react';
import { Card, Button } from 'react-bootstrap';

import AddressCardButtons from './AddressCardButtons';

const AddressCard = ({ address }) => {

  const { addressName, isPrimary, line1, line2, city, state, zipCode, _id: id } = address;

  return (
    <Card className='rounded d-flex'>
      <Card.Body className='d-flex justify-content-start flex-column'>
        { address.addressName && <Card.Title>{address.addressName}</Card.Title> }
        <Card.Text as='h6'>
          {line1}
        </Card.Text>
        { line2 && <Card.Text as='h6'>{line2}</Card.Text> }
        <Card.Text as='h6'>
          {city}, {state} {zipCode}
        </Card.Text>
        <div className='d-flex h-100 align-items-end justify-content-center'>
          <AddressCardButtons addressID={id} isPrimary={isPrimary} />
        </div>
      </Card.Body>
    </Card>
  )
}

export default AddressCard;
