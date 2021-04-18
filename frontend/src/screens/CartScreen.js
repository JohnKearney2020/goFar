import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import cloneDeep from 'lodash/cloneDeep';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { ListGroup, Col, Row, Card, Button, Image } from 'react-bootstrap';
import { v4 as uuidv4 } from 'uuid';

import { getCartProductDetails, addCartQtyMessage, addCartMovedMessage } from '../actions/cartActions';
import { CART_QTY_MESSAGE_RESET, CART_MOVED_MESSAGE_RESET, CART_PRODUCT_DETAILS_RESET } from '../constants/cartConstants';
import { USER_LOGIN_SUCCESS } from '../constants/userConstants';
import OffsetPageHeader from '../components/OffsetPageHeader';
import Message from '../components/Message';
import Loader from '../components/Loader';
// import CartRow from '../components/CartScreen/CartRow';
import CartRow2 from '../components/CartScreen/CartRow2';
import CartMessage from '../components/CartScreen/CartMessage';

const CartScreen = ({ history }) => {

  const dispatch = useDispatch();
  const haveFetchedCartData = useRef(false);
  const haveUpdatedQtysPrices = useRef(false);
  // const haveSeparatedTheCart = useRef(false);
  const fullyLoadedScreenOnceAlready = useRef(false);

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
  const [noSavedForLaterItems, setNoSavedForLaterItems] = useState(true);
  // const [redoCartLogic, setRedoCartLogic] = useState(false);

  useEffect(() => {
    console.log('in cart screen useEffect')
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
    //============================================================================================================
    // Next, compare the user's cart to the up to date product data. Update prices and quantities when necessary
    //============================================================================================================
    } else if(cartProducts.length > 0 && haveFetchedCartData.current === true && haveUpdatedQtysPrices.current === false){
      // console.log('in update qtys and prices part of cart screen useEffect')
      const qtyMessageArray = [];
      const movedMessageArray = [];
      let newUpdatedCart = cloneDeep(cart);
      //Delete the updatedAt key from the cart so that when we update and save the whole cart the backend will automatically put in
      //a new, updated key called updatedAt that contains the correct time/date the cart items were last updated
      for(let eachItem of newUpdatedCart){
        delete eachItem.updatedAt;
      }
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
            if(id1 === id2){//If the product ID's match
              //=====================================================================================================================
              //                                                  Find the current price and qty available
              //=====================================================================================================================
              // Products without sizes - easiest case
              if(hasSizes === false){
                //Update the price
                defaultSalePrice !== 0 ? cartItem.price = defaultSalePrice : cartItem.price = defaultPrice;
                //Update the qty if needed
                if(defaultQty === 0){ //If the item is now out of stock
                  if(userQuantity !== 0){
                    movedMessageArray.push({ //Add to message for moved items
                      name: name1,
                      color: color1,
                      size: size1,
                      sizeCategory: sizeCategory1,
                      oldQty: userQuantity,
                      newQty: defaultQty
                    })
                    cartItem.quantity = defaultQty;
                  }
                  if(!cartItem.savedForLater){
                    cartItem.savedForLater = true;
                    toast.error(`${name1} - ${color1}/${size1}/${sizeCategory1} is no longer in stock and has been moved to Saved for Later`, { position: "bottom-center", autoClose: 5000 });
                  }
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
                  if(!cartItem.savedForLater){
                    toast.info(`${name1} - ${color1}/${size1}/${sizeCategory1}'s quantity has changed due to lower availability.`, { position: "bottom-center", autoClose: 5000 });
                  }
                }
              }
              //=====================================================================================================================
              // Products with sizes - hardest case
              //=====================================================================================================================
              if(hasSizes === true && size1 !== 'ONE SIZE'){ //Drill down into the product object based on the user's chosen size and color
                //In the array of sizes, find the index that corresponds to the size category, i.e. the index for "Regular" or "Tall"
                let levelOne = sizes[sizes.findIndex(i => i.sizeCategoryName === sizeCategory1)];
                // Find that size category's default price.
                let sizeCatDefaultPrice = levelOne.sizeCategoryDefaultPrice;
                //Next, find the index in sizeCategoryColorsAndSizes that matches the color the user chose, i.e. "Seapine"
                let levelTwo = levelOne.sizeCategoryColorsAndSizes[levelOne.sizeCategoryColorsAndSizes.findIndex(i => i.color === color1)];
                //See if that color is on sale
                let colorSalePrice = levelTwo.colorSalePrice;
                //Next, look at the array of sizes in that color and size category and see if the size the customer gave is in stock
                let levelThree = levelTwo.sizeCategorySizes[levelTwo.sizeCategorySizes.findIndex(i => i.size === size1)];
                let qtyInStock = levelThree.qty;
                // Update the price
                colorSalePrice !== 0 ? cartItem.price = colorSalePrice : cartItem.price = sizeCatDefaultPrice;
                //Update the qty if needed
                if(qtyInStock === 0){ //If the item is now out of stock
                  if(userQuantity !== 0){
                    movedMessageArray.push({ //Add to message for moved items
                      name: name1,
                      color: color1,
                      size: size1,
                      sizeCategory: sizeCategory1,
                      oldQty: userQuantity,
                      newQty: qtyInStock
                    })
                    cartItem.quantity = qtyInStock;
                  }
                  if(!cartItem.savedForLater){
                    cartItem.savedForLater = true;
                    toast.error(`${name1} - ${color1}/${size1}/${sizeCategory1} is no longer in stock and has been moved to Saved for Later`, { position: "bottom-center", autoClose: 5000 });
                  }
                } else if(userQuantity > qtyInStock) {  //
                  cartItem.quantity = qtyInStock;
                  qtyMessageArray.push({ //Add to message for qty changed items
                    name: name1,
                    color: color1,
                    size: size1,
                    sizeCategory: sizeCategory1,
                    oldQty: userQuantity,
                    newQty: qtyInStock
                  })
                  // toast.info(`${name1} - ${color1}/${size1}/${sizeCategory1}'s quantity has changed due to lower availability.`, { position: "bottom-center", autoClose: 5000 });
                }
              }
            } //End of the INNER for loop thru cart and cart details
          }
      } //End of the OUTER for loop thru cart and cart details

      if(qtyMessageArray.length > 0) { dispatch(addCartQtyMessage(qtyMessageArray)) };
      if(movedMessageArray.length > 0) { dispatch(addCartMovedMessage(movedMessageArray)) };
      //Update the cart in our Database
      const updateOurCart = async (cart) => {
        const config = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userInfo.token}`
          }
        }
        try {
          const { data } = await axios.put('/api/users/cart/updatewholecart', { cart }, config);
          //The .current updates and the setNoSavedForLaterItems bits need to be before the dispatch or it looks like they don't
          //properly execute, probably b/c the cart technically updates again, triggering the useEffect before they
          haveUpdatedQtysPrices.current = true;
          fullyLoadedScreenOnceAlready.current = true;
          //Loop through each item in our cart and see if at least one is saved for later. If so, change the local state to reflect that
          let foundSavedForLater = false;
          for(let eachItem of cart){
            if(eachItem.savedForLater === true){
              setNoSavedForLaterItems(false);
              foundSavedForLater = true;
              break; //we don't need to loop through more items once we find one
            }
          }
          //If noSavedForLaterItems === true, but we didn't find any save for later items when the cart updated, set it to false
          if(foundSavedForLater === false ) { setNoSavedForLaterItems(true); }
          // console.log(data)
          dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
          });
          localStorage.setItem('userInfo', JSON.stringify(data));
          console.log('cart updated successfully')
        } catch (error) {
          console.log('there was an error updating the cart with up to date values')
          console.log(error)
          toast.error(`Could not update your cart with accurate prices and quantities. Try again later.`, { position: "top-right", autoClose: 5000 });
        }
      }
      updateOurCart(newUpdatedCart); //Function call for updating cart in our database  
    } else {
      //This else statement is the equivalent of ComponentDidUpdate. The logic above is all equivalent to ComponentDidMount
      //Resetting the Refs below and then toggling the local state redoCartLogic wil force a fresh re-render with all the logic
      //above in this useEffect executing again
      // console.log('something updated, redoing cart logic')
      // haveFetchedCartData.current = false;
      // haveUpdatedQtysPrices.current = false;
      // fullyLoadedScreenOnceAlready.current = true;
      // haveSeparatedTheCart.current = false;
      // setRedoCartLogic(!redoCartLogic);
    }
  }, [cart, cartProducts, dispatch, userInfo.token, noSavedForLaterItems]);

  //This should clear our qty and moved messages and cart product details once users navigate away from the cart
  useLayoutEffect(() => () => {
    dispatch({type: CART_QTY_MESSAGE_RESET});
    dispatch({type: CART_MOVED_MESSAGE_RESET});
    dispatch({type: CART_PRODUCT_DETAILS_RESET});
  }, [dispatch]);

  return (
    <>
      <OffsetPageHeader leftHeaderText='Your Cart' rightHeaderText='Your Cart' hrBoolean={false}/>
      {!fullyLoadedScreenOnceAlready.current ? <Loader /> :
        <>
        {cart.length === 0 && <Message variant='info'>Your cart is empty.</Message>}
        {cartQtyMessage.length > 0 && <CartMessage variant='info' itemsChanged={cartQtyMessage} outOfStock={false}/>}
        {cartMovedMessage.length > 0 && <CartMessage variant='danger' itemsChanged={cartMovedMessage} outOfStock={true}/>}
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
                {cart.map((eachProduct) => (
                  eachProduct.savedForLater === false &&
                  <CartRow2 key={`${eachProduct.productID}${eachProduct.name}${eachProduct.color}${eachProduct.size}${eachProduct.sizeCategory}`}
                    productID={eachProduct.productID}
                    name={eachProduct.name}
                    color={eachProduct.color}
                    size={eachProduct.size}
                    sizeCategory={eachProduct.sizeCategory}
                    price={eachProduct.price}
                    qty={eachProduct.quantity}
                    // dateAdded={eachProduct.createdAt}
                    image={eachProduct.image}
                    savedForLater={eachProduct.savedForLater}
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
          <Card className='mt-5 mb-3' style={{"backgroundColor": "#343A40"}}>
            <Card.Body className='text-center'>
              <h5 className='m-0 text-white'>Saved for Later</h5>
            </Card.Body>
          </Card>
          {cart.length === 0 ? <Message variant='info'>Your cart is empty - no items saved for later</Message> :
            (noSavedForLaterItems && <Message variant='info'>You have no items saved for later.</Message>) 
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
                      {/* Offset for trashh delete icon */}
                    </Col>
                  </Row> 
                </ListGroup.Item>
                {/*=======================*/}
                {/* Saved for Later Items */}
                {/*=======================*/}
                {cart.map((eachProduct) => (
                  eachProduct.savedForLater === true &&
                  <CartRow2 key={`${eachProduct.productID}${eachProduct.name}${eachProduct.color}${eachProduct.size}${eachProduct.sizeCategory}`}
                    productID={eachProduct.productID}
                    name={eachProduct.name}
                    color={eachProduct.color}
                    size={eachProduct.size}
                    sizeCategory={eachProduct.sizeCategory}
                    price={eachProduct.price}
                    qty={eachProduct.quantity}
                    // dateAdded={eachProduct.createdAt}
                    image={eachProduct.image}
                    savedForLater={eachProduct.savedForLater}
                  />
                ))}
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
