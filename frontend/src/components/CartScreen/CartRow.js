import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Image, Button, Col, Row, ListGroup, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner as spinner } from '@fortawesome/free-solid-svg-icons';
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import { USER_LOGIN_SUCCESS } from '../../constants/userConstants';
import { addDecimals } from '../../utilityFunctions/addDecimals';
import { CART_LOADING_TRUE, CART_LOADING_FALSE } from '../../constants/cartConstants';

import './CartRow.css';
// the hideButtons prop disables the 'save for later', 'move to wishlist', and delete buttons. It is used
// when we display the cart contents during the final step of checkout
const CartRow = ({ productID, name, color, size, sizeCategory, price, qty, image, savedForLater, hideButtons, qtyInStock, qtyDropDown }) => {

  const dispatch = useDispatch();

  // Format the size for the Size column
  let sizeForTable = '';
  sizeCategory !== 'ONE SIZE' ? sizeForTable = `${size} - ${sizeCategory}` : sizeForTable = 'ONE SIZE';

  //Format the price for two decimal places
  price = addDecimals(price);

  // Get data from the global state
  const userInfo = useSelector(state => state.userLogin.userInfo);
  const { _id:userID, token, wishList } = userInfo;

  // This is a generic loading boolean used by all the operations possible on the cart screen.
  const cartLoading = useSelector(state => state.cartLoading.loading);

  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  }

  //Set up local state
  const [alreadyInWishlist, setAlreadyInWishlist] = useState(false);
  const [loadingDeleteIcon, setLoadingDeleteIcon] = useState(false);
  // const [updatingCartIcon, setUpdatingCartIcon] = useState(false);
  const [savingForLaterIcon, setSavingForLaterIcon] = useState(false);
  const [movingToWishlistIcon, setMovingToWishlistIcon] = useState(false);
  const [movingToCartIcon, setMovingToCartIcon] = useState(false);
  const [qtyDropDownValue, setQtyDropDownValue] = useState(qty);

  useEffect(() => {
    // console.log('in CartRow.js useEffect')
    if(wishList.length > 0){
      // console.log('evaluating the wishlist:')
      // console.log(wishList)
      for(let eachItem of wishList){
        let { productID:productID2, color:color2, size:size2, sizeCategory:sizeCategory2} = eachItem;
        // console.log(`productID: ${productID2} color: ${color2} size: ${size2} sizeCategory: ${sizeCategory2}`)
        // productID, name, color, size, sizeCategory, price, qty, image, savedForLater
        if(productID === productID2 && color === color2 && size === size2 && sizeCategory === sizeCategory2){
          setAlreadyInWishlist(true);
          // console.log(`${name} is already in your wishlist`);
          break;
        }
      }
    }
    // 'color', 'productID', 'size', 'sizeCategory', and 'wishList'
  }, [wishList.length, color, productID, size, sizeCategory, wishList ])

  //This moves items to saved for later or back to the cart
  const moveInCartHandler = async (e) => {
    dispatch({type: CART_LOADING_TRUE });
    let savedForLaterBoolean = e.target.value;
    console.log(`e.target.value: ${e.target.value}`)
    setSavingForLaterIcon(true);
    setMovingToCartIcon(true);
    try {
      //attempt to move the item to the user's Cart OR move it to saved for later
      const { data } = await axios.put('/api/users/cart/savedforlater', {
        productID, 
        name: name,
        color,
        size,
        sizeCategory,
        savedForLater: savedForLaterBoolean
      }, config);
      toast.info(`${name} - ${color} - Size ${size} ${sizeCategory} was moved to ${savedForLaterBoolean.toString() === 'true' ? `Save for Later` : `your Cart`}`, { position: "bottom-center", autoClose: 4000 });
      // We've set up the backend to send us back the updated user information once the user's cart is updated. We need to 
      // dispatch the user login again to update the user's cart in the global state
      dispatch({
        type: USER_LOGIN_SUCCESS,
        payload: data
      });
      localStorage.setItem('userInfo', JSON.stringify(data));
      dispatch({type: CART_LOADING_FALSE });
    } catch (error) {
      console.log('there was an error')
      console.log(error)
      toast.error(`Could not add ${name} - ${color} - Size ${size} ${sizeCategory} to your cart. Try again later.`, { position: "bottom-center", autoClose: 4000 });
      setMovingToCartIcon(false);
      dispatch({type: CART_LOADING_FALSE });
    } 
  }

  const moveToWishlistHandler = async () => {
    dispatch({type: CART_LOADING_TRUE });
    setMovingToWishlistIcon(true);
    try {
      //attempt to add the item to the user's wishlist
      await axios.post('/api/users/wishlist/wishlistitem', { 
        productID, 
        name,
        color,
        size,
        sizeCategory, 
        image,
        qtyAvailable: qty,
        currentPrice: price,
        inCart: false,
        availableInOtherSizes: null
      }, config);
      //Next, Delete the item from the user's cart
      const { data } = await axios.delete(`/api/users/cart/cartitem/${userID}&${productID}&${color}&${size}&${sizeCategory}`, config);
      dispatch({
        type: USER_LOGIN_SUCCESS,
        payload: data
      });
      localStorage.setItem('userInfo', JSON.stringify(data));
      toast.success(`Moved ${name} - ${color} - Size ${size} ${sizeCategory} to your wishlist!`, { position: "bottom-center", autoClose: 4000 } );
      dispatch({type: CART_LOADING_FALSE });
    } catch (error) {
      console.log('there was an error')
      console.log(error)
      toast.error(`Could not add ${name} - ${color} - Size ${size} ${sizeCategory} to your wishlist. Try again later.`, { position: "bottom-center", autoClose: 4000 });
      setMovingToWishlistIcon(false);
      dispatch({type: CART_LOADING_FALSE });
    }    
  }
  
  const deleteCartItemHandler = async () => {
    dispatch({type: CART_LOADING_TRUE });
    setLoadingDeleteIcon(true);
    console.log('delete from cart clicked')
    try {
      const { data } = await axios.delete(`/api/users/cart/cartitem/${userID}&${productID}&${color}&${size}&${sizeCategory}`, config);
      dispatch({
        type: USER_LOGIN_SUCCESS,
        payload: data
      });
      localStorage.setItem('userInfo', JSON.stringify(data));
      toast.info(`Successfully removed ${name} - ${color} - Size ${size} ${sizeCategory} from your cart`, { position: "bottom-center", autoClose: 4000 });
      dispatch({type: CART_LOADING_FALSE });
    } catch (error) {
      console.log('there was an error trying to delete that item from the cart');
      console.log(error)
      toast.error(`Could not delete ${name} - ${color} - Size ${size} ${sizeCategory} from your cart. Try again later.`, { position: "bottom-center", autoClose: 4000 });
      setLoadingDeleteIcon(false);
      dispatch({type: CART_LOADING_FALSE });
    }
  }

  const cartQtyChangeHandler = async (qty) => {
    dispatch({type: CART_LOADING_TRUE });
    try {
      const { data } = await axios.put(`/api/users/cart/cartitem`,{
        productID, name, color, size, sizeCategory, newQty:qty
      }, config);
      dispatch({
        type: USER_LOGIN_SUCCESS,
        payload: data
      });
      localStorage.setItem('userInfo', JSON.stringify(data));
      toast.info(`Successfully updated the quantity for ${name}}`, { position: "bottom-center", autoClose: 4000 });
      setQtyDropDownValue(qty);
      dispatch({type: CART_LOADING_FALSE });
    } catch (error) {
      console.log('there was an error trying to delete that item from the cart');
      console.log(error)
      toast.error(`Could not update the quantity for ${name} Try again later.`, { position: "bottom-center", autoClose: 4000 });
      dispatch({type: CART_LOADING_FALSE });
    }
  }

  return (
    <>
      <ListGroup.Item className=''>
      <Row className='align-items-center'>
        {/* ======== Product Image ======== */}
        <Col md={2}>
          <Link to={`/product/${productID}/${color}`}>
            <Image src={image} alt={name} fluid rounded />
          </Link>
        </Col>
        {/* ======== Name ======== */}
        <Col md={3} className='text-center'>
          <Link to={`/product/${productID}/${color}`}>{name}</Link>
        </Col>
        {/* ======== Color ======== */}
        <Col md={1} className='text-center'>{color}</Col>
        {/* ======== Size ======== */}
        <Col md={2} className='text-center'>{sizeForTable}</Col>
        {/* ======== Qty ======== */}
        <Col md={1} className='text-center px-0'>
          {qty === 0 ? <span className='text-danger font-weight-bold'>Out of Stock</span> : 
            qtyDropDown ? 
            <Form.Control 
              as='select'
              value={qtyDropDownValue} 
              onChange={(e) => cartQtyChangeHandler(e.target.value)} 
              disabled={cartLoading}
              className='px-2 shadow-sm qtyDropDown'
            >
              {[...Array(qtyInStock).keys()].map(x => (// Limit the user to a max of 10 items added to the cart at once
                (x + 1 <= 10 &&
                  <option key={x+1} value={x + 1}>
                  {x + 1}
                  </option>
                )
              ))}
            </Form.Control> 
            :
            qty
          }
        </Col>
        {/* ======== Price ======== */}
        <Col md={2} className='text-center'>
          ${price}
        </Col>
        {/* ======== Delete Cart Item ======== */}
        <Col md={1} className='d-flex justify-content-center'>
          { !hideButtons && 
            <Button size='sm' variant='danger' className='' disabled={cartLoading} onClick={deleteCartItemHandler}>
              <FontAwesomeIcon className='' icon={loadingDeleteIcon ? spinner : faTrashAlt} size="2x"/>
            </Button>
          }
        </Col>
      </Row>
      {/* ======== Saved for Later and Move to Wishlist Buttons ======== */}
      { !hideButtons && 
        <Row className='justify-content-start mt-2 ml-1'>
        {savedForLater === true ?
          // Move to cart button
          <Button className='p-0 px-2' variant="secondary" disabled={cartLoading || qty === 0} onClick={moveInCartHandler} value={false}>
            {/* {movingToCartIcon ? <span><FontAwesomeIcon className='' icon={spinner} /> Moving... </span> : `Move to Cart`} */}
            {movingToCartIcon ? <span><FontAwesomeIcon className='' icon={spinner} /> Moving... </span> : 
            qty === 0 ? 'Out of Stock' : `Move to Cart`}
          </Button> : 
          // Save for later button
          <Button className='p-0 px-2' variant="secondary" disabled={cartLoading} onClick={moveInCartHandler} value={true}>
              {savingForLaterIcon ? <span><FontAwesomeIcon className='' icon={spinner} /> Saving... </span> : `Save for Later`}
          </Button>
        }|
        {/* Move to wishlist button */}
        {/* <Button className='p-0 px-2 cartRowButton' variant="secondary" disabled={updatingCartIcon} onClick={moveToWishlistHandler}> */}
          <Button className='p-0 px-2 cartRowButton' variant="secondary" disabled={cartLoading | alreadyInWishlist} onClick={moveToWishlistHandler}>
            {alreadyInWishlist ? 'Already In Your Wishlist' : (movingToWishlistIcon ? <span><FontAwesomeIcon className='' icon={spinner} /> Moving... </span> : `Move to Wishlist`)}
          </Button>
        </Row>
      }
    </ListGroup.Item>
  </>
  )
}

CartRow.defaultProps = {
  hideButtons: false,
  qtyDropDown: true // by default the qty value prop will be rendered as a dropdown menu
}

export default CartRow;

