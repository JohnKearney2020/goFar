import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import Product from '../models/productModel.js';
import generateToken from '../utils/generateToken.js';

// @desc     Add an order to a User and update that user's cart at the same time - remove items that they just purchased
// @route    PUT /api/users/orders
// @access   Private
const updateUserData = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if(user) {
    //Add the order to the user data - we add it to the beginning of the array not the end here for ease of use when we work with
    //the orders on the front end
    user.orders.unshift(req.body.order);
    //Update the user's cart - remove all items checked out during the order
    let oldCart = [...user.cart];
    let newCart = oldCart.filter(eachItem => eachItem.savedForLater === true);
    user.cart = newCart;
    //Update the user's data
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

// @desc     Adjust the inventory based on the qty's the user checked out
// @route    PUT /api/users/orders/inventoryupdate
// @access   Private
const updateInventory = asyncHandler(async (req, res) => {
  const { cart } = req.body;
  if(cart) {
    // Get the IDs of all the items in the cart that were part of the order and filter our the 'saved for later' items from the cart
    const filteredCart = [];
    const arrayOfIDs = [];
    cart.forEach(eachItem => {
      if(eachItem.savedForLater !== true){
        filteredCart.push(eachItem);
        arrayOfIDs.push(eachItem.productID)
      }
    });
    // Pull the products that were part of the order from the database
    const orderProducts = await Product.find({ '_id': { $in: arrayOfIDs }});
    // Loop through the cart items and find their match in orderProducts. Update quantities as needed
    for(let cartItem of filteredCart){
      const { color:color1, size:size1, sizeCategory:sizeCategory1, quantity:cartQty } = cartItem;
      for(let product of orderProducts){
        const { sizes } = product;
        // In the array of sizes, find the index that corresponds to the size category, i.e. the index for "Regular" or "Tall"
        let levelOne = sizes[sizes.findIndex(i => i.sizeCategoryName === sizeCategory1)];
        // Next, find the index in sizeCategoryColorsAndSizes that matches the color the user chose, i.e. "Seapine"
        let levelTwo = levelOne.sizeCategoryColorsAndSizes[levelOne.sizeCategoryColorsAndSizes.findIndex(i => i.color === color1)];
        // Next, look at the array of sizes in that color and size category and see if the size the customer gave is in stock
        let levelThree = levelTwo.sizeCategorySizes[levelTwo.sizeCategorySizes.findIndex(i => i.size === size1)];
        console.log(levelThree);
        // let qtyInStock = levelThree.qty;
        levelThree.qty -= cartQty;
        console.log('after qty adjustment:')
        console.log(levelThree);
      }
    }
    // We save the product's here to limit the total number of times they need to be saved.
    // Ex: we have 3 different size/color combos of a pair of pants. We update their quantities in the loops above.
    // we save them here so that overall product (the pants) only gets saved one time instead of 3 times
    for(let product of orderProducts){
      await product.save();
    }

    res.status(201).json({ //201 status means something was created
      arrayOfIDs: arrayOfIDs
    })

  } else {
    res.status(404); //not found
    throw new Error('User not found. Cannot Update the cart.');
  }
})

export { 
  updateUserData,
  updateInventory
};