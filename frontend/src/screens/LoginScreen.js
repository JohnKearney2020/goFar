import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import { login } from '../actions/userActions';

const LoginScreen = ({ location, history }) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailMessage, setEmailMessage] = useState(null);
  const [passwordMessage, setPasswordMessage] = useState(null);

  // redirect first talked about in section 8-44 ~9:42
  const redirect = location.search ? location.search.split('=')[1] : '/';

  const dispatch = useDispatch();
  const userLogin = useSelector(state => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  useEffect(() => {
    // if a user is already logged in, redirect them
    if(userInfo.name){
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    let anyErrors = false;
    //Clear any existing errors messages first
    if(emailMessage) { setEmailMessage(null) }
    if(passwordMessage) { setPasswordMessage(null) }

    if(email === ''){
      setEmailMessage('Email field cannot be empty');
      anyErrors = true;
    }
    if(password === ''){
      setPasswordMessage('Password field cannot be empty');
      anyErrors = true;
    }
    if(anyErrors) { return }
    dispatch(login(email, password));
  }

  const guestLoginHandler = (e) => {
    console.log('guest login clicked');
    let guestEmail = 'guest@example.com';
    let guestPassword = '12345';
    dispatch(login(guestEmail, guestPassword));
  }

  return (
    <FormContainer>
      <h1>Sign In</h1>
      {error && <Message variant='danger'>{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
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
          {emailMessage && <div className="invalid-feedback">{emailMessage}</div>
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
          {passwordMessage && <div className="invalid-feedback">{passwordMessage}</div>
          }
        </Form.Group>
        <Button type='submit' variant='outline-primary' disabled={loading}>
          {loading ? 'Signing in...' : 'Sign In'}
        </Button>
        <Button type='button' variant='outline-primary' disabled={loading} className='ml-2' onClick={guestLoginHandler}>
          {loading ? 'Signing in...' : 'Sign In As Guest'}
        </Button>
      </Form>
      <Row className='py-3'>
        <Col>
          New Customer?{' '} 
          <Link to={redirect ? `/register?redirect=${redirect}` : `/register`}>
            <u>Register Instead</u>
          </Link>
        </Col>
      </Row>
    </FormContainer>
  )
}

export default LoginScreen
