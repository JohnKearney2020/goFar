import asyncHandler from 'express-async-handler';
import mongoose from 'mongoose';

import User from '../models/userModel.js';
import Product from '../models/productModel.js';
import generateToken from '../utils/generateToken.js';

//========================================================================================================================
//                                                              Wishlist
//========================================================================================================================
// @desc     Get user wishlist products. The wishlist just has product id's, name, size, qty, and an image. This pulls the
//           full product data from the database for each product id in the user's wishlist
// @route    GET /api/users/wishlist
// @access   Private
const getUserWishListProducts = asyncHandler(async (req, res) => {
  console.log('in getUserWishListProducts')
  const productsFromWishlist = await Product.find({ '_id': { $in: req.body.arrayOfProductIDs }});
  if(productsFromWishlist) {
    res.json(
      productsFromWishlist)
  } else {
    res.status(404); //not found
    throw new Error(`Could not find products with those id's.`);
  }
})

// @desc     Add on item to user wishlist
// @route    PUT /api/users/wishlistitem
// @access   Private
const addUserWishListItem = asyncHandler(async (req, res) => {
  console.log('in addUserWishListItem')

  // userID,
  // productID, 
  // name: productName,
  // color,
  // size,
  // sizeCategory, 
  // image: primaryImageForColor,


  const { productID, name, color, size, sizeCategory, image } = req.body;
  const user = await User.findById(req.user._id);
  if(user) {
    console.log('found user')
    let oldWishList = [...user.wishList]
    // let qtyInStock = null;
    // let currentPrict = null;
    oldWishList.push({ productID, name, color, size, sizeCategory, image });
    user.wishList = oldWishList;
    // Update the user's info
    const updatedUser = await user.save();

    res.status(201).json({ //201 status means something was created
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      cart: updatedUser.cart,
      wishList: updatedUser.wishList,
      loggedIn: true,
      token: generateToken(updatedUser._id) 
    })
  } else {
    res.status(404); //not found
    throw new Error('User not found');
  }
})

// // @desc     Delete an item from the user's wishlist
// // @route    DELETE /api/users/wishlistitem/:{userid}&:{productid}&:{color}&:{size}&:{sizecategory}
// // @access   Private
const deleteUserWishListItem = asyncHandler(async (req, res) => {
  //verify the id we passed is a valid mongose ObjectId
  if (!mongoose.Types.ObjectId.isValid(req.params.userid) || !mongoose.Types.ObjectId.isValid(req.params.productid)) {
    res.status(400); // see comments below on status code 400 
    throw new Error('Invalid Product or User id - the id does not meet valid mongoose ObjectId standards.');
  }
  const user = await User.findById(req.params.userid);
  //make sure the user does in fact exist
  if(user){
    const productIDToDelete = req.params.productid;
    const productColorToDelete = req.params.color;
    const productSizeToDelete = req.params.size;
    const productSizeCatToDelete = req.params.sizecategory;
    const wishListToFilter = [...user.wishList] //Copy the user's wishlist
    let foundMatchingProduct = false;
    //Callback function for the .filter() below
    const filterOutThatWishListItem = (wishListItem) => { 
      if( //If the id, color, size, and sizecat all match, return false b/c filter only returns items on a true
        wishListItem.productID.toString() === productIDToDelete && 
        wishListItem.color.toString() === productColorToDelete &&
        wishListItem.size.toString() === productSizeToDelete &&
        wishListItem.sizeCategory.toString() === productSizeCatToDelete
      ){
        foundMatchingProduct = true;
        return false 
      };
      return true; //all other items will be returned
    }
    //Filter out the item we wish to delete. Find the item with a matching ProductID, size, color, and size category
    const filteredWishList = wishListToFilter.filter(filterOutThatWishListItem);
    if(foundMatchingProduct){ //If we did in fact find a product in the user's wishlist that had a matching ID, color, size, and size catergory 
      user.wishList = filteredWishList; //Update the user's wishlist
      const updatedUser = await user.save();//Save the updated user on the database
      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
        // addresses: updatedUser.addresses,
        // phoneNumber: updatedUser.phoneNumber,
        cart: updatedUser.cart,
        wishList: updatedUser.wishList,
        token: generateToken(updatedUser._id) 
      })
    } else {
      res.status(404);
      throw new Error('That product was not found in your wishlist. Cannot remove from wishlist.');
    }

  } else { //If we did not find a user with that UserID
    res.status(404);
    throw new Error('User not found. Cannot remove from wishlist.');
  }
})

// @desc     Update a user's whole wishlist with up to date qty's and prices
// @route    PUT /api/users/wishlist/updatewholewishlist
// @access   Private
const updateWholeWishList = asyncHandler(async (req, res) => {
  //remember, req.user is passed here automatically by our authorization middleware
  const user = await User.findById(req.user._id);
  // const user = await User.findById(req.body.userID);
  if(user) {
    user.wishList = req.body.wishList || user.wishList;
    //Update the user's info
    const updatedUser = await user.save();
    res.status(201).json({ //201 status means something was created
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      cart: updatedUser.cart,
      wishList: updatedUser.wishList,
      loggedIn: true,
      token: generateToken(updatedUser._id) 
    })
  } else {
    res.status(404); //not found
    throw new Error('User not found. Cannot Update their wishlist.');
  }
})

export { 
  getUserWishListProducts, 
  addUserWishListItem, 
  deleteUserWishListItem,
  updateWholeWishList
};