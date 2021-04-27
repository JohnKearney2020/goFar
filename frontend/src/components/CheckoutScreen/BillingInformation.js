import React, { useEffect, useState } from 'react';
import { Row, Form, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';

import { checkoutBillingAddress } from '../../actions/checkoutActions';
import Message from '../Message';
import NewAddressModal from '../Modals/NewAddressModal';
import Loader from '../../components/Loader';
import './BillingInformation.css';

// const BillingInformation = ({ addressesToDisplay, billingAddressString, setBillingAddress, showNoAddressMessage, noAddressMessage }) => {
const BillingInformation = () => {

  const dispatch = useDispatch();

  const userDetails = useSelector(state => state.userDetails);
  const { loading, error, user } = userDetails;
  const { addresses } = user;

  const billingAddress = useSelector(state => state.checkoutData.billingAddress);
  const { addressObject:billingAddressObj } = billingAddress;

  const [showNewAddressModal, setShowNewAddressModal] = useState(false);
  const [showNoAddressMessage, setShowNoAddressMessage] = useState(false);
  const [addressesToDisplay, setAddressesToDisplay] = useState([]);

  const noAddressMessage = 'No addresses on file. Create an address to proceed with your order.'

  useEffect(() => {
    //If the user has addresses on file
    if(addresses.length > 0){
      if(showNoAddressMessage) { setShowNoAddressMessage(false) };
      console.log('the user has addresses')
      //If the user has already chosen a billing address
      if(billingAddressObj.line1){
        const otherAddresses = [];
        const chosenBillingAddress = [];
        addresses.forEach(eachAdd => { //Separate the selected address from the others
          if(eachAdd._id !== billingAddressObj._id){
            otherAddresses.push(eachAdd);
          } else {
            chosenBillingAddress.push(eachAdd);
          }
        });
        //List the addresses to display with the chosen address first
        setAddressesToDisplay(chosenBillingAddress.concat(otherAddresses));
      //If the user has not yet chosen a billing address, default to the primary address first (the primary address is already first)
      } else {
        console.log('No billing address chosen by the user yet. Setting the primary address as the chosen address')
        setAddressesToDisplay(addresses);
        //Set the primary address as the chosen address by default
        dispatch(checkoutBillingAddress(addresses[0], 'Test String'))
      }
    } else if(addresses.length === 0){
      setShowNoAddressMessage(true);
    };

  }, [addresses, billingAddressObj, dispatch, showNoAddressMessage])

  const showNewAddressModalHandler = () => {
    console.log('show modal')
    setShowNewAddressModal(true);
  }

  const closeNewAddressModalHandler = () => {
    console.log('close modal')
    setShowNewAddressModal(false);
  }

  const addressSelectHandler = (e) => {
    let addressID = e.target.options[e.target.selectedIndex].dataset.id;
    //Find the address in our global state that matches that id
    let billingAddress = addresses[addresses.findIndex(i => i._id === addressID)];
    //Update the global state with that address
    dispatch(checkoutBillingAddress(billingAddress, 'Test String'))
  }

  return (
    <>
      {loading ? ( <Loader /> ) : error ? ( <Message variant='danger'>{error}</Message> ) : 
        <Row className='px-2'>
            {/* {addresses.length === 0 ? <Message variant='info'>{noAddressMessage}</Message> :
              <>
                {addressesToDisplay.map(address => (
                  <Col className='d-flex align-items-stretch' key={address._id} sm={12} md={6} lg={4} xl={3}>
                    <AddressCard address={address} key={address._id}/>
                  </Col>
                ))}
              </>
            } */}
            {/* {addressesToDisplay.map(eachAdd => <h6>{eachAdd.line1}</h6>)} */}
            <Form.Control 
              as='select'
              // value={billingAddressString} 
              onChange={(e) => addressSelectHandler(e)} 
              disabled={addressesToDisplay.length === 0}
              className='shadow-sm mb-1'
              id='addressDropdown'
              placeholder='Choose an address...'
            >
              {addressesToDisplay.map(eachAdd => {
                return <option 
                  key={`${eachAdd.line1}${eachAdd.city}`}
                  data-id={eachAdd._id}
                  className=''
                >
                  {`
                    ${eachAdd.addressName && eachAdd.addressName + ','} 
                    ${eachAdd.line1},
                    ${eachAdd.line2 && eachAdd.line2 + ','}
                    ${eachAdd.city},
                    ${eachAdd.state},
                    ${eachAdd.zipCode}
                    ${eachAdd.isPrimary === true ? '- ( Primary )' : ''}
                  `}
                </option>
              })}
            </Form.Control>
            {showNoAddressMessage && <Message variant='info'>{noAddressMessage}</Message>}
            <Row className='d-flex justify-content-between w-100 m-0'>
              <Button 
                className='d-flex align-items-center mt-2' 
                variant='primary' 
                onClick={showNewAddressModalHandler} 
                disabled={showNewAddressModal}
              >
                <FontAwesomeIcon className='mr-2' icon={faPlus} size="2x" /> Add an Address
              </Button>
            </Row>
          {showNewAddressModal && 
            <NewAddressModal 
              show={showNewAddressModal}
              closeModalHandler={closeNewAddressModalHandler}
              billingAddress={true}
            />
          }
        </Row>
      }
    </>
  )
}

export default BillingInformation;
