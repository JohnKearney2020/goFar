import mongoose from 'mongoose';

// ============================================================================================================================
//                                                          Cart Schema
// ============================================================================================================================
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
  price: {
    type: Number,
    required: false
  },
  image: {
    type: String,
    required: true
  },
  savedForLater: {
    type: Boolean,
    required: false
  },
  }, {
  timestamps: true
  });

// ============================================================================================================================
//                                                          Address Schema
// ============================================================================================================================
const addressSchema = mongoose.Schema({
  isPrimary: {
    type: Boolean,
    required: true
  },
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
}, 
{ 
  timestamps: true 
});



export { 
  addressSchema,
  cartSchema
};