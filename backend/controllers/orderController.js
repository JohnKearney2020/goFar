import asyncHandler from 'express-async-handler';

import User from '../models/userModel.js';

// /api/users/orders

// @desc     Add an order to a User
// @route    POST /api/users/orders
// @access   Private
const updateUserOrders = asyncHandler(async (req, res) => {
  console.log('in updateUserOrders action')
  console.log('req.body.order:')
  console.log(req.body.order)
  //remember, req.user is passed here automatically by our authorization middleware
  const user = await User.findById(req.user._id);
  // const user = await User.findById(req.body.userID);
  if(user) {
    console.log('found a user')
    console.log('typeof req.body.order:', typeof req.body.order)
    // console.log('user before any changes:')
    console.log(req.body.order);
    user.orders.push(req.body.order);
    console.log('user after any changes:')
    console.log(user);
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




// @desc     Get user profile
// @route    GET /api/users/profile
// @access   Private
// const updateUserOrders = asyncHandler(async (req, res) => {
//   const user = await User.findById(req.user._id);
//   if(user) {
//     res.json({
//       _id: user._id,
//       name: user.name,
//       email: user.email,
//       isAdmin: user.isAdmin,
//       addresses: user.addresses,
//       phoneNumber: user.phoneNumber,
//       cart: user.cart,
//       wishList: user.wishList,
//     })
//   } else {
//     res.status(404); //not found
//     throw new Error('Could not find that user.');
//   }
// })


// getUserOrders

export { 
  updateUserOrders
};