import React, { useState } from 'react';
import { Row, Form, Button, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

import Message from '../Message';
import './BillingInformation.css';

const BillingInformation = ({ addressesToDisplay, billingAddress, setBillingAddress, showNoAddressMessage, noAddressMessage }) => {

  const [showNewAddressModal, setShowNewAddressModal] = useState(false);

  const showNewAddressModalHandler = () => {
    console.log('show modal')
    setShowNewAddressModal(true);
  }

  const closeNewAddressModalHandler = () => {
    console.log('close modal')
    setShowNewAddressModal(false);
  }

  return (
    <Row className='px-2'>
      <Col>
        <Form.Label as='legend'>Choose a billing address...</Form.Label>
        <Form.Control 
          as='select'
          value={billingAddress} 
          onChange={(e) => setBillingAddress(e.target.value)} 
          disabled={addressesToDisplay.length === 0}
          className='shadow-sm mb-1'
          id='addressDropdown'
          placeholder='Choose an address...'
        >
          {addressesToDisplay.map(eachAdd => {
            return <option key={`${eachAdd.line1}${eachAdd.city}`} className=''>
              {`
                ${eachAdd.addressName && eachAdd.addressName + ','} 
                ${eachAdd.line1},
                ${eachAdd.line2 && eachAdd.line2 + ','}
                ${eachAdd.city},
                ${eachAdd.state},
                ${eachAdd.zipCode}
                ${eachAdd.isPrimary === true ? '- ( Primary )' : ''}
              `}
            </option>
          })}
        </Form.Control>
        {showNoAddressMessage && <Message variant='info'>{noAddressMessage}</Message>}
        <Row className='d-flex justify-content-between w-100 m-0'>
          <Button 
            className='d-flex align-items-center mt-2' 
            variant='primary' 
            onClick={showNewAddressModalHandler} 
            disabled={showNewAddressModal}
          >
            <FontAwesomeIcon className='mr-2' icon={faPlus} size="2x" /> Add an Address
          </Button>
        </Row>
      </Col>
    </Row>
  )
}

export default BillingInformation;
