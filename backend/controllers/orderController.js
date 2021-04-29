import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';

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

export { 
  createUserOrder
};