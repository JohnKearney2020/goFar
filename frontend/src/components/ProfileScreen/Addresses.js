import React, { useState, useEffect, useRef } from 'react';
import { Col, Row, Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

import AddressCard from './AddressCard';
import Loader from '../Loader';
import Message from '../Message';
import NewAddressModal from '../Modals/NewAddressModal';


const Addresses = () => {

  const haveArrangedAddresses = useRef(false);
  const userDetails = useSelector(state => state.userDetails);
  const { loading, error, user } = userDetails;
  const addresses = user.addresses;

  const userUpdateProfile = useSelector(state => state.userUpdateProfile);
  const { error: updateAddressError  } = userUpdateProfile;

  const [addressesToDisplay, setAddressesToDisplay] = useState([]);

  const [showNewAddressModal, setShowNewAddressModal] = useState(false);


  const noAddressMessage = 'No addresses on file. Click "Add an Address" to create an address.';

  const showNewAddressModalHandler = () => {
    setShowNewAddressModal(true);
  }

  const closeNewAddressModalHandler = () => {
    setShowNewAddressModal(false);
  }

  useEffect(() => {
    console.log('in addresses use effect')
    // if(addresses.length >= 1 && haveArrangedAddresses.current === false){
    if(addresses.length >= 1 ){
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

  return (
    <>
    <h4 className='my-4'>Your Addresses</h4>
      {addressesToDisplay.length === 0 && <Message variant='info'>{noAddressMessage}</Message>}
      <Button 
        className='mb-4 ml-3 d-flex align-items-center' 
        variant='primary' 
        onClick={showNewAddressModalHandler} 
        disabled={showNewAddressModal}
      >
        <FontAwesomeIcon className='mr-2' icon={faPlus} size="2x" /> Add an Address
      </Button>
      {updateAddressError && ( <Message variant='danger'>{updateAddressError}</Message> ) }
      {loading ? ( <Loader /> ) : error ? ( <Message variant='danger'>{error}</Message> ) :
        (<Row>
          {addressesToDisplay.map(address => (
            <Col className='d-flex align-items-stretch' key={address._id} sm={12} md={6} lg={4} xl={3}>
              <AddressCard address={address} key={address._id}/>
            </Col>
          ))}
        </Row>)
      }
      {showNewAddressModal && 
        <NewAddressModal 
          show={showNewAddressModal}
          closeModalHandler={closeNewAddressModalHandler}
        />
      }
    </>
  )
}

export default Addresses;
