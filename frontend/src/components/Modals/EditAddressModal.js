import React, { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import { updateUserProfile } from '../../actions/userActions';

const EditAddressModal = ({ show, closeModalHandler, address }) => {

  const dispatch = useDispatch();

  const userDetails = useSelector(state => state.userDetails);
  const { user } = userDetails;
  const { addresses } = user;

  const userUpdateProfile = useSelector(state => state.userUpdateProfile);
  const { loading: updateProfileLoading } = userUpdateProfile;

  const[addressName, setAddressName] = useState(address.addressName);
  const[addressLine1, setAddressLine1] = useState(address.line1);
  const[addressLine2, setAddressLine2] = useState(address.line2);
  const[city, setCity] = useState(address.city);
  const[state, setState] = useState(address.state);
  const[zipCode, setZipCode] = useState(address.zipCode);
  const[isPrimary, setIsPrimary] = useState(address.isPrimary);

  const [line1Message, setLine1Message] = useState(null);
  const [cityMessage, setCityMessage] = useState(null);
  const [stateMessage, setStateMessage] = useState(null);
  const [zipCodeMessage, setZipCodeMessage] = useState(null);

  const editAddressHandler = (e) => {
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

    let oldAddressID = address._id;

    const existingAddresses = [...addresses];

    const filteredAddresses = existingAddresses.filter(i => i._id !== oldAddressID);
    if(isPrimary){ //if the user wants the edited address to be the primary address
      filteredAddresses.forEach((eachAddress) => {
        eachAddress.isPrimary = false;
      })
    }
    console.log('filteredAddresses addresses after setting primary:')
    console.log(filteredAddresses);

    let newAddress = {
      _id: oldAddressID,
      isPrimary: isPrimary,
      addressName: addressName,
      line1: addressLine1,
      line2: addressLine2,
      city: city,
      state: state,
      zipCode: zipCode
    };
    filteredAddresses.push(newAddress);
    dispatch(updateUserProfile({ addresses: filteredAddresses }, 'updateAddress'));
    closeModalHandler();
  }

  return (
    <Modal 
      show={show} 
      onHide={closeModalHandler} 
      centered
      animation={false}
    >
      <Modal.Header closeButton className='align-items-center'><h5 className='mb-0'>Update Existing Address</h5></Modal.Header>
      <Modal.Body>
      <Form onSubmit={editAddressHandler}>
        <Form.Group controlId='addressName'>
          <Form.Label>Address Name - Optional</Form.Label>
          <Form.Control 
            type='text'
            placeholder='"Home", "The office", "Work", etc...'
            value={addressName}
            onChange={(e) => setAddressName(e.target.value)}
            // disabled={isGuest}
          >
          </Form.Control>
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
          />
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
          <Button type='submit' variant="primary" disabled={updateProfileLoading} onClick={editAddressHandler}>
            {updateProfileLoading ? 'Updating Address...' : 'Update Address'}
          </Button>
        </Modal.Footer>
    </Modal>
  )
}

export default EditAddressModal;

