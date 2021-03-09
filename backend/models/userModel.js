import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

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
    quantity: {
      type: Number,
      required: true
    },
    image: {
      type: String,
      required: true
    }
  // wishListProduct: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   required: false, //a user's wishlist can be empty
  //   ref: 'Product',
  // }
}, {
  timestamps: true
});

const cartSchema = mongoose.Schema({
    productID: {
      type: mongoose.Schema.Types.ObjectId,
      required: true, //a user's wishlist can be empty, not sure if this should be true or false atm
      ref: 'Product'
    },
    name: {
      type: String,
      required: true
    },
    quantity: {
      type: Number,
      required: true
    },
    image: {
      type: String,
      required: true
    }
  // wishListProduct: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   required: false, //a user's wishlist can be empty
  //   ref: 'Product',
  // }
}, {
  timestamps: true
});

const reviewSchema = mongoose.Schema({
  name: { type: String, required: true },
  rating: { type: Number, required: true }, //a single rating from a user's review. Not an average.
  comment: { type: String, required: true },
}, {
  timestamps: true
});




// const reviewSchema = mongoose.Schema({
//   name: { type: String, required: true },
//   rating: { type: Number, required: true }, //a single rating from a user's review. Not an average.
//   comment: { type: String, required: true },
// }, {
//   timestamps: true
// });

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
  addresses: [{
    addressName: {
      type: String,
      required: false
    },
    line1: {
      type: String,
      required: true
    },
    line2: {
      type: String,
      required: false
    },
    city: {
      type: String,
      required: true
    },
    state: {
      type: String,
      required: true
    },
    zipCode: {
      type: String,
      required: true
    }
  }],
  phoneNumber: {
    type: String,
    required: false
  },
  wishList: [wishListSchema], //an array of wishList objects. See schema above.
  cart: [cartSchema]
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