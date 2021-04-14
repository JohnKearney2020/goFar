import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ListGroup, Col, Row, Card, Button, Image } from 'react-bootstrap';

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

  const [filteredCart, setFilteredCart] = useState([]);
  const [savedForLater, setSavedForLater] = useState([]);
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
      //Seperate the cart items 
      const filteredCartItems = []; //will hold cart items not saved for later
      const savedForLaterItems = []; //will hold saved for later items
      cart.forEach(cartItem => {
        cartItem.savedForLater ? savedForLaterItems.push(cartItem) : filteredCartItems.push(cartItem);
      });
      console.log(`Filtered Cart Items:`)
      console.log(filteredCartItems)
      console.log(`Saved For Later Cart Items:`)
      console.log(savedForLaterItems)
      setFilteredCart(filteredCartItems);
      setSavedForLater(savedForLaterItems);
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
          <Row> {/* Cart Items */}
            <div id="cartQtyMessage"></div>
            <Col className='' md={8}> {/* Left Side of Screen */}
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
                {filteredCart.map((eachProduct, idx) => (
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
            {/* <Col md={4} className='h-100 w-100 d-flex flex-column align-items-end'> */}
            <Col md={4} className=''>
            {/* <Col md={4} className='justify-content-center'> */}
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
              <Card className='my-5'>
                <Card.Img src='https://i.imgur.com/09uggrQ.jpg' />
                <Card.Header className='text-center'>
                  <h6 className='m-0'>Get excited about $49 free shipping</h6>
                </Card.Header>
              </Card>
            </Col>
          </Row>
          {/* <hr className='m-5'/> */}
          {/* ============================================================================================================== */}
          {/*                                             Saved for Later Items                                              */}
          {/* ============================================================================================================== */}
          {/* <Card body>Saved for Later</Card> */}
          {/* <h4 class=""></h4> */}
          <Card className='my-5' style={{"backgroundColor": "#343A40"}}>
            <Card.Body className='text-center'>
              <h5 className='m-0 text-white'>Saved for Later</h5>
            </Card.Body>
          </Card>
          <Row>
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
                {savedForLater.map((eachProduct, idx) => (
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
            {/*                   Placeholder Offset b/c of subtotal component above                */}
            {/* =================================================================================== */}
            <Col md={4} className='d-flex justify-content-center align-items-center'>
              <Card className='mb-5'>
                <Card.Img src='https://i.imgur.com/QBBE0Wc.jpg' />
                <Card.Header className='text-center'>
                  <h6 className='m-0'>Start your adventure today</h6>
                </Card.Header>
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
