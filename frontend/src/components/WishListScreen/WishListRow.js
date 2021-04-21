import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Image, Button, Form, Col, Row, ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus, faSpinner as spinner } from '@fortawesome/free-solid-svg-icons';
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import { toast } from 'react-toastify';

import { USER_LOGIN_SUCCESS } from '../../constants/userConstants';
import { addDecimals } from '../../utilityFunctions/addDecimals';

const WishListRow = ({ 
      productID, 
      productName, 
      color, 
      size, 
      sizeCategory, 
      productImage, 
      dateAdded, 
      index, 
      qtyAvailable,
      currentPrice,
      inCart,
      availableInOtherSizes
    }
  ) => {

  const dispatch = useDispatch();

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  //Set up local state
  const [qtyForCart, setQtyForCart] = useState(1);
  const [disableCart, setDisableCart] = useState(false);
  const [loadingDeleteIcon, setLoadingDeleteIcon] = useState(false);

  // Format the size for the Size column
  let sizeForTable = '';
  sizeCategory !== 'ONE SIZE' ? sizeForTable = `${size} - ${sizeCategory}` : sizeForTable = 'ONE SIZE';

  const addToCartHandler = (e) => {
    e.preventDefault();
    console.log('in cart handler')
    console.log(`qty for cart: ${qtyAvailable}`)
  }

  const deleteWishListItemHandler = async () => {
    setLoadingDeleteIcon(true);
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`
        }
      }
      //attempt to remove the item from the user's wishlist
      // DEL /api/user/wishlistitem/:userid&:productid&:color&:size&:sizecategory
      const { data } = await axios.delete(`/api/users/wishlist/wishlistitem/${userInfo._id}&${productID}&${encodeURI(color)}&${encodeURI(size)}&${encodeURI(sizeCategory)}`, config);
      // We've set up the backend to send us back the updated user information once the user's wishlist is updated. We need to 
      // dispatch the user login again to update the user's wishlist in the global state
      dispatch({
        type: USER_LOGIN_SUCCESS,
        payload: data
      });
      localStorage.setItem('userInfo', JSON.stringify(data));
      toast.success(`Removed ${productName} from wishlist!`, { position: "top-right", autoClose: 3500 } );
      // setLoadingDeleteIcon(false);
    } catch (error) {
      console.log('there was an error')
      console.log(error)
      setLoadingDeleteIcon(false);
    }    
  }
  
  return (
    <>
  {/* productID, productName, color, size, sizeCategory, productImage, dateAdded, index, productImage, qtyAvailable, currentPrice, 
  inCart, availableInOtherSizes */}
      <ListGroup.Item>
        <Row className='align-items-center justify-content-center'>
          {/* ===================== */}
          {/*     Product Image     */}
          {/* ===================== */}
          <Col md={2}>
            <Link to={`/product/${productID}/${color}`}>
              <Image src={productImage} alt={productName} fluid rounded />
            </Link>
          </Col>
          {/* ===================== */}
          {/*         Name          */}
          {/* ===================== */}
          <Col md={3} className='text-center'>
            <Link to={`/product/${productID}/${color}`}>{productName}</Link>
          </Col>
          {/* ===================== */}
          {/*         Color         */}
          {/* ===================== */}
          <Col md={1} className='text-center'>{color}</Col>
          {/* ===================== */}
          {/*         Size          */}
          {/* ===================== */}
          <Col md={1} className='text-center'>{sizeForTable}</Col>
          {/* ===================== */}
          {/*      Qty Available    */}
          {/* ===================== */}
          <Col md={1} className='text-center'>
            {qtyAvailable === 0 ? <span className='text-danger font-weight-bold'>Out of Stock</span> : ( qtyAvailable > 10 ? '10+' : (qtyAvailable <= 5 ? <span className='text-danger font-weight-bold'>{qtyAvailable}</span> : qtyAvailable ))}
          </Col>
          {/* ===================== */}
          {/*         Price         */}
          {/* ===================== */}
          <Col md={1} className='text-center'>${currentPrice}</Col>
          {/* ===================== */}
          {/*    Add to Cart Form   */}
          {/* ===================== */}
          {(qtyAvailable === 0 && availableInOtherSizes === false) &&
            <Col md={2} className='text-center'>
              <span className='text-danger font-weight-bold'>Out of Stock</span> 
            </Col>
          } 
          {(qtyAvailable === 0 && availableInOtherSizes === true) &&
            <Col md={2} className='text-center'>
              <span className='text-danger font-weight-bold'>Available in Other Sizes</span> 
            </Col>
          } 
          {qtyAvailable !== 0 &&
            <>
              <Col md={1}>
                <Form type='submit' onSubmit={addToCartHandler}>
                  <Form.Control 
                    as='select'
                    value={qtyAvailable === 0 ? 0 : 1} 
                    onChange={(e) => setQtyForCart(e.target.value)} 
                    disabled={disableCart | inCart}
                    className='px-2'
                  >
                    {[...Array(qtyAvailable).keys()].map(x => (// Limit the user to a max of 10 items added to the cart at once
                      (x + 1 <= 10 &&
                        <option key={x+1} value={x + 1}>
                        {x + 1}
                        </option>
                      )
                    ))}
                  </Form.Control>
                </Form>
              </Col>
              <Col md={1} className='text-center my-1'>
                <Button size='sm' disabled={disableCart | inCart} type='submit' className='w-100'>
                  {inCart ? 'In Cart' : <FontAwesomeIcon className='' icon={faCartPlus} size='2x' />}
                </Button>
              </Col>
            </>
          }
          <Col md={1} className='text-center'>
            <Button size='sm' variant='danger' className='w-100' disabled={loadingDeleteIcon} onClick={deleteWishListItemHandler}>
              <FontAwesomeIcon className='' icon={loadingDeleteIcon ? spinner : faTrashAlt} size="2x" />
            </Button>
          </Col>
        </Row> 
      </ListGroup.Item>
    </>
  )
}

export default WishListRow;
