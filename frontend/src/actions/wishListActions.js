import axios from 'axios';
import { toast } from 'react-toastify';
import cloneDeep from 'lodash/cloneDeep';

export const refreshWishList = (userID) => async (dispatch, getState) => {
  console.log('in refreshWishList action');
  // Get the current wishList and token from the global state
  const { userLogin: { userInfo } } = getState();
  const { wishList, token } = userInfo;

  //Configure our headers for various axios requests
  const config = { // set headers to json
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  }
  //Start the process of comparing the items in our wishlist to their updated qty's and prices in the database, then updating our
  //database with the user's new, up to date wishlist
  try {
    // attempt to get the most up to date user details w/ their current wishlist
    // const { user } = await axios.get(`/api/users/${id}`, config);
    // const { oldWishList } = cloneDeep(user.userInfo.wishList);
    // console.log('in tryCatch of wishListAction.js')
    // console.log(`wishList:`)
    // console.log(wishList)
    const oldWishList = cloneDeep(wishList);
    // console.log(oldWishList);
    //Get updated information on the items in the user's wishlist
    let arrayOfProductIDs = oldWishList.map((eachItem) => {
      return eachItem.productID;
    })
    // console.log('arrayOfProductIDs')
    // console.log(arrayOfProductIDs)
    // dispatch(getWishListProductDetails({arrayOfProductIDs: tempArrayProductIDs}));
    const { data:updatedWishListItems } = await axios.post(`/api/users/wishlist`, { arrayOfProductIDs }, config );
    // console.log(`updatedWishListItems:`)
    // console.log(updatedWishListItems)
    //Now compare the two and update the wishList as necessary

    for(let eachItem of oldWishList){
      let { productID: id1, //deconstruct the item object from the cart
        name:name1,
        quantity:userQuantity,
        color:color1,
        size:size1,
        sizeCategory:sizeCategory1,
        currentPrice,
        qtyAvailable
        // image,
        // savedForLater,
        // createdAt
      } = eachItem;
        // Loop through the detailed cart items and find a match
        for(let upToDateItem of updatedWishListItems){
          // Destructure the upToDateItem object
          const { _id: id2, defaultPrice, defaultSalePrice, defaultQty, sizes, hasSizes } = upToDateItem;
          if(id1 === id2){ //We've found the matching item from our wishlist in updatedWishListItems
            //=====================================================================================================================
            //                                                  Find the current price and qty available
            //=====================================================================================================================
            // Products without sizes - easiest case
            if(hasSizes === false){
              //Update the price
              defaultSalePrice !== 0 ? eachItem.currentPrice = defaultSalePrice : eachItem.currentPrice = defaultPrice;
              //Update the qty if needed
              eachItem.qtyAvailable = defaultQty;
            }
          }
        }

      // if(productHasSizes) { setHasSizes(true) }
      // console.log(`in wishlist table row useEffect for ${name}`);

      //=========================================
      //Find the current price and qty available
      //=========================================
      // Products without sizes - easiest case
      // if(hasSizes === false){
      //   defaultSalePrice !== 0 ? setTablePrice(addDecimals(defaultSalePrice)) : setTablePrice(addDecimals(defaultPrice));
      //   if(defaultQty === 0){ // If none are in stock, disable the cart button and qty input and display an 'out of stock' message to the user
      //     setDisableCart(true);
      //     setQtyForTable(0);
      //     setQtyForCart(0);
      //   }
      //   setQtyForTable(defaultQty);
      // }
      // Products with sizes - most challenging case
      // if(sizes.length > 0){ //Drill down into the product object based on the user's chosen size and color
      //   //In the array of sizes, find the index that corresponds to the size category, i.e. the index for "Regular" or "Tall"
      //   let levelOne = sizes[sizes.findIndex(i => i.sizeCategoryName === sizeCategory)];
      //   // console.log(levelOne)
      //   let sizeCatDefaultPrice = levelOne.sizeCategoryDefaultPrice; // Find that size category's default price.
      //   //Next, find the index in sizeCategoryColorsAndSizes that matches the color the user chose, i.e. "Seapine"
      //   let levelTwo = levelOne.sizeCategoryColorsAndSizes[levelOne.sizeCategoryColorsAndSizes.findIndex(i => i.color === color)]
      //   //See if that color is on sale
      //   let colorSalePrice = levelTwo.colorSalePrice;
      //   //Next, look at the array of sizes in that color and size category and see if the size the customer gave is in stock
      //   let levelThree = levelTwo.sizeCategorySizes[levelTwo.sizeCategorySizes.findIndex(i => i.size === size)];
      //   let qtyInStock = levelThree.qty;
      //   //If there are zero in stock for that size, see if it's in stock in other sizes in that size category.
      //   if(qtyInStock === 0){
      //     setDisableCart(true);
      //     //Start at level two, all sizes in that color and size category, and look through all sizes there
      //     for(let eachSize of levelTwo.sizeCategorySizes){
      //       if(eachSize.qty !== 0){
      //         // console.log('available in other sizes')
      //         setAvailableInOtherSizes(true);
      //         break;
      //       }
      //     }
      //   }
      //   //Update our local state to reflect what we've found
      //   setQtyForTable(qtyInStock); // For the Qty Available column
      //   colorSalePrice === 0 ? setTablePrice(addDecimals(sizeCatDefaultPrice)) : setTablePrice(addDecimals(colorSalePrice)); // For the price column
      }
    // }
    console.log('wishlist after changes:')
    console.log(oldWishList);
  } catch (error) {
    console.log('There was an error:')
    console.log(error)
  }
}

// export const login = (email, password) => async (dispatch) => {
//   try {
//     dispatch({
//       type: USER_LOGIN_REQUEST
//     });
//     // set headers to json
//     const config = {
//       headers: {
//         'Content-Type': 'application/json'
//       }
//     }
//     // attemp to log in. Verify user email and password
//     const { data } = await axios.post('/api/users/login', { email, password }, config);
//     dispatch({
//       type: USER_LOGIN_SUCCESS,
//       payload: data
//     })
//     // store user info in local storage
//     localStorage.setItem('userInfo', JSON.stringify(data));
//     toast.info('Log in Successful!', { position: "top-right", autoClose: 3500 }
//   );
//   } catch (error) {
//     dispatch({
//       type: USER_LOGIN_FAIL,
//       payload: error.response && error.response.data.message ? error.response.data.message : error.message
//     })
//   }
// }