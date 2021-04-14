import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ListGroup, Col, Row, Card, Button } from 'react-bootstrap';

import { getCartProductDetails } from '../actions/cartActions';
import OffsetPageHeader from '../components/OffsetPageHeader';
import Message from '../components/Message';
import Loader from '../components/Loader';
import './WishListScreen.css';
import CartRow from '../components/CartScreen/CartRow';
import CartMessage from '../components/CartScreen/CartMessage';

const CartScreen = ({ history }) => {

  const dispatch = useDispatch();
  const haveFetchedCartData = useRef(false);

  const userInfo = useSelector(state => state.userLogin.userInfo);
  const { cart } = userInfo;

  const productsFromCart = useSelector(state => state.cartProductDetails);
  const { loading, cartProducts } = productsFromCart; //might be able to get rid of cartProducts

  const [cartQtyMessage, setCartQtyMessage] = useState([]);

  useEffect(() => {
    if(cart.length > 0 && haveFetchedCartData.current === false){
      // console.log('we have a cart')
      let arrayOfProductIDs = cart.map((eachItem) => {
        return eachItem.productID;
      })
      // console.log(arrayOfProductIDs)
      dispatch(getCartProductDetails({ arrayOfProductIDs }));
      haveFetchedCartData.current = false;
    } else {
      // console.log('the user does not have a wishlist');
    }
    return () => {
      
    }
  }, [userInfo, dispatch, cart]);

  return (
    <>
      <OffsetPageHeader leftHeaderText='Your Cart' rightHeaderText='Your Cart' hrBoolean={false}/>
      {loading ? <Loader /> :
        <>
        {cart.length === 0 && <Message variant='info' style={{ margin: '8rem'}}>Your cart is empty.</Message>}
        {cartQtyMessage.length > 0 && <CartMessage variant='info' itemsChanged={cartQtyMessage}/>}
        {/* {cartQtyMessage && <Message variant='info' style={{ margin: '8rem'}}>{cartQtyMessage}</Message>} */}
          <Row>
            <div id="cartQtyMessage"></div>
            <Col md={8}> {/* Left Side of Screen */}
              <ListGroup variant='flush'>
              {/*===================*/}
              {/*    Table Header   */}
              {/*===================*/}
                <ListGroup.Item className='d-none d-md-block'>
                  <Row className='align-items-center justify-content-center' style={{"backgroundColor":"rgba(0,0,0,.03)"}}>
                    <Col md={5} className='text-center'>
                      <span className='font-weight-bold'>Product</span>
                    </Col>
                    <Col md={1} className='text-center'>
                      <span className='font-weight-bold'>Color</span>
                    </Col>
                    <Col md={2} className='text-center'>
                      <span className='font-weight-bold'>Size</span>
                    </Col>
                    <Col md={1} className='text-center'>
                      <span className='font-weight-bold'>Qty</span>              
                    </Col>
                    <Col md={2} className='text-center'>
                      <span className='font-weight-bold'>Current Price</span>
                    </Col>
                    <Col md={1} className='text-center'>
                      {/* <span className='font-weight-bold'>Delete</span>  */}
                    </Col>
                  </Row> 
                </ListGroup.Item>
                {/*===================*/}
                {/* Items in Cart */}
                {/*===================*/}
                {/* productID, productName, color, size, sizeCategory, qty, productImage, dateAdded, index */}
                {cart.map((eachProduct, idx) => (
                  <CartRow key={idx}
                    productID={eachProduct.productID}
                    productName={eachProduct.name}
                    color={eachProduct.color}
                    size={eachProduct.size}
                    sizeCategory={eachProduct.sizeCategory}
                    qty={eachProduct.quantity}
                    dateAdded={eachProduct.createdAt}
                    productImage={eachProduct.image}
                    savedForLater={eachProduct.savedForLater}
                    index={idx}
                    cartQtyMessage={cartQtyMessage}
                    setCartQtyMessage={setCartQtyMessage}
                  />
                ))}
              </ListGroup>
            </Col> {/* End of Left Side of Screen */}
            {/* =================================================================================== */}
            {/*                             Subtotal and Final Price of Cart                        */}
            {/* =================================================================================== */}
            <Col md={4}>
              <Card>
                <ListGroup variant='flush'>
                  <ListGroup.Item>
                    {/* <h2>Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}) items</h2> */}
                    <h2>Subtotal items</h2>
                    {/* .toFixed(2) gives us a 2 decimal number */}
                    {/* ${cartItems.reduce((acc,item) => acc + item.qty * item.price, 0).toFixed(2)} */}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    {/* <Button type='button' className='btn-block' disabled={cartItems.length === 0} onClick={checkoutHandler}>
                      Proceed to checkout
                    </Button> */}
                    <Button type='button' className='btn-block'>
                      Test
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>             
            </Col>
          </Row>
        </>
      }
    </>
  )
}

export default CartScreen;


// { cartQtyMessage &&  ReactDom.createPortal(
//   <Message variant='info'>{cartQtyMessage}</Message>,
//   document.getElementById('cartQtyMessage')
// )}
