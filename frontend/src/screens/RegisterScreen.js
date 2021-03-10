import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import { register } from '../actions/userActions';

const RegisterScreen = ({ location, history }) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [nameMessage, setNameMessage] = useState(null);
  const [emailMessage, setEmailMessage] = useState(null);
  const [passwordMessage, setPasswordMessage] = useState(null);
  const [confirmPasswordMessage, setConfirmPasswordMessage] = useState(null);

  // redirect first talked about in section 8-44 ~9:42
  const redirect = location.search ? location.search.split('=')[1] : '/';

  const dispatch = useDispatch();

  const userRegister = useSelector(state => state.userRegister);
  const { loading, error } = userRegister;

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    // if a user is already logged in, redirect them
    if(userInfo){
        history.push(redirect);
    }
  }, [ history, userInfo, redirect]);

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
    if(password === ''){
      setPasswordMessage('Password field cannot be empty');
      anyErrors = true;
    }
    if(confirmPassword === ''){
      setConfirmPasswordMessage('Confirm password field cannot be empty');
      anyErrors = true;
    }
    if(password !== confirmPassword) {
      setPasswordMessage('Your passwords do not match');
      setConfirmPasswordMessage('Your passwords do not match');
      anyErrors = true;
    }

    if(anyErrors) { return }
    dispatch(register(name, email, password));
  }

  return (
    <FormContainer>
      <h1>Sign Up</h1>
      {error && <Message variant='danger'>{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
      <Form.Group controlId='name'>
          <Form.Label>Name</Form.Label>
          <Form.Control 
            type='name' 
            placeholder='Enter name'
            value={name}
            onChange={(e) => setName(e.target.value)}
            // className='is-invalid'
            className={nameMessage === null ? '' : 'is-invalid'}
          >
          </Form.Control>
          {nameMessage && <div class="invalid-feedback">{nameMessage}</div>
          }
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
          {emailMessage && <div class="invalid-feedback">{emailMessage}</div>
          }
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
          {passwordMessage && <div class="invalid-feedback">{passwordMessage}</div>
          }
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
          {confirmPasswordMessage && <div class="invalid-feedback">{confirmPasswordMessage}</div>
          }
        </Form.Group>
        <Button type='submit' variant='outline-primary' disabled={loading}>
          {loading ? 'Signing in...' : 'Register'}
        </Button>
        {/* <Button type='button' variant='outline-secondary' disabled={loading} className='ml-2' onClick={guestLoginHandler}>
          {loading ? 'Signing in...' : 'Sign In As Guest'}
        </Button> */}
      </Form>
      <Row className='py-3'>
        <Col>
          Already Have an Account?{' '} 
          <Link to={redirect ? `/login?redirect=${redirect}` : `/login`} as='u'>
            <u>Login Instead</u>
          </Link>
        </Col>
      </Row>
    </FormContainer>
  )
}

export default RegisterScreen;
