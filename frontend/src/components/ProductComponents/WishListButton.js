import React, { useState, useEffect } from 'react';
import ReactDom from 'react-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as solidHeart, faSpinner as spinner } from '@fortawesome/free-solid-svg-icons';
import { faHeart as outlineHeart } from '@fortawesome/free-regular-svg-icons';
import { useSelector } from 'react-redux';
import Message from '../Message';
import './WishListButton.css';

const WishListButton = ({ productID, productName, color, size, sizeCategory, primaryImageForColor }) => {
  // Get the user's wishlist from Global State
  const userInfo = useSelector(state => state.userLogin.userInfo);
  const { _id:userID } = userInfo;

  const [loadingWishListIcon, setLoadingWishListIcon] = useState(false);
  const [inWishList, setInWishList] = useState(false);
  const [showLoggedOutMessage, setShowLoggedOutMessage] = useState(false);
  const messageIfLoggedOut = 'Create an account to add items to your wishlist.'

  useEffect(() => {
    // console.log(`productID: ${productID}`)
    // if(addresses.length > 0){
    //   console.log(Object.values(addresses[0]))
    // }
    if(userInfo){
      // console.log('in WishListButton useEffect')
      // console.log(`productID: ${productID}`)
    }
    return () => {
      
    }
  }, [productID, userInfo])

  const addToWishListHandler =  async () => {
    if(!userInfo.name) { //If users are not logged in show them a message about the wishlist feature and exit the function
      setShowLoggedOutMessage(true);
      return;
    }
    setLoadingWishListIcon(true);
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`
        }
      }
      // // attempt to add the item to the user's wishlist
      await axios.post('/api/users/wishlistitem', { 
        userID,
        productID, 
        name: productName,
        color,
        size,
        sizeCategory, 
        image: primaryImageForColor,
      }, config);
      toast.success('Added to wishlist!', 
        { 
          // position: "bottom-center",
          position: "top-right",
          autoClose: 3500,
        }
      );
      setLoadingWishListIcon(false);
      setInWishList(true);
      // store user info in local storage
      // localStorage.setItem('userInfo', JSON.stringify(data));
    } catch (error) {
      console.log('there was an error')
      console.log(error)
      setLoadingWishListIcon(false);
    }    
  }

  const removeFromWishListHandler = () => {
    console.log('clicked remove from wishlist')
    setLoadingWishListIcon(true);
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`
        }
      }
      console.log(`delete wishlist item product id: ${productID}`)
      // // attempt to add the item to the user's wishlist
      await axios.delete(`/api/users/wishlistitem/${productID}`, { userID }, config);
      toast.success('Item removed from wishlist!', 
        { 
          // position: "bottom-center",
          position: "top-right",
          autoClose: 3500,
        }
      );
      setLoadingWishListIcon(false);
      setInWishList(false);
      // store user info in local storage
      // localStorage.setItem('userInfo', JSON.stringify(data));
    } catch (error) {
      console.log('there was an error')
      console.log(error)
      setLoadingWishListIcon(false);
    }
    // setTimeout(() => {
    //   setLoadingWishListIcon(false);
    //   setInWishList(false);
    // }, 2000);
  }

  return (
    <>
      {loadingWishListIcon ? <FontAwesomeIcon className='wishListIcon' icon={spinner} size="3x" /> : 
        ( inWishList ? <FontAwesomeIcon className='wishListIcon' icon={solidHeart} size="3x" onClick={removeFromWishListHandler} /> : 
        <FontAwesomeIcon className='wishListIcon' icon={outlineHeart} size="3x" onClick={addToWishListHandler}/> )
      }
      { showLoggedOutMessage &&  ReactDom.createPortal(
        <Message variant='info'>{messageIfLoggedOut}</Message>,
        document.getElementById('wishListMessage')
      )};
      
    </>
  )
}

export default WishListButton;
