import React, { useEffect } from 'react';
// import { Form, Button, Row, Col, Card, ListGroup, Tabs, Tab, TabContainer } from 'react-bootstrap';
import { Tabs, Tab } from 'react-bootstrap';
// import { useDispatch, useSelector } from 'react-redux';
import { useSelector } from 'react-redux';
// import Message from '../components/Message';
// import Loader from '../components/Loader';
import OffsetPageHeader from '../components/OffsetPageHeader';
import UserInfo from '../components/ProfileScreen/UserInfo';

// import FormContainer from '../components/FormContainer';
// import { getUserDetails } from '../actions/userActions';
import './ProfileScreen.css';

const ProfileScreen = ({ history }) => {
  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    // if a user is not already logged in, redirect them
    if(!userInfo){ history.push('/login') };
  }, [ history, userInfo ]);

  return (
    <>
      <OffsetPageHeader leftHeaderText='User Profile' rightHeaderText='User Profile' hrBoolean={false}/>
      <Tabs defaultActiveKey='userInfo' id='uncontrolled-tab-example' className='mt-5'>
        <Tab eventKey='userInfo' title='User Profile Information'>
          <UserInfo />
        </Tab>
        <Tab eventKey='addresses' title='Addresses'>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. At obcaecati sint hic ullam odio ipsum, amet quod distinctio, unde sapiente ea veritatis eos ducimus incidunt quas. Sed optio architecto nemo explicabo necessitatibus numquam deserunt libero.
        </Tab>
        <Tab eventKey='orders' title='Orders'>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. At obcaecati sint hic ullam odio ipsum, amet quod distinctio, unde sapiente ea veritatis eos ducimus incidunt quas. Sed optio architecto nemo explicabo necessitatibus numquam deserunt libero.
        </Tab>
      </Tabs>
    </>
  )
}

export default ProfileScreen;
