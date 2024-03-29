import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Row, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import { updateUserProfile } from '../../actions/userActions';
import ConfirmModal from '../Modals/ConfirmModal';
import EditAddressModal from '../Modals/EditAddressModal';
import './AddressCardButtons.css';

const AddressCardButtons = ({ addressID, address, isPrimary }) => {

  const dispatch = useDispatch();

  const userDetails = useSelector(state => state.userDetails);
  const { user } = userDetails;
  const { addresses } = user;

  // const [addressesToDisplay, setAddressesToDisplay] = useState([]);

  const userUpdateProfile = useSelector(state => state.userUpdateProfile);
  const { loading: updateProfileLoading } = userUpdateProfile;

  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showEditAddressModal, setShowEditAddressModal] = useState(false);

  const showModalHandler = () => {
    setShowConfirmModal(true);
  }

  const closeModalHandler = () => {
    setShowConfirmModal(false);
  }

  const showEditAddressModalHandler = () => {
    setShowEditAddressModal(true);
  }

  const closeEditAddressModalHandler = () => {
    setShowEditAddressModal(false);
  }

  const makePrimaryHandler = (e) => {
    e.preventDefault();
    if(updateProfileLoading){ return } //prevent users from clicking multiple times
    const oldAddresses = [...addresses];
    const newAddresses = oldAddresses.map((address) => {
      if(address._id === addressID) { 
        address.isPrimary = true 
      } else { 
        address.isPrimary = false 
      }
      return address;
    })
    dispatch(updateUserProfile({ addresses: newAddresses }, 'makePrimary'));
  }


  const deleteAddressHandler = (e) => {
    e.preventDefault();
    setShowConfirmModal(false);
    if(updateProfileLoading){ return } //prevent users from clicking multiple times
    const oldAddresses = [...addresses];
    const newAddresses = oldAddresses.filter((address) => {
      return address._id !== addressID;
    })
    if(isPrimary && newAddresses.length > 0){
      newAddresses[0].isPrimary = true;
    }
    dispatch(updateUserProfile({ addresses: newAddresses }, 'deleteAddress'));

  }

  return (
    <>
      <Row className='justify-content-around'>
        <Button className='addressButton mr-1' size="sm" disabled={isPrimary || updateProfileLoading} onClick={makePrimaryHandler}>
          {updateProfileLoading ? 'Updating...' : 'Make Primary'}
        </Button>
        <Button className='btn-info addressButton mr-1' size="sm" onClick={showEditAddressModalHandler}>
          <FontAwesomeIcon icon={faPen} size="2x" fixedWidth />
        </Button>
        <Button className='btn-danger addressButton' size="sm" onClick={showModalHandler}>
          <FontAwesomeIcon icon={faTrashAlt} size="2x" fixedWidth />
        </Button>
        {showModalHandler && 
          <ConfirmModal 
            show={showConfirmModal}
            closeModalHandler={closeModalHandler}
            modalHeading={'Delete Address'}
            messageToDisplay={'Are you sure you want to delete this address?'}
            functionToRun={deleteAddressHandler}
          />
        }
        {showEditAddressModal && 
          <EditAddressModal 
            show={showEditAddressModal}
            closeModalHandler={closeEditAddressModalHandler}
            address={address}
          />
        }
      </Row>
    </>
  )
}

export default AddressCardButtons;
