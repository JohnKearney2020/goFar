import asyncHandler from 'express-async-handler';
import Order from '../models/orderModel.js';
import Product from '../models/productModel.js';
import dotenv from 'dotenv';
import { Client } from "@googlemaps/google-maps-services-js";

dotenv.config(); //load environmental variables

// @desc     Get all orders tied to a specific user
// @route    GET /api/orders
// @access   Private
const getUserOrders = asyncHandler(async (req, res) => {
  const pageSize = 5;
  const page = Number(req.query.pageNumber) || 1;
  // Get the total count for pagination purposes
  // Remember, req.user._id is passed here automatically by our authorization middleware
  const count = await Order.countDocuments({ user: req.user._id });
  // '-1' is descending order from newest to oldest. '1' is ascending order from oldest to newest
  const orders = await Order.find({ user: req.user._id }).sort({createdAt: -1}).limit(pageSize).skip(pageSize * (page - 1));
  if(orders){
    // We return what the current page is, and how many pages total their are rounded up
    res.json({ orders, page, pages: Math.ceil(count / pageSize) });
  } else {
    res.status(400);
    throw new Error('Could not find orders based on that user ID...');
  }
})

// @desc     Add an order to a User and update that user's cart at the same time - remove items that they just purchased
// @route    PUT /api/users/orders
// @access   Private
const createOrder = asyncHandler(async (req, res) => {
  let frontEndOrder = req.body.order;
  console.log('frontEndOrder.shippingAddressLatLng:' .cyan.underline)
  console.log(frontEndOrder.shippingAddressLatLng)
  const client = new Client({}); //instantiate the client to make a call to the Google Maps API
  client
  .geocode({
    params: {
      // address: '3 Hermann Museum Circle Dr Apt 1112, Houston TX 77004',
      address: frontEndOrder.shippingAddressString,
      key: process.env.GOOGLE_MAPS_API_KEY,
    },
    timeout: 2500, // milliseconds
  })
  .then((r) => {
    console.log('Geocoded Address: ' .red.underline.bold)
    console.log(r.data.results[0].geometry.location);
    // frontEndOrder.shippingAddressLatLng = "TEST";
    frontEndOrder.shippingAddressLatLng = r.data.results[0].geometry.location;
    const order = Order.create(frontEndOrder);
    // const order = Order.create(frontEndOrder);
    if(order){
      res.status(201).json({ //201 status means something was created
        message: "Order Created"
      })
    } else { //This might be redundant as the clg in the .catch() below triggers on failure
      res.status(400);
      throw new Error('Could not create the order.');
    }
  })
  .catch(() => {
    console.log('Could not create the order...')
    res.status(400);
    res.send('Could not create the order...')
  })
})


// @desc     Adjust the inventory based on the qty's the user checked out
// @route    PUT /api/orders/inventoryupdate
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
  createOrder,
  updateInventory,
  getUserOrders
};


// const orderCreationPromise = (order) => {
//   return new Promise((resolve, reject) => {
//     const order = Order.create(frontEndOrder);
//     if(order){
//       resolve();
//     } else {
//       reject();
//     }
//   })
// }