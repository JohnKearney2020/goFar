import React, {useState, useEffect, useRef } from 'react';
import { Form, Button, Row, Col, ListGroup } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import { getUserDetails } from '../../actions/userActions';
import Message from '../../components/Message';
import Loader from '../../components/Loader';

const UserInfo = () => {
  const haveFetchedUserData = useRef(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [primaryAddress, setPrimaryAddress] = useState('');

  const [nameMessage, setNameMessage] = useState(null);
  const [emailMessage, setEmailMessage] = useState(null);
  const [passwordMessage, setPasswordMessage] = useState(null);
  const [confirmPasswordMessage, setConfirmPasswordMessage] = useState(null);

  const dispatch = useDispatch();

  const userDetails = useSelector(state => state.userDetails);
  const { loading, error, user } = userDetails;

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
      if(haveFetchedUserData.current === false){ //if we haven't gotten the user details yet, go ahead and get them
        dispatch(getUserDetails('profile'));
        haveFetchedUserData.current = true;
      } else { //if we have completed fetching the user details from the backend
        setName(user.name);
        setEmail(user.email);
        //Find the user's primary address
        let primaryAddress = user.addresses[user.addresses.findIndex(i => i.isPrimary === true)];
        console.log(primaryAddress);
      }
    }, [ dispatch, userInfo, user ]);

  const submitHandler = (e) => {
    e.preventDefault();
    let anyErrors = false;
    //Clear any existing errors messages first
    if(nameMessage) { setNameMessage(null) }
    if(emailMessage) { setEmailMessage(null) }
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
    // if(password === ''){
    //   setPasswordMessage('Password field cannot be empty');
    //   anyErrors = true;
    // }
    // if(confirmPassword === ''){
    //   setConfirmPasswordMessage('Confirm password field cannot be empty');
    //   anyErrors = true;
    // }
    if(password !== confirmPassword) {
      setPasswordMessage('Your passwords do not match');
      setConfirmPasswordMessage('Your passwords do not match');
      anyErrors = true;
    }

    if(anyErrors) { return }
    console.log('dispatch placeholder')
    //DISPATCH UPDATE PROFILE
  }

  return (
    <Row className='my-4'>
      <Col md={12}>
        <h2 className='text-center'>User Profile Information</h2>
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
              {primaryAddress === null ? 'no addresses on file yet' :
                'address placeholder'
              }          
            </ListGroup.Item>
          </ListGroup>
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='name'>
              <Form.Label>Name</Form.Label>
              <Form.Control 
                type='name' 
                // placeholder='Enter name'
                placeholder='Enter name'
                value={name}
                onChange={(e) => setName(e.target.value)}
                // className='is-invalid'
                className={nameMessage === null ? '' : 'is-invalid'}
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
              >
              </Form.Control>
              { emailMessage && <div className="invalid-feedback">{emailMessage}</div> }
            </Form.Group>
            <Form.Group controlId='password'>
              <Form.Label>Password</Form.Label>
              <Form.Control 
                type='password' 
                placeholder='Enter password' 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={passwordMessage === null ? '' : 'is-invalid'}
              >
              </Form.Control>
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
              >
              </Form.Control>
              { confirmPasswordMessage && <div className="invalid-feedback">{confirmPasswordMessage}</div> }
            </Form.Group>
            <Button type='submit' variant='outline-primary' disabled={loading}>
              {loading ? 'Updating Profile...' : 'Update Profile'}
            </Button>
          </Form>
        </>
        }
      </Col>
    </Row>
  )
}

export default UserInfo;
