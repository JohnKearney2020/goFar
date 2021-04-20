import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ListGroup, Col, Row } from 'react-bootstrap';

import { getWishListProductDetails } from '../actions/userActions';
import OffsetPageHeader from '../components/OffsetPageHeader';
import Message from '../components/Message';
import Loader from '../components/Loader';
import './WishListScreen.css';
import WishListRow from '../components/WishListScreen/WishListRow';

const WishListScreen = ({ history }) => {

  const dispatch = useDispatch();
  const haveFetchedWishListProductData = useRef(false);
  const haveUpdatedQtysPrices = useRef(false);
  const fullyLoadedScreenOnceAlready = useRef(false);

  const userInfo = useSelector(state => state.userLogin.userInfo);
  const { wishList } = userInfo;

  const wishListProductDetails = useSelector(state => state.wishListProductDetails);
  const { loading, wishListProducts } = wishListProductDetails;

  useEffect(() => {
    // if a user is not already logged in, redirect them. Also, if a user logs out from the profile screen, this will redirect them
    if(!userInfo.name){ history.push('/login') };
    console.log('in WishListScreen.js useEffect')
    console.log('productsFromWishlist:')
    console.log(wishListProducts)

    if(wishList.length > 0 && haveFetchedWishListProductData.current === false){
      console.log('we have a wishlist')
      let tempArrayProductIDs = wishList.map((eachItem) => {
        return eachItem.productID;
      })
      dispatch(getWishListProductDetails({arrayOfProductIDs: tempArrayProductIDs}));
      haveFetchedWishListProductData.current = true;
    } else if(wishListProducts.length > 0 && haveFetchedWishListProductData.current === true && haveUpdatedQtysPrices.current === false){
      console.log('here is where we need to update the wishlist and then pass that down to the rows');
    }
    // return () => {
      
    // }
  }, [history, userInfo, dispatch, wishList, wishListProducts]);

  return (
    <>
      <OffsetPageHeader leftHeaderText='Wishlist' rightHeaderText='Wishlist' hrBoolean={false}/>
      {loading ? <Loader /> :
        <>
        {wishList.length === 0 && <Message variant='info'>Your wishlist is empty. Add items to your wishlist by clicking the heart icon on a product's page.</Message>}
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
              <Col md={1} className='text-center'>
                <span className='font-weight-bold'>Size</span>
              </Col>
              <Col md={1} className='text-center'>
                <span className='font-weight-bold'>Qty Available</span>              
              </Col>
              <Col md={1} className='text-center'>
                <span className='font-weight-bold'>Current Price</span>
              </Col>
              <Col md={2} className='text-center'>
                <span className='font-weight-bold'>Add to Cart</span> 
              </Col>
              <Col md={1} className='text-center'>
                <span className='font-weight-bold'>Delete</span> 
              </Col>
            </Row> 
          </ListGroup.Item>
          {/*===================*/}
          {/* Items in Wishlist */}
          {/*===================*/}
          {wishList.map((eachProduct, idx) => (
            <WishListRow key={idx}
              productID={eachProduct.productID}
              productName={eachProduct.name}
              color={eachProduct.color}
              size={eachProduct.size}
              sizeCategory={eachProduct.sizeCategory}
              dateAdded={eachProduct.createdAt}
              productImage={eachProduct.image}
              // index={idx}
            />
          ))}
          </ListGroup>
        </>
      }
    </>
  )
}

export default WishListScreen;
