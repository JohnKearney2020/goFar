import React from 'react';
import { Card, Button } from 'react-bootstrap';

import AddressCardButtons from './AddressCardButtons';
import './AddressCard.css';

const AddressCard = ({ address }) => {

  const { addressName, isPrimary, line1, line2, city, state, zipCode, _id: id } = address;

  return (
    <Card className='rounded d-flex mb-3 addressCard'>
      { address.isPrimary && <Card.Header as='h6' className='font-weight-bold'>Primary Address</Card.Header> }
      <Card.Body className='d-flex justify-content-start flex-column'>
        { addressName && <Card.Title>{addressName}</Card.Title> }
        <Card.Text as='h6'>
          {line1}
        </Card.Text>
        { line2 && <Card.Text as='h6'>{line2}</Card.Text> }
        <Card.Text as='h6'>
          {city}, {state} {zipCode}
        </Card.Text>
        <div className='d-flex h-100 align-items-end justify-content-center'>
          <AddressCardButtons addressID={id} address={address} isPrimary={isPrimary} />
        </div>
      </Card.Body>
    </Card>
  )
}

export default AddressCard;
