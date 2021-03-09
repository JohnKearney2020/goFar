import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
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
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
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
  const { name, email, password} = req.body;

  const userExists = await User.findOne({ email })  // here, we are effectively doing {email: email}

  if(userExists) {
    res.status(400);
    throw  new Error('User already exists');
  }

  const user = await User.create({
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
      token: generateToken(user._id) //don't need cart or wishlist on user creation
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
      cart: user.cart,
      wishList: user.wishList,
    })
  } else {
    res.status(404); //not found
    throw new Error('Invalid email or password');
  }
})

export { authUser, getUserProfile, registerUser };