import React, { useState, useEffect } from 'react';
import ReactDom from 'react-dom';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner as spinner } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { USER_LOGIN_SUCCESS } from '../../constants/userConstants';
import Message from '../Message';
import './WishListButton.css';

const AddToCartButton = ({ productID, productName, color, quantity, size, sizeCategory, primaryImageForColor }) => {
  const dispatch = useDispatch();
  // Get the user's wishlist from Global State
  const userInfo = useSelector(state => state.userLogin.userInfo);
  const { _id:userID, cart } = userInfo;

  const [loadingCartIcon, setLoadingCartIcon] = useState(false);
  const [CartErrorMessage, setCartErrorMessage] = useState(null);

  useEffect(() => {
    // console.log('size, color, or sizeCategory changed')
    // if(cart.length > 0){
    //   setInWishList(false); //reset this with each change of color, size, or size category
    //   //Loop thru the user's cart and see if this color, size, and size category combination are already in the wishlist
    //   console.log('looping thru wishlist');
    //   for(let eachItem of wishList){
    //     if(eachItem.color === color && eachItem.size === size && eachItem.sizeCategory === sizeCategory){
    //       setInWishList(true);
    //       break;
    //     }
    //   }
    // }
    return () => {
      
    }
  // }, [color, size, sizeCategory, cart]);
  }, []);

  const addToCartHandler =  async () => {
    setCartErrorMessage(''); //reset any existing cart error messages
    if(!size){
      setCartErrorMessage('You must choose a size before adding an item to your cart.');
      return;
    }
    if(!sizeCategory){
      setCartErrorMessage('You must choose a size category before adding an item to your cart.');
      return;
    }
    if(!color){
      setCartErrorMessage('You must choose a color before adding an item to your cart.');
      return;
    }
    setLoadingCartIcon(true);
    //If a user is logged in
    if(userInfo.name){
      try {
        const config = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userInfo.token}`
          }
        }
        //attempt to add the item to the user's wishlist
        const { data } = await axios.post('/api/users/cartitem', {
          productID, 
          name: productName,
          color,
          quantity,
          size,
          sizeCategory, 
          image: primaryImageForColor,
          savedForLater: false //user's can't save for later from the product page
        }, config);
        console.log(data)
        // We've set up the backend to send us back the updated user information once the user's wishlist is updated. We need to 
        // dispatch the user login again to update the user's wishlist in the global state
        dispatch({
          type: USER_LOGIN_SUCCESS,
          payload: data
        });
        localStorage.setItem('userInfo', JSON.stringify(data));
        toast.success(`Added ${productName} to your cart!`, { position: "top-right", autoClose: 3500 } );
        setLoadingCartIcon(false);
        // store user info in local storage
        // localStorage.setItem('userInfo', JSON.stringify(data));
      } catch (error) {
        console.log('there was an error')
        console.log(error)
        toast.error(`Could not add ${productName} to your cart. Try again later.`, { position: "top-right", autoClose: 3500 });
        setLoadingCartIcon(false);
      }  
    }
  }

  // const removeFromWishListHandler = async () => {
  //   console.log('clicked remove from wishlist')
  //   setLoadingCartIcon(true);
  //   try {
  //     const config = {
  //       headers: {
  //         'Content-Type': 'application/json',
  //         Authorization: `Bearer ${userInfo.token}`
  //       }
  //     }

  //     const { data } = await axios.delete(`/api/users/wishlistitem/${userID}&${productID}&${encodeURI(color)}&${encodeURI(size)}&${encodeURI(sizeCategory)}`, config);
  //     // We've set up the backend to send us back the updated user information once the user's wishlist is updated. We need to 
  //     // dispatch the user login again to update the user's wishlist in the global state
  //     dispatch({
  //       type: USER_LOGIN_SUCCESS,
  //       payload: data
  //     });
  //     localStorage.setItem('userInfo', JSON.stringify(data));
  //     toast.success(`Removed ${productName} from your wishlist!`, { position: "top-right", autoClose: 3500 } );
  //     setLoadingCartIcon(false);
  //     setInWishList(false);
  //   } catch (error) {
  //     console.log('there was an error')
  //     console.log(error)
  //     toast.error(`Could not remove ${productName} from your wishlist. Try again later.`, { position: "top-right", autoClose: 3500 } );
  //     setCartErrorMessage(`Could not remove ${productName} from your wishlist. Try again later.`)
  //     setLoadingCartIcon(false);
  //   }
  // }

  return (
    <>
      <Button 
        className='btn-block' 
        type='button' 
        variant="dark" 
        onClick={addToCartHandler}
        // disabled={selectedSize === ''}
      >
        {loadingCartIcon ? <FontAwesomeIcon className='wishListIcon' icon={spinner} size="2x" /> : 
          'Add to Cart'
        }
      </Button>
      {/* { CartErrorMessage &&  ReactDom.createPortal(
        <Message variant='danger'>{CartErrorMessage}</Message>,
        document.getElementById('CartErrorMessage')
      )} */}
    </>
  )
}

export default AddToCartButton;
