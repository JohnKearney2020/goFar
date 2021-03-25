import React, { useState, useEffect, useRef } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import AddressCard from './AddressCard';
import Loader from '../Loader';
import Message from '../Message';

const Addresses = () => {

  const haveArrangedAddresses = useRef(false);
  const userDetails = useSelector(state => state.userDetails);
  const { loading, error, user } = userDetails;
  const addresses = user.addresses;

  const [addressesToDisplay, setAddressesToDisplay] = useState([]);


  useEffect(() => {
    console.log('in addresses use effect')
    if(addresses.length >= 1 && haveArrangedAddresses.current === false){
      const primaryAddress = [addresses[addresses.findIndex(i => i.isPrimary === true)]];
      const otherAddresses = addresses.filter(eachAddress => eachAddress.isPrimary === false);
      setAddressesToDisplay(primaryAddress.concat(otherAddresses));
      haveArrangedAddresses.current = true;
    }
    return () => {
      
    }
  }, [user, addresses])

  return (
    <>
    <h4 className='my-4'>Your Addresses</h4>
      {loading ? ( <Loader /> ) : error ? ( <Message variant='danger'>{error}</Message> ) :
        (<Row>
          {addressesToDisplay.map(address => (
            <Col className='d-flex align-items-stretch' key={address._id} sm={12} md={6} lg={4} xl={3}>
              <AddressCard address={address} key={address._id}/>
            </Col>
          ))}
        </Row>)
      }
    </>
  )
}

export default Addresses;
