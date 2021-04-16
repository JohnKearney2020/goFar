import asyncHandler from 'express-async-handler';
import mongoose from 'mongoose';
// import colors from 'colors';
import User from '../models/userModel.js';
import Product from '../models/productModel.js';
import generateToken from '../utils/generateToken.js';

//========================================================================================================================
//                                                              Cart
//========================================================================================================================
// @desc     Get user cart products. The cart just has product id's, name, qty, size, sizeCategory and an image. This pulls the
//           full product data from the database for each product id in the user's wishlist
// @route    GET /api/users/cart
// @access   Private
const getCart = asyncHandler(async (req, res) => {
  console.log('in getCart')
  const productsFromCart = await Product.find({ '_id': { $in: req.body.arrayOfProductIDs }});
  if(productsFromCart) {
    res.json(
      productsFromCart)
  } else {
    res.status(404); //not found
    throw new Error(`Could not find products with those id's.`);
  }
})

// @desc     Add on item to user cart
// @route    POST /api/users/cart/cartitem
// @access   Private
const addCartItem = asyncHandler(async (req, res) => {
  const { productID, name, quantity, color, size, sizeCategory, image, price, savedForLater } = req.body;
  const user = await User.findById(req.user._id);
  if(user) {
    let oldCart = [...user.cart]
    // Check to see if the product with that color, size, and size category is already in the cart
    // If it is, increase the quantity of that combination by the quantity sent by the user instead of adding a new instance of that combination to the cart
    let alreadyInCart = false;
    for(let eachProduct of oldCart){
      if(eachProduct.productID.toString() === productID && eachProduct.color.toString() === color  && eachProduct.size.toString() === size && eachProduct.sizeCategory.toString() == sizeCategory){
        // eachProduct.quantity += Number(quantity);
        eachProduct.quantity = Number(quantity);
        alreadyInCart = true; //We now know this combination already exists in the cart
        break;
      }
    }
    if(alreadyInCart === false){ // add the new item to the cart if it doesn't already exist in the cart
      oldCart.push({ productID, name, quantity, color, size, sizeCategory, price, image, savedForLater });
    }
    user.cart = oldCart;
    // Update the user's info
    const updatedUser = await user.save();
    res.status(201).json({ //201 status means something was created
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      cart: updatedUser.cart,
      wishList: updatedUser.wishList,
      token: generateToken(updatedUser._id) 
    })
  } else {
    res.status(404); //not found
    throw new Error('User not found');
  }
});

// // @desc     Delete an item from the user's wishlist
// // @route    DELETE /api/users/cart/cartitem/:{userid}&:{productid}&:{color}&:{size}&:{sizecategory}
// // @access   Private
const deleteCartItem = asyncHandler(async (req, res) => {
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
    const cartToFilter = [...user.cart] //Copy the user's wishlist
    let foundMatchingProduct = false;
    //Callback function for the .filter() below
    const filterOutThatCartItem = (cartItem) => { 
      if( //If the id, color, size, and sizecat all match, return false b/c filter only returns items on a true
        cartItem.productID.toString() === productIDToDelete && 
        cartItem.color.toString() === productColorToDelete &&
        cartItem.size.toString() === productSizeToDelete &&
        cartItem.sizeCategory.toString() === productSizeCatToDelete
      ){
        foundMatchingProduct = true;
        return false 
      };
      return true; //all other items will be returned
    }
    //Filter out the item we wish to delete. Find the item with a matching ProductID, size, color, and size category
    const filteredCart = cartToFilter.filter(filterOutThatCartItem);
    if(foundMatchingProduct){ //If we did in fact find a product in the user's cart that had a matching ID, color, size, and size catergory 
      user.cart = filteredCart; //Update the user's wishlist
      const updatedUser = await user.save();//Save the updated user on the database
      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
        cart: updatedUser.cart,
        wishList: updatedUser.wishList,
        token: generateToken(updatedUser._id) 
      })
    } else {
      res.status(404);
      throw new Error('That product was not found in your cart. Cannot remove from cart.');
    }
  } else { //If we did not find a user with that UserID
    res.status(404);
    throw new Error('User not found. Cannot remove from cart.');
  }
})

// @desc     Update item in user's cart
// @route    PUT /api/users/cart/cartitem
// @access   Private
const updateCartQty = asyncHandler(async (req, res) => {
  //remember, req.user is passed here automatically by our authorization middleware
  const user = await User.findById(req.user._id);
  // const user = await User.findById(req.body.userID);
  if(user) {
    // console.log('User we found in backend:')
    // console.log('========================================================================================================')
    // console.log(user.cart)
    // user.cart = req.body.cart || user.cart;
    const { productID, name, color, size, sizeCategory, newQty, savedForLater } = req.body;
    // console.log(`new Qty: ${newQty}` .cyan)
    let oldCart = [...user.cart];
    // console.log('copy of users cart:')
    // console.log(oldCart);
    let foundItemToUpdate = false;
    // console.log('cart before any updated quantities')
    // console.log(oldcart)
    // console.log(user.cart)
    for(let eachItem of oldCart){
      if(eachItem.productID.toString() === productID 
        && eachItem.name.toString() === name 
        && eachItem.color.toString() === color
        && eachItem.size.toString() === size
        && eachItem.sizeCategory.toString() === sizeCategory
        ) {
          // console.log(`eachItem.quantity =`)
          // console.log('Found item to update' .red.inverse);
          eachItem.quantity = Number(newQty); //Update the qty
          eachItem.savedForLater = savedForLater;
          foundItemToUpdate = true;
          // console.log('oldCart updated with new Qty:')
          // console.log(oldCart)
          break;
        }
    }

    // let alreadyInCart = false;
    // for(let eachProduct of oldCart){
    //   if(eachProduct.productID.toString() === productID && eachProduct.color.toString() === color  && eachProduct.size.toString() === size && eachProduct.sizeCategory.toString() == sizeCategory){
    //     // eachProduct.quantity += Number(quantity);
    //     eachProduct.quantity = Number(quantity);
    //     alreadyInCart = true; //We now know this combination already exists in the cart
    //     break;
    //   }
    // }


    if(foundItemToUpdate === false){
      res.status(404); //not found
      throw new Error('Could not find that item in the cart. Cannot update the quantity');
    }
    // Update the user's cart info in the database
    const updatedUser = await user.save();
    res.status(201).json({ //201 status means something was created
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      cart: updatedUser.cart,
      wishList: updatedUser.wishList,
      token: generateToken(updatedUser._id) 
    })
  } else {
    res.status(404); //not found
    throw new Error('User not found. Cannot change the qty in the cart.');
  }
})

// @desc     Update item in user's cart
// @route    PUT /api/users/cart/updatewholecart
// @access   Private
const updateWholeCart = asyncHandler(async (req, res) => {
  //remember, req.user is passed here automatically by our authorization middleware
  const user = await User.findById(req.user._id);
  // const user = await User.findById(req.body.userID);
  if(user) {
    user.cart = req.body.cart || user.cart;
    //Update the user's info
    const updatedUser = await user.save();
    res.status(201).json({ //201 status means something was created
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      cart: updatedUser.cart,
      wishList: updatedUser.wishList,
      token: generateToken(updatedUser._id) 
    })
  } else {
    res.status(404); //not found
    throw new Error('User not found. Cannot Update the cart.');
  }
})

export { 
  getCart,
  addCartItem,
  deleteCartItem,
  updateCartQty,
  updateWholeCart
};