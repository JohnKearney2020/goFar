import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as outlineHeart } from '@fortawesome/free-regular-svg-icons';
import { Row, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import Loader from '../../components/Loader';;



const WishListButton = ({ productID }) => {
  // Get the user's wishlist from Global State
  const userInfo = useSelector(state => state.userLogin.userInfo);
  // const { wishList } = userInfo;

  const [loadingWishListIcon, setLoadingWishListIcon] = useState(true);
  const [wishListIcon, setWishListIcon] = useState('');

  const userDetails = useSelector(state => state.userDetails);
  const { user } = userDetails;
  const { addresses } = user;

  useEffect(() => {
    // console.log(`productID: ${productID}`)
    // if(addresses.length > 0){
    //   console.log(Object.values(addresses[0]))
    // }
    if(userInfo){
      console.log('in WishListButton useEffect')
    }
    return () => {
      
    }
  }, [addresses,productID])

  return (
    <>
      {/* { loadingWishListIcon ? <Loader /> : <FontAwesomeIcon className='' icon={solidHeart} size="2x" /> } */}
      {<FontAwesomeIcon className='' icon={solidHeart} size="2x" /> }
    </>
    // <Button>

      
    // </Button>
  )
}

export default WishListButton;
