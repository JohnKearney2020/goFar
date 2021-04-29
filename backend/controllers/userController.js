import asyncHandler from 'express-async-handler';
import mongoose from 'mongoose';

import User from '../models/userModel.js';
// import Product from '../models/productModel.js';
import generateToken from '../utils/generateToken.js';

// @desc     Auth user & get token
// @route    POST /api/users/login
// @access   Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password} = req.body;
  // res.send({email, password});
  const user = await User.findOne({ email })  // here, we are effectively doing {email: email}
  // in our user model we set up a method called 'matchPassword' using bcrypt to compare the password here to the password we have in the database
  if(user && (await user.matchPassword(password))){// a user with that email exists and the passwords match
    // NOTE - the data below gets stored in local storage as 'userInfo'. We don't include addresses or phoneNumber b/c that is sensitive information
    // the 'userInfo' state and local storage is meant as general user data. Later, when we go to the user profile page, we make a request to the 
    // back end for more detailed information including the addresses and phone number.
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      // addresses: user.addresses,
      // phoneNumber: user.phoneNumber,
      cart: user.cart,
      wishList: user.wishList,
      token: generateToken(user._id)
    })
  } else {
    res.status(401); // status for unauthorized
    throw new Error('Invalid email or password');
  }
})

// @desc     Register a new user
// @route    POST /api/users
// @access   Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email })  // here, we are effectively doing {email: email}

  if(userExists) {
    res.status(400);
    throw  new Error('Email address already in use. Try another?');
  }

  const user = await User.create({ //don't need cart or wishlist on user creation
    name,
    email,
    password //this will automatically be encrypted thanks to the .preSave() middleware we created in the user model
  })

  if(user){
    res.status(201).json({ //201 status means something was created
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      // addresses: user.addresses,
      // phoneNumber: user.phoneNumber,
      cart: user.cart,
      wishList: user.wishList,
      token: generateToken(user._id) 
    })
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
})

// @desc     Get user profile
// @route    GET /api/users/profile
// @access   Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if(user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      addresses: user.addresses,
      phoneNumber: user.phoneNumber,
      cart: user.cart,
      wishList: user.wishList,
      orders: user.orders
    })
  } else {
    res.status(404); //not found
    throw new Error('Could not find that user.');
  }
})

// @desc     Update user profile
// @route    PUT /api/users/profile
// @access   Private
const updateUserProfile = asyncHandler(async (req, res) => {
  //remember, req.user is passed here automatically by our authorization middleware
  const user = await User.findById(req.user._id);
  if(user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.phoneNumber = req.body.phoneNumber || user.phoneNumber;
    //New Addresses
    user.addresses = req.body.addresses || user.addresses;
    if(req.body.password) {
      user.password = req.body.password; //the middleware we created in the user model will automatically encrypt this password
    }
    //Update the user's info
    const updatedUser = await user.save();

    res.status(201).json({ //201 status means something was created
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      addresses: updatedUser.addresses,
      phoneNumber: updatedUser.phoneNumber,
      cart: updatedUser.cart,
      wishList: updatedUser.wishList,
      token: generateToken(updatedUser._id) 
    })

  } else {
    res.status(404); //not found
    throw new Error('User not found');
  }
})

export { 
  authUser, 
  getUserProfile, 
  registerUser, 
  updateUserProfile
};