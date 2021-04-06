import React, { useEffect, useRef } from 'react';
import { Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import { getWishListProductDetails } from '../actions/userActions';
import OffsetPageHeader from '../components/OffsetPageHeader';
import WishListTableRow from '../components/WishListScreen/WishListTableRow';
import Message from '../components/Message';
import Loader from '../components/Loader';
import './WishListScreen.css';

const WishListScreen = ({ history }) => {

  const dispatch = useDispatch();
  const haveFetchedWishListProductData = useRef(false);

  const userInfo = useSelector(state => state.userLogin.userInfo);
  const { wishList } = userInfo;



  // color={color}
  // size={size}
  // dateAdded={dateAdded}
  // productName={name}
  // productImage={image}

  const productsFromWishlist = useSelector(state => state.wishListProductDetails);
  const { loading } = productsFromWishlist;

  useEffect(() => {
    console.log('in WishListScreen.js useEffect');

    console.log('wishlist from global state:')
    console.log(wishList)
    // if a user is not already logged in, redirect them. Also, if a user logs out from the profile screen, this will redirect them
    if(!userInfo.name){ history.push('/login') };

    if(wishList.length > 0 && haveFetchedWishListProductData.current === false){
      console.log('we have a wishlist')
      let tempArrayProductIDs = wishList.map((eachItem) => {
        return eachItem.productID;
      })
      dispatch(getWishListProductDetails({arrayOfProductIDs: tempArrayProductIDs}));
      haveFetchedWishListProductData.current = false;
    } else {
      console.log('the user does not have a wishlist');
    }
    return () => {
      
    }
  }, [history, userInfo, dispatch, wishList]);

  return (
    <>
      <OffsetPageHeader leftHeaderText='Wishlist' rightHeaderText='Wishlist' hrBoolean={false}/>
      {/* {wishList.length === 0 && <Message variant='info' style={{ margin: '8rem'}}>Your wishlist is empty. Add items to your wishlist by clicking the heart icon on a product's page.</Message>} */}
      {loading ? <Loader /> :
        <>
        {wishList.length === 0 && <Message variant='info' style={{ margin: '8rem'}}>Your wishlist is empty. Add items to your wishlist by clicking the heart icon on a product's page.</Message>}
        <Table striped hover responsive size="sm">
          <thead>
            <tr className='tableRow'>
              <th className='tableText'></th>
              <th className='tableText'>Product Name</th>
              <th className='tableText'>Color</th>
              <th className='tableText'>Size</th>
              <th className='tableText'>Price</th>
              <th className='tableText'>Qty Avail</th>
              <th className='tableText'>Date Added</th>
              <th className='tableText'>Add to Cart</th>
            </tr>
          </thead>
          <tbody>
            {wishList.map((eachProduct, idx) => (
              <WishListTableRow key={idx} 
                // fullProduct={eachProduct}
                productName={eachProduct.name}
                color={eachProduct.color}
                size={eachProduct.size}
                sizeCategory={eachProduct.sizeCategory}
                dateAdded={eachProduct.createdAt}
                productImage={eachProduct.image}
                index={idx}
              />
            ))}
          </tbody>
        </Table> 
        </>
      }
    </>
  )
}

export default WishListScreen;
