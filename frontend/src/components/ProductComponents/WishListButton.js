import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as solidHeart, faSpinner as spinner } from '@fortawesome/free-solid-svg-icons';
import { faHeart as outlineHeart } from '@fortawesome/free-regular-svg-icons';
import { Row, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import Loader from '../../components/Loader';
import './WishListButton.css';



const WishListButton = ({ productID }) => {
  // Get the user's wishlist from Global State
  const userInfo = useSelector(state => state.userLogin.userInfo);
  // const { wishList } = userInfo;

  const [loadingWishListIcon, setLoadingWishListIcon] = useState(false);
  const [inWishList, setInWishList] = useState(false);
  // const [wishListIcon, setWishListIcon] = useState('outlineHeart');
  // const [wishListIcon, setWishListIcon] = useState('solidHeart');

  const userDetails = useSelector(state => state.userDetails);
  const { user } = userDetails;
  const { addresses } = user;

  useEffect(() => {
    // console.log(`productID: ${productID}`)
    // if(addresses.length > 0){
    //   console.log(Object.values(addresses[0]))
    // }
    if(userInfo){
      console.log('in WishListButton useEffect')
      console.log(`productID: ${productID}`)
    }
    return () => {
      
    }
  }, [addresses,productID])

  const addToWishListHandler = () => {
    console.log('clicked add to wishlist')
    setLoadingWishListIcon(true);
    setTimeout(() => {
      setLoadingWishListIcon(false);
      setInWishList(true);
    }, 2000);
  }

  const removeFromWishListHandler = () => {
    console.log('clicked remove from wishlist')
    setLoadingWishListIcon(true);
    setTimeout(() => {
      setLoadingWishListIcon(false);
      setInWishList(false);
    }, 2000);
  }

  return (
    <>
      {loadingWishListIcon ? <FontAwesomeIcon className='wishListIcon' icon={spinner} size="3x" /> : 
        ( inWishList ? <FontAwesomeIcon className='wishListIcon' icon={solidHeart} size="3x" onClick={removeFromWishListHandler} /> : 
        <FontAwesomeIcon className='wishListIcon' icon={outlineHeart} size="3x" onClick={addToWishListHandler}/> )
      }
    </>
  )
}

export default WishListButton;
