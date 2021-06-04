import React, {useState, useEffect, useRef } from 'react';
import { Form, Button, Row, Col, ListGroup } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import { getUserDetails, updateUserProfile } from '../../actions/userActions';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import { USER_UPDATE_PROFILE_RESET } from '../../constants/userConstants';

const UserInfo = () => {
  const haveFetchedUserData = useRef(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [primaryAddress, setPrimaryAddress] = useState('');
  const { addressName, line1, line2, city, state, zipCode } = primaryAddress;
  const [isGuest, setIsGuest] = useState(false);

  const [nameMessage, setNameMessage] = useState(null);
  const [emailMessage, setEmailMessage] = useState(null);
  const [passwordMessage, setPasswordMessage] = useState(null);
  const [phoneNumberMessage, setPhoneNumberMessage] = useState(null);
  const [confirmPasswordMessage, setConfirmPasswordMessage] = useState(null);

  const dispatch = useDispatch();

  const userDetails = useSelector(state => state.userDetails);
  const { loading, error, user } = userDetails;

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector(state => state.userUpdateProfile);
  const { loading: updateProfileLoading, success } = userUpdateProfile;

  const noAddressMessage = 'No addresses on file. Click the "Addresses" tab to add an address.';
  // const updateAddressMessage = 'You can update your primary address by clicking the "Addresses" tab.'
  const isGuestMessage1 = 'As a guest you cannot change the Name, Email, or Password fields. You can update the Phone Number field.';
  const isGuestMessage2 = 'Try out various CRUD operations on the Addresses, Wishlist, and Orders Tabs. You have the same abilities there as any other user. ';
  // const isGuestMessage3 = 'Try adding, deleting, and editing addresses on the Addresses tab.';
  // const isGuestMessage4 = 'Look at orders you and other guests have made on the Orders Tab.';

  useEffect(() => {
      if(haveFetchedUserData.current === false){ //if we haven't gotten the user details yet, go ahead and get them
        console.log('in first part of UserInfo useEffect fetching user details')
        dispatch(getUserDetails('profile'));
        haveFetchedUserData.current = true;
      } else if(success){ //if we have completed fetching the user details from the backend once already
        //This triggers when a user update's their profile information
        console.log('in 2nd part of UserInfo useEffect')
        console.log('in set timeout');
        dispatch({ type: USER_UPDATE_PROFILE_RESET});
        dispatch(getUserDetails('profile')); //This is needed to pull the updated information from the global state and display it          
      } else {
        setName(user.name);
        setEmail(user.email);
        setPhoneNumber(user.phoneNumber);
        //Find the user's primary address
        let primeAddress = user.addresses[user.addresses.findIndex(i => i.isPrimary === true)];
        if(primeAddress !== undefined) { setPrimaryAddress(primeAddress) };
        //Determine if the user is a guest
        if(user._id === '605a1c32864ac85278b75db1') { setIsGuest(true) };
      }
    }, [ dispatch, userInfo, user, success ]);

  const submitHandler = (e) => {
    e.preventDefault();
    let anyErrors = false;
    //Clear any existing errors messages first
    if(nameMessage) { setNameMessage(null) }
    if(emailMessage) { setEmailMessage(null) }
    if(phoneNumberMessage) { setPhoneNumberMessage(null) }
    if(passwordMessage) { setPasswordMessage(null) }
    if(confirmPasswordMessage) { setConfirmPasswordMessage(null) }

    //Check for blank fields next
    if(name === ''){ 
      setNameMessage('Name field cannot be empty');
      anyErrors = true;
    }
    if(email === ''){
      setEmailMessage('Email field cannot be empty');
      anyErrors = true;
    }
    if(password !== confirmPassword) {
      setPasswordMessage('Your passwords do not match');
      setConfirmPasswordMessage('Your passwords do not match');
      anyErrors = true;
    }

    if(anyErrors) { return }
    //DISPATCH UPDATE PROFILE
    dispatch(updateUserProfile({ id: user._id, name, email, password, phoneNumber }, 'userUpdate'));
  }

  return (
    <Row className='my-4'>
      <Col md={12}>
        { loading ? ( <Loader /> ) : error ? ( <Message variant='danger'>{error}</Message> ) : 
        <>
          <ListGroup variant='flush'>
            <ListGroup.Item className='border-0'>
              <h4 className='font-weight-bold'>Current User Information</h4>
              <h6>{user.name}</h6>
              <h6>{user.email}</h6>
              <h6>{`${user.phoneNumber ? user.phoneNumber : `___-___-____`}`}</h6>
            </ListGroup.Item>
            <ListGroup.Item className='border-0'>
              <h4 className='font-weight-bold'>Current Primary Address</h4>
              {primaryAddress === '' ? ( <Message variant='info'>{noAddressMessage}</Message> ) : (
                <>
                  {/* { primaryAddress.addressName && <h6>{primaryAddress.addressName}</h6> }
                  { <h6>{primaryAddress.line1}</h6> }
                  { primaryAddress.line2 && <h6>{primaryAddress.line2}</h6> }
                  {<h6>{primaryAddress.city}, {primaryAddress.state} {primaryAddress.zipCode}</h6>} */}
                  { addressName && <h6>{addressName}</h6> } {/* the address name is an optional field */}
                  { <h6>{line1}</h6> }
                  { line2 && <h6>{line2}</h6> } {/* the address line 2 is an optional field */}
                  {<h6>{city}, {state} {zipCode}</h6>}
                  {/* <Message className='my-0' variant='info'>{updateAddressMessage}</Message> */}
                </>
              )}          
            </ListGroup.Item>
          </ListGroup>
          <hr />

          <h4 className='font-weight-bold'>Update Profile Information</h4>
          {success && <Message variant='success'>Profile Successfully Updated!</Message>}
          { isGuest && <Message variant='info'>{isGuestMessage1}</Message>}
          { isGuest && <Message variant='info'>{isGuestMessage2}</Message>}
          {/* { isGuest && <Message variant='info'>{isGuestMessage3}</Message>} */}
          {/* { isGuest && <Message variant='info'>{isGuestMessage4}</Message>} */}
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='name'>
              <Form.Label>Name</Form.Label>
              <Form.Control 
                type='text'
                // placeholder='Enter name'
                placeholder='Enter name'
                value={name}
                onChange={(e) => setName(e.target.value)}
                // className='is-invalid'
                className={nameMessage === null ? '' : 'is-invalid'}
                disabled={isGuest}
              >
              </Form.Control>
              { nameMessage && <div className="invalid-feedback">{nameMessage}</div> }
            </Form.Group>
            <Form.Group controlId='email'>
              <Form.Label>Email Address</Form.Label>
              <Form.Control 
                type='email' 
                placeholder='Enter email address' 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={emailMessage === null ? '' : 'is-invalid'}
                disabled={isGuest}
              >
              </Form.Control>
              { emailMessage && <div className="invalid-feedback">{emailMessage}</div> }
            </Form.Group>
            <Form.Group controlId='phone'>
              <Form.Label>Phone Number</Form.Label>
              <Form.Control 
                type='text' 
                placeholder='Enter phone number' 
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className={phoneNumberMessage === null ? '' : 'is-invalid'}
                aria-describedby='phoneHelpBlock'
              />
              <Form.Text className='ml-2' id="phoneHelpBlock" muted>
                Must be of the format xxx-xxx-xxxx.
              </Form.Text>
              { phoneNumberMessage && <div className="invalid-feedback">{phoneNumberMessage}</div> }
            </Form.Group>
            <Form.Group controlId='password'>
              <Form.Label>Password</Form.Label>
              <Form.Control 
                type='password' 
                placeholder='Enter password' 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={passwordMessage === null ? '' : 'is-invalid'}
                disabled={isGuest}
                aria-describedby='passwordHelpBlock'
              />
              <Form.Text className='ml-2' id="passwordHelpBlock" muted>
                Leave blank if you do not wish to update your password.
              </Form.Text>
              { passwordMessage && <div className="invalid-feedback">{passwordMessage}</div> }
            </Form.Group>
            <Form.Group controlId='confirmPassword'>
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control 
                type='password' 
                placeholder='Confirm password' 
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={confirmPasswordMessage === null ? '' : 'is-invalid'}
                disabled={isGuest}
                aria-describedby='confirmPasswordHelpBlock'
              />
              <Form.Text className='ml-2' id="confirmPasswordHelpBlock" muted>
                Leave blank if you do not wish to update your password.
              </Form.Text>
              { confirmPasswordMessage && <div className="invalid-feedback">{confirmPasswordMessage}</div> }
            </Form.Group>
            <Button type='submit' variant='outline-primary' disabled={updateProfileLoading}>
              {updateProfileLoading ? 'Updating Profile...' : 'Update Profile'}
            </Button>
          </Form>
        </>
        }
      </Col>
    </Row>
  )
}

export default UserInfo;
