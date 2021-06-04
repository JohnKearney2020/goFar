import axios from 'axios';
import cloneDeep from 'lodash/cloneDeep';
import { addDecimals } from '../utilityFunctions/addDecimals';
import { USER_LOGIN_SUCCESS } from '../constants/userConstants';


export const refreshWishList = (userID) => async (dispatch, getState) => {
  console.log('in refreshWishList action');
  // Get the current wishList and token from the global state
  const { userLogin: { userInfo } } = getState();
  const { cart, wishList, token } = userInfo;

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
    const oldWishList = cloneDeep(wishList);
    //Get updated information on the items in the user's wishlist
    let arrayOfProductIDs = oldWishList.map((eachItem) => {
      return eachItem.productID;
    })
    const { data:updatedWishListItems } = await axios.post(`/api/users/wishlist`, { arrayOfProductIDs }, config );
    //Now compare the two and update the wishList as necessary
    for(let oldItem of oldWishList){
      let { productID: id1, color:color1, size:size1, sizeCategory:sizeCategory1 } = oldItem;
        // Loop through the detailed wishListItems and find the match
        for(let upToDateWishListItem of updatedWishListItems){
          // Destructure the upToDateItem object
          const { _id: id2, sizes } = upToDateWishListItem;
          //Drill down into the product object and find the color, size, and sizeCategory, all of which are needed to verify a match
          if(id1 === id2){ //We won't dig further for color, size, sizeCategory unless the ID's match
            //=====================================================================================================================
            //                                      Find the current price and qty available
            //=====================================================================================================================
            //Drill down into the product object based on the user's chosen size and color
            //In the array of sizes, find the index that corresponds to the size category, i.e. the index for "Regular" or "Tall"
            let levelOne = sizes[sizes.findIndex(i => i.sizeCategoryName === sizeCategory1)];
            let sizeCatDefaultPrice = levelOne.sizeCategoryDefaultPrice; // Find that size category's default price.
            //Next, find the index in sizeCategoryColorsAndSizes that matches the color the user chose, i.e. "Seapine"
            let levelTwo = levelOne.sizeCategoryColorsAndSizes[levelOne.sizeCategoryColorsAndSizes.findIndex(i => i.color === color1)]
            console.log('levelTwo:')
            console.log(levelTwo)
            //See if that color is on sale
            let colorSalePrice = levelTwo.colorSalePrice;
            //Next, look at the array of sizes in that color and size category and see if the size the customer gave is in stock
            console.log(`size1: ${size1}`)
            let levelThree = levelTwo.sizeCategorySizes[levelTwo.sizeCategorySizes.findIndex(i => i.size === size1)];
            console.log('level three:')
            console.log(levelThree)
            let qtyInStock = levelThree.qty;
            oldItem.availableInOtherSizes = false; //reset this and assume it's false.
            //If there are zero in stock for that size, see if it's in stock in other sizes in that size category.
            if(qtyInStock === 0){
              //Start at level two, all sizes in that color and size category, and look through all sizes there
              for(let eachSize of levelTwo.sizeCategorySizes){
                if(eachSize.qty !== 0){
                  oldItem.availableInOtherSizes = true;
                  break;
                }
              }
            }
            //Update the qty available
            oldItem.qtyAvailable = qtyInStock;
            //Update the current price
            colorSalePrice === 0 ? oldItem.currentPrice = addDecimals(sizeCatDefaultPrice) : oldItem.currentPrice = addDecimals(colorSalePrice);
          }
          //==============================================================
          //Loop through the cart items and see if the item is in the cart
          //==============================================================
          oldItem.inCart = false; //reset this and assume it's false
          if(cart.length > 0){ //If the user has a cart 
            for(let cartItem of cart){
              const { productID:id3, color:color3, size:size3, sizeCategory:sizeCategory3 } = cartItem;
              if(id1 === id3 && color1 === color3 & size1 === size3 && sizeCategory1 === sizeCategory3){
                oldItem.inCart = true;
                break;
              }
            }//End of Inner most for loop through the cart
          }
        }//End of INNER For Loop through the detailed wishList items
    } //End of OUTER For Loop through the old wishList items
    //===================================================
    //          Update the user's entire wishlist
    //===================================================
    // updateWholeWishList
    const { data } = await axios.put(`/api/users/wishlist/updatewholewishlist`, { wishList: oldWishList }, config );
    // Refresh the global state with new userInfo
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data
    });
    localStorage.setItem('userInfo', JSON.stringify(data));
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