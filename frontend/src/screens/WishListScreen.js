import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ListGroup, Col, Row } from 'react-bootstrap';
import { refreshWishList } from '../actions/wishListActions';

import OffsetPageHeader from '../components/OffsetPageHeader';
import Message from '../components/Message';
import Loader from '../components/Loader';
import './WishListScreen.css';
import WishListRow from '../components/WishListScreen/WishListRow';


const WishListScreen = ({ history }) => {

  const dispatch = useDispatch();
  
  const haveUpdatedWishList = useRef(false);
  const [noWishList, setNoWishList] = useState(false);

  const userInfo = useSelector(state => state.userLogin.userInfo);
  const { _id:userID, wishList } = userInfo;


  useEffect(() => {
    // if a user is not already logged in, redirect them. Also, if a user logs out from the profile screen, this will redirect them
    if(!userInfo.name){ history.push('/login') };
    console.log('in WishListScreen useEffect')
    if(wishList.length > 0 && haveUpdatedWishList.current === false){
      console.log('in first conditional')
      dispatch(refreshWishList(userID));
      haveUpdatedWishList.current = true;
    }
    if(wishList.length === 0 && haveUpdatedWishList.current === false){
      console.log('the user does not have a wishlist');
      haveUpdatedWishList.current = false
      console.log(`haveUpdateWishList.current: ${haveUpdatedWishList.current}`)
      setNoWishList(true);
    }
  }, [history, userID, wishList, dispatch, userInfo.name]);

  return (
    <>
      <OffsetPageHeader leftHeaderText='Wishlist' rightHeaderText='Wishlist' hrBoolean={false}/>
      {(!haveUpdatedWishList.current && !noWishList) ? <Loader /> :
        <>
        {wishList.length === 0 && <Message variant='info'>Your wishlist is empty. Add items to your wishlist by clicking the heart icon on a product's page.</Message>}
        <ListGroup variant='flush'>
        {/*===================*/}
        {/*    Table Header   */}
        {/*===================*/}
          <ListGroup.Item className='d-none d-md-block'>
            <Row className='align-items-center justify-content-center shadow mb-3' style={{"backgroundColor":"rgba(0,0,0,.03)"}}>
              <Col lg={5} className='text-center'>
                <span className='font-weight-bold'>Product</span>
              </Col>
              <Col lg={1} className='text-center'>
                <span className='font-weight-bold'>Color</span>
              </Col>
              <Col lg={1} className='text-center'>
                <span className='font-weight-bold'>Size</span>
              </Col>
              <Col lg={1} className='text-center'>
                <span className='font-weight-bold'>Qty Available</span>              
              </Col>
              <Col lg={1} className='text-center'>
                <span className='font-weight-bold'>Current Price</span>
              </Col>
              <Col lg={2} className='text-center'>
                <span className='font-weight-bold'>Add to Cart</span> 
              </Col>
              <Col lg={1} className='text-center'>
                <span className='font-weight-bold'>Delete</span> 
              </Col>
            </Row> 
          </ListGroup.Item>
          {/*===================*/}
          {/* Items in Wishlist */}
          {/*===================*/}
          {wishList.map((eachProduct, idx) => (
            <WishListRow key={`${idx}${wishList[idx].color}${wishList[idx].size}${wishList[idx].sizeCategory}`}
              productID={eachProduct.productID}
              productName={eachProduct.name}
              color={eachProduct.color}
              size={eachProduct.size}
              sizeCategory={eachProduct.sizeCategory}
              dateAdded={eachProduct.createdAt}
              productImage={eachProduct.image}
              qtyAvailable={eachProduct.qtyAvailable}
              currentPrice={eachProduct.currentPrice}
              inCart={eachProduct.inCart}
              availableInOtherSizes={eachProduct.availableInOtherSizes}
            />
          ))}
          </ListGroup>
        </>
      }
    </>
  )
}

export default WishListScreen;
