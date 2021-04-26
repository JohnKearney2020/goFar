import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Form, Button, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

import Message from '../Message';


const ShippingInformation = ({ addressesToDisplay, billingAddress, shippingAddress, setShippingAddress }) => {

  const [showNewAddressModal, setShowNewAddressModal] = useState(false);

  useEffect(() => {
    let shippingAddressDefault = '';
    if(addressesToDisplay.length > 0){
      shippingAddressDefault =  `
        ${addressesToDisplay[0].addressName && addressesToDisplay[0].addressName + ','} 
        ${addressesToDisplay[0].line1},
        ${addressesToDisplay[0].line2 && addressesToDisplay[0].line2 + ','}
        ${addressesToDisplay[0].city},
        ${addressesToDisplay[0].state},
        ${addressesToDisplay[0].zipCode}
        ${addressesToDisplay[0].isPrimary === true ? ('- ' + '( Primary )') : ''}` 
      }
      setShippingAddress(shippingAddressDefault);
    return () => {
      
    }
  }, [addressesToDisplay])
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
        <Form.Label as='legend'>Choose a shipping address...</Form.Label>
        <Form.Control 
          as='select'
          value={shippingAddress} 
          onChange={(e) => setShippingAddress(e.target.value)} 
          disabled={addressesToDisplay.length === 0}
          className='shadow-sm mb-1'
          id='addressDropdown'
        >
          {/* <option selected={true}>
            Choose an address...
          </option> */}
          {addressesToDisplay.map(eachAdd => {
            return <option 
                key={`${eachAdd.line1}${eachAdd.city}`} 
                className=''
              >
              {`
                ${eachAdd.addressName && eachAdd.addressName + ','} 
                ${eachAdd.line1},
                ${eachAdd.line2 && eachAdd.line2 + ','}
                ${eachAdd.city},
                ${eachAdd.state},
                ${eachAdd.zipCode}
                ${eachAdd.isPrimary === true ? ('- ' + '( Primary )') : ''}
              `}
            </option>
          })}
        </Form.Control>
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

export default ShippingInformation;
