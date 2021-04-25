import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Row, Form, Button, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { compose } from 'redux';
import { useAccordionToggle } from 'react-bootstrap/AccordionToggle';

import Message from '../Message';
import { changeCheckoutStep } from '../../actions/checkoutActions';
import './BillingInformation.css';

const BillingInformation = ({CustomToggle}) => {

  const dispatch = useDispatch();

  //Get user's address from the global state
  const haveArrangedAddresses = useRef(false);

  // Get Data from the global state
  const userDetails = useSelector(state => state.userDetails);
  const { loading, error, user } = userDetails;
  const addresses = user.addresses;

  //Set up local state
  const [addressesToDisplay, setAddressesToDisplay] = useState([]);
  const [showNewAddressModal, setShowNewAddressModal] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState('');
  const [showNoAddressMessage, setShowNoAddressMessage] = useState(false);

  const noAddressMessage = 'No addresses on file. Click "Add an Address" to create an address.';

  const showNewAddressModalHandler = () => {
    console.log('show modal')
    setShowNewAddressModal(true);
  }

  const closeNewAddressModalHandler = () => {
    console.log('close modal')
    setShowNewAddressModal(false);
  }

  // const nextStepHandler = (e) => {
  //   console.log(`e.target.value: ${e.target.value}`)
  //   console.log('typeof e.target.value:', typeof e.target.value)
  //   dispatch(changeCheckoutStep(e.target.value));
  // }

  useEffect(() => {
    console.log('in addresses use effect')
    // if(addresses.length >= 1 && haveArrangedAddresses.current === false){
    if(addresses.length >= 1 ){
      console.log('we have addresses')
      console.log(addresses)
      const primaryAddress = [addresses[addresses.findIndex(i => i.isPrimary === true)]];
      const otherAddresses = addresses.filter(eachAddress => eachAddress.isPrimary === false);
      setAddressesToDisplay(primaryAddress.concat(otherAddresses));
      haveArrangedAddresses.current = true;
    } else { //if the user has no addresses
      setAddressesToDisplay([]);
    }
    return () => {
      
    }
  }, [user, addresses])

  useEffect(() => {
    if(user.name){
      if(addresses.length === 0){
        setShowNoAddressMessage(true);
      }
    }
  }, [user.name, addresses])

  return (
    <Row className='px-2'>
      <Col>
        <Form.Control 
          as='select'
          value={selectedAddress} 
          onChange={(e) => setSelectedAddress(e.target.value)} 
          disabled={addresses.length === 0}
          className='shadow-sm mb-1'
          id='addressDropdown'
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
                ${eachAdd.isPrimary === true ? ('- ' + '( Primary )') : ''}
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
          {/* <CustomToggle eventKey="0">
            Continue
          </CustomToggle> */}
          {/* <Button variant='primary' className='mt-2' value="1" onClick={nextStepHandler}>
            Continue
          </Button> */}
        </Row>
      </Col>
    </Row>
  )
}

export default BillingInformation;
