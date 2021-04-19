import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Image, Button, Form, Col, Row, ListGroup } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner as spinner } from '@fortawesome/free-solid-svg-icons';
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import { USER_LOGIN_SUCCESS } from '../../constants/userConstants';
import { addDecimals } from '../../utilityFunctions/addDecimals';

import './CartRow.css';

const CartRow = ({ productID, name, color, size, sizeCategory, price, qty, image, savedForLater }) => {

  const dispatch = useDispatch();

  // Format the size for the Size column
  let sizeForTable = '';
  sizeCategory !== 'ONE SIZE' ? sizeForTable = `${size} - ${sizeCategory}` : sizeForTable = 'ONE SIZE';

  //Format the price for two decimal places
  price = addDecimals(price);

  const userInfo = useSelector(state => state.userLogin.userInfo);
  const { _id:userID, token } = userInfo;

  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  }

  //Set up local state
  const [loadingDeleteIcon, setLoadingDeleteIcon] = useState(false);
  const [updatingCartIcon, setUpdatingCartIcon] = useState(false);
  const [savingForLaterIcon, setSavingForLaterIcon] = useState(false);
  const [movingToWishlistIcon, setMovingToWishlistIcon] = useState(false);
  const [movingToCartIcon, setMovingToCartIcon] = useState(false);

  //This moves items to saved for later or back to the cart
  const moveInCartHandler = async (e) => {
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
      toast.info(`${name} - ${color} / ${size} / ${sizeCategory} was moved to ${savedForLaterBoolean.toString() === 'true' ? `Save for Later` : `your Cart`}`, { position: "bottom-center", autoClose: 4000 });
      // We've set up the backend to send us back the updated user information once the user's cart is updated. We need to 
      // dispatch the user login again to update the user's cart in the global state
      dispatch({
        type: USER_LOGIN_SUCCESS,
        payload: data
      });
      localStorage.setItem('userInfo', JSON.stringify(data));
    } catch (error) {
      console.log('there was an error')
      console.log(error)
      toast.error(`Could not add ${name} to your cart. Try again later.`, { position: "top-right", autoClose: 4000 });
      setUpdatingCartIcon(false);
      setMovingToCartIcon(false);
    } 
  }

  const moveToWishlistHandler = async () => {
    setMovingToWishlistIcon(true);
    setUpdatingCartIcon(true);
    console.log('clicked move to wishlist button')
    setTimeout(() => {
      toast.info(`${name} - ${color} / ${size} / ${sizeCategory} was moved to your Wishlist`, { position: "bottom-center", autoClose: 4000 });
      setMovingToWishlistIcon(false);
      setUpdatingCartIcon(false);
    }, 2000);
  }
  
  const deleteCartItemHandler = async () => {
    setLoadingDeleteIcon(true);
    setUpdatingCartIcon(true);
    console.log('delete from cart clicked')
    try {
      const { data } = await axios.delete(`/api/users/cart/cartitem/${userID}&${productID}&${color}&${size}&${sizeCategory}`, config);
      dispatch({
        type: USER_LOGIN_SUCCESS,
        payload: data
      });
      localStorage.setItem('userInfo', JSON.stringify(data));
      toast.success(`Successfully removed ${name} - ${color} / ${size} / ${sizeCategory} from your cart`, { position: "top-right", autoClose: 4000 });
    } catch (error) {
      console.log('there was an error trying to delete that item from the cart');
      console.log(error)
      toast.error(`Could not delete that item from your cart. Try again later.`, { position: "top-right", autoClose: 3500 });
      setLoadingDeleteIcon(false);
      setUpdatingCartIcon(false);
    }
  }

  return (
    <>
      <ListGroup.Item className=''>
      <Row className='align-items-center'>
        {/* ===================== */}
        {/*     Product Image     */}
        {/* ===================== */}
        <Col md={2}>
          <Link to={`/product/${productID}/${color}`}>
            <Image src={image} alt={name} fluid rounded />
          </Link>
        </Col>
        {/* ===================== */}
        {/*         Name          */}
        {/* ===================== */}
        <Col md={3} className='text-center'>
          <Link to={`/product/${productID}/${color}`}>{name}</Link>
        </Col>
        {/* ===================== */}
        {/*         Color         */}
        {/* ===================== */}
        <Col md={1} className='text-center'>{color}</Col>
        {/* ===================== */}
        {/*         Size          */}
        {/* ===================== */}
        <Col md={2} className='text-center'>{sizeForTable}</Col>
        {/* ===================== */}
        {/*          Qty          */}
        {/* ===================== */}
        <Col md={1} className='text-center'>
          {qty === 0 ? <span className='text-danger font-weight-bold'>Out of Stock</span> : qty }
        </Col>
        {/* ===================== */}
        {/*         Price         */}
        {/* ===================== */}
        <Col md={2} className='text-center'>
          ${price}
        </Col>
        {/* ===================== */}
        {/*    Add to Cart Form   */}
        {/* ===================== */}
        {/* {(qtyForCart === 0 && hasSizes === false) &&
          <Col md={2} className='text-center'>
            <span className='text-danger font-weight-bold'>Out of Stock</span> 
          </Col>
        }  */}
        {/* {(qtyForTable === 0 && hasSizes === true && availableInOtherSizes === true) &&
          <Col md={2} className='text-center'>
            <span className='text-danger font-weight-bold'>Available in Other Sizes</span> 
          </Col>
        } 
        {qtyForTable !== 0 &&
          <>
            <Col md={1}>
              {qtyForTable}
            </Col>
          </>
        } */}
        {/* <Col md={2}>
          {qty}
        </Col> */}
        <Col md={1} className='d-flex justify-content-center'>
          <Button size='sm' variant='danger' className='' disabled={updatingCartIcon} onClick={deleteCartItemHandler}>
            <FontAwesomeIcon className='' icon={loadingDeleteIcon ? spinner : faTrashAlt} size="2x"/>
          </Button>
        </Col>
      </Row>
      <Row className='justify-content-start mt-2 ml-1'>
        {savedForLater === true ?
          // Move to cart button
          <Button className='p-0 px-2' variant="secondary" disabled={updatingCartIcon} onClick={moveInCartHandler} value={false}>
            {movingToCartIcon ? <span><FontAwesomeIcon className='' icon={spinner} /> Moving... </span> : `Move to Cart`}
          </Button> : 
          // Save for later button
          <Button className='p-0 px-2' variant="secondary" disabled={updatingCartIcon} onClick={moveInCartHandler} value={true}>
              {savingForLaterIcon ? <span><FontAwesomeIcon className='' icon={spinner} /> Saving... </span> : `Save for Later`}
          </Button>
        }|
        {/* Move to wishlist button */}
        <Button className='p-0 px-2 cartRowButton' variant="secondary" disabled={updatingCartIcon} onClick={moveToWishlistHandler}>
          {movingToWishlistIcon ? <span><FontAwesomeIcon className='' icon={spinner} /> Moving... </span> : `Move to Wishlist`}
        </Button>
      </Row>
    </ListGroup.Item>
  </>
  )
}

export default CartRow;

