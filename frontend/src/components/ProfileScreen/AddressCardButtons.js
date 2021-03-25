import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Row, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import { updateUserProfile } from '../../actions/userActions';
import './AddressCardButtons.css';

const AddressCardButtons = ({ addressID, isPrimary }) => {

  const dispatch = useDispatch();

  const userDetails = useSelector(state => state.userDetails);
  const { loading, error, user } = userDetails;
  const { addresses } = user;

  // const [addressesToDisplay, setAddressesToDisplay] = useState([]);

  const userUpdateProfile = useSelector(state => state.userUpdateProfile);
  const { loading: updateProfileLoading, success, userInfo: updatedUserInfo } = userUpdateProfile;

  // import { updateUserProfile } from '../../actions/userActions';


  // const [updatedAddresses, setUpdatedAddresses] = useState([]);

  // useEffect(() => {
  //   setAddressesToDisplay(addresses);
  //   return () => {
      
  //   }
  // }, []);


  const makePrimaryHandler = (e) => {
    e.preventDefault();
    if(updateProfileLoading){ return } //prevent users from clicking multiple times
    console.log('addresses from props:')
    console.log(addresses)
    const oldAddresses = [...addresses];
    // oldAddresses.push('test 1');
    // console.log('push test old addresses');
    // console.log(oldAddresses);
    // console.log('push test addresses from state');
    // console.log(addresses);
    // console.log('addresses from props copied over w/ spread operator:')
    // console.log(oldAddresses)
    const newAddresses = oldAddresses.map((address) => {
      if(address._id === addressID) { address.isPrimary = true }
      else { address.isPrimary = false }
      return address;
    })
    // console.log(`address with this id clicked: ${addressID}`)
    // console.log(`new addresses`)
    // console.log(newAddresses)
    // console.log('addresses in state:')
    // console.log(addresses);
    dispatch(updateUserProfile({ addresses: newAddresses }));
  }

  const deleteAddressHandler = () => {
    console.log('delete button clicked!')
  }

  const updateAddressHandler = () => {
    console.log('update button clicked!')
  }

  return (
    <>
      <Row className='justify-content-around'>
        <Button className='addressButton mr-1' size="sm" disabled={isPrimary} onClick={makePrimaryHandler}>
          {updateProfileLoading ? 'Updating...' : 'Make Primary'}
        </Button>
        <Button className='btn-info addressButton mr-1' size="sm" onClick={updateAddressHandler}>
          <FontAwesomeIcon icon={faPen} size="2x" fixedWidth />
        </Button>
        <Button className='btn-danger addressButton' size="sm" onClick={deleteAddressHandler}>
          <FontAwesomeIcon icon={faTrashAlt} size="2x" fixedWidth />
        </Button>
      </Row>
    </>
  )
}

export default AddressCardButtons;
