import React, { useState, useEffect } from 'react';
import ReactDom from 'react-dom';
import { Image, Button, Form, Col, Row, ListGroup } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner as spinner } from '@fortawesome/free-solid-svg-icons';
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import { USER_LOGIN_SUCCESS } from '../../constants/userConstants';
import { addDecimals } from '../../utilityFunctions/addDecimals';
import Message from '../Message';

const CartRow = ({ productID, productName, color, size, sizeCategory, qty, productImage, dateAdded, index, savedForLater, setCartQtyMessage }) => {
  // Format the size for the Size column
  let sizeForTable = '';
  sizeCategory !== 'ONE SIZE' ? sizeForTable = `${size} - ${sizeCategory}` : sizeForTable = 'ONE SIZE';


  // Get our array of wishlist products from the global state.
  const cartProducts = useSelector(state => state.cartProductDetails.cartProducts);
  // Find the product specific to this cart table row
  const product = cartProducts[cartProducts.findIndex(i => i.name === productName)];
  // console.log(`product in CartRow:`)
  // console.log(product);
  //Set up local state
  const [tablePrice, setTablePrice] = useState(0);
  const [qtyForTable, setQtyForTable] = useState(0);
  const [qtyForCart, setQtyForCart] = useState(1);
  const [disableCart, setDisableCart] = useState(false);
  const [availableInOtherSizes, setAvailableInOtherSizes] = useState(false);
  const [hasSizes, setHasSizes] = useState(false);
  const [loadingDeleteIcon, setLoadingDeleteIcon] = useState(false);


  useEffect(() => {
    // console.log('in wishlist table row useEffect')
    if(cartProducts.length > 0 && product){
      // Destructure the product object. Doing this outside the useEffect was giving 'undefined' errors
      const { name, defaultPrice, defaultQty, defaultSalePrice, sizes, hasSizes:productHasSizes } = product;
      if(productHasSizes) { setHasSizes(true) }
      // console.log(`in wishlist table row useEffect for ${name}`);

      //=========================================
      //Find the current price and qty available
      //=========================================
      // Products without sizes - easiest case
      if(hasSizes === false){
        defaultSalePrice !== 0 ? setTablePrice(addDecimals(defaultSalePrice)) : setTablePrice(addDecimals(defaultPrice));
        if(defaultQty === 0){ // If none are in stock, disable the cart button and qty input and display an 'out of stock' message to the user
          setDisableCart(true);
          setQtyForTable(0);
          setQtyForCart(0);
        }
        // It's in stock - Check to see how the qty the user wants compares to the qty available
        if(qty < defaultQty){//The user wants less than are available
          setQtyForTable(qty); 
        } else { //If the user wants more than are available
          setQtyForTable(defaultQty);
          setCartQtyMessage(`One or more items in your cart are no longer available in the quantity you originally requested. We've updated your cart with the largest quantity we could give you based on current stock. Checkout soon so you don't miss out!`)
        }
      }
      // Products with sizes - most challenging case
      if(sizes.length > 0){ //Drill down into the product object based on the user's chosen size and color
        console.log(`${name} has sizes`)
        //In the array of sizes, find the index that corresponds to the size category, i.e. the index for "Regular" or "Tall"
        let levelOne = sizes[sizes.findIndex(i => i.sizeCategoryName === sizeCategory)];
        // console.log(levelOne)
        let sizeCatDefaultPrice = levelOne.sizeCategoryDefaultPrice; // Find that size category's default price.
        //Next, find the index in sizeCategoryColorsAndSizes that matches the color the user chose, i.e. "Seapine"
        let levelTwo = levelOne.sizeCategoryColorsAndSizes[levelOne.sizeCategoryColorsAndSizes.findIndex(i => i.color === color)]
        //See if that color is on sale
        let colorSalePrice = levelTwo.colorSalePrice;
        //Next, look at the array of sizes in that color and size category and see if the size the customer gave is in stock
        let levelThree = levelTwo.sizeCategorySizes[levelTwo.sizeCategorySizes.findIndex(i => i.size === size)];
        let qtyInStock = levelThree.qty;
        console.log(`qtyInStock for ${name}: ${qtyInStock}`)
        //If there are zero in stock for that size, see if it's in stock in other sizes in that size category.
        if(qtyInStock === 0){
          setDisableCart(true);
          //Start at level two, all sizes in that color and size category, and look through all sizes there
          for(let eachSize of levelTwo.sizeCategorySizes){
            if(eachSize.qty !== 0){
              // console.log('available in other sizes')
              setAvailableInOtherSizes(true);
              break;
            }
          }
        }
        //Update our local state to reflect what we've found
        //Compare the qty the user originally added to the cart to the quantity currently available
        if(qty < qtyInStock){
          setQtyForTable(qty);
        } else {
          setQtyForTable(qtyInStock)
          setCartQtyMessage(`One or more items in your cart are no longer available in the quantity you originally requested. We've updated your cart with the largest quantity we could give you based on current stock. Checkout soon so you don't miss out!`)
        }
        // setQtyForTable(qtyInStock); // For the Qty Available column
        colorSalePrice === 0 ? setTablePrice(addDecimals(sizeCatDefaultPrice)) : setTablePrice(addDecimals(colorSalePrice)); // For the price column
      }
    }

    // return () => {
      
    // }
  }, [cartProducts.length, product, color, size, sizeCategory, hasSizes]);

  const deleteWishListItemHandler = () => {
    console.log('delete from cart clicked')
  }

  return (
    <>
      <ListGroup.Item className=''>
      {/* <Row className='align-items-center justify-content-center'> */}
      <Row className='align-items-center'>
        {/* ===================== */}
        {/*     Product Image     */}
        {/* ===================== */}
        <Col md={2}>
          <Link to={`/product/${productID}/${color}`}>
            <Image src={productImage} alt={productName} fluid rounded />
          </Link>
        </Col>
        {/* ===================== */}
        {/*         Name          */}
        {/* ===================== */}
        <Col md={3} className='text-center'>
          <Link to={`/product/${productID}/${color}`}>{productName}</Link>
        </Col>
        {/* ===================== */}
        {/*         Color         */}
        {/* ===================== */}
        <Col md={1} className='text-center'>{color}</Col>
        {/* ===================== */}
        {/*         Size          */}
        {/* ===================== */}
        <Col md={2} className='text-center'>{sizeForTable}</Col>
        {/* ===================== */}
        {/*      Qty Available    */}
        {/* ===================== */}
        <Col md={1} className='text-center'>
          {qtyForTable === 0 ? <span className='text-danger font-weight-bold'>Out of Stock</span> : qtyForTable }
        </Col>
        {/* ===================== */}
        {/*         Price         */}
        {/* ===================== */}
        <Col md={2} className='text-center'>
          ${tablePrice}
        </Col>
        {/* ===================== */}
        {/*    Add to Cart Form   */}
        {/* ===================== */}
        {/* {(qtyForCart === 0 && hasSizes === false) &&
          <Col md={2} className='text-center'>
            <span className='text-danger font-weight-bold'>Out of Stock</span> 
          </Col>
        }  */}
        {/* {(qtyForTable === 0 && hasSizes === true && availableInOtherSizes === true) &&
          <Col md={2} className='text-center'>
            <span className='text-danger font-weight-bold'>Available in Other Sizes</span> 
          </Col>
        } 
        {qtyForTable !== 0 &&
          <>
            <Col md={1}>
              {qtyForTable}
            </Col>
          </>
        } */}
        {/* <Col md={2}>
          {qty}
        </Col> */}
        <Col md={1} className=''>
          <Button size='sm' variant='danger' className='' disabled={loadingDeleteIcon} onClick={deleteWishListItemHandler}>
            <FontAwesomeIcon className='' icon={loadingDeleteIcon ? spinner : faTrashAlt} size="2x" />
          </Button>
          {/* <Button>
            P
          </Button> */}
        </Col>
      </Row> 
    </ListGroup.Item>
  </>
  )
}

export default CartRow;
