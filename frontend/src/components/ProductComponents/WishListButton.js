import React, { useState, useEffect } from 'react';
import ReactDom from 'react-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as solidHeart, faSpinner as spinner } from '@fortawesome/free-solid-svg-icons';
import { faHeart as outlineHeart } from '@fortawesome/free-regular-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { USER_LOGIN_SUCCESS } from '../../constants/userConstants';
import Message from '../Message';
import './WishListButton.css';

const WishListButton = ({ productID, productName, color, size, sizeCategory, primaryImageForColor }) => {
  const dispatch = useDispatch();
  // Get the user's wishlist from Global State
  const userInfo = useSelector(state => state.userLogin.userInfo);
  const { _id:userID, wishList } = userInfo;

  const [loadingWishListIcon, setLoadingWishListIcon] = useState(false);
  const [inWishList, setInWishList] = useState(false);
  const [wishListErrorMessage, setWishListErrorMessage] = useState('');

  useEffect(() => {
    console.log('size, color, or sizeCategory changed')
    if(wishList.length > 0){
      setInWishList(false); //reset this with each change of color, size, or size category
      //Loop thru the user's wishlist and see if this color, size, and size category combination are already in the wishlist
      console.log('looping thru wishlist');
      for(let eachItem of wishList){
        if(eachItem.color === color && eachItem.size === size && eachItem.sizeCategory === sizeCategory){
          setInWishList(true);
          break;
        }
      }
    }
    return () => {
      
    }
  }, [color, size, sizeCategory, wishList])

  const addToWishListHandler =  async () => {
    setWishListErrorMessage('');
    if(!userInfo.name) { //If users are not logged in show them a message about the wishlist feature and exit the function
      setWishListErrorMessage('Create an account to add items to your wishlist.');
      return;
    }
    if(!size){
      setWishListErrorMessage('You must choose a size before adding an item to your wishlist.');
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
      //attempt to add the item to the user's wishlist
      const { data } = await axios.post('/api/users/wishlistitem', { 
        userID,
        productID, 
        name: productName,
        color,
        size,
        sizeCategory, 
        image: primaryImageForColor,
      }, config);
      console.log(data)
      // We've set up the backend to send us back the updated user information once the user's wishlist is updated. We need to 
      // dispatch the user login again to update the user's wishlist in the global state
      dispatch({
        type: USER_LOGIN_SUCCESS,
        payload: data
      });
      localStorage.setItem('userInfo', JSON.stringify(data));
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

  const removeFromWishListHandler = async () => {
    console.log('clicked remove from wishlist')
    setLoadingWishListIcon(true);
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`
        }
      }
      // attempt to remove the item from the user's wishlist
      // await axios.delete(`/api/users/wishlistitem/${productID}`, { userID, color, size, sizeCategory }, config);
      await axios.delete(`/api/users/wishlistitem/${productID}`, config);
      setLoadingWishListIcon(false);
      toast.success('Item removed from wishlist!', 
        { 
          // position: "bottom-center",
          position: "top-right",
          autoClose: 3500,
        }
      );
      setInWishList(false);
      // store user info in local storage
      // localStorage.setItem('userInfo', JSON.stringify(data));
    } catch (error) {
      console.log('there was an error')
      console.log(error)
      setLoadingWishListIcon(false);
    }
  }

  return (
    <>
      {loadingWishListIcon ? <FontAwesomeIcon className='wishListIcon' icon={spinner} size="3x" /> : 
        ( inWishList ? <FontAwesomeIcon className='wishListIcon' icon={solidHeart} size="3x" onClick={removeFromWishListHandler} /> : 
        <FontAwesomeIcon className='wishListIcon' icon={outlineHeart} size="3x" onClick={addToWishListHandler}/> )
      }
      { wishListErrorMessage &&  ReactDom.createPortal(
        <Message variant='danger'>{wishListErrorMessage}</Message>,
        document.getElementById('wishListErrorMessage')
      )}
    </>
  )
}

export default WishListButton;
