import React, { useEffect } from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import { useSelector } from 'react-redux';

import OffsetPageHeader from '../components/OffsetPageHeader';
import UserInfo from '../components/ProfileScreen/UserInfo';
import Addresses from '../components/ProfileScreen/Addresses';
import Orders from '../components/ProfileScreen/Orders';
import './ProfileScreen.css';

const ProfileScreen = ({ history, match }) => {
  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    // if a user is not already logged in, redirect them. Also, if a user logs out from the profile screen, this will redirect them
    if(!userInfo.loggedIn){ history.push('/login') };
  }, [ history, userInfo ]);

  const acceptableParams = {
    userInfo: 1,
    addresses: 1,
    orders: 1
  }

  return (
    <>
      <OffsetPageHeader leftHeaderText='User Profile' rightHeaderText='User Profile' hrBoolean={false}/>
      <Tabs defaultActiveKey={
          acceptableParams[match.params.tab] ? match.params.tab : 'userInfo'
        } 
        id='uncontrolled-tab-example' className='mt-5'>
        <Tab eventKey='userInfo' title='User Profile Information'>
          <UserInfo />
        </Tab>
        <Tab eventKey='addresses' title='Addresses'>
          <Addresses />
        </Tab>
        <Tab eventKey='orders' title='Orders'>
          <Orders />
        </Tab>
      </Tabs>
    </>
  )
}

export default ProfileScreen;
