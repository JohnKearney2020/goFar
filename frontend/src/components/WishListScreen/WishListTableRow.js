import React, { useState, useEffect } from 'react';
import { Image } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

const WishListTableRow = ({ productName, color, size, sizeCategory, productImage, dateAdded}) => {

  // Get our array of wishlist products from the global state.
  const wishListProducts = useSelector(state => state.wishListProductDetails.wishListProducts);
  // Find the product specific to this table row
  const product = wishListProducts[wishListProducts.findIndex(i => i.name === productName)];

  //Set up local state
  const [tablePrice, setTablePrice] = useState(0);
  const [qtyForTable, setQtyForTable] = useState(0);


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
        defaultSalePrice !== 0 ? setTablePrice(defaultSalePrice) : setTablePrice(defaultPrice);
        setQtyForTable(defaultQty);
      }
      // Products with sizes - most challenging case
      if(sizes.length > 0){
        //Drill down into the product object based on the user's chosen size and color
        //In the array of sizes, find the index that corresponds to the size category, i.e. the index for "Regular" or "Tall"
        let levelOne = sizes[sizes.findIndex(i => i.sizeCategoryName === sizeCategory)];
        console.log(levelOne)
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
        colorSalePrice === 0 ? setTablePrice(sizeCatDefaultPrice) : setTablePrice(colorSalePrice); // For the price column
      }
    }

    return () => {
      
    }
  }, [wishListProducts.length, product])
    
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
      <td className='tableText'>{qtyForTable > 10 ? '10+' : qtyForTable}</td>
      <td className='tableText'>{dateForTable}</td>
    </tr>
  )
}

export default WishListTableRow;
