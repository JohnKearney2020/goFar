import React, { useState, useEffect } from 'react';
import { Image, Button, Form, Col } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faHeart as solidHeart, faSpinner as spinner } from '@fortawesome/free-solid-svg-icons';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
// import { faHeart as outlineHeart } from '@fortawesome/free-regular-svg-icons';


import { addDecimals } from '../../utilityFunctions/addDecimals';
import FormContainer from '../FormContainer';
import Message from '../Message';

const WishListTableRow = ({ productName, color, size, sizeCategory, productImage, dateAdded, index}) => {

  // Get our array of wishlist products from the global state.
  const wishListProducts = useSelector(state => state.wishListProductDetails.wishListProducts);
  // Find the product specific to this table row
  const product = wishListProducts[wishListProducts.findIndex(i => i.name === productName)];

  //Set up local state
  const [tablePrice, setTablePrice] = useState(0);
  const [qtyForTable, setQtyForTable] = useState(0);
  const [qtyForCart, setQtyForCart] = useState(1);
  const [disableCart, setDisableCart] = useState(false);
  const [cartErrorMessage, setCartErrorMessage] = useState(false);


  // Format the date for the Date column
  const dateObject = new Date(dateAdded);
  const dateForTable = `${(dateObject.getMonth() + 1).toString()}/${dateObject.getDate().toString()}/${dateObject.getFullYear().toString()}`;

  // Format the size for the Size column
  let sizeForTable = '';
  sizeCategory!== 'ONE SIZE' ? sizeForTable = `${size} - ${sizeCategory}` : sizeForTable = 'ONE SIZE';



  useEffect(() => {
    // console.log('in wishlist table row useEffect')
    if(wishListProducts.length > 0 && product){
      // Destructure the product object. Doing this outside the useEffect was giving 'undefined' errors
      const { name, defaultPrice, defaultQty, defaultSalePrice, sizes, hasSizes } = product;
      console.log(`in wishlist table row useEffect for ${name}`)
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
        setQtyForTable(defaultQty);
      }
      // Products with sizes - most challenging case
      if(sizes.length > 0){
        //Drill down into the product object based on the user's chosen size and color
        //In the array of sizes, find the index that corresponds to the size category, i.e. the index for "Regular" or "Tall"
        let levelOne = sizes[sizes.findIndex(i => i.sizeCategoryName === sizeCategory)];
        // console.log(levelOne)
        let sizeCatDefaultPrice = levelOne.sizeCategoryDefaultPrice; // Find that size category's default price.
        //Next, find the index in sizeCategoryColorsAndSizes that matches the color the user chose, i.e. "Seapine"
        let levelTwo = levelOne.sizeCategoryColorsAndSizes[levelOne.sizeCategoryColorsAndSizes.findIndex(i => i.color === color)]
        //See if that color is on sale
        // console.log(levelTwo)
        let colorSalePrice = levelTwo.colorSalePrice;
        //Next, look at the array of sizes in that color and size category and see if the size the customer gave is in stock
        let levelThree = levelTwo.sizeCategorySizes[levelTwo.sizeCategorySizes.findIndex(i => i.size === size)];
        let qtyInStock = levelThree.qty;
        //Update our local state to reflect what we've found
        setQtyForTable(qtyInStock); // For the Qty Available column
        colorSalePrice === 0 ? setTablePrice(addDecimals(sizeCatDefaultPrice)) : setTablePrice(addDecimals(colorSalePrice)); // For the price column
      }
    }

    return () => {
      
    }
  }, [wishListProducts.length, product, color, size, sizeCategory]);

  const qtyForCartHandler = (e) => {
    console.log(e.target.value);
    let newQtyForCart = e.target.value;
    // if(newQtyForCart > 0 && cartErrorMessage) { setCartErrorMessage(null) };
    setQtyForCart(newQtyForCart);
  }

  const addToCartHandler = (e) => {
    e.preventDefault();
    setCartErrorMessage(false);
    console.log('in cart handler')
    console.log(`qty for cart: ${qtyForCart}`)
    //Form Validation
    // if(qtyForCart === '0'){ //If the user tries to add quantity zero to their cart
    //   setCartErrorMessage(true);
    //   toast.error('Choose a quantity greater than zero...', { position: "top-center", autoClose: 3500 });
    //   return;
    // }
    // if(qtyForCart > qtyForTable){//If the user tries to add more than are in stock
    //   setCartErrorMessage(true);
    //   toast.error(`Too many selected. Only ${qtyForTable} in stock.`, { position: "top-center", autoClose: 3500 });
    //   return;
    // }
  }
    
  return (
    <tr className='tableRow'>
      <td className='tableText'>
        <Image className='tableImage' src={productImage}/>
      </td>
      {/* <td className='tableText'>{name}</td> */}
      <td className='tableText'>{productName}</td>
      <td className='tableText'>{color}</td>
      <td className='tableText'>{sizeForTable}</td>
      {/* <td className='tableText'>$65</td> */}
      <td className='tableText'>${tablePrice}</td>
      {/* <td className='tableText'>{qtyForTable === 0 ? 'Out of Stock' : ( qtyForTable > 10 ? '10+' : qtyForTable )}</td> */}
      <td className='tableText'>{qtyForTable === 0 ? <span className='text-danger font-weight-bold'>Out of Stock</span> : ( qtyForTable > 10 ? '10+' : (qtyForTable <= 5 ? <span className='text-danger font-weight-bold'>{qtyForTable}</span> : qtyForTable ))}</td>
      <td className='tableText'>{dateForTable}</td>
      <td className='tableText'>
        {/* <FormContainer> */}
          <Form type='submit' onSubmit={addToCartHandler}>
            <Form.Row>
              <Col>
                {/* <Form.Control 
                  type='number' 
                  // size='sm'
                  // placeholder='Confirm password' 
                  value={qtyForCart}
                  // onChange={(e) => setConfirmPassword(e.target.value)}
                  className={cartErrorMessage === false ? '' : 'is-invalid'}
                  style={index % 2 === 0 ? { 'backgroundColor': 'white' } :{ 'backgroundColor': '#f7f7f9' }}
                  disabled={disableCart}
                  onChange={qtyForCartHandler}
                >
                </Form.Control> */}
                {/* { cartErrorMessage && <div className="invalid-feedback">{cartErrorMessage}</div> }               */}
                {/* <Form.Control as='select' value={qtyForTable <= 10 ? qtyForTable : 10} onChange={(e) => qtyForCartHandler(e.target.value)} disabled={disableCart}> */}
                <Form.Control 
                  as='select' 
                  // value={qtyForTable <= 10 ? qtyForTable : 10} 
                  defaultValue='test'
                  value={qtyForCart} 
                  onChange={(e) => setQtyForCart(e.target.value)} 
                  // onChange={qtyForCartHandler} 
                  disabled={disableCart}
                  // style={{"color": "black"}}
                >
                  {[...Array(qtyForTable).keys()].map(x => (
                    // Limit the user to a max of 10 items added to the cart at once
                    (x + 1 <= 10 &&
                      <option key={x+1} value={x + 1}>
                      {x + 1}
                      </option>
                    )
                  ))}
                </Form.Control>
              </Col>
              <Col>
                <Button size='sm' disabled={disableCart} type='submit'>
                  <FontAwesomeIcon className='' icon={faCartPlus} size="3x" />
                </Button>
              </Col>
            </Form.Row>
            {/* {cartErrorMessage && <Message variant='danger'>{cartErrorMessage}</Message>} */}
          </Form>
        {/* </FormContainer> */}
      </td>
    </tr>
  )
}

export default WishListTableRow;
