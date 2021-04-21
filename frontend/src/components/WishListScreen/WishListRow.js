import React, { useState } from 'react';
import axios from 'axios';
import { Image, Button, Form, Col, Row, ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus, faSpinner as spinner } from '@fortawesome/free-solid-svg-icons';
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import { toast } from 'react-toastify';

import { USER_LOGIN_SUCCESS } from '../../constants/userConstants';

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

  const userInfo = useSelector(state => state.userLogin.userInfo);
  const { cart, token } = userInfo;

  //Set up local state
  const [qtyForCart, setQtyForCart] = useState(1);
  const [disableCart, setDisableCart] = useState(false);
  const [loadingDeleteIcon, setLoadingDeleteIcon] = useState(false);
  const [loadingCartIcon, setLoadingCartIcon] = useState(false);
  const [updatingWishlistIcon, setUpdatingWishlistIcon] = useState(false);

  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  }

  // Format the size for the Size column
  let sizeForTable = '';
  sizeCategory !== 'ONE SIZE' ? sizeForTable = `${size} - ${sizeCategory}` : sizeForTable = 'ONE SIZE';

  // useEffect(() => {
  //   // console.log('in wishlist table row useEffect')
  //   if(wishListProducts.length > 0 && product){
  //     // Destructure the product object. Doing this outside the useEffect was giving 'undefined' errors
  //     const { name, defaultPrice, defaultQty, defaultSalePrice, sizes, hasSizes:productHasSizes } = product;
  //     if(productHasSizes) { setHasSizes(true) }
  //     // console.log(`in wishlist table row useEffect for ${name}`);

  //     //=========================================
  //     //Find the current price and qty available
  //     //=========================================
  //     // Products without sizes - easiest case
  //     if(hasSizes === false){
  //       defaultSalePrice !== 0 ? setTablePrice(addDecimals(defaultSalePrice)) : setTablePrice(addDecimals(defaultPrice));
  //       if(defaultQty === 0){ // If none are in stock, disable the cart button and qty input and display an 'out of stock' message to the user
  //         setDisableCart(true);
  //         setQtyForTable(0);
  //         setQtyForCart(0);
  //       }
  //       setQtyForTable(defaultQty);
  //     }
  //     // Products with sizes - most challenging case
  //     if(sizes.length > 0){ //Drill down into the product object based on the user's chosen size and color
  //       //In the array of sizes, find the index that corresponds to the size category, i.e. the index for "Regular" or "Tall"
  //       let levelOne = sizes[sizes.findIndex(i => i.sizeCategoryName === sizeCategory)];
  //       // console.log(levelOne)
  //       let sizeCatDefaultPrice = levelOne.sizeCategoryDefaultPrice; // Find that size category's default price.
  //       //Next, find the index in sizeCategoryColorsAndSizes that matches the color the user chose, i.e. "Seapine"
  //       let levelTwo = levelOne.sizeCategoryColorsAndSizes[levelOne.sizeCategoryColorsAndSizes.findIndex(i => i.color === color)]
  //       //See if that color is on sale
  //       let colorSalePrice = levelTwo.colorSalePrice;
  //       //Next, look at the array of sizes in that color and size category and see if the size the customer gave is in stock
  //       let levelThree = levelTwo.sizeCategorySizes[levelTwo.sizeCategorySizes.findIndex(i => i.size === size)];
  //       let qtyInStock = levelThree.qty;
  //       //If there are zero in stock for that size, see if it's in stock in other sizes in that size category.
  //       if(qtyInStock === 0){
  //         setDisableCart(true);
  //         //Start at level two, all sizes in that color and size category, and look through all sizes there
  //         for(let eachSize of levelTwo.sizeCategorySizes){
  //           if(eachSize.qty !== 0){
  //             // console.log('available in other sizes')
  //             setAvailableInOtherSizes(true);
  //             break;
  //           }
  //         }
  //       }
  //       //Update our local state to reflect what we've found
  //       setQtyForTable(qtyInStock); // For the Qty Available column
  //       colorSalePrice === 0 ? setTablePrice(addDecimals(sizeCatDefaultPrice)) : setTablePrice(addDecimals(colorSalePrice)); // For the price column
  //     }
  //   };

  //   //See if this item is already in the user's cart
  //   for(let eachItem of cart){
  //     let { productID:id2, color:color2, size:size2,sizeCategory:sizeCategory2 } = eachItem;
  //     // productID, productName, color, size, sizeCategory, productImage, dateAdded, index
  //     if(productID === id2 && color === color2 && size === size2 && sizeCategory === sizeCategory2){
  //       setLoadingCartIcon(false);
  //       setDisableCart(true);
  //     }
  //   }
  // }, [wishListProducts.length, product, color, size, sizeCategory, hasSizes, cart, productID]);

  const addToCartHandler = async (e) => {
    e.preventDefault();
    console.log('in cart handler')
    console.log(`qty for cart: ${qtyForCart}`)
    setUpdatingWishlistIcon(true)
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
        toast.success(`Added ${productName} to your cart!`, { position: "bottom-center", autoClose: 4000 } );
        // We've set up the backend to send us back the updated user information once the user's cart is updated. We need to 
        // dispatch the user login again to update the user's cart in the global state
        dispatch({
          type: USER_LOGIN_SUCCESS,
          payload: data
        });
        localStorage.setItem('userInfo', JSON.stringify(data));
        // setLoadingCartIcon(false);
      } catch (error) {
        console.log('there was an error')
        console.log(error)
        toast.error(`Could not add ${productName} to your cart. Try again later.`, { position: "top-right", autoClose: 3500 });
        setLoadingCartIcon(false);
        setUpdatingWishlistIcon(false);
      }  
    }
  }

  const deleteWishListItemHandler = async () => {
    setLoadingDeleteIcon(true);
    setUpdatingWishlistIcon(true);
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
                <Form type='submit' onSubmit={addToCartHandler}>
                  <Form.Control 
                    as='select'
                    value={qtyAvailable === 0 ? 0 : 1} 
                    onChange={(e) => setQtyForCart(e.target.value)} 
                    disabled={disableCart | inCart}
                    className='px-2 shadow-sm'
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
              <Col lg={1} className='text-center'>
                <Button disabled={disableCart | inCart} type='submit' className='w-100 p-0 mt-1 d-flex justify-content-center align-items-center'
                  style={{"height": "49px"}}
                >
                  {inCart ? 'In Cart' : <FontAwesomeIcon className='' icon={faCartPlus} size='2x' />}
                </Button>
              </Col>
            </>
          }
          <Col lg={1} className='text-center'>
            <Button size='sm' variant='danger' className='w-100 mt-1' disabled={loadingDeleteIcon} onClick={deleteWishListItemHandler}
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
