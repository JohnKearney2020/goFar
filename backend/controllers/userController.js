import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';

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
      token: null
    })
  } else {
    res.status(401); // status for unauthorized
    throw new Error('Invalid email or password');
  }
})

export { authUser };