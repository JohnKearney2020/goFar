import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { addressSchema, cartSchema } from './sharedSchemas.js';

// const reviewSchema = mongoose.Schema({
//   name: { type: String, required: true },
//   rating: { type: Number, required: true }, //a single rating from a user's review. Not an average.
//   comment: { type: String, required: true },
// }, {
//   timestamps: true
// });


//User Wishlist - this contains the product id's of all the products the user has put on their wishlist
//See my notes in 'productModel.js' as to why we are creating a separate schema for the wishlist as opposed to creating an array of objects
const wishListSchema = mongoose.Schema({
  productID: {
    type: mongoose.Schema.Types.ObjectId,
    required: true, //a user's wishlist can be empty, not sure if this should be true or false atm
    ref: 'Product'
  },
  name: {
    type: String,
    required: true
  },
  color: {
    type: String,
    required: false
  },
  size: {
    type: String,
    required: false
  },
  sizeCategory: {
    type: String,
    required: false
  },
  image: {
    type: String,
    required: true
  },
  qtyAvailable: {
    type: Number,
    required: false,
    default: null
  },
  currentPrice: {
    type: Number,
    required: false,
    default: null
  },
  inCart: {
    type: Boolean,
    required: false,
    default: false
  },
  availableInOtherSizes: {
    type: Boolean,
    required: false,
    default: false
  }
}, {
timestamps: true
});

// =====================================================================================================
//                                                  UserSchema
// =====================================================================================================

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true //users can't register under an email that already exists
  },
  password: {
    type: String,
    required: true
  },
  isAdmin: {
    type: Boolean,
    required: true,
    default: false //by default, new users will Not be admins
  },
  // IMPORTANT - even though we've set many required: true parts of the addresses, cart, and wishlist we can still create a user based
  // on less information, like name, email and password. MongoDB seems to only enforce the required part if we were to actually try
  // to populate addresses, cart, or wishlist. If we create a user with just name, email, and address, the addresses, cart, and wishlist
  // arrays are created, but left blank
  addresses: [addressSchema],
  phoneNumber: {
    type: String,
    required: false,
    default: ''
  },
  wishList: [wishListSchema], //an array of wishList objects. See schema above.
  cart: [cartSchema],
  // orders: [orderSchema]
}, {
  //this automatically makes 'CreatedAt' and 'UpdatedAt' fields for us
  timestamps: true
})

userSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
}

userSchema.pre('save', async function (next) {
  // only encrypt the user password if it has not been modified
  if(!this.isModified('password')){
    next()
  }
  //Before saving, encrypt the user password
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
})

const User = mongoose.model('User', userSchema);

export default User;