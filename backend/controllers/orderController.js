import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import Product from '../models/productModel.js';
import generateToken from '../utils/generateToken.js';

// /api/users/orders

// @desc     Add an order to a User
// @route    POST /api/users/orders
// @access   Private
const createUserOrder = asyncHandler(async (req, res) => {
  //remember, req.user is passed here automatically by our authorization middleware
  const user = await User.findById(req.user._id);
  // const user = await User.findById(req.body.userID);
  if(user) {
    user.orders.push(req.body.order);
    //Update the user's info
    const updatedUser = await user.save();
    res.status(201).json({ //201 status means something was created
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      cart: updatedUser.cart,
      wishList: updatedUser.wishList,
      orders: updatedUser.orders,
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
      // console.log('color: ', color1)
      // console.log('size: ', size1)
      // console.log('sizeCategory: ', sizeCategory1)
      // console.log('cartQty: ', cartQty)
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
        // const updatedProduct = await orderProduct.save();
        // await product.save();
      }
    }
    // We save the product's here to limit the total number of times they need to be saved.
    // Ex: we have 3 different size/color combos of a pair of pants. We update their quantities in the loops above.
    // we save them here so that overall product (the pants) only gets saved one time instead of 3 times
    for(let product of orderProducts){
      await product.save();
    }

    // Loop thru and update each item in th database individually
    // const updatedProducts = await orderProducts.save();
    // const updatedProducts = await docs.save();


    // console.log(orderProduct)
    // console.log(orderProducts)
    // Loop through the cart items and find their match in orderProducts. Update quantities as needed
    
    // One Item at a Time
    // let cartItem = filteredCart[0]
    // const { color:color1, size:size1, sizeCategory:sizeCategory1, quantity:cartQty } = cartItem;
    // console.log('color: ', color1)
    // console.log('size: ', size1)
    // console.log('sizeCategory: ', sizeCategory1)
    // console.log('cartQty: ', cartQty)
    // // let product = orderProduct;
    // const { sizes } = orderProduct;
    // // In the array of sizes, find the index that corresponds to the size category, i.e. the index for "Regular" or "Tall"
    // let levelOne = sizes[sizes.findIndex(i => i.sizeCategoryName === sizeCategory1)];
    // // Next, find the index in sizeCategoryColorsAndSizes that matches the color the user chose, i.e. "Seapine"
    // let levelTwo = levelOne.sizeCategoryColorsAndSizes[levelOne.sizeCategoryColorsAndSizes.findIndex(i => i.color === color1)];
    // // Next, look at the array of sizes in that color and size category and see if the size the customer gave is in stock
    // let levelThree = levelTwo.sizeCategorySizes[levelTwo.sizeCategorySizes.findIndex(i => i.size === size1)];
    // console.log(levelThree);
    // let qtyInStock = levelThree.qty;
    // levelThree.qty -= cartQty;
    // console.log('after qty adjustment:')
    // console.log(levelThree);
    // const updatedProduct = await orderProduct.save();
    
    res.status(201).json({ //201 status means something was created
      arrayOfIDs: arrayOfIDs
    })

  } else {
    res.status(404); //not found
    throw new Error('User not found. Cannot Update the cart.');
  }
})


// @desc     Update item in user's cart
// @route    PUT /api/users/cart/updatewholecart
// @access   Private
const orderCartUpdate = asyncHandler(async (req, res) => {
  //remember, req.user is passed here automatically by our authorization middleware
  const user = await User.findById(req.user._id);
  // const user = await User.findById(req.body.userID);
  // console.log('cart sent to update whole cart: ')
  // console.log(req.body.cart);
  // console.log('typeof req.body.cart:', typeof req.body.cart)
  if(user) {
    console.log('found user for order cart update')
    // user.cart = req.body.cart || user.cart;
    let oldCart = [...user.cart];
    let newCart = oldCart.filter(eachItem => eachItem.savedForLater === true);
    console.log('Old Cart:')
    console.log(oldCart)
    console.log('New Cart:');
    console.log(newCart)

    user.cart = newCart;
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
  createUserOrder,
  updateInventory,
  orderCartUpdate
};