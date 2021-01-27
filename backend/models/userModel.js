import mongoose from 'mongoose';

//User Wishlist - this contains the product id's of all the products the user has put on their wishlist
//See my notes in 'productModel.js' as to why we are creating a separate schema for the wishlist as opposed to creating an array of objects
const wishListSchema = mongoose.Schema({
    productID: {
      type: mongoose.Schema.Types.ObjectId,
      required: true, //a user's wishlist can be empty, not sure if this should be true or false atm
      ref: 'Product'
    },
    quantity: {
      type: Number,
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
  wishList: [wishListSchema] //an array of wishList objects. See schema above.
}, {
  //this automatically makes 'CreatedAt' and 'UpdatedAt' fields for us
  timestamps: true
})

const User = mongoose.model('User', userSchema);

export default User;