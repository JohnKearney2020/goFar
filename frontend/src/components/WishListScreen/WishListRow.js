import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Image, Button, Form, Col, Row, ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus, faSpinner as spinner } from '@fortawesome/free-solid-svg-icons';
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import { toast } from 'react-toastify';

import { refreshWishList } from '../../actions/wishListActions';
import { USER_LOGIN_SUCCESS } from '../../constants/userConstants';
import './WishListRow.css';

const WishListRow = ({ 
      productID, 
      productName, 
      color, 
      size, 
      sizeCategory, 
      productImage, 
      // dateAdded, 
      // index, 
      qtyAvailable,
      currentPrice,
      inCart,
      availableInOtherSizes
    }
  ) => {

  const dispatch = useDispatch();

  const userInfo = useSelector(state => state.userLogin.userInfo);
  const { token, _id:userID } = userInfo;

  //Set up local state
  const [qtyForCart, setQtyForCart] = useState(1);
  const [loadingDeleteIcon, setLoadingDeleteIcon] = useState(false);
  const [loadingCartIcon, setLoadingCartIcon] = useState(false);
  const [updatingWishList, setUpdatingWishList] = useState(false);
  useEffect(() => {
    console.log('in WishListRow.js useEffect')
    // This useEffect is used to force a rerender after we add an item to the cart b/c otherwise we don't get an opportunity
    // to set updatingWishList to false after setting it to true when we add an item to the cart
    setUpdatingWishList(false);
  }, [inCart]);

  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  }

  // Format the size for the Size column
  let sizeForTable = '';
  sizeCategory !== 'ONE SIZE' ? sizeForTable = `${size} - ${sizeCategory}` : sizeForTable = 'ONE SIZE';


  const addToCartHandler = async (e) => {
    e.preventDefault();
    console.log('in cart handler')
    console.log(`qty for cart: ${qtyForCart}`)
    setUpdatingWishList(true)
    setLoadingCartIcon(true); //We set this to false again in the useEffect. Setting it to false in this function leaves a small
    //window of time where the button is not disabled while we see if the item is in our cart or not
    if(userInfo.name){
      try {
        // productID, productName, color, size, sizeCategory, productImage, dateAdded, index
        //attempt to add the item to the user's cart
        const { data } = await axios.post('/api/users/cart/cartitem', {
          productID, 
          name: productName,
          quantity: qtyForCart,
          color,
          size,
          sizeCategory,
          price: currentPrice,
          image: productImage,
          savedForLater: false //user's can't save for later from the wishlist page
        }, config);
        toast.info(`Added ${productName} - ${color} - Size ${size} ${sizeCategory} to your cart!`, { position: "bottom-center", autoClose: 4000 } );
        // We've set up the backend to send us back the updated user information once the user's cart is updated. We need to 
        // dispatch the user login again to update the user's cart in the global state
        // setLoadingCartIcon(false);
        dispatch({
          type: USER_LOGIN_SUCCESS,
          payload: data
        });

        // We need to update our wishlist items again to reflect that one was just added to our cart
        dispatch(refreshWishList(userID));
        localStorage.setItem('userInfo', JSON.stringify(data));
      } catch (error) {
        console.log('there was an error')
        console.log(error)
        toast.error(`Could not add ${productName} - ${color} - Size ${size} ${sizeCategory} to your cart. Try again later.`, { position: "bottom-center", autoClose: 4000 } );
        setLoadingCartIcon(false);
        setUpdatingWishList(false);
      }  
    }
  }

  const deleteWishListItemHandler = async () => {
    setLoadingDeleteIcon(true);
    setUpdatingWishList(true);
    try {
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
      toast.info(`Removed ${productName} - ${color} - Size ${size} ${sizeCategory} from your wishlist!`, { position: "bottom-center", autoClose: 4000 } );
    } catch (error) {
      console.log('there was an error')
      console.log(error)
      toast.error(`Could not remove ${productName} - ${color} - Size ${size} ${sizeCategory} from your wishlist. Try again later.`, { position: "bottom-center", autoClose: 4000 } );
      setLoadingDeleteIcon(false);
      setUpdatingWishList(false);
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
          <Col lg={2}>
            <Link to={`/product/${productID}/${color}`}>
              <Image src={productImage} alt={productName} fluid rounded className='shadow-sm' />
            </Link>
          </Col>
          {/* ===================== */}
          {/*         Name          */}
          {/* ===================== */}
          <Col lg={3} className='text-center'>
            <Link to={`/product/${productID}/${color}`}>{productName}</Link>
          </Col>
          {/* ===================== */}
          {/*         Color         */}
          {/* ===================== */}
          <Col lg={1} className='text-center'>{color}</Col>
          {/* ===================== */}
          {/*         Size          */}
          {/* ===================== */}
          <Col lg={1} className='text-center'>{sizeForTable}</Col>
          {/* ===================== */}
          {/*      Qty Available    */}
          {/* ===================== */}
          <Col lg={1} className='text-center'>
            {qtyAvailable === 0 ? <span className='text-danger font-weight-bold'>Out of Stock</span> : ( qtyAvailable > 10 ? '10+' : (qtyAvailable <= 5 ? <span className='text-danger font-weight-bold'>{qtyAvailable}</span> : qtyAvailable ))}
          </Col>
          {/* ===================== */}
          {/*         Price         */}
          {/* ===================== */}
          <Col lg={1} className='text-center'>${currentPrice}</Col>
          {/* ===================== */}
          {/*    Add to Cart Form   */}
          {/* ===================== */}
          {(qtyAvailable === 0 && availableInOtherSizes === false) &&
            <Col lg={2} className='text-center'>
              <span className='text-danger font-weight-bold'>Out of Stock</span> 
            </Col>
          } 
          {(qtyAvailable === 0 && availableInOtherSizes === true) &&
            <Col lg={2} className='text-center'>
              <span className='text-danger font-weight-bold'>Available in Other Sizes</span> 
            </Col>
          } 
          {qtyAvailable !== 0 &&
            <>
              <Col lg={1}>
                {/* <Form type='submit' onSubmit={addToCartHandler}> */}
                  <Form.Control 
                    as='select'
                    value={qtyAvailable === 0 ? 0 : qtyForCart} 
                    onChange={(e) => setQtyForCart(e.target.value)} 
                    disabled={updatingWishList | inCart}
                    className='px-2 shadow-sm qtyDropDown'
                  >
                    {[...Array(qtyAvailable).keys()].map(x => (// Limit the user to a max of 10 items added to the cart at once
                      (x + 1 <= 10 &&
                        <option key={x+1} value={x + 1}>
                        {x + 1}
                        </option>
                      )
                    ))}
                  </Form.Control>
                {/* </Form> */}
              </Col>
              <Col lg={1} className='text-center'>
                <Button disabled={updatingWishList | inCart} type='button' className='w-100 p-0 mt-1 d-flex justify-content-center align-items-center' style={{"height": "49px"}} onClick={addToCartHandler}
                >
                  {inCart ? 'In Cart' : (loadingCartIcon ? <FontAwesomeIcon className='' icon={spinner} size="2x"/> : <FontAwesomeIcon className='' icon={faCartPlus} size='2x' />) }
                </Button>
              </Col>
            </>
          }
          <Col lg={1} className='text-center'>
            <Button size='sm' variant='danger' className='w-100 mt-1' disabled={updatingWishList} onClick={deleteWishListItemHandler}
            style={{"height": "49px"}}>
              <FontAwesomeIcon className='' icon={loadingDeleteIcon ? spinner : faTrashAlt} size="2x" />
            </Button>
          </Col>
        </Row> 
      </ListGroup.Item>
    </>
  )
}

export default WishListRow;
