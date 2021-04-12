import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ListGroup, Col, Row } from 'react-bootstrap';

import { getCartProductDetails } from '../actions/cartActions';
import OffsetPageHeader from '../components/OffsetPageHeader';
import Message from '../components/Message';
import Loader from '../components/Loader';
import './WishListScreen.css';
import WishListRow from '../components/WishListScreen/WishListRow';

const CartScreen = ({ history }) => {

  const dispatch = useDispatch();
  const haveFetchedCartData = useRef(false);

  const userInfo = useSelector(state => state.userLogin.userInfo);
  const { cart } = userInfo;


  useEffect(() => {
    // if a user is not already logged in, redirect them. Also, if a user logs out from the profile screen, this will redirect them
    // if(!userInfo.name){ history.push('/login') };

    if(cart.length > 0 && haveFetchedCartData.current === false){
      console.log('we have a cart')
      let tempArrayProductIDs = cart.map((eachItem) => {
        return eachItem.productID;
      })
      console.log(tempArrayProductIDs)
      dispatch(getCartProductDetails({arrayOfProductIDs: tempArrayProductIDs}));
      haveFetchedCartData.current = false;
    } else {
      // console.log('the user does not have a wishlist');
    }
    return () => {
      
    }
  }, [history, userInfo, dispatch, cart]);

  return (
    <>
      <OffsetPageHeader leftHeaderText='Your Cart' rightHeaderText='Your Cart' hrBoolean={false}/>
    </>
  )
}

export default CartScreen;

