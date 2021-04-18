import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import ReactDom from 'react-dom';
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
import Message from '../Message';

import './CartRow.css';

const CartRow2 = ({ productID, name, color, size, sizeCategory, price, qty, image, savedForLater }) => {

  const dispatch = useDispatch();

  // Format the size for the Size column
  let sizeForTable = '';
  sizeCategory !== 'ONE SIZE' ? sizeForTable = `${size} - ${sizeCategory}` : sizeForTable = 'ONE SIZE';

  //Format the price for two decimal places
  price = addDecimals(price);

  const userInfo = useSelector(state => state.userLogin.userInfo);
  const { _id:userID } = userInfo;

  const productsFromCart = useSelector(state => state.cartProductDetails);
  // const { loading } = productsFromCart; //might be able to get rid of cartProducts

  // const { loading } = productsFromCart; //might be able to get rid of cartProducts

  // Get our array of cart products from the global state.
  // const cartProducts = useSelector(state => state.cartProductDetails.cartProducts);
  // Find the product specific to this cart table row
  // const product = cartProducts[cartProducts.findIndex(i => i.name === productName)];

  //Set up local state
  const haveUpdatedQuantities = useRef(false);
  const [tablePrice, setTablePrice] = useState(0);
  const [qtyForTable, setQtyForTable] = useState(0);
  const [qtyForCart, setQtyForCart] = useState(1);
  const [disableCart, setDisableCart] = useState(false);
  const [availableInOtherSizes, setAvailableInOtherSizes] = useState(false);
  const [hasSizes, setHasSizes] = useState(false);
  const [loadingDeleteIcon, setLoadingDeleteIcon] = useState(false);
  

  const deleteCartItemHandler = async () => {
    setLoadingDeleteIcon(true);
    // deleteButtonClicked.current = true;
    console.log('delete from cart clicked')
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`
      }
    }
    try {
      const { data } = await axios.delete(`/api/users/cart/cartitem/${userID}&${productID}&${color}&${size}&${sizeCategory}`, config);
      console.log(data);
      dispatch({
        type: USER_LOGIN_SUCCESS,
        payload: data
      });
      localStorage.setItem('userInfo', JSON.stringify(data));
      toast.success(`Successfully removed ${name} - ${color} / ${size} / ${sizeCategory} from your cart`, { position: "top-right", autoClose: 4000 });
      setLoadingDeleteIcon(false);
    } catch (error) {
      console.log('there was an error trying to delete that item from the cart');
      console.log(error)
      toast.error(`Could not delete that item from your cart. Try again later.`, { position: "top-right", autoClose: 3500 });
      setLoadingDeleteIcon(false);
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
          <Button size='sm' variant='danger' className='' disabled={loadingDeleteIcon} onClick={deleteCartItemHandler}>
            <FontAwesomeIcon className='' icon={loadingDeleteIcon ? spinner : faTrashAlt} size="2x"/>
          </Button>
        </Col>
      </Row>
      <Row className='justify-content-start mt-2 ml-1'>
        {savedForLater === true ? <Button className='p-0 px-2' variant="secondary">Move to Cart</Button> : <Button className='p-0 px-2' variant="secondary">Save for Later</Button>}|
        <Button className='p-0 px-2 cartRowButton' variant="secondary">Move to Wishlist</Button>
      </Row>
    </ListGroup.Item>
  </>
  )
}

export default CartRow2;

