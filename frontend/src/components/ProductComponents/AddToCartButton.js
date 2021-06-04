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
import './AddToCartButton.css';

const AddToCartButton = ({ productID, productName, quantity, color, qtyInStock, outOfStock, size, sizeCategory, primaryImageForColor }) => {
  const dispatch = useDispatch();
  // Get the user's cart from Global State
  const userInfo = useSelector(state => state.userLogin.userInfo);
  const { cart } = userInfo;

  const productDetails = useSelector(state => state.productDetails);
  const { loaded } = productDetails;

  const [loadingCartIcon, setLoadingCartIcon] = useState(false);
  const [cartErrorMessage, setCartErrorMessage] = useState(null);
  const [cartWarningMessage, setCartWarningMessage] = useState(null);
  const [cartLoginMessage, setCartLoginMessage] = useState(null);

  useEffect(() => {
    if(loaded){ // If we've successfully loaded the product from the global state
      if(outOfStock === true){
        setCartErrorMessage('Currently out of stock.');
      } else {
        setCartErrorMessage(null);
        setCartWarningMessage(null);
      }
      if(userInfo.loggedIn === false){
        setCartLoginMessage('You need to sign in to add products to your cart or wishlist. You can sign in as a guest or create an account and sign in.')
      }
    }
    
  }, [loaded, color, size, sizeCategory, qtyInStock, outOfStock, userInfo.loggedIn]);

  const addToCartHandler =  async () => {
    setCartErrorMessage(null); //reset any existing cart error messages
    setCartWarningMessage(null); //reset any existing cart warning messages
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
      //=============================================================================================================================
      //First Check to see how many are already in the cart. If the product combination only has qty 3 left, and the cart already
      //has qty 3, handle that situation. If the cart already has some qty, and the additional qty would put the cart qty over the
      //qty left, handle that situation.
      //=============================================================================================================================
      //See if the size, color, size category combination is already in the cart
      let currentCart = [...cart]
      let alreadyInCart = false;
      let qtyAlreadyInCart = 0;
      for(let eachProduct of currentCart){
        if(eachProduct.productID === productID && eachProduct.color === color  && eachProduct.size === size && eachProduct.sizeCategory === sizeCategory){
          alreadyInCart = true; //We now know this combination already exists in the cart
          qtyAlreadyInCart = eachProduct.quantity;
          break;
        }
      }
      if(alreadyInCart){
        // ================================================================================================================================
        // Do a series of checks comparing the qty the user wants to add to the cart, to the qty in stock, to the qty already in the cart
        // ================================================================================================================================
        if(qtyInStock === qtyAlreadyInCart) { //If the cart already has the maximum qty it can
          if(qtyInStock === 1){
            setCartErrorMessage(`There is only 1 left in stock and you already have 1 in your cart. Cannot add more to your cart. Consider placing an order now so you don't miss out!`);
            setLoadingCartIcon(false);
          } else {
            setCartErrorMessage(`There are only ${qtyInStock} left in stock and you already have ${qtyAlreadyInCart} in your cart. Cannot add more to your cart. Consider placing an order now so you don't miss out!`);
            setLoadingCartIcon(false);
          }
        } else if(qtyInStock < qtyAlreadyInCart) { //If the cart is outdated and has more than is currently in stock
          //Update the cart with the correct maximum quantity
          updateCart(qtyInStock, 'info');
          setCartWarningMessage(`Your cart previously had quantity ${qtyAlreadyInCart} for this item, but now there are only ${qtyInStock} left in stock. We've updated your cart quantity to ${qtyInStock} to reflect the quantity currently available. Consider placing an order now so you don't miss out!`);
          setLoadingCartIcon(false);
        } else if(qtyAlreadyInCart + quantity > qtyInStock){ //If the qty already in the cart plus the qty the user wants to add to the cart is > the qty we have in stock
          //Update the cart with the maximum amount we can, which is the qtyInStock
          updateCart(qtyInStock, 'info');
          setCartWarningMessage(`Your cart previously had quantity ${qtyAlreadyInCart} for this item. We can't add ${quantity} more to your cart as there are only ${qtyInStock} available. We've added ${qtyInStock - qtyAlreadyInCart} to your cart for a total of ${qtyInStock} to reflect the quantity currently available.`);
          setLoadingCartIcon(false);
        } else {
          updateCart((quantity + qtyAlreadyInCart), 'success'); //Everything looks good, update the cart with the quantity the user chose
        }
      } else { //This color/size/size category combination is not already in the cart
        updateCart(quantity, 'success');
      }
    }
    //If a user is NOT logged in
    // To-do as of 4-9-2021
  }

  const updateCart = async (cartQty, messageType) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`
        }
      }
      //attempt to add the item to the user's cart
      const { data } = await axios.post('/api/users/cart/cartitem', {
        productID, 
        name: productName,
        quantity: cartQty,
        color,
        size,
        sizeCategory,
        price: '',
        image: primaryImageForColor,
        savedForLater: false //user's can't save for later from the product page
      }, config);
      // We've set up the backend to send us back the updated user information once the user's cart is updated. We need to 
      // dispatch the user login again to update the user's cart in the global state
      dispatch({
        type: USER_LOGIN_SUCCESS,
        payload: data
      });
      localStorage.setItem('userInfo', JSON.stringify(data));
      switch (messageType) {
        case 'success':
          toast.info(`Added ${productName} - ${color} - Size ${size} ${sizeCategory} to your cart!`, { position: "bottom-center", autoClose: 4000 } );
          break;
        case 'warning':
          toast.warning(`Added ${productName} - ${color} - Size ${size} ${sizeCategory} to your cart with warnings...`, { position: "bottom-center", autoClose: 4000 } );
          break;
        case 'info':
          toast.info(`Added ${productName} - ${color} - Size ${size} ${sizeCategory} to your cart with warnings...`, { position: "bottom-center", autoClose: 4000 } );
          break;
        case 'error':
          toast.error(`Could not add ${productName} - ${color} - Size ${size} ${sizeCategory} to your cart!`, { position: "bottom-center", autoClose: 4000 } );
          break;
        default:
          break;
      }
      setLoadingCartIcon(false);
    } catch (error) {
      console.log('there was an error')
      console.log(error)
      toast.error(`Could not add ${productName} to your cart. Try again later.`, { position: "top-right", autoClose: 3500 });
      setLoadingCartIcon(false);
    }  
  }

  return (
    <>
      <Button 
        className='btn-block addToCartButton px-3' 
        type='button' 
        // variant="dark" 
        onClick={addToCartHandler}
        disabled={loadingCartIcon | qtyInStock === 0 | size === '' | !userInfo.name}
      >
        <div className='text-center'>
          {loadingCartIcon ? <FontAwesomeIcon className='' icon={spinner} size="2x"/>
            // : (qtyInStock === 0 && sizeCategory === 'ONE SIZE' ? 'Out Of Stock' : (size === '' ? 'Choose a Size' : 'Add to Cart'))
            : (outOfStock ? 'Out Of Stock' : (!userInfo.name ? 'Add to Cart' : (size === '' ? 'Choose a Size' : 'Add to Cart')))
            // : (size === '' ? 'Choose a Size' : (qtyInStock === 0 ? 'Out of Stock' : 'Add to Cart') )
          }
        </div>
      </Button>
      { cartErrorMessage &&  ReactDom.createPortal(
        <Message variant='danger'>{cartErrorMessage}</Message>,
        document.getElementById('cartErrorMessage')
      )}
      { cartWarningMessage &&  ReactDom.createPortal(
        <Message variant='info'>{cartWarningMessage}</Message>,
        document.getElementById('cartWarningMessage')
      )}
      { cartLoginMessage &&  ReactDom.createPortal(
        <Message variant='info'>{cartLoginMessage}</Message>,
        document.getElementById('cartLoginMessage')
      )}
    </>
  )
}

export default AddToCartButton;
