import React, { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import { updateUserProfile } from '../../actions/userActions';
import { getUserDetails } from '../../actions/userActions';
import { checkoutBillingAddress } from '../../actions/checkoutActions';

const NewAddressModal = ({ show, closeModalHandler, billingAddress, shippingAddress}) => {
  
  const dispatch = useDispatch();

  const userDetails = useSelector(state => state.userDetails);
  const { user } = userDetails;
  const { addresses } = user;

  const userUpdateProfile = useSelector(state => state.userUpdateProfile);
  const { loading: updateProfileLoading } = userUpdateProfile;

  const[addressName, setAddressName] = useState('');
  const[addressLine1, setAddressLine1] = useState('');
  const[addressLine2, setAddressLine2] = useState('');
  const[city, setCity] = useState('');
  const[state, setState] = useState('');
  const[zipCode, setZipCode] = useState('');
  const[isPrimary, setIsPrimary] = useState(false);

  const [line1Message, setLine1Message] = useState(null);
  const [cityMessage, setCityMessage] = useState(null);
  const [stateMessage, setStateMessage] = useState(null);
  const [zipCodeMessage, setZipCodeMessage] = useState(null);

  const addNewAddressHandler = (e) => {
    e.preventDefault();
    if(updateProfileLoading){ return } //prevent users from clicking multiple times
    let anyErrors = false;
    //Clear any existing errors messages first
    if(line1Message) { setLine1Message(null) }
    if(cityMessage) { setCityMessage(null) }
    if(stateMessage) { setStateMessage(null) }
    if(zipCodeMessage) { setZipCodeMessage(null) }
    //Check for blank fields next
    if(addressLine1 === ''){ 
      setLine1Message('Address Line 1 field cannot be blank');
      anyErrors = true;
    }
    if(city === ''){ 
      console.log('in city conditional')
      setCityMessage('City field cannot be blank');
      anyErrors = true;
    }
    if(state === ''){ 
      setStateMessage('State field cannot be blank');
      anyErrors = true;
    }
    if(zipCode === ''){ 
      setZipCodeMessage('Zip Code field cannot be blank');
      anyErrors = true;
    }
    if(anyErrors) { return } //stop here if the user did not fill out the form correctly

    const existingAddresses = [...addresses];
    if(isPrimary){ //if the user wants the new address to be the primary address, set all the existing addresses to primary = false
      existingAddresses.forEach((eachAddress) => {
        eachAddress.isPrimary = false;
      })
    }

    let newAddress = {
      isPrimary: isPrimary,
      addressName: addressName,
      line1: addressLine1,
      line2: addressLine2,
      city: city,
      state: state,
      zipCode: zipCode
    };

    // let addressString = `${addressName && addressName + ','} 
    // ${addressLine1},
    // ${addressLine2 && addressLine2 + ','}
    // ${city},
    // ${state},
    // ${zipCode}
    // ${isPrimary === true ? ('- ' + '( Primary )') : ''}`;

    existingAddresses.push(newAddress);
    dispatch(updateUserProfile({ addresses: existingAddresses }, 'newAddress'));
    //If we added a billing address from checkout:
    // if(billingAddress) { dispatch(checkoutBillingAddress(newAddress, addressString)); }
    dispatch(getUserDetails('profile'));
    closeModalHandler();
  }

  return (
    <Modal 
      show={show} 
      onHide={closeModalHandler} 
      centered
      animation={false}
    >
      <Modal.Header closeButton className='align-items-center'><h5 className='mb-0'>Add a new address</h5></Modal.Header>
      <Modal.Body>
      <Form onSubmit={addNewAddressHandler}>
        <Form.Group controlId='addressName'>
          <Form.Label>Address Name - Optional</Form.Label>
          <Form.Control 
            type='text'
            placeholder='"Home", "The office", "Work", etc...'
            value={addressName}
            onChange={(e) => setAddressName(e.target.value)}
            // className={nameMessage === null ? '' : 'is-invalid'}
            // disabled={isGuest}
          >
          </Form.Control>
          {/* <Form.Text className='ml-2' id="addressNameHelpBlock" muted>
            Optional
          </Form.Text> */}
          {/* { nameMessage && <div className="invalid-feedback">{nameMessage}</div> } */}
        </Form.Group>
        <Form.Group controlId='line1'>
          <Form.Label>Address Line 1</Form.Label>
          <Form.Control 
            type='text' 
            placeholder='Enter your street name and number...' 
            value={addressLine1}
            onChange={(e) => setAddressLine1(e.target.value)}
            aria-describedby='addressLine1HelpBlock'
            className={line1Message === null ? '' : 'is-invalid'}
            // disabled={isGuest}
          >
          </Form.Control>
          <Form.Text className='ml-2' id="addressLine1HelpBlock" muted>
            Required
          </Form.Text>
          { line1Message && <div className="invalid-feedback">{line1Message}</div> }
        </Form.Group>
        <Form.Group controlId='line2'>
          <Form.Label>Address Line 2 - Optional</Form.Label>
          <Form.Control 
            type='text' 
            placeholder='Apt #, Unit #, etc...' 
            value={addressLine2}
            onChange={(e) => setAddressLine2(e.target.value)}
            // className={phoneNumberMessage === null ? '' : 'is-invalid'}
            // aria-describedby='phoneHelpBlock'
          />
          {/* <Form.Text className='ml-2' id="phoneHelpBlock" muted>
            Must be of the format xxx-xxx-xxxx.
          </Form.Text> */}
          {/* { phoneNumberMessage && <div className="invalid-feedback">{phoneNumberMessage}</div> } */}
        </Form.Group>
        <Form.Group controlId='city'>
          <Form.Label>City</Form.Label>
          <Form.Control 
            type='text' 
            placeholder='Enter your city...' 
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className={cityMessage === null ? '' : 'is-invalid'}
            // disabled={isGuest}
            aria-describedby='cityHelpBlock'
          />
          <Form.Text className='ml-2' id="cityHelpBlock" muted>
            Required
          </Form.Text>
          { cityMessage && <div className="invalid-feedback">{cityMessage}</div> }
        </Form.Group>
        <Form.Group controlId='state'>
          <Form.Label>State</Form.Label>
          <Form.Control 
            type='text' 
            placeholder='Enter your state...' 
            value={state}
            onChange={(e) => setState(e.target.value)}
            className={stateMessage === null ? '' : 'is-invalid'}
            // disabled={isGuest}
            aria-describedby='stateHelpBlock'
          />
          <Form.Text className='ml-2' id="stateHelpBlock" muted>
            Required
          </Form.Text>
          {/* <Form.Text className='ml-2' id="confirmPasswordHelpBlock" muted>
            Leave blank if you do not wish to update your password.
          </Form.Text> */}
          { stateMessage && <div className="invalid-feedback">{stateMessage}</div> }
        </Form.Group>
        <Form.Group controlId='zipcode'>
          <Form.Label>Zip Code</Form.Label>
          <Form.Control 
            type='text'
            placeholder='Enter your zip code...'
            value={zipCode}
            onChange={(e) => setZipCode(e.target.value)}
            className={zipCodeMessage === null ? '' : 'is-invalid'}
            aria-describedby='zipCodeHelpBlock'
          />
          <Form.Text className='ml-2' id="zipCodeHelpBlock" muted>
            Required
          </Form.Text>
          { zipCodeMessage && <div className="invalid-feedback">{zipCodeMessage}</div> }
        </Form.Group>
        <Form.Check
          type={'checkbox'}
          label={'Set as Primary Address'}
          id={'newAddressPrimaryCheckbox'}
          checked={isPrimary}
          onChange={(e) => setIsPrimary(!isPrimary)}
        />
      </Form>
      </Modal.Body>
      <Modal.Footer>
          <Button variant="secondary" onClick={closeModalHandler}>
            Cancel
          </Button>
          <Button type='submit' variant="primary" disabled={updateProfileLoading} onClick={addNewAddressHandler}>
            {updateProfileLoading ? 'Adding Address...' : 'Add New Address'}
          </Button>
        </Modal.Footer>
    </Modal>
  )
}

NewAddressModal.defaultProps = {
  billingAddress: false,
  shippingAddress: false
}

export default NewAddressModal;
