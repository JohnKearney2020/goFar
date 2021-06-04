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

const WishListButton = ({ productID, productName, color, size, sizeCategory, primaryImageForColor, outOfStock }) => {
  const dispatch = useDispatch();
  // Get the user's wishlist from Global State
  const userInfo = useSelector(state => state.userLogin.userInfo);
  const { _id:userID, wishList, token } = userInfo;

  const [loadingWishListIcon, setLoadingWishListIcon] = useState(false);
  const [inWishList, setInWishList] = useState(false);
  const [wishListErrorMessage, setWishListErrorMessage] = useState(null);

  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  }

  useEffect(() => {
    if(wishList.length > 0){
      setInWishList(false); //reset this with each change of color, size, or size category
      //Loop thru the user's wishlist and see if this color, size, and size category combination are already in the wishlist
      for(let eachItem of wishList){
        if(eachItem.color === color && eachItem.size === size && eachItem.sizeCategory === sizeCategory){
          setInWishList(true);
          break;
        }
      }
    }
    return () => {
      
    }
  }, [color, size, sizeCategory, wishList, outOfStock])

  const addToWishListHandler =  async () => {
    setWishListErrorMessage('');
    if(!userInfo.name) { //If users are not logged in show them a message about the wishlist feature and exit the function
      setWishListErrorMessage('Create an account and sign in to add items to your wishlist.');
      return;
    }
    let sizeForWishListAdd = size;
    if(!size && sizeCategory !== 'ONE SIZE'){
      setWishListErrorMessage('You must choose a size before adding an item to your wishlist.');
      return;
    } else if(!size && sizeCategory === 'ONE SIZE'){
      sizeForWishListAdd = 'ONE SIZE';
    }
    setLoadingWishListIcon(true);
    try {
      console.log('attempting to add to a users wishlist')
      //attempt to add the item to the user's wishlist
      const { data } = await axios.post('/api/users/wishlist/wishlistitem', { 
        userID,
        productID, 
        name: productName,
        color,
        size:sizeForWishListAdd,
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
      toast.info(`Added ${productName} - ${color} - Size ${size} ${sizeCategory} to your wishlist!`, { position: "bottom-center", autoClose: 4000 } );
      setLoadingWishListIcon(false);
      setInWishList(true);
      // store user info in local storage
      // localStorage.setItem('userInfo', JSON.stringify(data));
    } catch (error) {
      console.log('there was an error')
      console.log(error)
      toast.error(`Could not add ${productName} - ${color} - Size ${size} ${sizeCategory} to your wishlist. Try again later.`, { position: "bottom-center", autoClose: 4000 } );
      setLoadingWishListIcon(false);
    }    
  }

  const removeFromWishListHandler = async () => {
    console.log('clicked remove from wishlist')
    setLoadingWishListIcon(true);
    try {
      const { data } = await axios.delete(`/api/users/wishlist/wishlistitem/${userID}&${productID}&${encodeURI(color)}&${encodeURI(size)}&${encodeURI(sizeCategory)}`, config);
      // We've set up the backend to send us back the updated user information once the user's wishlist is updated. We need to 
      // dispatch the user login again to update the user's wishlist in the global state
      dispatch({
        type: USER_LOGIN_SUCCESS,
        payload: data
      });
      localStorage.setItem('userInfo', JSON.stringify(data));
      // toast.success(`Removed ${productName} from your wishlist!`, { position: "top-right", autoClose: 3500 } );
      toast.info(`Removed ${productName} - ${color} - Size ${size} ${sizeCategory} from your wishlist!`, { position: "bottom-center", autoClose: 4000 } );
      setLoadingWishListIcon(false);
      setInWishList(false);
    } catch (error) {
      console.log('there was an error')
      console.log(error)
      setWishListErrorMessage(`Could not remove ${productName} - ${color} - Size ${size} ${sizeCategory} from your wishlist. Try again later.`)
      toast.error(`Could not remove ${productName} - ${color} - Size ${size} ${sizeCategory} from your wishlist. Try again later.`, { position: "bottom-center", autoClose: 4000 } );
      setLoadingWishListIcon(false);
    }
  }

  return (
    <>
      {loadingWishListIcon ? <FontAwesomeIcon className='wishListIcon' icon={spinner} size="3x" /> : 
        ( inWishList ? <FontAwesomeIcon className='wishListIcon' icon={solidHeart} size="3x" onClick={removeFromWishListHandler} /> :
        (outOfStock ? <FontAwesomeIcon className='wishListIconDisabled' icon={outlineHeart} size="3x"/> : 
        <FontAwesomeIcon 
          className='wishListIcon' 
          icon={outlineHeart} size="3x" onClick={addToWishListHandler} data-testdata='test'
        />))
      }
      { wishListErrorMessage &&  ReactDom.createPortal(
        <Message variant='danger'>{wishListErrorMessage}</Message>,
        document.getElementById('wishListErrorMessage')
      )}
    </>
  )
}

export default WishListButton;
