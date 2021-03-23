import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Row, Col, Card, ListGroup, Tabs, Tab, TabContainer } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import OffsetPageHeader from '../components/OffsetPageHeader';
import UserInfo from '../components/ProfileScreen/UserInfo';

// import FormContainer from '../components/FormContainer';
// import { getUserDetails } from '../actions/userActions';
import './ProfileScreen.css';

const ProfileScreen = ({ history }) => {

  // const [name, setName] = useState('');
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
  // const [confirmPassword, setConfirmPassword] = useState('');
  // const [primaryAddress, setPrimaryAddress] = useState('');

  // const [nameMessage, setNameMessage] = useState(null);
  // const [emailMessage, setEmailMessage] = useState(null);
  // const [passwordMessage, setPasswordMessage] = useState(null);
  // const [confirmPasswordMessage, setConfirmPasswordMessage] = useState(null);

  // redirect first talked about in section 8-44 ~9:42
  // const redirect = location.search ? location.search.split('=')[1] : '/';

  // const dispatch = useDispatch();

  // const userDetails = useSelector(state => state.userDetails);
  // const { loading, error, user } = userDetails;

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    // if a user is not already logged in, redirect them
    if(!userInfo){
        history.push('/login');
    }
    // } else {
    //   // if(!user || !user.name){ //if we haven't gotten the user details yet, go ahead and get them
    //   if(!user.name){ //if we haven't gotten the user details yet, go ahead and get them
    //     dispatch(getUserDetails('profile'));
    //   } else { //if we have completed fetching the user details from the backend
    //     setName(user.name);
    //     setEmail(user.email);
    //     //Find the user's primary address
    //     let primaryAddress = user.addresses[user.addresses.findIndex(i => i.isPrimary === true)];
    //     console.log(primaryAddress);
    //   }
    // }
  }, [ history, userInfo ]);

  // const submitHandler = (e) => {
  //   e.preventDefault();
  //   let anyErrors = false;
  //   //Clear any existing errors messages first
  //   if(nameMessage) { setNameMessage(null) }
  //   if(emailMessage) { setEmailMessage(null) }
  //   if(passwordMessage) { setPasswordMessage(null) }
  //   if(confirmPasswordMessage) { setConfirmPasswordMessage(null) }
  //   //Check for blank fields next
  //   if(name === ''){ 
  //     setNameMessage('Name field cannot be empty');
  //     anyErrors = true;
  //   }
  //   if(email === ''){
  //     setEmailMessage('Email field cannot be empty');
  //     anyErrors = true;
  //   }
  //   // if(password === ''){
  //   //   setPasswordMessage('Password field cannot be empty');
  //   //   anyErrors = true;
  //   // }
  //   // if(confirmPassword === ''){
  //   //   setConfirmPasswordMessage('Confirm password field cannot be empty');
  //   //   anyErrors = true;
  //   // }
  //   if(password !== confirmPassword) {
  //     setPasswordMessage('Your passwords do not match');
  //     setConfirmPasswordMessage('Your passwords do not match');
  //     anyErrors = true;
  //   }

  //   if(anyErrors) { return }
  //   console.log('dispatch placeholder')
  //   //DISPATCH UPDATE PROFILE
  // }

  return (
    <>
      <OffsetPageHeader leftHeaderText='User Profile' rightHeaderText='User Profile'/>
      <Tabs defaultActiveKey='userInfo' id='uncontrolled-tab-example' className='mt-5'>
        <Tab eventKey='userInfo' title='User Info'>
          <UserInfo />
        </Tab>
        <Tab eventKey='orders' title='Orders'>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. At obcaecati sint hic ullam odio ipsum, amet quod distinctio, unde sapiente ea veritatis eos ducimus incidunt quas. Sed optio architecto nemo explicabo necessitatibus numquam deserunt libero.
        </Tab>
        {/* <Tab eventKey="contact" title="Contact" disabled>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quaerat, recusandae.
        </Tab> */}
      </Tabs>
    </>
  )
}

export default ProfileScreen;
