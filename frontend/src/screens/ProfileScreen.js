import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Row, Col, Card, ListGroup } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
// import FormContainer from '../components/FormContainer';
import { getUserDetails } from '../actions/userActions';
import './ProfileScreen.css';

const ProfileScreen = ({ history }) => {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [nameMessage, setNameMessage] = useState(null);
  const [emailMessage, setEmailMessage] = useState(null);
  const [passwordMessage, setPasswordMessage] = useState(null);
  const [confirmPasswordMessage, setConfirmPasswordMessage] = useState(null);

  // redirect first talked about in section 8-44 ~9:42
  // const redirect = location.search ? location.search.split('=')[1] : '/';

  const dispatch = useDispatch();

  const userDetails = useSelector(state => state.userDetails);
  const { loading, error, user } = userDetails;

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    // if a user is already logged in, redirect them
    if(!userInfo){
        history.push('/login');
    } else {
      // if(!user || !user.name){ //if we haven't gotten the user details yet, go ahead and get them
      if(!user.name){ //if we haven't gotten the user details yet, go ahead and get them
        dispatch(getUserDetails('profile'));
      } else { //if we have completed fetching the user details from the backend
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [ dispatch, history, userInfo, user ]);

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
    <>
      <Row className='w-100 mt-4 mb-5' >
        {/* <div className='d-inline-flex'> */}
          {/* <h1 className='display-2'>User Profile</h1><h1 className='display-2 mx-4'>|</h1> <h3 className=''>User Profile</h3> */}
          <Col className='d-inline-flex justify-content-center mb-3' id='userProfileScreenHeading'>
            <h1 className='display-4'>User Profile</h1><div class="vl mx-4"></div><h3 className=''>User Profile</h3>
          </Col>

        {/* </div> */}
      </Row>
      <Row>
        <Col md={3}>
          <h2>User Info</h2>
          <div>
            <h5>{user.name}</h5>
            <h6>{user.email}</h6>
            <h6>{`Phone Number: ${user.phoneNumber ? user.phoneNumber : `N/A`}`}</h6>
          </div>
          {/* <h4>{user.add}</h4> */}
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
        </Col>
        <Col md={9}>
          <h2>My Orders</h2>
        </Col>
      </Row>
    </>
  )
}

export default ProfileScreen;
