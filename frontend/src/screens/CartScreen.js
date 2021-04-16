import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import cloneDeep from 'lodash/cloneDeep';
import { useDispatch, useSelector } from 'react-redux';
import { ListGroup, Col, Row, Card, Button, Image } from 'react-bootstrap';

import { getCartProductDetails, addCartQtyMessage, addCartMovedMessage } from '../actions/cartActions';
import { CART_QTY_MESSAGE_RESET, CART_MOVED_MESSAGE_RESET, CART_PRODUCT_DETAILS_RESET } from '../constants/cartConstants';
import OffsetPageHeader from '../components/OffsetPageHeader';
import Message from '../components/Message';
import Loader from '../components/Loader';
import './WishListScreen.css';
// import CartRow from '../components/CartScreen/CartRow';
import CartMessage from '../components/CartScreen/CartMessage';

const CartScreen = ({ history }) => {

  const dispatch = useDispatch();
  const haveFetchedCartData = useRef(false);
  const haveUpdatedQtysPrices = useRef(false);

  // Get data from the Global State
  const userInfo = useSelector(state => state.userLogin.userInfo);
  const { cart } = userInfo;

  const productsFromCart = useSelector(state => state.cartProductDetails);
  const { loading, cartProducts } = productsFromCart; //might be able to get rid of cartProducts

  const cartQtyChanges = useSelector(state => state.cartQtyChanges);
  const { cartQtyMessage } = cartQtyChanges;

  const cartMovedChanges = useSelector(state => state.cartMovedChanges);
  const { cartMovedMessage } = cartMovedChanges;

  // Set up local state
  const [filteredCart, setFilteredCart] = useState([]);
  const [savedForLater, setSavedForLater] = useState([]);
  // const [cartQtyMessage, setCartQtyMessage] = useState([]);
  // const [cartMovedMessage, setCartMovedMessage] = useState([]);

  useEffect(() => {
    //============================================================================================================
    // First, get the detailed data with current prices and quantities for items in the cart
    //============================================================================================================
    if(cart.length > 0 && haveFetchedCartData.current === false){
      console.log('in fetch cart details part of cart screen useEffect')
      let arrayOfProductIDs = cart.map((eachItem) => {
        return eachItem.productID;
      })
      dispatch(getCartProductDetails({ arrayOfProductIDs }));
      haveFetchedCartData.current = true;
    }

    //============================================================================================================
    // Next, compare the user's cart to the up to date product data. Update prices and quantities when necessary
    //============================================================================================================
    // if(haveUpdatedQtysPrices.current === false && haveFetchedCartData.current === true){
    if(cartProducts.length > 0 && haveFetchedCartData.current === true && haveUpdatedQtysPrices.current === false){
      console.log('in update qtys and prices part of cart screen useEffect')
      const qtyMessageArray = [];
      const movedMessageArray = [];
      let newUpdatedCart = cloneDeep(cart);
      let madeChanges = false; //Keep track of if we need to make changes to the cart or not
      // Loop through the user's cart
      for(let cartItem of newUpdatedCart){
        let { productID: id1, //deconstruct the item object from the cart
          name:name1,
          quantity:userQuantity,
          color:color1,
          size:size1,
          sizeCategory:sizeCategory1,
          price,
          image,
          savedForLater,
          createdAt
        } = cartItem;
          // Loop through the detailed cart items and find a match
          for(let upToDateItem of cartProducts){
            // Destructure the upToDateItem object
            const { _id: id2, name:name2, defaultPrice, defaultSalePrice, defaultQty, sizes, hasSizes } = upToDateItem;
            // Drill down into the detailed product object to look for a match
            //====================================================================================================================================================
            //                                                  Find the current price and qty available
            //====================================================================================================================================================
            // Products without sizes - easiest case
            if(hasSizes === false){
              if(id1 === id2){ //If the product ID's match. Site does not have functionality for items with one size to have different prices for different colors.
                //Update the price
                defaultSalePrice !== 0 ? cartItem.price = defaultSalePrice : cartItem.price = defaultPrice;
                //Update the qty if needed
                if(defaultQty === 0){ //If the item is now out of stock
                  cartItem.quantity = defaultQty;
                  cartItem.savedForLater = true;
                  movedMessageArray.push({ //Add to message for moved items
                    name: name1,
                    color: color1,
                    size: size1,
                    sizeCategory: sizeCategory1,
                    oldQty: userQuantity,
                    newQty: defaultQty
                  })
                } else if(cartItem.quantity > defaultQty){ //If the user has more qty in their cart than are in stock
                  cartItem.quantity = defaultQty;
                  qtyMessageArray.push({ //Add to message for reduced quantities
                    name: name1,
                    color: color1,
                    size: size1,
                    sizeCategory: sizeCategory1,
                    oldQty: userQuantity,
                    newQty: defaultQty
                  })
                }
              }
            }
            // Products with sizes - harder case

            // if(hasSizes === false){
            //   // defaultSalePrice !== 0 ? setTablePrice(addDecimals(defaultSalePrice)) : setTablePrice(addDecimals(defaultPrice));
            //   defaultSalePrice !== 0 ? setTablePrice(addDecimals(defaultSalePrice)) : setTablePrice(addDecimals(defaultPrice));
            //   if(defaultQty === 0){ // If none are in stock, disable the cart button and qty input and display an 'out of stock' message to the user
            //     setDisableCart(true);
            //     setQtyForTable(0);
            //     setQtyForCart(0);
            //   }
            //   // It's in stock - Check to see how the qty the user wants compares to the qty available
            //   if(qty < defaultQty){//The user wants less than are available
            //     setQtyForTable(qty); 
            //   } else { //If the user wants more than are available
            //     setQtyForTable(defaultQty);
            //     console.log(`user wanted ${qty} of ${name}, but we only have ${defaultQty} in stock`)
            //     // setTheArray(oldArray => [...oldArray, newElement]);
            //     setCartQtyMessage(cartQtyMessage => [...cartQtyMessage, {
            //       name,
            //       color,
            //       size,
            //       sizeCategory,
            //       originalQty: qty,
            //       newQty: defaultQty
            //     }])
            //   }
            // }
          // }

        } //End of the INNER for loop thru cart and cart details

        // haveUpdatedQtysPrices.current = true;
        // console.log(`updated cart, not yet saved`)
        // console.log(newUpdatedCart)
        // // console.log(qtyMessageArray);
        // // dispatch(getCartProductDetails({ arrayOfProductIDs }));
        // if(qtyMessageArray.length > 0) { dispatch(addCartQtyMessage(qtyMessageArray)) };
        // if(movedMessageArray.length > 0) { dispatch(addCartMovedMessage(movedMessageArray)) };

      } //End of the OUTER for loop thru cart and cart details

      haveUpdatedQtysPrices.current = true;
      console.log(`updated cart, not yet saved`)
      console.log(newUpdatedCart)
      if(qtyMessageArray.length > 0) { dispatch(addCartQtyMessage(qtyMessageArray)) };
      if(movedMessageArray.length > 0) { dispatch(addCartMovedMessage(movedMessageArray)) };


      //Seperate the cart items 
      // const filteredCartItems = []; //will hold cart items not saved for later
      // const savedForLaterItems = []; //will hold saved for later items
      // cart.forEach(cartItem => {
      //   cartItem.savedForLater ? savedForLaterItems.push(cartItem) : filteredCartItems.push(cartItem);
      // });
      // console.log(`Filtered Cart Items:`)
      // console.log(filteredCartItems)
      // console.log(`Saved For Later Cart Items:`)
      // console.log(savedForLaterItems)
      // setFilteredCart(filteredCartItems);
      // setSavedForLater(savedForLaterItems);
    } else {
      // console.log('the user does not have a wishlist');
    }

    // if(cartProducts.length > 0 && haveFetchedCartData.current === true && haveUpdatedQtysPrices.current === true){
    // if(haveUpdatedQtysPrices.current === true){
    //   console.log(`updated cart, not yet saved`)
    //   console.log(newUpdatedCart)
    //   // console.log(qtyMessageArray);
    //   // dispatch(getCartProductDetails({ arrayOfProductIDs }));
    //   if(qtyMessageArray.length > 0) { dispatch(addCartQtyMessage(qtyMessageArray)) };
    //   if(movedMessageArray.length > 0) { dispatch(addCartMovedMessage(movedMessageArray)) };
    // }




    return () => {
      // haveUpdatedQtysPrices.current = false;
      // haveFetchedCartData.current = false;
    }
  }, [userInfo, dispatch, cart, cartProducts]);

  //This should clear our qty and moved messages once users navigate away from the cart
  useLayoutEffect(() => () => {
    dispatch({type: CART_QTY_MESSAGE_RESET});
    dispatch({type: CART_MOVED_MESSAGE_RESET});
    dispatch({type: CART_PRODUCT_DETAILS_RESET});
  }, [dispatch]);

  return (
    <>
      <OffsetPageHeader leftHeaderText='Your Cart' rightHeaderText='Your Cart' hrBoolean={false}/>
      {loading ? <Loader /> :
        <>
        {cart.length === 0 && <Message variant='info'>Your cart is empty.</Message>}
        {cartQtyMessage.length > 0 && <CartMessage variant='info' itemsChanged={cartQtyMessage} outOfStock={false}/>}
        {cartMovedMessage.length > 0 && <CartMessage variant='danger' itemsChanged={cartMovedMessage} outOfStock={true}/>}
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
                {/* {filteredCart.map((eachProduct, idx) => (
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
                    // cartQtyMessage={cartQtyMessage}
                    // setCartQtyMessage={setCartQtyMessage}
                    cartMovedMessage={cartMovedMessage} 
                    setCartMovedMessage={setCartMovedMessage}
                  />
                ))} */}
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
          <Card className='mt-5 mb-3' style={{"backgroundColor": "#343A40"}}>
            <Card.Body className='text-center'>
              <h5 className='m-0 text-white'>Saved for Later</h5>
            </Card.Body>
          </Card>
          {cart.length === 0 ? <Message variant='info'>Your cart is empty - no items saved for later</Message> :
            (savedForLater.length === 0 && <Message variant='info'>You have no items saved for later.</Message>) 
          }
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
                {/* {savedForLater.map((eachProduct, idx) => (
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
                    // cartQtyMessage={cartQtyMessage}
                    // setCartQtyMessage={setCartQtyMessage}
                  />
                ))} */}
              </ListGroup>
            </Col> {/* End of Left Side of Screen */}
            {/* Right Side of Screen */}
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
